import { Grid, Skeleton } from "@mui/material";
import PhotoDetail from "./PhotoDetail";

function PhotosPages({ showSkeletons, photos }) {
  const getSkeletonArray = () => {
    const skeletonArray = [];
    // TODO: use max number of pics per page
    for (let i = 0; i < 100; i++) skeletonArray.push({ id: i });
    return skeletonArray;
  };

  return (
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
      {/* TODO: test different screen sizes */}
      {(showSkeletons ? getSkeletonArray() : photos).map((photo) => (
        <Grid item key={photo.id} xs={1} sm={2} md={2}>
          {showSkeletons ? (
            // TODO: height
            <Skeleton variant="rounded" />
          ) : (
            <PhotoDetail photo={photo} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default PhotosPages;
