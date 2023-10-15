import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ChatMain from "./../js/Main.js";
import room from "../js/Room";

describe("Main", () => {
   it("should render correctly", () => {
      const { getByText, getByPlaceholderText } = render(
          <ChatMain />
      )

      const headerElement = getByText("Chat Rooms");
      expect(headerElement).toBeInTheDocument();

      const inputElement = getByPlaceholderText("Room Code");
      expect(inputElement).toBeInTheDocument();

      const buttonElement = getByText("Join Room");
      expect(buttonElement).toBeInTheDocument();
   });

   it("should redirect when joining a room", () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
          <ChatMain />
      );

      const mockLocation = jest.fn()
      delete window.location;
      window.location = {assign: mockLocation};

      fireEvent.change(
          getByPlaceholderText("Display Name"),
          {target: {value: "testName"}}
      )
      fireEvent.change(
          getByPlaceholderText("Room Code"),
          {target: {value: "testRoom"}}
      );
      fireEvent.click(getByText("Join Room"));

      let errorMessageElement = getByTestId("nameError");
      expect(errorMessageElement).toBeEmptyDOMElement();

      errorMessageElement = getByTestId("roomError");
      expect(errorMessageElement).toBeEmptyDOMElement();

      expect(location.assign).toHaveBeenCalledWith(expect.stringContaining("/name/testName/room/testRoom"));
   });

   it("should display error messages on empty inputs", () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
          <ChatMain />
      );
      const nameErrorElement = getByTestId("nameError");
      const roomErrorElement = getByTestId("roomError");
      const buttonElement = getByText("Join Room");

      fireEvent.click(buttonElement);
      expect(nameErrorElement).toHaveTextContent("Display name can't be empty.");
      expect(roomErrorElement).toHaveTextContent("Room code can't be empty.");

      fireEvent.change(
          getByPlaceholderText("Display Name"),
          {target: {value: "testName"}}
      )
      fireEvent.click(buttonElement);
      expect(nameErrorElement).toHaveTextContent("");
      expect(roomErrorElement).toHaveTextContent("Room code can't be empty.");

      fireEvent.change(
          getByPlaceholderText("Display Name"),
          {target: {value: ""}}
      )
      fireEvent.change(
          getByPlaceholderText( "Room Code"),
          {target: {value: "testRoom"}}
      )
      fireEvent.click(buttonElement);
      expect(nameErrorElement).toHaveTextContent("Display name can't be empty.");
      expect(roomErrorElement).toHaveTextContent("");

   });
});
