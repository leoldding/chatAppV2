import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatMain from './components/chat/js/Main.js';
import ChatRoom from './components/chat/js/Room.js';
import msg_bubble from "./assets/msg_bubble.png";
import "./styles.css";


function App() {
    // set index elements
    useEffect(() => {
    let icon = document.getElementById("icon")
    icon.href = msg_bubble

    let apple_icon = document.getElementById("apple_icon")
    apple_icon.href = msg_bubble

    document.body.className = "bg-chatOrange-1 text-chatOrange-6";
}, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path={"/"} element={<ChatMain />} />
                    <Route path={"/room/:roomId"} element={<ChatRoom />} />
                    <Route path={"*"} element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;