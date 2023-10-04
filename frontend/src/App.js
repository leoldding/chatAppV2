import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Room from './components/chat/js/Room.js';
import ChatMain from './components/chat/js/Main.js';
import msg_bubble from "./assets/msg_bubble.png"


function App() {
    // set index elements
    useEffect(() => {
    let icon = document.getElementById("icon")
    icon.href = msg_bubble

    let apple_icon = document.getElementById("apple_icon")
    apple_icon.href = msg_bubble
}, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path={"/"} element={<ChatMain />} />
                    <Route path={"/room/:roomId"} element={<Room />} />
                    <Route path={"*"} element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;