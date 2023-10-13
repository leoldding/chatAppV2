import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

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
        const log = document.getElementById("log")

        webSocket.current.onmessage = (event) => {
            let msg = document.createElement("div")
            msg.innerHTML = event.data
            msg.className = "m-3"
            log.appendChild(msg)
            log.scrollTop = log.scrollHeight - log.clientHeight
        }

        webSocket.current.onerror = () => {
            let msg = document.createElement("div")
            msg.innerHTML = "Connection has been closed."
            msg.className = "m-3"
            log.appendChild(msg)
            log.scrollTop = log.scrollHeight - log.clientHeight
        }

        webSocket.current.onclose = () => {
            let msg = document.createElement("div")
            msg.innerHTML = "Connection has been closed."
            msg.className = "m-3"
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
        <div className={"mx-6 text-xs md:text-base"}>
            <h1 className={"text-lg md:text-3xl font-semibold py-4 mx-auto"}>Room Code: {roomId}</h1>
            <div data-testid={"log"} id={"log"} className={"h-[60vh] bg-chatOrange-2 border-chatOrange-3 border-2 border-solid rounded-md overflow-auto overflow-wrap break-words my-4 mx-auto"}></div>
            <form onSubmit={sendMessage}>
                <input type={"text"} placeholder={"Message"} value={input}
                       className={"text-sm md:text-base h-8 md:h-10 w-48 md:w-80 bg-chatOrange-1 border-solid border-b-[1px] border-chatOrange-6  mx-auto"}
                       onChange={(event) => setInput(event.target.value)}/>
                <button className={"text-sm md:text-base h-8 md:h-10 w-16 bg-chatOrange-3 md:hover:bg-chatOrange-4 md:active:bg-chatOrange-5 rounded-md shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] m-4 transition duration-300 "}>Send</button>
            </form>
        </div>
    )
}

export default ChatRoom;
