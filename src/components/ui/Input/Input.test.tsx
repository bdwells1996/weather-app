import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the input via a shared id", () => {
    render(<Input label="City name" placeholder="Search…" />);
    const input = screen.getByRole("textbox", { name: "City name" });
    expect(input).toBeInTheDocument();
    // Passing `name` to getByRole already asserts the label is linked,
    // but we also verify the label element itself is present.
    expect(screen.getByText("City name")).toBeInTheDocument();
  });

  it("shows an error message and applies error styling when error prop is set", () => {
    render(<Input label="Email" error="Invalid email address" />);
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    // The hint/error paragraph should carry the red colour class
    expect(screen.getByText("Invalid email address")).toHaveClass("text-red-400");
    // The input itself should have the red border class
    expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
  });

  it("shows a hint when no error is present, and hides it when an error overrides it", () => {
    const { rerender } = render(
      <Input label="Password" hint="At least 8 characters" />,
    );
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();

    rerender(
      <Input label="Password" hint="At least 8 characters" error="Too short" />,
    );
    // Error takes precedence — hint text should no longer be shown
    expect(screen.queryByText("At least 8 characters")).not.toBeInTheDocument();
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });
});
