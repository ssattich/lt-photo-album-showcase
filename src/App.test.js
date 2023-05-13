import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  const photos = [
    {
      albumId: 1,
      id: 1,
      thumbnailUrl: "thumbs.com/1",
      title: "Photo 1",
      url: "photos.com/1",
    },
    {
      albumId: 1,
      id: 2,
      thumbnailUrl: "thumbs.com/2",
      title: "Photo 2",
      url: "photos.com/2",
    },
    {
      albumId: 2,
      id: 3,
      thumbnailUrl: "thumbs.com/3",
      title: "Photo 3",
      url: "photos.com/3",
    },
  ];

  const photosResponse = {
    json: async () => {
      return photos;
    },
  };

  const photosFetch = async () => {
    return photosResponse;
  };

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(photosFetch);
    render(<App />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("gets all photos", () => {
    expect(window.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos"
    );
  });

  test("displays ids and titles of photos", async () => {
    for (const photo of photos) {
      const displayedId = await screen.findByText(photo.id.toString());
      const displayedTitle = await screen.findByText(photo.title);

      expect(displayedId).toBeInTheDocument();
      expect(displayedTitle).toBeInTheDocument();
    }
  });
});
