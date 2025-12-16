import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from ".";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: "Click me" }),
		).toBeInTheDocument();
	});

	it("calls onClick", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Press</Button>);
		fireEvent.click(screen.getByRole("button", { name: "Press" }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
