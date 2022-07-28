import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

import { MockedProvider } from "@apollo/client/testing"

const mocks: any = []

describe("login page tests", () => {
    const setup = () =>
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </MockedProvider>
        );

    it('renders correctly', () => {
        setup()
        expect(screen.getByTestId(/header/i)).toHaveTextContent(/log in/i)
    })


    it("should return error,if inputs are empty", () => {
        setup();
        userEvent.click(screen.getByRole('button', { name: /login/i }))
        expect(screen.getByText(/Please provide all inputs/i)).toBeInTheDocument()
    });
});
