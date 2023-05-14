import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

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
  const albumIds = [...new Set(photos.map((photo) => photo.albumId))];

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

  test("displays albums for selection", async () => {
    for (const albumId of albumIds) {
      const displayedAlbum = await findAlbumSelectorByAlbumId(albumId);

      expect(displayedAlbum).toBeInTheDocument();
    }
  });

  test("displays only searched albums when album search in use", async () => {
    const searchedAlbumId = albumIds[0];
    const albumSearchBar = getAlbumSearchBar();

    act(() => {
      fireEvent.change(albumSearchBar, {
        target: { value: searchedAlbumId.toString() },
      });
    });

    for (const albumId of albumIds) {
      const displayedAlbum = await screen
        .findByText("Album " + albumId)
        .catch(() => null);

      if (albumId.toString().includes(searchedAlbumId.toString())) {
        expect(displayedAlbum).toBeInTheDocument();
      } else {
        expect(displayedAlbum).not.toBeInTheDocument();
      }
    }
  });

  test("displays 'No albums found' message when album search can't display any albums", () => {
    const searchedAlbumId = "not an id";
    const albumSearchBar = getAlbumSearchBar();

    act(() => {
      fireEvent.change(albumSearchBar, {
        target: { value: searchedAlbumId },
      });
    });

    const message = screen.getByText(
      "No albums found with id " + searchedAlbumId
    );
    expect(message).toBeInTheDocument();
  });

  test("displays ids and titles of all photos when no album selected", async () => {
    for (const photo of photos) {
      const displayedId = await screen.findByText(photo.id.toString());
      const displayedTitle = await screen.findByText(photo.title);

      expect(displayedId).toBeInTheDocument();
      expect(displayedTitle).toBeInTheDocument();
    }
  });

  test("displays ids and titles of only photos in album when album selected", async () => {
    const albumId = albumIds[0];
    const albumSelector = await findAlbumSelectorByAlbumId(albumId);

    act(() => {
      albumSelector.click();
    });

    for (const photo of photos) {
      const displayedId = await screen
        .findByText(photo.id.toString())
        .catch(() => null);
      const displayedTitle = await screen
        .findByText(photo.title)
        .catch(() => null);

      if (photo.albumId === albumId) {
        expect(displayedId).toBeInTheDocument();
        expect(displayedTitle).toBeInTheDocument();
      } else {
        expect(displayedId).not.toBeInTheDocument();
        expect(displayedTitle).not.toBeInTheDocument();
      }
    }
  });

  test("displays ids and titles of all photos when album selector clicked twice in a row (selected then deselected)", async () => {
    const albumId = albumIds[0];
    const albumSelector = await findAlbumSelectorByAlbumId(albumId);

    act(() => {
      albumSelector.click();
    });
    act(() => {
      albumSelector.click();
    });

    for (const photo of photos) {
      const displayedId = await screen.findByText(photo.id.toString());
      const displayedTitle = await screen.findByText(photo.title);

      expect(displayedId).toBeInTheDocument();
      expect(displayedTitle).toBeInTheDocument();
    }
  });
});

const findAlbumSelectorByAlbumId = async (albumId) =>
  screen.findByText("Album " + albumId);

const getAlbumSearchBar = () =>
  screen.getByPlaceholderText("Search albums by id...");
