import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TextField } from "./index";

describe("TextField", () => {
	it("renders label and value", () => {
		render(
			<TextField
				name="title"
				label="タイトル"
				value="初期値"
				onChange={() => {}}
			/>,
		);

		expect(screen.getByLabelText("タイトル")).toBeInTheDocument();
		expect(screen.getByDisplayValue("初期値")).toBeInTheDocument();
	});

	it("calls onChange when typing", () => {
		const onChange = vi.fn();
		render(
			<TextField name="title" label="タイトル" value="" onChange={onChange} />,
		);

		const input = screen.getByLabelText("タイトル");
		fireEvent.change(input, { target: { value: "更新" } });

		expect(onChange).toHaveBeenCalledWith("更新");
	});

	it("shows error text", () => {
		render(
			<TextField
				name="title"
				label="タイトル"
				value=""
				errorText="エラー"
				onChange={() => {}}
			/>,
		);

		expect(screen.getByText("エラー")).toBeInTheDocument();
	});
});
