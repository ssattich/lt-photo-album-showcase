import { useEffect, useState } from "react";
import "./App.css";
import PhotoDetail from "./PhotoDetail";
import AlbumSelector from "./AlbumSelector";
import { Grid, TextField, Typography } from "@mui/material";

function App() {
  const [photos, setPhotos] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [albumIds, setAlbumIds] = useState([]);
  // TODO: something about the names of these next three as they're WAY too similar
  const [selectableAlbumIds, setSelectableAlbumIds] = useState([]);
  const [searchedAlbumId, setSearchedAlbumId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    const getAllPhotos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      ); // TODO: error handling
      // TODO: make this var a const again and stop truncating like this
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
      <TextField
        placeholder="Search albums by id..."
        value={searchedAlbumId}
        onChange={(e) => setSearchedAlbumId(e.target.value)}
      />
      {selectableAlbumIds.length ? (
        selectableAlbumIds.map((albumId) => (
          <AlbumSelector
            key={albumId}
            albumId={albumId}
            onClick={() =>
              albumId === selectedAlbumId
                ? setSelectedAlbumId(null)
                : setSelectedAlbumId(albumId)
            }
          />
        ))
      ) : (
        <Typography variant="body1">
          No albums found with id {searchedAlbumId}
        </Typography>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {photosToDisplay.map((photo) => (
          <Grid item key={photo.id} xs={2} sm={4} md={4}>
            <PhotoDetail photo={photo} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
