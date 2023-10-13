import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './../css/room.css';

function ChatRoom() {
    const [input, setInput] = useState("");
    const [roomId, setRoomId] = useState("");
    let webSocket = useRef(null);
    const params = useParams();

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Chat Rooms";
    }, []);

    // set room code
    useEffect(() => {
        setRoomId(params.roomId);
    }, [params])

    // websocket channel
    useEffect(() => {
        webSocket.current = new WebSocket('wss://' + window.location.host + '/ws/chatWS' + window.location.pathname)
        const log = document.getElementById("logChat")

        webSocket.current.onmessage = (event) => {
            let msg = document.createElement("div")
            msg.innerHTML = event.data
            log.appendChild(msg)
            log.scrollTop = log.scrollHeight - log.clientHeight
        }

        webSocket.current.onerror = () => {
            let msg = document.createElement("div")
            msg.innerHTML = "Connection has been closed."
            log.appendChild(msg)
            log.scrollTop = log.scrollHeight - log.clientHeight
        }

        webSocket.current.onclose = () => {
            let msg = document.createElement("div")
            msg.innerHTML = "Connection has been closed."
            log.appendChild(msg)
            log.scrollTop = log.scrollHeight - log.clientHeight
        }
    }, [webSocket]);


    const sendMessage = async (event) => {
        event.preventDefault()
        try {
            if (input !== "") {
                webSocket.current.send(input)
                setInput("");
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={"roomChat"}>
            <h1>Room Code: {roomId}</h1>
            <div data-testid={"log"} id={"logChat"}></div>
            <form onSubmit={sendMessage}>
                <input type={"text"} placeholder={"Message"} value={input}
                       onChange={(event) => setInput(event.target.value)}/>
                <button>Send</button>
            </form>
        </div>
    )
}

export default ChatRoom;
