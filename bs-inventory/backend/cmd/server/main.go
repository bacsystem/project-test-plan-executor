package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	amqp "github.com/rabbitmq/amqp091-go"

	"bs-inventory/internal/auth"
	"bs-inventory/internal/events"
	bshttp "bs-inventory/internal/http"
)

func main() {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, mustEnv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("failed to connect to postgres: %v", err)
	}
	defer pool.Close()

	conn, err := amqp.Dial(mustEnv("RABBITMQ_URL"))
	if err != nil {
		log.Fatalf("failed to connect to rabbitmq: %v", err)
	}
	defer conn.Close()

	publisher, err := events.NewPublisher(conn)
	if err != nil {
		log.Fatalf("failed to create event publisher: %v", err)
	}

	issuer := auth.NewTokenIssuer(mustEnv("JWT_SECRET"), 24*time.Hour)

	router := bshttp.NewRouter(bshttp.Dependencies{
		Pool:      pool,
		Issuer:    issuer,
		Publisher: publisher,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("bs-inventory listening on :%s", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func mustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("missing required environment variable %s", key)
	}
	return v
}
