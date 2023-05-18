import { Grid, Skeleton } from "@mui/material";
import PhotoDetail from "./PhotoDetail";

function PhotosPages({ photosFetched, photosToDisplay }) {
  return (
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
      {/* TODO: test different screen sizes */}
      {(photosFetched
        ? photosToDisplay
        : // another pagination TODO
          // TODO post-pagination: skeleton array consts?
          [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
      ).map((photo) => (
        <Grid item key={photo.id} xs={1} sm={2} md={2}>
          {photosFetched ? (
            <PhotoDetail photo={photo} />
          ) : (
            // TODO: height
            <Skeleton variant="rounded" />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default PhotosPages;
