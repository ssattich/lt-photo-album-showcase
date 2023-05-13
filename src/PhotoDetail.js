function PhotoDetail({ photo: { id, title } }) {
  return (
    <>
      <p>{id}</p>
      <p>{title}</p>
    </>
  );
}

export default PhotoDetail;
