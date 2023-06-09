import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Grid, TextField } from "@mui/material";
import AlbumSelectionPages from "./AlbumSelectionPages";
import PhotosPages from "./PhotosPages";

function App() {
  const PHOTO_SITE_NAME = "jsonplaceholder.typicode.com/photos";
  const FETCH_PHOTOS_FROM = "https://" + PHOTO_SITE_NAME;

  const [photos, setPhotos] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [photosFetched, setPhotosFetched] = useState(false);
  const [albumIds, setAlbumIds] = useState([]);
  const [selectableAlbumIds, setSelectableAlbumIds] = useState([]);
  const [searchedAlbumId, setSearchedAlbumId] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  let photosFetchFailed = useRef(false);

  // Fetch photos on first render; don't re-fetch on any rerender
  useEffect(() => {
    const getAllPhotos = async () => {
      const response = await fetch(FETCH_PHOTOS_FROM).catch(() => {
        photosFetchFailed.current = true;
      });
      if (photosFetchFailed.current) return;
      const json = await response.json();
      setPhotos(json);
      setPhotosFetched(true);
    };
    getAllPhotos();
  }, [FETCH_PHOTOS_FROM]);

  // Get list of album ids from full list of photos
  useEffect(() => {
    setAlbumIds([...new Set(photos.map((photo) => photo.albumId))]);
  }, [photos]);

  // Whenever album selection changes, filter displayed photos accordingly
  useEffect(() => {
    if (selectedId) {
      setPhotosToDisplay(
        photos.filter((photo) => photo.albumId === selectedId)
      );
    } else {
      setPhotosToDisplay(photos);
    }
  }, [photos, selectedId]);

  // When user uses album search, filter selectable albums accordingly
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

  return photosFetchFailed.current ? (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <p>We were unable to fetch the photos from {PHOTO_SITE_NAME}.</p>
      <p>💔</p>
      <p>Refresh this page or try again later.</p>
    </div>
  ) : (
    <>
      {/* Using Grid to make search bar full screen width for smaller screens and one third screen width for larger screens. */}
      <Grid container spacing={1} columns={{ xs: 3, sm: 6, md: 12 }}>
        <Grid item xs={0} sm={0} md={4} />
        <Grid item xs={3} sm={6} md={4}>
          <TextField
            sx={{ width: "100%" }}
            placeholder="Search albums by id..."
            value={searchedAlbumId}
            onChange={(e) => setSearchedAlbumId(e.target.value)}
          />
        </Grid>
        <Grid item xs={0} sm={0} md={4} />
      </Grid>
      <hr />
      <AlbumSelectionPages
        albumIds={selectableAlbumIds}
        showSkeletons={!photosFetched}
        photos={photos}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        searchedAlbumId={searchedAlbumId}
      />
      <hr />
      <PhotosPages
        showSkeletons={!photosFetched}
        photos={photosToDisplay}
        selectedAlbumId={selectedId}
      />
    </>
  );
}

export default App;
