# Personas CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Go backend CRUD service for managing "personas" (people records), backed by MongoDB, exposed over a REST API.

**Architecture:** Layered design — `domain` (validation) → `repository` (storage interface + memory/Mongo implementations) → `service` (business rules) → `httpapi` (HTTP handlers) → `cmd/server` (wiring). Each layer depends only on the interfaces of the layer below it, so business logic and handlers are unit-tested against an in-memory repository, with a separate integration test suite for the real MongoDB implementation.

**Tech Stack:** Go 1.22+, `net/http` standard library (no router framework), `go.mongodb.org/mongo-driver` (only non-stdlib dependency), MongoDB via Docker for local dev/test.

## Global Constraints

- Module path: `github.com/bacsystem/project-test-plan-executor`. Go version: `go 1.22` in `go.mod`.
- Zero runtime dependencies beyond `go.mongodb.org/mongo-driver` — and that dependency is added only in Task 3 (the task that needs it), not earlier.
- MongoDB must be running locally before Task 3's integration tests: `docker run -d --name personas-mongo -p 27017:27017 mongo:7`. If it is not already running when a task needs it, start it with that command first.
- Integration tests (`internal/repository/mongo_test.go`) must call `t.Skip(...)` if MongoDB is unreachable at test start — `go test ./...` must never fail on a machine without the container running.
- `PUT` is a full replace of the person record, never a partial patch.
- Errors are translated to HTTP status codes **only** in the `httpapi` package. `service` and `repository` stay HTTP-agnostic and return typed Go errors.
- Error JSON envelope, always: `{"error": {"code": "...", "message": "..."}}`.
- Conventional Commits, in English, with scope (e.g. `feat(domain): ...`).
- Do not modify files owned by other tasks beyond what your task declares.
- Every command below is run from the repository root of your task's worktree.

---

### Task 1: Domain model and validation

**Files:**
- Create: `go.mod`
- Create: `internal/domain/person.go`
- Test: `internal/domain/person_test.go`

**Interfaces:**
- Consumes: None
- Produces: `Person`, `Person.Validate()`, `ErrNombresRequired`, `ErrApellidosRequired`, `ErrDocumentoRequired`, `ErrEmailRequired`, `ErrEmailInvalid`, `ErrFechaNacimientoRequired`, `ErrFechaNacimientoInvalid`, `ErrFechaNacimientoFuture`

- [ ] **Step 1: Initialize the Go module**

```bash
go mod init github.com/bacsystem/project-test-plan-executor
```

This creates `go.mod`:

```
module github.com/bacsystem/project-test-plan-executor

go 1.22
```

- [ ] **Step 2: Write the failing tests**

`internal/domain/person_test.go`:

```go
package domain

import "testing"

func validPerson() Person {
	return Person{
		Nombres:         "Ana",
		Apellidos:       "Gomez",
		Documento:       "12345678",
		Email:           "ana@example.com",
		FechaNacimiento: "1990-05-20",
	}
}

func TestValidate_ValidPerson(t *testing.T) {
	p := validPerson()
	if err := p.Validate(); err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
}

func TestValidate_MissingNombres(t *testing.T) {
	p := validPerson()
	p.Nombres = ""
	if err := p.Validate(); err != ErrNombresRequired {
		t.Fatalf("expected ErrNombresRequired, got %v", err)
	}
}

func TestValidate_MissingApellidos(t *testing.T) {
	p := validPerson()
	p.Apellidos = ""
	if err := p.Validate(); err != ErrApellidosRequired {
		t.Fatalf("expected ErrApellidosRequired, got %v", err)
	}
}

func TestValidate_MissingDocumento(t *testing.T) {
	p := validPerson()
	p.Documento = ""
	if err := p.Validate(); err != ErrDocumentoRequired {
		t.Fatalf("expected ErrDocumentoRequired, got %v", err)
	}
}

func TestValidate_MissingEmail(t *testing.T) {
	p := validPerson()
	p.Email = ""
	if err := p.Validate(); err != ErrEmailRequired {
		t.Fatalf("expected ErrEmailRequired, got %v", err)
	}
}

func TestValidate_InvalidEmail(t *testing.T) {
	p := validPerson()
	p.Email = "not-an-email"
	if err := p.Validate(); err != ErrEmailInvalid {
		t.Fatalf("expected ErrEmailInvalid, got %v", err)
	}
}

func TestValidate_MissingFecha(t *testing.T) {
	p := validPerson()
	p.FechaNacimiento = ""
	if err := p.Validate(); err != ErrFechaNacimientoRequired {
		t.Fatalf("expected ErrFechaNacimientoRequired, got %v", err)
	}
}

func TestValidate_InvalidFechaFormat(t *testing.T) {
	p := validPerson()
	p.FechaNacimiento = "20-05-1990"
	if err := p.Validate(); err != ErrFechaNacimientoInvalid {
		t.Fatalf("expected ErrFechaNacimientoInvalid, got %v", err)
	}
}

func TestValidate_FutureFecha(t *testing.T) {
	p := validPerson()
	p.FechaNacimiento = "2999-01-01"
	if err := p.Validate(); err != ErrFechaNacimientoFuture {
		t.Fatalf("expected ErrFechaNacimientoFuture, got %v", err)
	}
}
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `go test ./internal/domain/... -v`
Expected: build failure — `undefined: Person` (the package doesn't exist yet).

- [ ] **Step 4: Write the implementation**

`internal/domain/person.go`:

```go
package domain

import (
	"errors"
	"net/mail"
	"time"
)

// Person represents a person record.
type Person struct {
	ID              string `json:"id,omitempty"`
	Nombres         string `json:"nombres"`
	Apellidos       string `json:"apellidos"`
	Documento       string `json:"documento"`
	Email           string `json:"email"`
	FechaNacimiento string `json:"fechaNacimiento"`
	Telefono        string `json:"telefono,omitempty"`
}

var (
	ErrNombresRequired         = errors.New("nombres is required")
	ErrApellidosRequired       = errors.New("apellidos is required")
	ErrDocumentoRequired       = errors.New("documento is required")
	ErrEmailRequired           = errors.New("email is required")
	ErrEmailInvalid            = errors.New("email is invalid")
	ErrFechaNacimientoRequired = errors.New("fechaNacimiento is required")
	ErrFechaNacimientoInvalid  = errors.New("fechaNacimiento must be in YYYY-MM-DD format")
	ErrFechaNacimientoFuture   = errors.New("fechaNacimiento must not be in the future")
)

// Validate checks that the required fields are present and well-formed.
func (p Person) Validate() error {
	if p.Nombres == "" {
		return ErrNombresRequired
	}
	if p.Apellidos == "" {
		return ErrApellidosRequired
	}
	if p.Documento == "" {
		return ErrDocumentoRequired
	}
	if p.Email == "" {
		return ErrEmailRequired
	}
	if _, err := mail.ParseAddress(p.Email); err != nil {
		return ErrEmailInvalid
	}
	if p.FechaNacimiento == "" {
		return ErrFechaNacimientoRequired
	}
	fecha, err := time.Parse("2006-01-02", p.FechaNacimiento)
	if err != nil {
		return ErrFechaNacimientoInvalid
	}
	if fecha.After(time.Now()) {
		return ErrFechaNacimientoFuture
	}
	return nil
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `go test ./internal/domain/... -v`
Expected: `PASS`, all 9 tests green.

- [ ] **Step 6: Commit**

```bash
git add go.mod internal/domain/person.go internal/domain/person_test.go
git commit -m "feat(domain): add Person with validation rules"
```

---

### Task 2: Repository interface and in-memory implementation

**Files:**
- Create: `internal/repository/repository.go`
- Create: `internal/repository/memory.go`
- Test: `internal/repository/memory_test.go`

**Interfaces:**
- Consumes: `Person`
- Produces: `PersonRepository`, `NewMemoryRepository`, `ErrNotFound`, `ErrDuplicateDocumento`

- [ ] **Step 1: Write the failing tests**

`internal/repository/memory_test.go`:

```go
package repository

import (
	"context"
	"strconv"
	"testing"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
)

func samplePerson(documento string) domain.Person {
	return domain.Person{
		Nombres:         "Ana",
		Apellidos:       "Gomez",
		Documento:       documento,
		Email:           "ana@example.com",
		FechaNacimiento: "1990-05-20",
	}
}

func TestMemoryRepository_CreateAndGetByID(t *testing.T) {
	repo := NewMemoryRepository()
	ctx := context.Background()

	created, err := repo.Create(ctx, samplePerson("111"))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if created.ID == "" {
		t.Fatal("expected an ID to be assigned")
	}

	got, err := repo.GetByID(ctx, created.ID)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got.Documento != "111" {
		t.Fatalf("expected documento 111, got %s", got.Documento)
	}
}

func TestMemoryRepository_CreateDuplicateDocumento(t *testing.T) {
	repo := NewMemoryRepository()
	ctx := context.Background()

	if _, err := repo.Create(ctx, samplePerson("222")); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if _, err := repo.Create(ctx, samplePerson("222")); err != ErrDuplicateDocumento {
		t.Fatalf("expected ErrDuplicateDocumento, got %v", err)
	}
}

func TestMemoryRepository_GetByID_NotFound(t *testing.T) {
	repo := NewMemoryRepository()
	if _, err := repo.GetByID(context.Background(), "missing"); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestMemoryRepository_List_Pagination(t *testing.T) {
	repo := NewMemoryRepository()
	ctx := context.Background()
	for i := 0; i < 5; i++ {
		if _, err := repo.Create(ctx, samplePerson(strconv.Itoa(1000+i))); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
	}

	page, total, err := repo.List(ctx, 1, 2)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if total != 5 {
		t.Fatalf("expected total 5, got %d", total)
	}
	if len(page) != 2 {
		t.Fatalf("expected page size 2, got %d", len(page))
	}
}

func TestMemoryRepository_Update_NotFound(t *testing.T) {
	repo := NewMemoryRepository()
	if _, err := repo.Update(context.Background(), "missing", samplePerson("333")); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestMemoryRepository_Update_DuplicateDocumento(t *testing.T) {
	repo := NewMemoryRepository()
	ctx := context.Background()
	first, _ := repo.Create(ctx, samplePerson("340"))
	_, _ = repo.Create(ctx, samplePerson("341"))

	updated := samplePerson("341")
	if _, err := repo.Update(ctx, first.ID, updated); err != ErrDuplicateDocumento {
		t.Fatalf("expected ErrDuplicateDocumento, got %v", err)
	}
}

func TestMemoryRepository_Delete(t *testing.T) {
	repo := NewMemoryRepository()
	ctx := context.Background()
	created, _ := repo.Create(ctx, samplePerson("444"))

	if err := repo.Delete(ctx, created.ID); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if _, err := repo.GetByID(ctx, created.ID); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound after delete, got %v", err)
	}
}

func TestMemoryRepository_Delete_NotFound(t *testing.T) {
	repo := NewMemoryRepository()
	if err := repo.Delete(context.Background(), "missing"); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `go test ./internal/repository/... -v`
Expected: build failure — `undefined: NewMemoryRepository`.

- [ ] **Step 3: Write the implementation**

`internal/repository/repository.go`:

```go
package repository

import (
	"context"
	"errors"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
)

// ErrNotFound is returned when no person exists with the given id.
var ErrNotFound = errors.New("person not found")

// ErrDuplicateDocumento is returned when a person with the same documento already exists.
var ErrDuplicateDocumento = errors.New("person with this documento already exists")

// PersonRepository is the storage abstraction for Person records.
type PersonRepository interface {
	Create(ctx context.Context, p domain.Person) (domain.Person, error)
	GetByID(ctx context.Context, id string) (domain.Person, error)
	List(ctx context.Context, page, size int) ([]domain.Person, int, error)
	Update(ctx context.Context, id string, p domain.Person) (domain.Person, error)
	Delete(ctx context.Context, id string) error
}
```

`internal/repository/memory.go`:

```go
package repository

import (
	"context"
	"sort"
	"strconv"
	"sync"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
)

// MemoryRepository is an in-memory PersonRepository implementation, used to
// test the service and handler layers without a real database.
type MemoryRepository struct {
	mu     sync.Mutex
	people map[string]domain.Person
	nextID int
}

// NewMemoryRepository creates an empty in-memory repository.
func NewMemoryRepository() *MemoryRepository {
	return &MemoryRepository{people: make(map[string]domain.Person)}
}

func (r *MemoryRepository) Create(ctx context.Context, p domain.Person) (domain.Person, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	for _, existing := range r.people {
		if existing.Documento == p.Documento {
			return domain.Person{}, ErrDuplicateDocumento
		}
	}

	r.nextID++
	p.ID = strconv.Itoa(r.nextID)
	r.people[p.ID] = p
	return p, nil
}

func (r *MemoryRepository) GetByID(ctx context.Context, id string) (domain.Person, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	p, ok := r.people[id]
	if !ok {
		return domain.Person{}, ErrNotFound
	}
	return p, nil
}

func (r *MemoryRepository) List(ctx context.Context, page, size int) ([]domain.Person, int, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	all := make([]domain.Person, 0, len(r.people))
	for _, p := range r.people {
		all = append(all, p)
	}
	sort.Slice(all, func(i, j int) bool { return all[i].ID < all[j].ID })

	total := len(all)
	start := (page - 1) * size
	if start > total {
		start = total
	}
	end := start + size
	if end > total {
		end = total
	}
	return all[start:end], total, nil
}

func (r *MemoryRepository) Update(ctx context.Context, id string, p domain.Person) (domain.Person, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.people[id]; !ok {
		return domain.Person{}, ErrNotFound
	}
	for existingID, existing := range r.people {
		if existingID != id && existing.Documento == p.Documento {
			return domain.Person{}, ErrDuplicateDocumento
		}
	}
	p.ID = id
	r.people[id] = p
	return p, nil
}

func (r *MemoryRepository) Delete(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.people[id]; !ok {
		return ErrNotFound
	}
	delete(r.people, id)
	return nil
}

var _ PersonRepository = (*MemoryRepository)(nil)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `go test ./internal/repository/... -v`
Expected: `PASS`, all 8 tests green.

- [ ] **Step 5: Commit**

```bash
git add internal/repository/repository.go internal/repository/memory.go internal/repository/memory_test.go
git commit -m "feat(repository): add PersonRepository interface and in-memory implementation"
```

---

### Task 3: MongoDB repository implementation

**Files:**
- Modify: `go.mod`
- Modify: `go.sum`
- Create: `internal/repository/mongo.go`
- Test: `internal/repository/mongo_test.go`

**Interfaces:**
- Consumes: `PersonRepository`, `ErrNotFound`, `ErrDuplicateDocumento`, `Person`
- Produces: `NewMongoRepository`

- [ ] **Step 1: Add the MongoDB driver dependency**

```bash
go get go.mongodb.org/mongo-driver@v1.17.1
```

This updates `go.mod` and `go.sum` with the driver and its transitive dependencies.

- [ ] **Step 2: Ensure MongoDB is running**

```bash
docker run -d --name personas-mongo -p 27017:27017 mongo:7
```

If a container with that name already exists and is stopped, run `docker start personas-mongo` instead.

- [ ] **Step 3: Write the failing tests**

`internal/repository/mongo_test.go`:

```go
package repository

import (
	"context"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connectTestMongo(t *testing.T) *mongo.Collection {
	t.Helper()

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		t.Skip("MongoDB not reachable at localhost:27017, skipping integration test")
	}
	if err := client.Ping(ctx, nil); err != nil {
		t.Skip("MongoDB not reachable at localhost:27017, skipping integration test")
	}

	coll := client.Database("personas_crud_test").Collection("people_test")
	if err := coll.Drop(ctx); err != nil {
		t.Fatalf("failed to drop test collection: %v", err)
	}

	t.Cleanup(func() {
		cleanupCtx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()
		_ = coll.Drop(cleanupCtx)
		_ = client.Disconnect(cleanupCtx)
	})

	return coll
}

func TestMongoRepository_CreateAndGetByID(t *testing.T) {
	coll := connectTestMongo(t)
	ctx := context.Background()

	repo, err := NewMongoRepository(ctx, coll)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	created, err := repo.Create(ctx, samplePerson("mongo-111"))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if created.ID == "" {
		t.Fatal("expected an ID to be assigned")
	}

	got, err := repo.GetByID(ctx, created.ID)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got.Documento != "mongo-111" {
		t.Fatalf("expected documento mongo-111, got %s", got.Documento)
	}
}

func TestMongoRepository_CreateDuplicateDocumento(t *testing.T) {
	coll := connectTestMongo(t)
	ctx := context.Background()
	repo, err := NewMongoRepository(ctx, coll)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if _, err := repo.Create(ctx, samplePerson("mongo-222")); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if _, err := repo.Create(ctx, samplePerson("mongo-222")); err != ErrDuplicateDocumento {
		t.Fatalf("expected ErrDuplicateDocumento, got %v", err)
	}
}

func TestMongoRepository_GetByID_NotFound(t *testing.T) {
	coll := connectTestMongo(t)
	ctx := context.Background()
	repo, err := NewMongoRepository(ctx, coll)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if _, err := repo.GetByID(ctx, "507f1f77bcf86cd799439011"); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestMongoRepository_UpdateAndDelete(t *testing.T) {
	coll := connectTestMongo(t)
	ctx := context.Background()
	repo, err := NewMongoRepository(ctx, coll)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	created, err := repo.Create(ctx, samplePerson("mongo-333"))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	updated := samplePerson("mongo-333")
	updated.Nombres = "Cambiado"
	if _, err := repo.Update(ctx, created.ID, updated); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	got, err := repo.GetByID(ctx, created.ID)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got.Nombres != "Cambiado" {
		t.Fatalf("expected updated nombres, got %s", got.Nombres)
	}

	if err := repo.Delete(ctx, created.ID); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if _, err := repo.GetByID(ctx, created.ID); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound after delete, got %v", err)
	}
}
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `go test ./internal/repository/... -v -run TestMongoRepository`
Expected: build failure — `undefined: NewMongoRepository`.

- [ ] **Step 5: Write the implementation**

`internal/repository/mongo.go`:

```go
package repository

import (
	"context"
	"errors"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// mongoPerson is the BSON representation stored in MongoDB. Kept separate
// from domain.Person so the domain type never depends on the driver's
// ObjectID type.
type mongoPerson struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	Nombres         string             `bson:"nombres"`
	Apellidos       string             `bson:"apellidos"`
	Documento       string             `bson:"documento"`
	Email           string             `bson:"email"`
	FechaNacimiento string             `bson:"fechaNacimiento"`
	Telefono        string             `bson:"telefono"`
}

func toDomain(mp mongoPerson) domain.Person {
	return domain.Person{
		ID:              mp.ID.Hex(),
		Nombres:         mp.Nombres,
		Apellidos:       mp.Apellidos,
		Documento:       mp.Documento,
		Email:           mp.Email,
		FechaNacimiento: mp.FechaNacimiento,
		Telefono:        mp.Telefono,
	}
}

func fromDomain(p domain.Person) mongoPerson {
	return mongoPerson{
		Nombres:         p.Nombres,
		Apellidos:       p.Apellidos,
		Documento:       p.Documento,
		Email:           p.Email,
		FechaNacimiento: p.FechaNacimiento,
		Telefono:        p.Telefono,
	}
}

// MongoRepository is a PersonRepository backed by MongoDB.
type MongoRepository struct {
	coll *mongo.Collection
}

// NewMongoRepository connects to the given collection and ensures a unique
// index on "documento" exists. Call it once at startup.
func NewMongoRepository(ctx context.Context, coll *mongo.Collection) (*MongoRepository, error) {
	indexModel := mongo.IndexModel{
		Keys:    bson.D{{Key: "documento", Value: 1}},
		Options: options.Index().SetUnique(true),
	}
	if _, err := coll.Indexes().CreateOne(ctx, indexModel); err != nil {
		return nil, err
	}
	return &MongoRepository{coll: coll}, nil
}

func (r *MongoRepository) Create(ctx context.Context, p domain.Person) (domain.Person, error) {
	doc := fromDomain(p)
	doc.ID = primitive.NewObjectID()

	if _, err := r.coll.InsertOne(ctx, doc); err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return domain.Person{}, ErrDuplicateDocumento
		}
		return domain.Person{}, err
	}
	return toDomain(doc), nil
}

func (r *MongoRepository) GetByID(ctx context.Context, id string) (domain.Person, error) {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.Person{}, ErrNotFound
	}

	var doc mongoPerson
	err = r.coll.FindOne(ctx, bson.M{"_id": oid}).Decode(&doc)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return domain.Person{}, ErrNotFound
	}
	if err != nil {
		return domain.Person{}, err
	}
	return toDomain(doc), nil
}

func (r *MongoRepository) List(ctx context.Context, page, size int) ([]domain.Person, int, error) {
	skip := int64((page - 1) * size)
	limit := int64(size)

	total, err := r.coll.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, 0, err
	}

	cur, err := r.coll.Find(ctx, bson.M{}, options.Find().SetSkip(skip).SetLimit(limit).SetSort(bson.D{{Key: "_id", Value: 1}}))
	if err != nil {
		return nil, 0, err
	}
	defer cur.Close(ctx)

	people := make([]domain.Person, 0, size)
	for cur.Next(ctx) {
		var doc mongoPerson
		if err := cur.Decode(&doc); err != nil {
			return nil, 0, err
		}
		people = append(people, toDomain(doc))
	}
	if err := cur.Err(); err != nil {
		return nil, 0, err
	}
	return people, int(total), nil
}

func (r *MongoRepository) Update(ctx context.Context, id string, p domain.Person) (domain.Person, error) {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.Person{}, ErrNotFound
	}

	doc := fromDomain(p)
	update := bson.M{"$set": bson.M{
		"nombres":         doc.Nombres,
		"apellidos":       doc.Apellidos,
		"documento":       doc.Documento,
		"email":           doc.Email,
		"fechaNacimiento": doc.FechaNacimiento,
		"telefono":        doc.Telefono,
	}}

	result, err := r.coll.UpdateOne(ctx, bson.M{"_id": oid}, update)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return domain.Person{}, ErrDuplicateDocumento
		}
		return domain.Person{}, err
	}
	if result.MatchedCount == 0 {
		return domain.Person{}, ErrNotFound
	}

	doc.ID = oid
	return toDomain(doc), nil
}

func (r *MongoRepository) Delete(ctx context.Context, id string) error {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ErrNotFound
	}

	result, err := r.coll.DeleteOne(ctx, bson.M{"_id": oid})
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return ErrNotFound
	}
	return nil
}

var _ PersonRepository = (*MongoRepository)(nil)
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `go test ./internal/repository/... -v`
Expected: `PASS` for all memory AND mongo tests (Mongo tests run for real against the Docker container; they must not be skipped in this environment).

- [ ] **Step 7: Commit**

```bash
git add go.mod go.sum internal/repository/mongo.go internal/repository/mongo_test.go
git commit -m "feat(repository): add MongoDB-backed PersonRepository implementation"
```

---

### Task 4: Person service (business rules)

**Files:**
- Create: `internal/service/person_service.go`
- Test: `internal/service/person_service_test.go`

**Interfaces:**
- Consumes: `PersonRepository`, `Person`, `Person.Validate()`, `ErrNotFound`, `ErrDuplicateDocumento`
- Produces: `PersonService`, `NewPersonService`

- [ ] **Step 1: Write the failing tests**

`internal/service/person_service_test.go`:

```go
package service

import (
	"context"
	"testing"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
	"github.com/bacsystem/project-test-plan-executor/internal/repository"
)

func validPerson(documento string) domain.Person {
	return domain.Person{
		Nombres:         "Ana",
		Apellidos:       "Gomez",
		Documento:       documento,
		Email:           "ana@example.com",
		FechaNacimiento: "1990-05-20",
	}
}

func TestPersonService_Create_Valid(t *testing.T) {
	svc := NewPersonService(repository.NewMemoryRepository())
	created, err := svc.Create(context.Background(), validPerson("100"))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if created.ID == "" {
		t.Fatal("expected an ID to be assigned")
	}
}

func TestPersonService_Create_InvalidPropagatesValidationError(t *testing.T) {
	svc := NewPersonService(repository.NewMemoryRepository())
	invalid := validPerson("101")
	invalid.Email = "not-an-email"

	if _, err := svc.Create(context.Background(), invalid); err != domain.ErrEmailInvalid {
		t.Fatalf("expected ErrEmailInvalid, got %v", err)
	}
}

func TestPersonService_Create_DuplicateDocumento(t *testing.T) {
	svc := NewPersonService(repository.NewMemoryRepository())
	ctx := context.Background()

	if _, err := svc.Create(ctx, validPerson("102")); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if _, err := svc.Create(ctx, validPerson("102")); err != repository.ErrDuplicateDocumento {
		t.Fatalf("expected ErrDuplicateDocumento, got %v", err)
	}
}

func TestPersonService_List_DefaultsAndCap(t *testing.T) {
	repo := repository.NewMemoryRepository()
	svc := NewPersonService(repo)
	ctx := context.Background()
	for i := 0; i < 3; i++ {
		if _, err := svc.Create(ctx, validPerson(string(rune('a'+i)))); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
	}

	page, total, err := svc.List(ctx, 0, 0)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if total != 3 || len(page) != 3 {
		t.Fatalf("expected 3 results with default pagination (total=3), got total=%d len=%d", total, len(page))
	}

	page, _, err = svc.List(ctx, 1, 1000)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(page) != 3 {
		t.Fatalf("expected 3 results with an oversized page size, got %d", len(page))
	}
}

func TestPersonService_GetByID_NotFound(t *testing.T) {
	svc := NewPersonService(repository.NewMemoryRepository())
	if _, err := svc.GetByID(context.Background(), "missing"); err != repository.ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestPersonService_Update_InvalidPropagatesValidationError(t *testing.T) {
	repo := repository.NewMemoryRepository()
	svc := NewPersonService(repo)
	ctx := context.Background()
	created, _ := svc.Create(ctx, validPerson("103"))

	invalid := validPerson("103")
	invalid.Nombres = ""
	if _, err := svc.Update(ctx, created.ID, invalid); err != domain.ErrNombresRequired {
		t.Fatalf("expected ErrNombresRequired, got %v", err)
	}
}

func TestPersonService_Delete(t *testing.T) {
	repo := repository.NewMemoryRepository()
	svc := NewPersonService(repo)
	ctx := context.Background()
	created, _ := svc.Create(ctx, validPerson("104"))

	if err := svc.Delete(ctx, created.ID); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if _, err := svc.GetByID(ctx, created.ID); err != repository.ErrNotFound {
		t.Fatalf("expected ErrNotFound after delete, got %v", err)
	}
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `go test ./internal/service/... -v`
Expected: build failure — `undefined: NewPersonService`.

- [ ] **Step 3: Write the implementation**

`internal/service/person_service.go`:

```go
package service

import (
	"context"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
	"github.com/bacsystem/project-test-plan-executor/internal/repository"
)

const (
	defaultPage = 1
	defaultSize = 20
	maxSize     = 100
)

// PersonService holds the business rules for managing Person records.
type PersonService struct {
	repo repository.PersonRepository
}

// NewPersonService builds a PersonService backed by the given repository.
func NewPersonService(repo repository.PersonRepository) *PersonService {
	return &PersonService{repo: repo}
}

func (s *PersonService) Create(ctx context.Context, p domain.Person) (domain.Person, error) {
	if err := p.Validate(); err != nil {
		return domain.Person{}, err
	}
	return s.repo.Create(ctx, p)
}

func (s *PersonService) GetByID(ctx context.Context, id string) (domain.Person, error) {
	return s.repo.GetByID(ctx, id)
}

// List normalizes pagination parameters (page defaults to 1, size defaults
// to 20 and is capped at 100) before delegating to the repository.
func (s *PersonService) List(ctx context.Context, page, size int) ([]domain.Person, int, error) {
	if page < 1 {
		page = defaultPage
	}
	if size < 1 {
		size = defaultSize
	}
	if size > maxSize {
		size = maxSize
	}
	return s.repo.List(ctx, page, size)
}

// Update performs a full replace of the person identified by id.
func (s *PersonService) Update(ctx context.Context, id string, p domain.Person) (domain.Person, error) {
	if err := p.Validate(); err != nil {
		return domain.Person{}, err
	}
	return s.repo.Update(ctx, id, p)
}

