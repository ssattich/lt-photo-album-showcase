import { Card, CardMedia } from "@mui/material";
import AlbumImage from "./AlbumImage";
import SlimmerCardContent from "./SlimmerCardContent";

function AlbumSelector({ albumId, photos, selected, onClick }) {
  const cardStyle = { maxWidth: "175px" };

  return (
    <Card
      onClick={onClick}
      className="clickable-card"
      sx={
        selected
          ? { backgroundColor: "#1976d2", color: "white", ...cardStyle }
          : cardStyle
      }
    >
      <CardMedia component={AlbumImage} photos={photos} />
      <SlimmerCardContent>
        <span>Album {albumId}</span>
      </SlimmerCardContent>
    </Card>
  );
}

export default AlbumSelector;
