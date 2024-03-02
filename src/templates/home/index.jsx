import "./styles.css";

import { useState, useCallback } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/posts";
import { Button } from "../../components/button";
import { TextInput } from "../../components/text-input";
import { useEffect } from "react";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPages] = useState(0);
  const [postsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPages(nextPage);
  };

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postAndPhotos = await loadPosts();

    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts(postAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <h1>NAO TEM </h1>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 20,
//     searchValue: "",
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;

//     const postAndPhotos = await loadPosts();

//     this.setState({
//       posts: postAndPhotos.slice(page, postsPerPage),
//       allPosts: postAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({
//       posts,
//       page: nextPage,
//     });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;

//     this.setState({
//       searchValue: value,
//     });
//   };

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter((post) => {
//           return post.title.toLowerCase().includes(searchValue.toLowerCase());
//         })
//       : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && <h1>Search Value: {searchValue}</h1>}

//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>

//         {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

//         {filteredPosts.length === 0 && <h1>NAO TEM </h1>}

//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }
