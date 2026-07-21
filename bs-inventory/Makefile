.PHONY: up up-build down logs ps backend-test frontend-test e2e test clean

# Build images (if needed) and start postgres, rabbitmq, backend, frontend.
up:
	docker compose up -d --build

# Rebuild images from scratch (no layer cache) and start the stack.
up-build:
	docker compose build --no-cache
	docker compose up -d

down:
	docker compose down

# Stop the stack and remove the postgres data volume too.
clean:
	docker compose down -v

logs:
	docker compose logs -f

ps:
	docker compose ps

backend-test:
	go -C backend vet ./...
	go -C backend test ./... -count=1

frontend-test:
	npm --prefix frontend run test

# Runs against the live stack started by `make up` — not the frontend
# dev server. Requires PORT 3000 (frontend) and 8080 (backend) to be up.
e2e:
	npm --prefix frontend run test:e2e

test: backend-test frontend-test
