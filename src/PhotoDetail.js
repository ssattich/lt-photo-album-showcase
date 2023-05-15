import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function PhotoDetail({ photo: { id, title, thumbnailUrl } }) {
  return (
    <Card elevation={3}>
      <CardMedia component="img" image={thumbnailUrl} alt={title} />
      <CardContent>
        <Typography variant="body2">
          <span>{id}</span> | <span>{title}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PhotoDetail;
