import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    // mutationFn: (data) => {
    //   createPost(data);
    // },
    onSuccess: (responseData, variablesPassed, context) => {
      //console.log(responseData, context); // context will be foo:"bar"
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
      queryClient.setQueryData(["posts", responseData.id], responseData);

      //if setting the posts query itself, we can use the cache data and return a new object. mutation is not allowed on cached data
      //   queryClient.setQueryData(["posts"], (cacheData) => {
      //     return {
      //       ...cacheData,
      //       responseData,
      //     };
      //   });
      setCurrentPage(<Post id={responseData.id} />);
    },
    onMutate: () => {
      console.log("onMutate runs before the mutationFn");
      return { foo: "bar" };
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
