import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Main from "./../js/Main.js";

describe("Main component", () => {
   test("should render component", () => {
      render(<Main/>);
   });

   test("should render header", () => {
       render(<Main/>);
       const headerElement = screen.getByText("Chat Rooms");
       expect(headerElement).toBeInTheDocument();
   });

   test("should render input box", () => {
      render(<Main/>);
      const inputElement = screen.getByPlaceholderText("Room Code");
      expect(inputElement).toBeInTheDocument();
   });

   test("should render join room button", () => {
      render(<Main/>);
      const buttonElement = screen.getByText("Join Room");
      expect(buttonElement).toBeInTheDocument();
   });

   test("should render message div", () => {
      render(<Main/>);
      const errorMessageElement = document.querySelector(".codeErrorChat");
      expect(errorMessageElement).toBeInTheDocument();
   });

   test("should redirect when joining a room", () => {
      render(<Main/>);

      const mockLocation = jest.fn()
      delete window.location;
      window.location = {assign: mockLocation};

      fireEvent.change(
          screen.getByPlaceholderText("Room Code"),
          {target: {value: "test"}}
      );
      fireEvent.click(screen.getByText("Join Room"));

      const errorMessageElement = document.querySelector(".codeErrorChat");
      expect(errorMessageElement).toBeEmptyDOMElement();
      expect(location.assign).toHaveBeenCalledWith(expect.stringContaining("/room/test"));
   });

   test("should display error message when room code is empty", () => {
      render(<Main/>);
      fireEvent.click(screen.getByText("Join Room"));
      const errorMessageElement = document.querySelector(".codeErrorChat");
      expect(errorMessageElement).toHaveTextContent("Room code can't be empty.");
   });
});
