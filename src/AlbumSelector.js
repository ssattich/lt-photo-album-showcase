import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import AlbumImage from "./AlbumImage";

function AlbumSelector({ albumId, photos, onClick }) {
  return (
    <Card onClick={onClick}>
      <CardMedia component={AlbumImage} photos={photos} />
      <CardContent sx={{ padding: "8px", marginBottom: "-12px" }}>
        <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
          <span>Album {albumId}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AlbumSelector;
