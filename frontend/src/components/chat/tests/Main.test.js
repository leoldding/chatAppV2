import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Main from "./../js/Main.js";
import user from "@testing-library/user-event";

test("renders main header", () => {
    render(<Main/>);
    const headerElement = screen.getByText(/chat rooms/i);
    expect(headerElement).toBeInTheDocument();
});

test("renders main form input", () => {
   render(<Main/>);
   const inputElement = screen.getByPlaceholderText(/room code/i);
   expect(inputElement).toBeInTheDocument();
});

test("renders main button", () => {
   render(<Main/>);
   const buttonElement = screen.getByText(/join room/i);
   expect(buttonElement).toBeInTheDocument();
});

test("render main error message", () => {
   render(<Main/>);
   const errorMessageElement = document.querySelector(".codeErrorChat");
   expect(errorMessageElement).toBeInTheDocument();
});

test("check form submit", () => {
   render(<Main/>);
   user.type(
       screen.getByPlaceholderText(/room cde/i),
       "test"
   )
   const buttonElement = screen.getByText(/join room/i);
   const errorMessageElement = document.querySelector(".codeErrorChat");
   fireEvent.click(buttonElement);
   expect(errorMessageElement).toBeEmptyDOMElement();
});

test("check empty form submit", () => {
   render(<Main/>);
   const buttonElement = screen.getByText(/join room/i);
   const errorMessageElement = document.querySelector(".codeErrorChat");
   fireEvent.click(buttonElement);
   expect(errorMessageElement).toHaveTextContent("Room code can't be empty.");
});
