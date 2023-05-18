import { Pagination, Skeleton, Stack, Typography } from "@mui/material";
import AlbumSelector from "./AlbumSelector";
import { useEffect, useState } from "react";

function AlbumSelectionPages({
  selectableAlbumIds,
  showSkeletons,
  photos,
  selectedAlbumId,
  setSelectedAlbumId,
  searchedAlbumId,
}) {
  const calculateMaxItemsPerPage = () => Math.floor(window.innerWidth / 185);

  const [maxItemsPerPage, setMaxItemsPerPage] = useState(
    calculateMaxItemsPerPage()
  );
  const [page, setPage] = useState(1);

  const getSkeletonArray = () => {
    const skeletonArray = [];
    for (let i = 0; i < maxItemsPerPage; i++)
      skeletonArray.push(
        <Skeleton variant="rounded" width={175} height={248} />
      );
    return skeletonArray;
  };

  // Respond to screen width changes
  window.addEventListener("resize", () =>
    setMaxItemsPerPage(calculateMaxItemsPerPage())
  );

  // Reset page when list of selectable albums changes
  useEffect(() => {
    setPage(1);
  }, [selectableAlbumIds.length]);

  return (
    <>
      <div
        style={{
          minHeight: "250px",
          maxHeight: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectableAlbumIds.length || showSkeletons ? (
          <Stack direction="row" spacing={1}>
            {showSkeletons
              ? getSkeletonArray()
              : selectableAlbumIds
                  .slice(maxItemsPerPage * (page - 1), maxItemsPerPage * page)
                  .map((albumId) => (
                    <AlbumSelector
                      key={albumId}
                      albumId={albumId}
                      photos={photos.filter(
                        (photo) => photo.albumId === albumId
                      )}
                      selected={albumId === selectedAlbumId}
                      onClick={() =>
                        albumId === selectedAlbumId
                          ? setSelectedAlbumId(null)
                          : setSelectedAlbumId(albumId)
                      }
                    />
                  ))}
          </Stack>
        ) : searchedAlbumId ? (
          <Typography variant="body1">
            No albums found with id {searchedAlbumId}.
          </Typography>
        ) : (
          <></>
        )}
      </div>
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          // TODO: handle zero case
          count={Math.ceil(selectableAlbumIds.length / maxItemsPerPage)}
          shape="rounded"
          page={page}
          onChange={(event, page) => setPage(page)}
        />
      </div>
    </>
  );
}

export default AlbumSelectionPages;