func (s *PersonService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `go test ./internal/service/... -v`
Expected: `PASS`, all 7 tests green.

- [ ] **Step 5: Commit**

```bash
git add internal/service/person_service.go internal/service/person_service_test.go
git commit -m "feat(service): add PersonService business rules"
```

---

### Task 5: HTTP handlers

**Files:**
- Create: `internal/httpapi/handlers.go`
- Test: `internal/httpapi/handlers_test.go`

**Interfaces:**
- Consumes: `PersonService`, `NewPersonService`, `ErrNotFound`, `ErrDuplicateDocumento`
- Produces: `NewRouter`

- [ ] **Step 1: Write the failing tests**

`internal/httpapi/handlers_test.go`:

```go
package httpapi

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
	"github.com/bacsystem/project-test-plan-executor/internal/repository"
	"github.com/bacsystem/project-test-plan-executor/internal/service"
)

func newTestRouter() http.Handler {
	repo := repository.NewMemoryRepository()
	svc := service.NewPersonService(repo)
	return NewRouter(svc)
}

func validPersonJSON(documento string) []byte {
	body, _ := json.Marshal(domain.Person{
		Nombres:         "Ana",
		Apellidos:       "Gomez",
		Documento:       documento,
		Email:           "ana@example.com",
		FechaNacimiento: "1990-05-20",
	})
	return body
}

func TestCreateHandler_Success(t *testing.T) {
	router := newTestRouter()

	req := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("200")))
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", rec.Code, rec.Body.String())
	}
	if rec.Header().Get("Location") == "" {
		t.Fatal("expected a Location header")
	}
}

func TestCreateHandler_ValidationError(t *testing.T) {
	router := newTestRouter()

	body, _ := json.Marshal(domain.Person{Documento: "201"})
	req := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(body))
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestCreateHandler_DuplicateDocumento(t *testing.T) {
	router := newTestRouter()

	req1 := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("202")))
	router.ServeHTTP(httptest.NewRecorder(), req1)

	req2 := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("202")))
	rec2 := httptest.NewRecorder()
	router.ServeHTTP(rec2, req2)

	if rec2.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", rec2.Code)
	}
}

func TestGetByIDHandler_NotFound(t *testing.T) {
	router := newTestRouter()

	req := httptest.NewRequest(http.MethodGet, "/api/v1/personas/missing", nil)
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d", rec.Code)
	}
}

func TestGetByIDHandler_Success(t *testing.T) {
	router := newTestRouter()

	createReq := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("203")))
	createRec := httptest.NewRecorder()
	router.ServeHTTP(createRec, createReq)

	var created domain.Person
	if err := json.Unmarshal(createRec.Body.Bytes(), &created); err != nil {
		t.Fatalf("failed to decode created person: %v", err)
	}

	getReq := httptest.NewRequest(http.MethodGet, "/api/v1/personas/"+created.ID, nil)
	getRec := httptest.NewRecorder()
	router.ServeHTTP(getRec, getReq)

	if getRec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", getRec.Code)
	}
}

func TestListHandler_Success(t *testing.T) {
	router := newTestRouter()

	for _, doc := range []string{"210", "211", "212"} {
		req := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON(doc)))
		router.ServeHTTP(httptest.NewRecorder(), req)
	}

	req := httptest.NewRequest(http.MethodGet, "/api/v1/personas?page=1&size=2", nil)
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}

	var body listResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("failed to decode list response: %v", err)
	}
	if body.Total != 3 || len(body.Data) != 2 {
		t.Fatalf("expected total=3 len=2, got total=%d len=%d", body.Total, len(body.Data))
	}
}

func TestListHandler_InvalidPagination(t *testing.T) {
	router := newTestRouter()

	req := httptest.NewRequest(http.MethodGet, "/api/v1/personas?page=abc", nil)
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestUpdateHandler_Success(t *testing.T) {
	router := newTestRouter()

	createReq := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("220")))
	createRec := httptest.NewRecorder()
	router.ServeHTTP(createRec, createReq)

	var created domain.Person
	if err := json.Unmarshal(createRec.Body.Bytes(), &created); err != nil {
		t.Fatalf("failed to decode created person: %v", err)
	}

	updatedPerson := created
	updatedPerson.Nombres = "Cambiado"
	body, _ := json.Marshal(updatedPerson)

	updateReq := httptest.NewRequest(http.MethodPut, "/api/v1/personas/"+created.ID, bytes.NewReader(body))
	updateRec := httptest.NewRecorder()
	router.ServeHTTP(updateRec, updateReq)

	if updateRec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", updateRec.Code, updateRec.Body.String())
	}
}

func TestUpdateHandler_NotFound(t *testing.T) {
	router := newTestRouter()

	req := httptest.NewRequest(http.MethodPut, "/api/v1/personas/missing", bytes.NewReader(validPersonJSON("221")))
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d", rec.Code)
	}
}

func TestUpdateHandler_ValidationError(t *testing.T) {
	router := newTestRouter()

	createReq := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("222")))
	createRec := httptest.NewRecorder()
	router.ServeHTTP(createRec, createReq)

	var created domain.Person
	if err := json.Unmarshal(createRec.Body.Bytes(), &created); err != nil {
		t.Fatalf("failed to decode created person: %v", err)
	}

	invalid := created
	invalid.Email = "not-an-email"
	body, _ := json.Marshal(invalid)

	updateReq := httptest.NewRequest(http.MethodPut, "/api/v1/personas/"+created.ID, bytes.NewReader(body))
	updateRec := httptest.NewRecorder()
	router.ServeHTTP(updateRec, updateReq)

	if updateRec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", updateRec.Code)
	}
}

func TestUpdateHandler_DuplicateDocumento(t *testing.T) {
	router := newTestRouter()

	req1 := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("223")))
	rec1 := httptest.NewRecorder()
	router.ServeHTTP(rec1, req1)
	var first domain.Person
	json.Unmarshal(rec1.Body.Bytes(), &first)

	req2 := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("224")))
	router.ServeHTTP(httptest.NewRecorder(), req2)

	// Attempt to update the first person to use the second person's documento.
	conflicting := first
	conflicting.Documento = "224"
	body, _ := json.Marshal(conflicting)

	updateReq := httptest.NewRequest(http.MethodPut, "/api/v1/personas/"+first.ID, bytes.NewReader(body))
	updateRec := httptest.NewRecorder()
	router.ServeHTTP(updateRec, updateReq)

	if updateRec.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", updateRec.Code)
	}
}

func TestDeleteHandler_Success(t *testing.T) {
	router := newTestRouter()

	createReq := httptest.NewRequest(http.MethodPost, "/api/v1/personas", bytes.NewReader(validPersonJSON("230")))
	createRec := httptest.NewRecorder()
	router.ServeHTTP(createRec, createReq)

	var created domain.Person
	if err := json.Unmarshal(createRec.Body.Bytes(), &created); err != nil {
		t.Fatalf("failed to decode created person: %v", err)
	}

	deleteReq := httptest.NewRequest(http.MethodDelete, "/api/v1/personas/"+created.ID, nil)
	deleteRec := httptest.NewRecorder()
	router.ServeHTTP(deleteRec, deleteReq)

	if deleteRec.Code != http.StatusNoContent {
		t.Fatalf("expected 204, got %d", deleteRec.Code)
	}
}

func TestDeleteHandler_NotFound(t *testing.T) {
	router := newTestRouter()

	req := httptest.NewRequest(http.MethodDelete, "/api/v1/personas/missing", nil)
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d", rec.Code)
	}
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `go test ./internal/httpapi/... -v`
Expected: build failure — `undefined: NewRouter`.

- [ ] **Step 3: Write the implementation**

`internal/httpapi/handlers.go`:

```go
package httpapi

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/bacsystem/project-test-plan-executor/internal/domain"
	"github.com/bacsystem/project-test-plan-executor/internal/repository"
	"github.com/bacsystem/project-test-plan-executor/internal/service"
)

