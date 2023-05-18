import { useEffect, useState } from "react";
import "./App.css";
import PhotoDetail from "./PhotoDetail";
import { Grid, Skeleton, TextField } from "@mui/material";
import AlbumSelectionPages from "./AlbumSelectionPages";

function App() {
  // TODO: clickable photos
  const [photos, setPhotos] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [photosFetched, setPhotosFetched] = useState(false);
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
      // TODO: make this var a const again and stop truncating like this (pagination?)
      var json = await response.json();
      json.splice(500, 5000);
      setPhotos(json);
      setPhotosFetched(true);
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
      <AlbumSelectionPages
        selectableAlbumIds={selectableAlbumIds}
        showSkeletons={!photosFetched}
        photos={photos}
        selectedAlbumId={selectedAlbumId}
        setSelectedAlbumId={setSelectedAlbumId}
        searchedAlbumId={searchedAlbumId}
      />
      <hr />
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
    </>
  );
}

export default App;
