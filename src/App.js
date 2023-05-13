import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const getAllPhotos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const photos = await response.json();
      console.log(photos);
    };
    getAllPhotos();
  }, []);

  return (
    <>
      <p>App</p>
    </>
  );
}

export default App;
