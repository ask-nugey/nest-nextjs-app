import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TextareaField } from "./index";

describe("TextareaField", () => {
	it("renders label and value", () => {
		render(
			<TextareaField
				name="body"
				label="本文"
				value="初期本文"
				onChange={() => {}}
			/>,
		);

		expect(screen.getByLabelText("本文")).toBeInTheDocument();
		expect(screen.getByDisplayValue("初期本文")).toBeInTheDocument();
	});

	it("calls onChange when typing", () => {
		const onChange = vi.fn();
		render(
			<TextareaField name="body" label="本文" value="" onChange={onChange} />,
		);

		const textarea = screen.getByLabelText("本文");
		fireEvent.change(textarea, { target: { value: "更新" } });

		expect(onChange).toHaveBeenCalledWith("更新");
	});

	it("shows error text", () => {
		render(
			<TextareaField
				name="body"
				label="本文"
				value=""
				errorText="エラー"
				onChange={() => {}}
			/>,
		);

		expect(screen.getByText("エラー")).toBeInTheDocument();
	});
});
