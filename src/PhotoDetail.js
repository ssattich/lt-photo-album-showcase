import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

function PhotoDetail({ photo: { id, title, thumbnailUrl } }) {
  return (
    <Card>
      <CardMedia component="img" src={thumbnailUrl} alt={title} />
      <CardContent sx={{ padding: "8px", marginBottom: "-12px" }}>
        {/* TODO: make card typography component? and/or clickable card/content? */}
        <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
          <Stack direction="row" spacing={0}>
            <div>{id}</div>
            <div
              style={{
                borderLeftWidth: "1px",
                borderLeftStyle: "solid",
                marginLeft: "5px",
                paddingLeft: "5px",
              }}
            >
              {title}
            </div>
          </Stack>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PhotoDetail;
