import { useEffect, useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import AlbumSelectionPages from "./AlbumSelectionPages";
import PhotosPages from "./PhotosPages";

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
      const json = await response.json();
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
        albumIds={selectableAlbumIds}
        showSkeletons={!photosFetched}
        photos={photos}
        selectedAlbumId={selectedAlbumId}
        setSelectedAlbumId={setSelectedAlbumId}
        searchedAlbumId={searchedAlbumId}
      />
      <hr />
      <PhotosPages
        showSkeletons={!photosFetched}
        photos={photosToDisplay}
        selectedAlbumId={selectedAlbumId}
      />
    </>
  );
}

export default App;
