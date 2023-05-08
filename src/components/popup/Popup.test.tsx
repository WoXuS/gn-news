import { render, screen, fireEvent } from "@testing-library/react";
import Popup from "./Popup";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

describe("Popup", () => {
  const handleClose = jest.fn();
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

  test("renders without news item", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Popup popupOpen={true} handlePopupClose={handleClose} />
      </I18nextProvider>
    );
    const popupTitle = i18n.getDataByLanguage("en")?.translation?.popupTitle;
    const popupContent1 =
      i18n.getDataByLanguage("en")?.translation?.popupContent1;
    const popupContent2 =
      i18n.getDataByLanguage("en")?.translation?.popupContent2;
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(popupTitle && screen.getByText(popupTitle)).toBeInTheDocument();
    expect(
      popupContent1 && screen.getByText(popupContent1)
    ).toBeInTheDocument();
    expect(
      popupContent2 && screen.getByText(popupContent2)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close-button"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("renders with news item", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Popup
          popupOpen={true}
          handlePopupClose={handleClose}
          news={mockNews}
        />
      </I18nextProvider>
    );
    const openMock = jest.fn();
  Object.defineProperty(window, "open", { value: openMock });
    const source = i18n.getDataByLanguage("en")?.translation?.source;
    const author = i18n.getDataByLanguage("en")?.translation?.author;
    const date = new Date(mockNews.publishedAt);
    const expectedDateString = date.toLocaleDateString();
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText(mockNews.title)).toBeInTheDocument();
    expect(screen.getByAltText(mockNews.title)).toBeInTheDocument();
    expect(screen.getByText(mockNews.content)).toBeInTheDocument();
    expect(
      source && screen.getByText(`${source}: ${mockNews.source.name}`)
    ).toBeInTheDocument();
    expect(
      author && screen.getByText(`${author}: ${mockNews.author}`)
    ).toBeInTheDocument();
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
  });
});
