import { Grid, Pagination, Skeleton } from "@mui/material";
import PhotoDetail from "./PhotoDetail";
import { useEffect, useState } from "react";

function PhotosPages({ showSkeletons, photos, selectedAlbumId }) {
  const MAX_ITEMS_PER_PAGE = 4; // TODO

  const [page, setPage] = useState(1);

  const getSkeletonArray = () => {
    const skeletonArray = [];
    for (let i = 0; i < MAX_ITEMS_PER_PAGE; i++) skeletonArray.push({ id: i });
    return skeletonArray;
  };

  // Reset page when list of photos changes
  useEffect(() => setPage(1), [photos.length, selectedAlbumId]);

  return (
    <>
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* TODO: test different screen sizes */}
        {(showSkeletons
          ? getSkeletonArray()
          : photos.slice(
              MAX_ITEMS_PER_PAGE * (page - 1),
              MAX_ITEMS_PER_PAGE * page
            )
        ).map((photo) => (
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
      <Pagination
        count={Math.ceil(photos.length / MAX_ITEMS_PER_PAGE)}
        shape="rounded"
        page={page}
        onChange={(event, page) => setPage(page)}
      />
    </>
  );
}

export default PhotosPages;
