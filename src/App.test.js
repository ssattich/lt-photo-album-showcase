import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { act } from "@testing-library/react";
import MockData from "./MockData";

describe("App", () => {
  const photos = MockData();
  const albumIds = [...new Set(photos.map((photo) => photo.albumId))];

  const photosResponse = {
    json: async () => photos,
  };
  const photosFetch = async () => photosResponse;

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(photosFetch);
    render(<App />);
    // wait until fetch is complete and elements are populated before running tests
    return waitFor(() =>
      expect(queryAlbumSelectorByAlbumId(photos[0].albumId)).toBeInTheDocument()
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("gets all photos", () => {
    expect(window.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos"
    );
  });

  test("displays albums for selection", () => {
    for (const albumId of albumIds) {
      const displayedAlbum = queryAlbumSelectorByAlbumId(albumId);
      expect(displayedAlbum).toBeInTheDocument();
    }
  });

  test("displays only searched albums when album search in use", () => {
    const searchedAlbumId = albumIds[0];
    const albumSearchBar = getAlbumSearchBar();

    act(() => {
      fireEvent.change(albumSearchBar, {
        target: { value: searchedAlbumId.toString() },
      });
    });

    for (const albumId of albumIds) {
      const displayedAlbum = queryAlbumSelectorByAlbumId(albumId);

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
      "No albums found with id " + searchedAlbumId + "."
    );
    expect(message).toBeInTheDocument();
  });

  test("displays ids and titles of all photos when no album selected", () => {
    for (const photo of photos) {
      const [displayedId, displayedTitle] =
        queryDisplayedIdAndTitleForPhoto(photo);
      expect(displayedId).toBeInTheDocument();
      expect(displayedTitle).toBeInTheDocument();
    }
  });

  test("displays ids and titles of only photos in album when album selected", () => {
    const albumId = albumIds[0];
    const albumSelector = queryAlbumSelectorByAlbumId(albumId);

    act(() => {
      albumSelector.click();
    });

    for (const photo of photos) {
      const [displayedId, displayedTitle] =
        queryDisplayedIdAndTitleForPhoto(photo);

      if (photo.albumId === albumId) {
        expect(displayedId).toBeInTheDocument();
        expect(displayedTitle).toBeInTheDocument();
      } else {
        expect(displayedId).not.toBeInTheDocument();
        expect(displayedTitle).not.toBeInTheDocument();
      }
    }
  });

  test("displays ids and titles of all photos when album selector clicked twice in a row (selected then deselected)", () => {
    const albumId = albumIds[0];
    const albumSelector = queryAlbumSelectorByAlbumId(albumId);

    act(() => {
      albumSelector.click();
    });
    act(() => {
      albumSelector.click();
    });

    for (const photo of photos) {
      const [displayedId, displayedTitle] =
        queryDisplayedIdAndTitleForPhoto(photo);
      expect(displayedId).toBeInTheDocument();
      expect(displayedTitle).toBeInTheDocument();
    }
  });
});

const queryAlbumSelectorByAlbumId = (albumId) =>
  screen.queryByText("Album " + albumId);

const getAlbumSearchBar = () =>
  screen.getByPlaceholderText("Search albums by id...");

const queryDisplayedIdAndTitleForPhoto = (photo) => [
  screen.queryByText(photo.id.toString()),
  screen.queryByText(photo.title),
];
