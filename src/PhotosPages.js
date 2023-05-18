import { Grid, Skeleton } from "@mui/material";
import PhotoDetail from "./PhotoDetail";
import { useEffect, useState } from "react";
import PrettierPagination from "./PrettierPagination";

function PhotosPages({ showSkeletons, photos, selectedAlbumId }) {
  const MAX_ITEMS_PER_PAGE = 60;

  const [page, setPage] = useState(1);

  const getSkeletonArray = () => {
    const skeletonArray = [];
    const itemsPerRow =
      window.innerWidth < 600 ? 2 : window.innerWidth < 960 ? 4 : 6;
    const approxHeight = (window.innerWidth - 8) / itemsPerRow + 102;
    for (let i = 0; i < MAX_ITEMS_PER_PAGE; i++)
      skeletonArray.push({ id: i, height: approxHeight });
    return skeletonArray;
  };

  // Reset page when list of photos changes
  useEffect(() => setPage(1), [photos.length, selectedAlbumId]);

  return (
    <>
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        {(showSkeletons
          ? getSkeletonArray()
          : photos.slice(
              MAX_ITEMS_PER_PAGE * (page - 1),
              MAX_ITEMS_PER_PAGE * page
            )
        ).map((photo) => (
          <Grid item key={photo.id} xs={2} sm={2} md={2}>
            {showSkeletons ? (
              <Skeleton variant="rounded" height={photo.height} />
            ) : (
              <PhotoDetail photo={photo} />
            )}
          </Grid>
        ))}
      </Grid>
      <PrettierPagination
        count={Math.ceil(photos.length / MAX_ITEMS_PER_PAGE)}
        page={page}
        onChange={(event, page) => setPage(page)}
      />
    </>
  );
}

export default PhotosPages;
