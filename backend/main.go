package main

import (
	"github.com/leoldding/chatAppV2/chat"
	"net/http"
)

func main() {
	http.HandleFunc("/ping", ping)

	http.HandleFunc("/ws/chatWS/", chat.RoomWS)

	go chat.Pub.Publish()

	http.ListenAndServe(":8080", nil)
	return
}

func ping(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
	return
}
