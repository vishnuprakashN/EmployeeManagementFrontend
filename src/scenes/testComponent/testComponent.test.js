import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
import * as React from "react"
import TestComponent from "./testComponent";

describe("account delete form", () => {
  it("renders default state", () => {
    const { getByTestId } = render(<TestComponent />);

    const password = getByTestId("account-delete-password") as HTMLInputElement;
    const confirm = getByTestId("account-delete-confirm");
    const submit = getByTestId("account-delete-submit");

    expect(password.value).toBe("");
    expect(confirm).not.toHaveClass("Mui-checked");
    expect(submit).toHaveClass("Mui-disabled");
  });

  it("keeps the submit button disabled when only password provided", () => {
    const { getByTestId } = render(<FormTest />);

    const password = getByTestId("account-delete-password");
    const submit = getByTestId("account-delete-submit");

    fireEvent.change(password, { target: { value: "password" } });
    expect(submit).toHaveClass("Mui-disabled");
  });

  it("keeps the submit button disabled when only confirm is checked", () => {
    const { getByTestId } = render(<TestComponent />);

    const confirm = getByTestId("account-delete-confirm");
    const submit = getByTestId("account-delete-submit");

    fireEvent.click(confirm);
    expect(submit).toHaveClass("Mui-disabled");
  });

  it("enables the submit button when the form is filled out", () => {
    const { getByTestId } = render(<TestComponent />);

    const password = getByTestId("account-delete-password");
    const confirm = getByTestId("account-delete-confirm");
    const submit = getByTestId("account-delete-submit");

    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.click(confirm);

    expect(submit).not.toHaveClass("Mui-disabled");
  });
});