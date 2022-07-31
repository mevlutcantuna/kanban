import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { createColumnError, createColumnSuccess, getAllColumns, updateColumnSuccess, } from "../mock-graphql/column";
import { getUser } from "../mock-graphql/auth";
import { getAllTasks } from '../mock-graphql/task'

const mocks: any[] = [getUser, getAllColumns, getAllTasks, createColumnSuccess, createColumnError, updateColumnSuccess];

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

    it('should create a new column correctly', async () => {
        setup()

        // open create column modal
        const createBtn = await screen.findByRole('button', { name: /create column/i })
        expect(createBtn).toBeInTheDocument()
        userEvent.click(createBtn)

        // fill form and submit
        const newColName = "New Col 44"
        userEvent.type(await screen.findByPlaceholderText('Enter Column Name'), newColName)
        userEvent.click(await screen.findByRole('button', { name: /submit/i }))
        expect(await screen.findByText(newColName)).toBeInTheDocument()
    })

    it('should return error,if create column form item is empty', async () => {
        setup()

        const createBtn = await screen.findByRole('button', { name: /create column/i })
        userEvent.click(createBtn)

        userEvent.click(await screen.findByRole('button', { name: /submit/i }))

        expect(await screen.findByText(/Please provide the text../i)).toBeInTheDocument()
    })

    it('should return error,if there is a column with same column name', async () => {
        setup()

        // open create column modal
        const createBtn = await screen.findByRole('button', { name: /create column/i })
        userEvent.click(createBtn)

        // fill form and submit
        const newColName = "To do"
        userEvent.type(await screen.findByPlaceholderText('Enter Column Name'), newColName)
        userEvent.click(await screen.findByRole('button', { name: /submit/i }))

        // check error
        expect(await screen.findByText("You have the same name of a column...")).toBeInTheDocument()
    })

    it('should update the column correctly', async () => {
        setup()
        // open popover of the first column
        const colSettingsBtns = await screen.findAllByTestId('col-setting-icon')
        expect(colSettingsBtns[0]).toBeInTheDocument()
        userEvent.click(colSettingsBtns[0])

        // open update column modal
        const updateBtnOfColumn = await screen.findByText('Update')
        expect(updateBtnOfColumn).toBeInTheDocument()
        userEvent.click(updateBtnOfColumn)
        expect(await screen.findByText(/Update the column/i)).toBeInTheDocument()

        // fill the form and submit
        const updatedColumnName = 'Updated To do'
        userEvent.clear(screen.getByPlaceholderText('Enter Column Name'))
        userEvent.type(screen.getByPlaceholderText('Enter Column Name'), updatedColumnName)

        userEvent.click(screen.getByRole('button', { name: /submit/i }))
        expect(await screen.findByText(updatedColumnName)).toBeInTheDocument()
    })


    it('should return error message, while updating the column with name of a existing column', async () => { })


    it('should delete the column correctly', async () => { })
});
