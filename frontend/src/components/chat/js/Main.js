import React, { useState, useEffect } from "react";
import "./../../styles.css";
import "./../css/main.css";

function ChatMain() {
    const [roomId, setRoomId] = useState("");
    const [codeError, setCodeError] = useState("");

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Chat Rooms";
    }, []);

    const joinRoom = (event) => {
        event.preventDefault()
        try {
            if (roomId !== "") {
                window.location.assign(window.location.protocol + "//" + window.location.host + "/room/" + roomId)
            } else {
                setCodeError("Room code can't be empty.");
                setTimeout(() => setCodeError(""), 5000);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={"mainChat"}>
            <h1>Chat Rooms</h1>
            <form onSubmit={joinRoom}>
                <div>
                    <input type={"text"} placeholder={"Room Code"} value={roomId}
                        onChange={(event) => setRoomId(event.target.value)}/>
                    <div className={"codeErrorChat"}>{codeError}</div>
                </div>
                <button>Join Room</button>
            </form>
        </div>
    )

}

export default ChatMain;
