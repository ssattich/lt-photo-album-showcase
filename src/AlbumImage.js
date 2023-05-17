import { ImageList, ImageListItem } from "@mui/material";
import noImage from "./no-image.png";

function AlbumImage({ photos }) {
  return (
    <ImageList cols={2}>
      {photos
        .concat([{ id: -1 }, { id: -2 }, { id: -3 }, { id: -4 }]) // filler for if < 4 photos
        .slice(0, 4)
        .map((photo) => (
          <ImageListItem key={photo.id}>
            <img
              src={photo.thumbnailUrl ? photo.thumbnailUrl : noImage}
              alt={photo.title ? photo.title : "no image"}
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}

export default AlbumImage;
