function AlbumImage({ photos }) {
  return (
    <>
      <img src={photos[0].thumbnailUrl} alt={photos[0].title} />
    </>
  );
}

export default AlbumImage;
