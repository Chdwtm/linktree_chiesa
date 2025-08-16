import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Chiesa Anugrah Dwitama name", () => {
  render(<App />);
  const nameElement = screen.getByText(/Chiesa Anugrah Dwitama/i);
  expect(nameElement).toBeInTheDocument();
});

test("renders social media links", () => {
  render(<App />);
  const linkedInLink = screen.getByText(/LinkedIn/i);
  const githubLink = screen.getByText(/GitHub/i);
  const youtubeLink = screen.getByText(/YouTube/i);
  const tiktokLink = screen.getByText(/TikTok/i);
  const instagramLink = screen.getByText(/Instagram/i);

  expect(linkedInLink).toBeInTheDocument();
  expect(githubLink).toBeInTheDocument();
  expect(youtubeLink).toBeInTheDocument();
  expect(tiktokLink).toBeInTheDocument();
  expect(instagramLink).toBeInTheDocument();
});

test("renders click counter", () => {
  render(<App />);
  const counterElement = screen.getByText(/Links clicked:/i);
  expect(counterElement).toBeInTheDocument();
});
