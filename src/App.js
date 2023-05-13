import { useEffect, useState } from "react";
import "./App.css";
import PhotoDetail from "./PhotoDetail";

function App() {
  const [photos, setPhotos] = useState([]);

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

  return (
    <>
      {photos.map((photo) => (
        <PhotoDetail key={photo.id} photo={photo} />
      ))}
    </>
  );
}

export default App;
