import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { createColumnError, createColumnSuccess, deleteColumn, getAllColumns, updateColumnError, updateColumnSuccess, } from "../mock-graphql/column";
import { getUser } from "../mock-graphql/auth";
import { createTaskError, createTaskSuccess, deleteTask, getAllTasks, updateTaskError, updateTaskSuccess } from '../mock-graphql/task'
import {
    mockGetComputedStyle,
    mockDndSpacing,
    makeDnd,
    DND_DIRECTION_UP,
    DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import { updateColumnSuccessDND } from "../mock-graphql/dnd";


const mocks: any[] = [getUser, getAllColumns, getAllTasks, createColumnSuccess, createColumnError, updateColumnSuccess, updateColumnError, deleteColumn, createTaskSuccess, createTaskError, updateTaskSuccess, updateTaskError, deleteTask, updateColumnSuccessDND];

const setup = () => {
    const { container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </MockedProvider>
    );

    mockDndSpacing(container)
};

describe("home page", () => {
    it("should render,get initial values correctly", async () => {
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
    })

    describe('column tests', () => {
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

        it('should return error message,if update form item is empty', async () => {
            setup()
            // open popover of the first column
            const colSettingsBtns = await screen.findAllByTestId('col-setting-icon')
            userEvent.click(colSettingsBtns[0])

            // open update column modal
            const updateBtnOfColumn = await screen.findByText('Update')
            userEvent.click(updateBtnOfColumn)
            expect(await screen.findByText(/Update the column/i)).toBeInTheDocument()

            // clear input and submit
            userEvent.clear(screen.getByPlaceholderText('Enter Column Name'))
            userEvent.click(screen.getByRole('button', { name: /submit/i }))
            expect(await screen.findByText(/Please provide the name.../i)).toBeInTheDocument()
        })

        it('should return error message, while updating the column with name of a existing column', async () => {
            setup()
            // open popover of the first column
            const colSettingsBtns = await screen.findAllByTestId('col-setting-icon')
            userEvent.click(colSettingsBtns[0])

            // open update column modal
            const updateBtnOfColumn = await screen.findByText('Update')
            userEvent.click(updateBtnOfColumn)

            // fill the form and submit
            const updatedColumnName = 'In progress'
            userEvent.clear(screen.getByPlaceholderText('Enter Column Name'))
            userEvent.type(screen.getByPlaceholderText('Enter Column Name'), updatedColumnName)
            userEvent.click(screen.getByRole('button', { name: /submit/i }))

            expect(await screen.findByText(/There is a column with same name.../i)).toBeInTheDocument()

        })

        it('should delete the column correctly', async () => {
            setup()
            // open popover
            const colSettingsBtns = await screen.findAllByTestId('col-setting-icon')
            userEvent.click(colSettingsBtns[0])

            userEvent.click(screen.getByText(/delete/i))
            await waitForElementToBeRemoved(() => screen.queryByText(/to do/i))
            expect(await screen.findByText(/deleted the column/i)).toBeInTheDocument()
        })

    })

    describe('task tests', () => {
        it('should create a new task correctly', async () => {
            setup()

            // wait for getting initial values
            expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()

            // open create task modal
            userEvent.click(await screen.findByText(/create task/i))
            expect(screen.getByText(/Create a new task/i)).toBeInTheDocument()

            // fill the form and submit
            const newTask = 'New Task 44'
            userEvent.type(screen.getByPlaceholderText(/Enter Task/i), newTask)
            userEvent.selectOptions(screen.getByPlaceholderText(/Choose Tag/), 'High')
            userEvent.selectOptions(await screen.findByPlaceholderText(/Choose Column/), 'column-2')
            userEvent.click(screen.getByRole('button', { name: /submit/i }))

            expect(await screen.findByText(newTask)).toBeInTheDocument()
        })

        it('should return error message,if the create task input is empty', async () => {
            setup()

            // wait for getting initial values
            expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()

            // open create task modal
            userEvent.click(await screen.findByText(/create task/i))
            expect(screen.getByText(/Create a new task/i)).toBeInTheDocument()

            // submit form
            userEvent.click(screen.getByRole('button', { name: /submit/i }))
            expect(await screen.findByText(/Please provide all inputs.../i)).toBeInTheDocument()


        })

        it('should return error message,if there is a task with same name', async () => {
            setup()

            // wait for getting initial values
            expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()

            // open create task modal
            userEvent.click(await screen.findByText(/create task/i))
            expect(screen.getByText(/Create a new task/i)).toBeInTheDocument()

            // fill the form and submit
            userEvent.type(screen.getByPlaceholderText(/Enter Task/i), "Take out the garbage")
            userEvent.selectOptions(screen.getByPlaceholderText(/Choose Tag/), 'High')
            userEvent.selectOptions(await screen.findByPlaceholderText(/Choose Column/), 'column-2')
            userEvent.click(screen.getByRole('button', { name: /submit/i }))

            expect(await screen.findByText(/There is a task with same content./i)).toBeInTheDocument()
        })

        it('should update the task correctly', async () => {
            setup()

            // wait for getting initial values
            expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()

            // open update form modal of first task in first column
            const taskSettingBtns = screen.getAllByTestId("task-setting-icon")
            userEvent.click(taskSettingBtns[0])
            userEvent.click(screen.getByText('Update'))

            // fill the form and submit
            const updatedTaskContent = "Updated Task 44"
            userEvent.clear(screen.getByPlaceholderText(/Enter Task/i))
            userEvent.type(screen.getByPlaceholderText(/Enter Task/i), updatedTaskContent)
            userEvent.selectOptions(screen.getByPlaceholderText(/Choose Tag/i), "High")
            userEvent.click(screen.getByRole('button', { name: /submit/i }))
            expect(await screen.findByText(updatedTaskContent)).toBeInTheDocument()
        })

        it('should return error message, if there is a task with same content,while updating', async () => {
            setup()

            // wait for getting initial values
            expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()

            // open update form modal of first task in first column
            const taskSettingBtns = screen.getAllByTestId("task-setting-icon")
            userEvent.click(taskSettingBtns[0])
            userEvent.click(screen.getByText('Update'))

            // fill the form and submit
            userEvent.clear(screen.getByPlaceholderText(/Enter Task/i))
            userEvent.type(screen.getByPlaceholderText(/Enter Task/i), "Watch my favorite show")
            userEvent.selectOptions(screen.getByPlaceholderText(/Choose Tag/i), "High")
            userEvent.click(screen.getByRole('button', { name: /submit/i }))

            expect(await screen.findByText("There is a task with same content.")).toBeInTheDocument()

        })

        it('should delete the task correctly', async () => {
            setup()

            // wait for getting initial values
            expect(await screen.findByText(/Take out the garbage/i)).toBeInTheDocument()

            // open popover of the task and delete it
            const taskSettingBtns = screen.getAllByTestId("task-setting-icon")
            userEvent.click(taskSettingBtns[0])
            userEvent.click(screen.getByText('Delete'))

            await waitForElementToBeRemoved(() => screen.queryByText('Take out the garbage'))
            expect(await screen.findByText(/deleted the task/i)).toBeInTheDocument()
        })

    })

    describe('dnd', () => {

        beforeEach(() => {
            mockGetComputedStyle();
        });

        it('should move a task up inside a column', async () => {
            setup()

            expect(await screen.findAllByTestId('task-item')).toHaveLength(2)
            expect((await screen.findAllByTestId('task-item'))[0]).toHaveTextContent('Take out the garbage')

            await makeDnd({
                text: 'Watch my favorite show',
                direction: DND_DIRECTION_UP,
                positions: 1
            });

            expect((await screen.findAllByTestId('task-item'))[1]).toHaveTextContent('Take out the garbage')
        })

        it('should move a task down inside a column', async () => {
            setup()

            expect(await screen.findAllByTestId('task-item')).toHaveLength(2)
            expect((await screen.findAllByTestId('task-item'))[0]).toHaveTextContent('Take out the garbage')

            await makeDnd({
                text: 'Take out the garbage',
                direction: DND_DIRECTION_DOWN,
                positions: 1
            });

            expect((await screen.findAllByTestId('task-item'))[1]).toHaveTextContent('Take out the garbage')
        })
    })

});
