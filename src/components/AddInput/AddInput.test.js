import { render, screen, fireEvent } from "@testing-library/react";
import AddInput from "./AddInput";

const mockedSetTodos = jest.fn();

describe("AddInput", () => {
  it("should render the input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type in the input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, { target: { value: "Learn testing" } });
    expect(inputElement.value).toBe("Learn testing");
  });

  it("should be empty after button was clicked", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodos} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: "Learn testing" } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});
