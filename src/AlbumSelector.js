import { Card, CardMedia } from "@mui/material";
import AlbumImage from "./AlbumImage";
import SlimmerCardContent from "./SlimmerCardContent";

function AlbumSelector({ albumId, photos, onClick }) {
  return (
    <Card onClick={onClick}>
      <CardMedia component={AlbumImage} photos={photos} />
      <SlimmerCardContent>
        <span>Album {albumId}</span>
      </SlimmerCardContent>
    </Card>
  );
}

export default AlbumSelector;
