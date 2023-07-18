import "@testing-library/jest-dom";
import {render, fireEvent, screen} from "@testing-library/react";
import Room from "./../js/Room.js";


describe("Room component", () => {
    test("should render component", () => {
        render(<Room/>);
    });

    test("should render header", () => {
       render(<Room/>);
       const headerElement = screen.getByText(/chat room/i);
       expect(headerElement).toBeInTheDocument();
    });

    test("should render room code", () => {
       render(<Room/>);
       const roomCodeElement = screen.getByText(/room code/i);
       expect(roomCodeElement).toBeInTheDocument();
    });

    test("should render chat box", () => {
       render(<Room/>);
       const chatBoxElement = document.getElementById("chatLog");
       expect(chatBoxElement).toBeInTheDocument();
    });

    test("should render text input", () => {
        render(<Room/>);
        const inputElement = screen.getByPlaceholderText(/message/i);
        expect(inputElement).toBeInTheDocument();
    });

    test("should render send button", () => {
       render(<Room/>);
       const buttonElement = screen.getByText(/send/i);
       expect(buttonElement).toBeInTheDocument();
    });

    test("should send messages to websocket", () => {
        const mockWebSocket = {
            send: jest.fn(),
        };
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);

        render(<Room/>);

        const message = screen.getByPlaceholderText(/message/i);
        fireEvent.change(
            message,
            {target: {value: "test"}}
        );
        expect(message.value).toBe("test");

        fireEvent.click(screen.getByText(/send/i));

        expect(message.value).toBe("");
    });

    test("should append received message to chatLog", () => {
        const mockWebSocket = {
            onmessage: jest.fn(),
        };
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);

        render(<Room />);
        const chatLog = document.getElementById("chatLog");

        const messageEvent = { data: "test message" };
        mockWebSocket.onmessage(messageEvent);

        expect(chatLog.innerHTML).toContain("test message");
    });

    test("should append closed connection (error) message to chatLog", () => {
        const mockWebSocket = {
            onerror: jest.fn(),
        };
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);

        render(<Room />);
        const chatLog = document.getElementById("chatLog");

        mockWebSocket.onerror();

        expect(chatLog.innerHTML).toContain("Connection has been closed.");
    });

    test("should append closed connection (close) message to chatLog", () => {
        const mockWebSocket = {
            onclose: jest.fn(),
        };
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);

        render(<Room />);
        const chatLog = document.getElementById("chatLog");

        mockWebSocket.onclose();

        expect(chatLog.innerHTML).toContain("Connection has been closed.");
    });
});
