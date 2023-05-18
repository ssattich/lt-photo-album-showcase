function MockData() {
  return [
    {
      albumId: 1,
      id: "a", // using letters instead of numbers for id so can get elements by text of id without colliding with Pagination component
      thumbnailUrl: "thumbs.com/1",
      title: "Photo 1",
      url: "photos.com/1",
    },
    {
      albumId: 1,
      id: "b",
      thumbnailUrl: "thumbs.com/2",
      title: "Photo 2",
      url: "photos.com/2",
    },
    {
      albumId: 2,
      id: "c",
      thumbnailUrl: "thumbs.com/3",
      title: "Photo 3",
      url: "photos.com/3",
    },
    {
      albumId: 2,
      id: "d",
      thumbnailUrl: "thumbs.com/4",
      title: "Photo 4",
      url: "photos.com/4",
    },
    {
      albumId: 3,
      id: "e",
      thumbnailUrl: "thumbs.com/5",
      title: "Photo 5",
      url: "photos.com/5",
    },
  ];
}

export default MockData;
