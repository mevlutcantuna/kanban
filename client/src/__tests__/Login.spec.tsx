import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { MockedProvider } from "@apollo/client/testing"

import { loginError, loginSuccess } from "../mock-graphql";

const setup = () =>
    render(
        <MockedProvider mocks={mocks} addTypename={false} >
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </MockedProvider>
    );

const mocks: any[] = [
    loginError,
    loginSuccess
]

describe("login page tests", () => {

    it('renders correctly', () => {
        setup()
        expect(screen.getByTestId(/header/i)).toHaveTextContent(/log in/i)
    })


    it("should return error,if inputs are empty", () => {
        setup();
        userEvent.click(screen.getByRole('button', { name: /login/i }))
        expect(screen.getByText(/Please provide all inputs/i)).toBeInTheDocument()
    });

    it('should show error message', async () => {
        setup()
        userEvent.type(screen.getByPlaceholderText(/email/i), 'notfound@gmail.com')
        userEvent.type(screen.getByPlaceholderText(/password/i), '123123')

        const btn = await screen.findByRole('button', { name: /login/i })
        expect(btn).toBeInTheDocument()
        userEvent.click(btn)

        expect(await screen.findByText(/user does not found.../i)).toBeInTheDocument()
    })

    it('should login correctly', async () => {
        setup()
        userEvent.type(screen.getByPlaceholderText(/email/i), 'mock@gmail.com')
        userEvent.type(screen.getByPlaceholderText(/password/i), '123123')

        const btn = await screen.findByRole('button', { name: /login/i })
        userEvent.click(btn)

        expect(await screen.findByText('Login success...')).toBeInTheDocument()
    })

});
