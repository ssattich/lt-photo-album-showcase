import { Pagination, Skeleton, Stack, Typography } from "@mui/material";
import AlbumSelector from "./AlbumSelector";
import { useState } from "react";

function AlbumSelectionPages({
  selectableAlbumIds,
  photosFetched,
  photos,
  selectedAlbumId,
  setSelectedAlbumId,
  searchedAlbumId,
}) {
  const MAX_ITEMS_PER_PAGE = 4;

  const [page, setPage] = useState(1);

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
        {selectableAlbumIds.length || !photosFetched ? (
          <Stack direction="row" spacing={1}>
            {photosFetched
              ? selectableAlbumIds
                  .slice(
                    MAX_ITEMS_PER_PAGE * (page - 1),
                    MAX_ITEMS_PER_PAGE * page
                  )
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
                  ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 8, 10].map(() => (
                  // another pagination todo
                  <Skeleton variant="rounded" width={175} height={248} />
                ))}
          </Stack>
        ) : (
          <Typography variant="body1">
            No albums found with id {searchedAlbumId}.
          </Typography>
        )}
      </div>
      <Pagination
        // TODO: handle zero case
        count={Math.ceil(selectableAlbumIds.length / MAX_ITEMS_PER_PAGE)}
        shape="rounded"
        onChange={(event, page) => setPage(page)}
      />
    </>
  );
}

export default AlbumSelectionPages;
