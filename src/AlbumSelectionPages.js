import { Skeleton, Stack, Typography } from "@mui/material";
import AlbumSelector from "./AlbumSelector";
import { useEffect, useState } from "react";
import PrettierPagination from "./PrettierPagination";

function AlbumSelectionPages({
  albumIds,
  showSkeletons,
  photos,
  selectedId,
  setSelectedId,
  searchedAlbumId,
}) {
  const calculateMaxItemsPerPage = () =>
    Math.max(1, Math.floor(window.innerWidth / 185));

  const [maxItemsPerPage, setMaxItemsPerPage] = useState(
    calculateMaxItemsPerPage()
  );
  const [page, setPage] = useState(1);

  const getSkeletonArray = () => {
    const skeletonArray = [];
    for (let i = 0; i < maxItemsPerPage; i++)
      skeletonArray.push(
        <Skeleton key={i} variant="rounded" width={175} height={248} />
      );
    return skeletonArray;
  };

  // Respond to screen width changes
  window.addEventListener("resize", () => {
    const prevMaxItems = maxItemsPerPage;
    setMaxItemsPerPage(calculateMaxItemsPerPage());
    if (prevMaxItems !== maxItemsPerPage) setPage(1);
  });

  // Reset page when list of selectable albums changes
  useEffect(() => setPage(1), [albumIds.length]);

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
        {albumIds.length || showSkeletons ? (
          <Stack direction="row" spacing={1}>
            {showSkeletons
              ? getSkeletonArray()
              : albumIds
                  .slice(maxItemsPerPage * (page - 1), maxItemsPerPage * page)
                  .map((albumId) => (
                    <AlbumSelector
                      key={albumId}
                      albumId={albumId}
                      photos={photos.filter(
                        (photo) => photo.albumId === albumId
                      )}
                      selected={albumId === selectedId}
                      onClick={() =>
                        albumId === selectedId
                          ? setSelectedId(null)
                          : setSelectedId(albumId)
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
        <PrettierPagination
          count={Math.ceil(albumIds.length / maxItemsPerPage)}
          page={page}
          onChange={(event, page) => setPage(page)}
        />
      </div>
    </>
  );
}

export default AlbumSelectionPages;
