import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { getAllColumns, getAllTasks, getUser } from "../mock-graphql";

const mocks: any[] = [getUser, getAllColumns, getAllTasks];

const setup = () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </MockedProvider>
    );
};

describe("home page", () => {
    it("should render, initial values", async () => {
        setup();

        expect(await screen.findByTestId(/loading/i)).toBeInTheDocument();
        expect(await screen.findByText(/joe doe/i)).toBeInTheDocument();

        // check initial columns
        expect(await screen.findByText(/to do/i)).toBeInTheDocument()
        expect(await screen.findByText(/in progress/i)).toBeInTheDocument()
        expect(await screen.findByText(/done/i)).toBeInTheDocument()

        // check initial tasks
        expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()
        expect(await screen.findByText(/Watch my favorite show/i)).toBeInTheDocument()
    });
});
