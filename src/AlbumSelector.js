import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import AlbumImage from "./AlbumImage";

function AlbumSelector({ albumId, photos, onClick }) {
  return (
    <Card onClick={onClick}>
      <CardMedia component={AlbumImage} photos={photos} />
      <CardContent>
        <Typography variant="body2">
          <span>Album {albumId}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AlbumSelector;
