import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Header from "../components/Header"

const setup = () => {
    const props = {
        fullName: "Joe Doe", id: "1", email: "joe@gmail.com", password: "123123"
    }

    render(
        <BrowserRouter>
            <Header user={props} />
        </BrowserRouter>
    )
}

describe("header test", () => {

    it('should name renders correctly', () => {
        setup()
        expect(screen.getByText(/joe doe/i)).toBeInTheDocument()
    })
})