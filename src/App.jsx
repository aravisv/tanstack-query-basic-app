import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";
import Post from "./Post";
import { getPost } from "./api/posts";
import { CreatePost } from "./CreatePost";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink(id) {
    queryClient.prefetchQuery({
      queryKey: ["posts", id],
      queryFn: () => getPost(id),
    });
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)} className="mr-12">
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)} className="mr-12">
        Posts List 2
      </button>
      <button
        className="mr-12"
        onMouseEnter={() => onHoverPostOneLink(1)}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <br />
      {currentPage}
    </div>
  );
}

export default App;
