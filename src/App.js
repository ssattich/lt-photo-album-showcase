import { useEffect, useState } from "react";
import "./App.css";
import PhotoDetail from "./PhotoDetail";
import AlbumSelector from "./AlbumSelector";

function App() {
  const [photos, setPhotos] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [albumIds, setAlbumIds] = useState([]);
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
      <input
        placeholder="Search albums by id..."
        type="text"
        value={searchedAlbumId}
        onChange={(e) => setSearchedAlbumId(e.target.value)}
      />
      {selectableAlbumIds.length ? (
        selectableAlbumIds.map((albumId) => (
          <AlbumSelector
            key={albumId}
            albumId={albumId}
            onClick={() => setSelectedAlbumId(albumId)}
          />
        ))
      ) : (
        <p>No albums found with id {searchedAlbumId}</p>
      )}
      {photosToDisplay.map((photo) => (
        <PhotoDetail key={photo.id} photo={photo} />
      ))}
    </>
  );
}

export default App;
