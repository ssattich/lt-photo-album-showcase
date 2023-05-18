import { Skeleton, Stack, Typography } from "@mui/material";
import AlbumSelector from "./AlbumSelector";

function AlbumSelectionPages({
  selectableAlbumIds,
  photosFetched,
  photos,
  selectedAlbumId,
  setSelectedAlbumId,
  searchedAlbumId,
}) {
  return (
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
            ? selectableAlbumIds.map((albumId) => (
                <AlbumSelector
                  key={albumId}
                  albumId={albumId}
                  photos={photos.filter((photo) => photo.albumId === albumId)}
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
  );
}

export default AlbumSelectionPages;
