import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import ChatRoom from "./../js/Room.js";


describe("Room", () => {
    it("should render correctly", () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(
            <ChatRoom />
        );

        const headerElement = getByText("Room Code:");
        expect(headerElement).toBeInTheDocument();

        const logElement = getByTestId("log");
        expect(logElement).toBeInTheDocument();

        const inputElement = getByPlaceholderText("Message");
        expect(inputElement).toBeInTheDocument();

        const buttonElement = getByText("Send");
        expect(buttonElement).toBeInTheDocument();
    });
});

describe("Room WebSockets", () => {
    beforeEach(() => {
        global.mockWebSocket = {
            send: jest.fn(),
            onmessage: jest.fn(),
            onerror: jest.fn(),
            onclose: jest.fn(),
        };
        global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);
    });

    it("should send messages to websocket", () => {
        const { getByText, getByPlaceholderText } = render(
            <ChatRoom/>
        );

        const message = getByPlaceholderText("Message");
        fireEvent.change(
            message,
            {target: {value: "test"}}
        );
        expect(message.value).toBe("test");

        fireEvent.click(getByText("Send"));

        expect(message.value).toBe("");
    });

    it("should append received message to logChat", () => {
        const { getByTestId } = render(
            <ChatRoom />
        );

        const logChat = getByTestId("log");

        const messageEvent = { data: "test message" };
        mockWebSocket.onmessage(messageEvent);

        expect(logChat.innerHTML).toContain("test message");
    });

    it("should append closed connection (error) message to logChat", () => {
        const { getByTestId } = render(
            <ChatRoom />
        );

        const logChat = getByTestId("log");

        mockWebSocket.onerror();

        expect(logChat.innerHTML).toContain("Connection has been closed.");
    });

    it("should append closed connection (close) message to logChat", () => {
        const { getByTestId } = render(
            <ChatRoom />
        );

        const logChat = getByTestId("log");

        mockWebSocket.onclose();

        expect(logChat.innerHTML).toContain("Connection has been closed.");
    });
});
