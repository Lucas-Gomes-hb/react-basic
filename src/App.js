import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponses = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponses = fetch(
      "https://jsonplaceholder.typicode.com/photos"
    );

    const [posts, photos] = await Promise.all([
      postsResponses,
      photosResponses,
    ]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postAndPhotos = postsJson.map((post, index) => {
      return {
        ...post,
        cover: photosJson[index].url,
      };
    });

    this.setState({
      posts: postAndPhotos,
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <img src={post.cover} alt={post.title} />
              <div className="post-content">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
