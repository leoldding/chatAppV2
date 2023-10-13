import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ChatMain from "./../js/Main.js";

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
          getByPlaceholderText("Room Code"),
          {target: {value: "test"}}
      );
      fireEvent.click(getByText("Join Room"));

      const errorMessageElement = getByTestId("error");
      expect(errorMessageElement).toBeEmptyDOMElement();
      expect(location.assign).toHaveBeenCalledWith(expect.stringContaining("/room/test"));
   });

   it("should display error message when room code is empty", () => {
      const { getByText, getByTestId } = render(
          <ChatMain />
      );
      fireEvent.click(getByText("Join Room"));
      const errorMessageElement = getByTestId("error");
      expect(errorMessageElement).toHaveTextContent("Room code can't be empty.");
   });
});
