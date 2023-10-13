import React, { useState, useEffect } from "react";

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
        <div>
            <h1 className={"text-3xl md:text-7xl font-semibold text-center my-16"}>Chat Rooms</h1>
            <form onSubmit={joinRoom} className={"flex flex-col my-8 mx-auto items-center justify-center"}>
                <div>
                    <input type={"text"} placeholder={"Room Code"} value={roomId}
                           className={"bg-chatOrange-1 text-sm md:text-xl h-8 md:h-16 w-48 md:w-96 border-b-[1px] border-solid border-chatOrange-6"}
                        onChange={(event) => setRoomId(event.target.value)}/>
                    <div data-testid={"error"} className={"text-xs md:text-lg text-[#FF5757] h-4 mt-1 md:mt-2 mx-auto"}>{codeError}</div>
                </div>
                <button className={"bg-chatOrange-3 text-sm md:text-xl my-4 md:my-8 mx-auto h-8 md:h-16 w-48 md:w-96 rounded-md shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] transition duration-300 hover:bg-chatOrange-4 active:bg-chatOrange-5"}>Join Room</button>
            </form>
        </div>
    )

}

export default ChatMain;