// errorResponse is the JSON envelope for every error returned by the API.
type errorResponse struct {
	Error errorBody `json:"error"`
}

type errorBody struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type listResponse struct {
	Data  []domain.Person `json:"data"`
	Page  int             `json:"page"`
	Size  int             `json:"size"`
	Total int             `json:"total"`
}

// NewRouter builds the HTTP handler for the personas API, backed by svc.
func NewRouter(svc *service.PersonService) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/personas", createHandler(svc))
	mux.HandleFunc("GET /api/v1/personas/{id}", getByIDHandler(svc))
	mux.HandleFunc("GET /api/v1/personas", listHandler(svc))
	mux.HandleFunc("PUT /api/v1/personas/{id}", updateHandler(svc))
	mux.HandleFunc("DELETE /api/v1/personas/{id}", deleteHandler(svc))
	return mux
}

func createHandler(svc *service.PersonService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var p domain.Person
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			writeError(w, http.StatusBadRequest, "VALIDATION_ERROR", "invalid JSON body")
			return
		}

		created, err := svc.Create(r.Context(), p)
		if err != nil {
			writeServiceError(w, err)
			return
		}

		w.Header().Set("Location", "/api/v1/personas/"+created.ID)
		writeJSON(w, http.StatusCreated, created)
	}
}

