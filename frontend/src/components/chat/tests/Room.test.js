import "@testing-library/jest-dom";
import {render, fireEvent, screen} from "@testing-library/react";
import Room from "./../js/Room.js";


describe("Room component elements", () => {
    test("should render component", () => {
        render(<Room/>);
    });

    test("should render room code", () => {
       render(<Room/>);
       const roomCodeElement = screen.getByText("Room Code:");
       expect(roomCodeElement).toBeInTheDocument();
    });

    test("should render chat box", () => {
       render(<Room/>);
       const chatBoxElement = document.getElementById("logChat");
       expect(chatBoxElement).toBeInTheDocument();
    });

    test("should render text input", () => {
        render(<Room/>);
        const inputElement = screen.getByPlaceholderText("Message");
        expect(inputElement).toBeInTheDocument();
    });

    test("should render send button", () => {
       render(<Room/>);
       const buttonElement = screen.getByText("Send");
       expect(buttonElement).toBeInTheDocument();
    });
});

describe("Room component websockets", () => {
    beforeEach(() => {
        global.mockWebSocket = {
            send: jest.fn(),
            onmessage: jest.fn(),
            onerror: jest.fn(),
            onclose: jest.fn(),
        };
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);
    });

    test("should send messages to websocket", () => {
        render(<Room/>);

        const message = screen.getByPlaceholderText("Message");
        fireEvent.change(
            message,
            {target: {value: "test"}}
        );
        expect(message.value).toBe("test");

        fireEvent.click(screen.getByText("Send"));

        expect(message.value).toBe("");
    });

    test("should append received message to logChat", () => {
        render(<Room />);
        const logChat = document.getElementById("logChat");

        const messageEvent = { data: "test message" };
        mockWebSocket.onmessage(messageEvent);

        expect(logChat.innerHTML).toContain("test message");
    });

    test("should append closed connection (error) message to logChat", () => {
        render(<Room />);
        const logChat = document.getElementById("logChat");

        mockWebSocket.onerror();

        expect(logChat.innerHTML).toContain("Connection has been closed.");
    });

    test("should append closed connection (close) message to logChat", () => {
        render(<Room />);
        const logChat = document.getElementById("logChat");

        mockWebSocket.onclose();

        expect(logChat.innerHTML).toContain("Connection has been closed.");
    });
});
