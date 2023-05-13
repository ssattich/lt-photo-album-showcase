import { render } from "@testing-library/react";
import App from "./App";

test("gets all photos", () => {
  jest.spyOn(window, "fetch");
  render(<App />);
  expect(window.fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/photos"
  );
});
