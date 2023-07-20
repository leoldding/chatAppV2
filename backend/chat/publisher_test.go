package chat

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

// Test the Publish method of the publisher
func TestPublish(t *testing.T) {
	// Create a publisher
	pub := &publisher{
		broadcast:  make(chan message),
		register:   make(chan subscriber),
		deregister: make(chan subscriber),
		rooms:      make(map[string]map[*connection]bool),
	}

	go pub.Publish()

	// Create some mock connections
	conn1 := &connection{sendMessage: make(chan []byte, 1)}

	// Test registration and message broadcasting
	pub.register <- subscriber{roomId: "room1", conn: conn1}
	pub.broadcast <- message{roomId: "room1", text: []byte("Hello, room1!")}

	time.Sleep(time.Millisecond) // Allow time for message processing

	// Ensure that the message was delivered to the registered connection
	select {
	case msg := <-conn1.sendMessage:
		assert.Equal(t, []byte("Hello, room1!"), msg, "Message mismatch for conn1")
	default:
		assert.Fail(t, "Expected message not received for conn1")
	}

	// Test deregistration
	pub.deregister <- subscriber{roomId: "room1", conn: conn1}
	time.Sleep(time.Millisecond) // Allow time for deregistration

	// Ensure the connection has been closed and removed from the room
	select {
	case _, ok := <-conn1.sendMessage:
		assert.False(t, ok, "sendMessage channel should be closed for conn1")
	default:
		assert.Fail(t, "Expected channel close for conn1")
	}

	// Test broadcasting to a room with no connections (should not panic)
	pub.broadcast <- message{roomId: "room2", text: []byte("Hello, room2!")}
}