func getByIDHandler(svc *service.PersonService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		p, err := svc.GetByID(r.Context(), id)
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, p)
	}
}

func listHandler(svc *service.PersonService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		page, size, err := parsePagination(r)
		if err != nil {
			writeError(w, http.StatusBadRequest, "INVALID_PAGINATION", err.Error())
			return
		}

		people, total, err := svc.List(r.Context(), page, size)
		if err != nil {
			writeServiceError(w, err)
			return
		}

		writeJSON(w, http.StatusOK, listResponse{
			Data:  people,
			Page:  page,
			Size:  size,
			Total: total,
		})
	}
}

func updateHandler(svc *service.PersonService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")

		var p domain.Person
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			writeError(w, http.StatusBadRequest, "VALIDATION_ERROR", "invalid JSON body")
			return
		}

		updated, err := svc.Update(r.Context(), id, p)
		if err != nil {
			writeServiceError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, updated)
	}
}

func deleteHandler(svc *service.PersonService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		if err := svc.Delete(r.Context(), id); err != nil {
			writeServiceError(w, err)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}

// parsePagination reads page/size query params. It applies no defaults
// itself (the service layer owns default/cap logic) — it only rejects
// values that are present but not valid positive integers.
func parsePagination(r *http.Request) (page, size int, err error) {
	if v := r.URL.Query().Get("page"); v != "" {
		page, err = strconv.Atoi(v)
		if err != nil || page < 1 {
			return 0, 0, errors.New("page must be a positive integer")
		}
	}
	if v := r.URL.Query().Get("size"); v != "" {
		size, err = strconv.Atoi(v)
		if err != nil || size < 1 {
			return 0, 0, errors.New("size must be a positive integer")
		}
	}
	return page, size, nil
}

func writeServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, repository.ErrNotFound):
		writeError(w, http.StatusNotFound, "NOT_FOUND", "person not found")
	case errors.Is(err, repository.ErrDuplicateDocumento):
		writeError(w, http.StatusConflict, "DUPLICATE_DOCUMENTO", "a person with this documento already exists")
	case isValidationError(err):
		writeError(w, http.StatusBadRequest, "VALIDATION_ERROR", err.Error())
	default:
		writeError(w, http.StatusInternalServerError, "INTERNAL_ERROR", "internal server error")
	}
}

func isValidationError(err error) bool {
	switch err {
	case domain.ErrNombresRequired, domain.ErrApellidosRequired, domain.ErrDocumentoRequired,
		domain.ErrEmailRequired, domain.ErrEmailInvalid, domain.ErrFechaNacimientoRequired,
		domain.ErrFechaNacimientoInvalid, domain.ErrFechaNacimientoFuture:
		return true
	default:
		return false
	}
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, errorResponse{Error: errorBody{Code: code, Message: message}})
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `go test ./internal/httpapi/... -v`
Expected: `PASS`, all 13 tests green.

- [ ] **Step 5: Commit**

```bash
git add internal/httpapi/handlers.go internal/httpapi/handlers_test.go
git commit -m "feat(httpapi): add REST handlers for the personas endpoint"
```

---

### Task 6: Main wiring

**Files:**
- Create: `cmd/server/main.go`

**Interfaces:**
- Consumes: `NewMongoRepository`, `NewPersonService`, `NewRouter`
- Produces: None

- [ ] **Step 1: Write the implementation**

`cmd/server/main.go`:

```go
package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/bacsystem/project-test-plan-executor/internal/httpapi"
	"github.com/bacsystem/project-test-plan-executor/internal/repository"
	"github.com/bacsystem/project-test-plan-executor/internal/service"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("failed to connect to MongoDB: %v", err)
	}
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("failed to ping MongoDB: %v", err)
	}

	coll := client.Database("personas_crud").Collection("people")
	repo, err := repository.NewMongoRepository(ctx, coll)
	if err != nil {
		log.Fatalf("failed to initialize repository: %v", err)
	}

	svc := service.NewPersonService(repo)
	router := httpapi.NewRouter(svc)

	log.Printf("listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
```

- [ ] **Step 2: Verify the whole module builds**

Run: `go build ./...`
Expected: exits 0, no output.

- [ ] **Step 3: Run the full test suite**

Run: `go test ./...`
Expected: `ok` for every package (`domain`, `repository`, `service`, `httpapi`); no `FAIL`.

- [ ] **Step 4: Manual smoke test**

Ensure MongoDB is running (`docker start personas-mongo` if needed), then in one terminal:

```bash
go run ./cmd/server
```

In another terminal:

```bash
curl -s -X POST http://localhost:8080/api/v1/personas \
  -H "Content-Type: application/json" \
  -d '{"nombres":"Ana","apellidos":"Gomez","documento":"999","email":"ana@example.com","fechaNacimiento":"1990-05-20"}'
```

Expected: HTTP 201 with the created person JSON, including an `id` field.

```bash
curl -s http://localhost:8080/api/v1/personas?page=1&size=10
```

Expected: HTTP 200 with `{"data":[...],"page":1,"size":10,"total":1}` containing the person just created.

Stop the server with Ctrl+C when done.

- [ ] **Step 5: Commit**

```bash
git add cmd/server/main.go
git commit -m "feat(cmd): wire domain, repository, service and httpapi into the server"
```
