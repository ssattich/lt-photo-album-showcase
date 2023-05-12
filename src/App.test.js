import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App paragraph", () => {
  render(<App />);
  const paragraphElement = screen.getByText(/App/i);
  expect(paragraphElement).toBeInTheDocument();
});
