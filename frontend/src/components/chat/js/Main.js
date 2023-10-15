import React, { useState, useEffect } from "react";

function ChatMain() {
    const [displayName, setDisplayName] = useState("");
    const [nameError, setNameError] = useState("");
    const [roomId, setRoomId] = useState("");
    const [roomError, setRoomError] = useState("");

    // set document title
    useEffect(() => {
        document.title = "Leo Ding - Chat Rooms";
    }, []);

    const joinRoom = (event) => {
        event.preventDefault()
        try {
            if (displayName !== "" && roomId !== "") {
                setDisplayName("");
                setNameError("");
                setRoomId("");
                setRoomError("");

                window.location.assign(window.location.protocol + "//" + window.location.host + "/name/" + displayName + "/room/" + roomId);
            } else {
                if (displayName === "") {
                    setNameError("Display name can't be empty.");
                } else {
                    setNameError("");
                }

                if (roomId === "") {
                    setRoomError("Room code can't be empty.");
                } else {
                    setRoomError("");
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h1 className={"text-3xl md:text-7xl font-semibold text-center py-16"}>Chat Rooms</h1>
            <form onSubmit={joinRoom} className={"flex flex-col my-8 mx-auto items-center justify-center space-y-8"}>
                <div>
                    <input type={"text"} placeholder={"Display Name"} value={displayName}
                           className={"bg-chatOrange-1 text-sm md:text-xl h-8 md:h-16 w-48 md:w-96 border-b-[1px] border-solid border-chatOrange-6"}
                           onChange={(event) => setDisplayName(event.target.value)}/>
                    <div data-testid={"nameError"} className={"text-xs md:text-lg text-[#FF5757] h-4 md:h-6 mx-auto"}>{nameError}</div>
                </div>
                <div>
                    <input type={"text"} placeholder={"Room Code"} value={roomId}
                           className={"bg-chatOrange-1 text-sm md:text-xl h-8 md:h-16 w-48 md:w-96 border-b-[1px] border-solid border-chatOrange-6"}
                           onChange={(event) => setRoomId(event.target.value)}/>
                    <div data-testid={"roomError"} className={"text-xs md:text-lg text-[#FF5757] h-4 md:h-6 mx-auto"}>{roomError}</div>
                </div>
                <button className={"bg-chatOrange-3 text-sm md:text-xl mx-auto h-8 md:h-16 w-48 md:w-96 rounded-md shadow-[0.25rem_0.25rem_0.15rem_0.05rem_rgba(44,44,44,0.3)] transition duration-300 md:hover:bg-chatOrange-4 md:active:bg-chatOrange-5"}>Join Room</button>
            </form>
        </div>
    )

}

export default ChatMain;
