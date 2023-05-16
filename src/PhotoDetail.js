import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function PhotoDetail({ photo: { id, title, thumbnailUrl } }) {
  return (
    <Card>
      <CardMedia component="img" src={thumbnailUrl} alt={title} />
      <CardContent>
        <Typography variant="body2">
          {/* TODO: fix thing where title goes under id on second line */}
          <span>{id}</span> | <span>{title}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PhotoDetail;
