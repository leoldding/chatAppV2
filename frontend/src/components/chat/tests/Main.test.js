import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Main from "./../js/Main.js";
import user from "@testing-library/user-event";

test("check that header renders", () => {
    render(<Main/>);
    const headerElement = screen.getByText(/chat rooms/i);
    expect(headerElement).toBeInTheDocument();
});

test("check that text input box renders", () => {
   render(<Main/>);
   const inputElement = screen.getByPlaceholderText(/room code/i);
   expect(inputElement).toBeInTheDocument();
});

test("check that button renders", () => {
   render(<Main/>);
   const buttonElement = screen.getByText(/join room/i);
   expect(buttonElement).toBeInTheDocument();
});

test("check that error message div renders", () => {
   render(<Main/>);
   const errorMessageElement = document.querySelector(".codeErrorChat");
   expect(errorMessageElement).toBeInTheDocument();
});

test("check good form submission", () => {
   render(<Main/>);
   const mockLocation = jest.fn()
   delete window.location;
   window.location = {assign: mockLocation};
   user.type(
       screen.getByPlaceholderText(/room code/i),
       "test"
   )
   const buttonElement = screen.getByText(/join room/i);
   const errorMessageElement = document.querySelector(".codeErrorChat");
   fireEvent.click(buttonElement);
   expect(errorMessageElement).toBeEmptyDOMElement();
});

test("check empty form submission", () => {
   render(<Main/>);
   const buttonElement = screen.getByText(/join room/i);
   const errorMessageElement = document.querySelector(".codeErrorChat");
   fireEvent.click(buttonElement);
   expect(errorMessageElement).toHaveTextContent("Room code can't be empty.");
});
