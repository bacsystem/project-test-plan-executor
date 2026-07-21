package events

import (
	"context"
	"encoding/json"

	amqp "github.com/rabbitmq/amqp091-go"
)

// ExchangeName is the topic exchange every bs-inventory event is published to.
const ExchangeName = "bs-inventory.events"

// Publisher publishes domain events to the ExchangeName topic exchange.
type Publisher struct {
	channel *amqp.Channel
}

// NewPublisher opens a channel on conn and declares ExchangeName as a
// durable topic exchange.
func NewPublisher(conn *amqp.Connection) (*Publisher, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, err
	}
	if err := ch.ExchangeDeclare(ExchangeName, "topic", true, false, false, false, nil); err != nil {
		return nil, err
	}
	return &Publisher{channel: ch}, nil
}

// PublishStockUpdated publishes payload on routing key "stock.updated".
func (p *Publisher) PublishStockUpdated(ctx context.Context, payload StockUpdatedPayload) error {
	return p.publish(ctx, "stock.updated", payload)
}

// PublishStockLow publishes payload on routing key "stock.low".
func (p *Publisher) PublishStockLow(ctx context.Context, payload StockLowPayload) error {
	return p.publish(ctx, "stock.low", payload)
}

func (p *Publisher) publish(ctx context.Context, routingKey string, payload any) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	return p.channel.PublishWithContext(ctx, ExchangeName, routingKey, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        body,
	})
}
