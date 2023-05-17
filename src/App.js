import { useEffect, useState } from "react";
import "./App.css";
import PhotoDetail from "./PhotoDetail";
import AlbumSelector from "./AlbumSelector";
import { Grid, Stack, TextField, Typography } from "@mui/material";

function App() {
  // TODO: clickable photos
  const [photos, setPhotos] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [albumIds, setAlbumIds] = useState([]);
  // TODO: something about the names of these next three as they're WAY too similar
  const [selectableAlbumIds, setSelectableAlbumIds] = useState([]);
  const [searchedAlbumId, setSearchedAlbumId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    const getAllPhotos = async () => {
      // TODO: Use skeletons where things are fetched?
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      ); // TODO: error handling
      // TODO: make this var a const again and stop truncating like this (pagination?)
      var json = await response.json();
      json.splice(500, 5000);
      setPhotos(json);
    };
    getAllPhotos();
  }, []);

  useEffect(() => {
    setAlbumIds([...new Set(photos.map((photo) => photo.albumId))]);
  }, [photos]);

  useEffect(() => {
    if (selectedAlbumId) {
      setPhotosToDisplay(
        photos.filter((photo) => photo.albumId === selectedAlbumId)
      );
    } else {
      setPhotosToDisplay(photos);
    }
  }, [photos, selectedAlbumId]);

  //TODO: put brief comments explaining each useEffect
  useEffect(() => {
    if (searchedAlbumId) {
      setSelectableAlbumIds(
        albumIds.filter((albumId) =>
          albumId.toString().includes(searchedAlbumId)
        )
      );
    } else {
      setSelectableAlbumIds(albumIds);
    }
  }, [albumIds, searchedAlbumId]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Search albums by id..."
          value={searchedAlbumId}
          onChange={(e) => setSearchedAlbumId(e.target.value)}
        />
      </div>
      <hr />
      {selectableAlbumIds.length ? (
        <Stack direction="row" spacing={1}>
          {selectableAlbumIds.map((albumId) => (
            <AlbumSelector
              key={albumId}
              albumId={albumId}
              photos={photos.filter((photo) => photo.albumId === albumId)}
              onClick={() =>
                albumId === selectedAlbumId
                  ? setSelectedAlbumId(null)
                  : setSelectedAlbumId(albumId)
              }
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="body1">
          No albums found with id {searchedAlbumId}
        </Typography>
      )}
      <hr />
      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* TODO: test different screen sizes */}
        {photosToDisplay.map((photo) => (
          <Grid item key={photo.id} xs={1} sm={2} md={2}>
            <PhotoDetail photo={photo} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
