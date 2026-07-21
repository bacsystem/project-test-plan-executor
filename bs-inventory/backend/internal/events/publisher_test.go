package events_test

import (
	"context"
	"encoding/json"
	"testing"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	tcrabbitmq "github.com/testcontainers/testcontainers-go/modules/rabbitmq"

	"bs-inventory/internal/events"
)

func setupTestBroker(t *testing.T) *amqp.Connection {
	t.Helper()
	ctx := context.Background()

	container, err := tcrabbitmq.Run(ctx, "rabbitmq:3.13-management-alpine")
	if err != nil {
		t.Fatalf("failed to start rabbitmq container: %v", err)
	}
	t.Cleanup(func() { _ = container.Terminate(ctx) })

	amqpURL, err := container.AmqpURL(ctx)
	if err != nil {
		t.Fatalf("failed to get amqp url: %v", err)
	}

	conn, err := amqp.Dial(amqpURL)
	if err != nil {
		t.Fatalf("failed to dial rabbitmq: %v", err)
	}
	t.Cleanup(func() { _ = conn.Close() })

	return conn
}

func TestPublisher_PublishStockUpdated(t *testing.T) {
	conn := setupTestBroker(t)
	publisher, err := events.NewPublisher(conn)
	if err != nil {
		t.Fatalf("NewPublisher() error = %v", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		t.Fatalf("Channel() error = %v", err)
	}
	q, err := ch.QueueDeclare("", false, true, true, false, nil)
	if err != nil {
		t.Fatalf("QueueDeclare() error = %v", err)
	}
	if err := ch.QueueBind(q.Name, "stock.updated", events.ExchangeName, false, nil); err != nil {
		t.Fatalf("QueueBind() error = %v", err)
	}

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		t.Fatalf("Consume() error = %v", err)
	}

	payload := events.StockUpdatedPayload{TenantID: "tenant-1", SKU: "SKU-1", WarehouseID: "wh-1", SectionID: "sec-1", Quantity: 42, AvgUnitCost: 5.25, MovementType: "IN", OccurredAt: "2026-07-20T00:00:00Z"}
	if err := publisher.PublishStockUpdated(context.Background(), payload); err != nil {
		t.Fatalf("PublishStockUpdated() error = %v", err)
	}

	select {
	case msg := <-msgs:
		var got events.StockUpdatedPayload
		if err := json.Unmarshal(msg.Body, &got); err != nil {
			t.Fatalf("failed to unmarshal message: %v", err)
		}
		if got.SKU != "SKU-1" || got.Quantity != 42 {
			t.Errorf("got %+v, want SKU=SKU-1 Quantity=42", got)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("timed out waiting for published message")
	}
}
