import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import NewsCard from "./NewsCard";

describe("NewsCard component", () => {
  const mockNews = {
    title: "Test news",
    source: { id: null, name: "Test source" },
    publishedAt: "2022-03-28T00:00:00Z",
    urlToImage: "https://testimage.com",
    description: "Test news description",
    author: "Test author",
    content: "Test news content",
    url: "Test news URL",
  };

  it("should render the news title, source name, and published date", () => {
    const date = new Date(mockNews.publishedAt);
    const expectedDateString = date.toLocaleDateString();
    render(<NewsCard news={mockNews} viewType="tiles" />);
    expect(screen.getByText("Test news")).toBeInTheDocument();
    expect(screen.getByText("Test source")).toBeInTheDocument();
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
  });

  it("should render the news image if urlToImage is present", () => {
    render(<NewsCard news={mockNews} viewType="tiles" />);
    expect(screen.getByAltText("Test news")).toBeInTheDocument();
  });

  it("should render the news description and author if viewType is 'tiles'", () => {
    render(<NewsCard news={mockNews} viewType="tiles" />);
    expect(screen.getByText("Test news description")).toBeInTheDocument();
  });

  it("should not render the news description if viewType is 'list'", () => {
    render(<NewsCard news={mockNews} viewType="list" />);
    expect(screen.queryByText("Test news description")).toBeNull();
  });

  it("should open the popup when the news card is clicked", () => {
    render(<NewsCard news={mockNews} viewType="tiles" />);
    fireEvent.click(screen.getByTestId("news-card"));
    expect(screen.getByTestId("popup")).toBeInTheDocument();
  });

  it("should close the popup when the 'close' button is clicked", async () => {
    render(<NewsCard news={mockNews} viewType="tiles" />);
    fireEvent.click(screen.getByTestId("news-card"));
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close-button"));
    await waitFor(() => expect(screen.queryByTestId("popup")).not.toBeInTheDocument());
  });
});
