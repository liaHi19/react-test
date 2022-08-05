import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Todo from "./Todo";

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here/i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe("Todo", () => {
  it("should render a corresponding task", () => {
    render(<MockTodo />);
    addTask(["learn testing"]);
    const divElement = screen.getByText(/learn testing/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render a list of tasks", () => {
    render(<MockTodo />);
    addTask(["learn testing", "learn typescript", "keep calm"]);
    const divElements = screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3);
  });

  it("the task should not have a completed class at the initial render", () => {
    render(<MockTodo />);
    addTask(["learn testing"]);
    const divElement = screen.getByText(/learn testing/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  it("the task should  have a completed class when clicked", () => {
    render(<MockTodo />);
    addTask(["learn testing"]);
    const divElement = screen.getByText(/learn testing/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass("todo-item-active");
  });
});
