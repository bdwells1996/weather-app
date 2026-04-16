import { render, screen } from "@testing-library/react";
import { Search } from "lucide-react";
import { Button } from "./Button";

describe("Button", () => {
  it("applies variant classes for each variant", () => {
    const { rerender } = render(<Button variant="primary">Save</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-purple-600");

    rerender(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-red-600");

    rerender(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-white", "text-purple-700");

    rerender(<Button variant="ghost">Skip</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("is disabled and non-interactive when disabled prop is set", () => {
    render(<Button disabled>Submit</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
  });

  it("renders as a circular icon button when its only child is a React element", () => {
    render(
      <Button variant="ghost">
        <Search size={16} aria-hidden="true" />
      </Button>,
    );
    const btn = screen.getByRole("button");
    // Icon-only buttons skip variant/size classes and get a rounded-full pill shape
    expect(btn).toHaveClass("rounded-full");
    expect(btn).not.toHaveClass("bg-transparent"); // ghost variant class is skipped
  });
});
