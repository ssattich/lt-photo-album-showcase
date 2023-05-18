import { Card, CardMedia, Stack } from "@mui/material";
import SlimmerCardContent from "./SlimmerCardContent";

function PhotoDetail({ photo: { id, title, thumbnailUrl } }) {
  return (
    <Card className="clickable-card">
      <CardMedia component="img" src={thumbnailUrl} alt={title} />
      <SlimmerCardContent>
        <Stack direction="row" spacing={0}>
          <span
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              maxWidth: "30px",
              textAlign: "center",
            }}
          >
            {id}
          </span>
          <span
            style={{
              borderLeftWidth: "1px",
              borderLeftStyle: "solid",
              marginLeft: "5px",
              paddingLeft: "5px",
            }}
          >
            {title}
          </span>
        </Stack>
      </SlimmerCardContent>
    </Card>
  );
}

export default PhotoDetail;
