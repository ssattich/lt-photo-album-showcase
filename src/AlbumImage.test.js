import { render, screen } from "@testing-library/react";
import MockData from "./MockData";
import AlbumImage from "./AlbumImage";

const longPhotoList = MockData();
const shortPhotoList = longPhotoList.slice(-3);

test("displays only first four photo thumbnails even if there are more than four photos", () => {
  if (longPhotoList.length < 5)
    throw new Error(
      "This test requires longPhotoList to have a length of at least 5 in order to correctly verify behavior."
    );

  render(<AlbumImage photos={longPhotoList} />);

  for (let i = 0; i < 4; i++) {
    const photo = longPhotoList[i];
    const thumbImg = screen.getByAltText(photo.title);
    expect(thumbImg).toBeInTheDocument();
    expect(thumbImg.src).toContain(photo.thumbnailUrl);
  }
  for (let i = 4; i < longPhotoList.length; i++) {
    const photo = longPhotoList[i];
    const thumbImg = screen.queryByAltText(photo.title);
    expect(thumbImg).not.toBeInTheDocument();
  }
});

test("uses 'no image' image to guarantee four images if there are fewer than four photos", () => {
  render(<AlbumImage photos={shortPhotoList} />);

  const noImageImg = screen.getByAltText("no image");
  expect(noImageImg).toBeInTheDocument();
  expect(noImageImg.src).toContain("no-image.jpg");

  const allImgs = screen.queryAllByRole("img");
  expect(allImgs.length).toBe(4);
});
