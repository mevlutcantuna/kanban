import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../pages/Signup";
import { MockedProvider } from "@apollo/client/testing";
import { signupError, signupSuccess } from "../mocks/auth";
import { BrowserRouter } from "react-router-dom";

const mocks: any[] = [signupError, signupSuccess];

const setup = () => (
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        </MockedProvider>
    )
);

describe("signup page", () => {

    it('renders correctly', () => {
        setup()
        expect(screen.getByRole("heading", { name: /Sign Up/i })).toBeInTheDocument()
    })

    it('should show error message, if inputs are empty', async () => {
        setup()
        userEvent.click(screen.getByRole('button'))
        expect(await screen.findByText(/Please fill in all fields/i)).toBeInTheDocument()
    })


    it('should show error message', async () => {
        setup()

        userEvent.type(screen.getByPlaceholderText(/full name/i), 'Demo Demo')
        userEvent.type(screen.getByPlaceholderText(/email/i), "existsuser@gmail.com")
        userEvent.type(screen.getByPlaceholderText(/password/i), "123123")
        userEvent.click(screen.getByRole('button', { name: /signup/i }))

        expect(await screen.findByText('The user exists...')).toBeInTheDocument()
    })

    it("should signup correctly", async () => {
        setup()

        userEvent.type(screen.getByPlaceholderText(/full name/i), 'Demo Demo')
        userEvent.type(screen.getByPlaceholderText(/email/i), "user@gmail.com")
        userEvent.type(screen.getByPlaceholderText(/password/i), "123123")
        userEvent.click(screen.getByRole('button', { name: /signup/i }))

        expect(await screen.findByText(/Register is successed.../i)).toBeInTheDocument()
    })

});
