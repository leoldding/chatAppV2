import React from "react";
import "./../../styles.css";
import "./../css/main.css";
import msg_bubble from "./../../../assets/msg_bubble.png"

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roomId: "",
            codeErrorMessage: "",
        }
    }

    async componentDidMount() {
        window.onload = () => {
            let icon = document.getElementById("icon")
            icon.href = msg_bubble

            let apple_icon = document.getElementById("apple_icon")
            apple_icon.href = msg_bubble

            document.title = "Leo Ding - Chat Rooms";
        }
    }

    joinRoom = async (event) => {
        event.preventDefault()
        if (this.state.roomId !== "") {
            window.location.assign(window.location.protocol + "//" + window.location.host + "/room/" + this.state.roomId)
        } else {
            console.log("Code Error Message");
            this.setState({codeErrorMessage: "Room code can't be empty."});
            setTimeout(() => this.setState({codeErrorMessage: "",}), 5000);
        }
    }

    render() {
        let codeErrorMessage = this.state.codeErrorMessage;
        return (
            <div className={"mainChat"}>
                <h1>Chat Rooms</h1>
                <form onSubmit={this.joinRoom}>
                    <div>
                        <input type={"text"} placeholder={"Room Code"} value={this.state.roomId}
                            onChange={(event) => this.setState({roomId: event.target.value})}/>
                        <div className={"codeErrorChat"}>{codeErrorMessage}</div>
                    </div>
                    <button>Join Room</button>
                </form>
            </div>
        )
    }
}

export default Main;