import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Main from "./../js/Main.js";

describe("Main component", () => {
   test("should render component", () => {
      render(<Main/>);
   });

   test("should render header", () => {
       render(<Main/>);
       const headerElement = screen.getByText(/chat rooms/i);
       expect(headerElement).toBeInTheDocument();
   });

   test("should render input box", () => {
      render(<Main/>);
      const inputElement = screen.getByPlaceholderText(/room code/i);
      expect(inputElement).toBeInTheDocument();
   });

   test("should render join room button", () => {
      render(<Main/>);
      const buttonElement = screen.getByText(/join room/i);
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
          screen.getByPlaceholderText(/room code/i),
          {target: {value: "test"}}
      );
      fireEvent.click(screen.getByText(/join room/i));

      const errorMessageElement = document.querySelector(".codeErrorChat");
      expect(errorMessageElement).toBeEmptyDOMElement();
      expect(location.assign).toHaveBeenCalledWith(expect.stringContaining("/room/test"));
   });

   test("should display error message when room code is empty", () => {
      render(<Main/>);
      fireEvent.click(screen.getByText(/join room/i));
      const errorMessageElement = document.querySelector(".codeErrorChat");
      expect(errorMessageElement).toHaveTextContent("Room code can't be empty.");
   });
});
