package chat

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"strings"
	"time"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func RoomWS(w http.ResponseWriter, r *http.Request) {
	log.Println("RoomWS: Attempting to connect to " + r.URL.String())

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("RoomWS: Error upgrading connection to WebSocket.\nERROR:%f", err)
	}

	log.Print("RoomWS: Successful connection to " + r.URL.String())

	roomId := strings.Split(r.URL.String(), "/")[3]

	conn := &connection{ws: ws, sendMessage: make(chan []byte, 256)}
	sub := subscriber{conn: conn, roomId: roomId}
	Pub.register <- sub
	go sub.readMsgs()
	go sub.writeMsgs()
}

func (sub subscriber) readMsgs() {
	c := sub.conn

	defer func() {
		Pub.deregister <- sub
		c.ws.Close()
	}()

	for {
		_, msg, err := c.ws.ReadMessage()
		if err != nil {
			log.Printf("Error reading messages.\nERROR: %f", err)
			break
		}

		m := message{msg, sub.roomId}
		Pub.broadcast <- m
	}
}

func (sub *subscriber) writeMsgs() {
	c := sub.conn

	defer func() {
		c.ws.Close()
	}()

	ticker := time.NewTicker(30 * time.Second)

	for {
		select {
		case msg, ok := <-c.sendMessage:
			if !ok {
				c.ws.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.ws.WriteMessage(websocket.TextMessage, msg); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}
