function AlbumSelector({ albumId, onClick }) {
  return (
    <>
      <p onClick={onClick}>Album {albumId}</p>
    </>
  );
}

export default AlbumSelector;
