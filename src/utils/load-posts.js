export const loadPosts = async () => {
  const postsResponses = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosResponses = fetch("https://jsonplaceholder.typicode.com/photos");

  const [posts, photos] = await Promise.all([postsResponses, photosResponses]);

  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postAndPhotos = postsJson.map((post, index) => {
    return {
      ...post,
      cover: photosJson[index].url,
    };
  });

  return postAndPhotos;
};
