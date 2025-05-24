import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const POSTS = [
  {
    id: 1,
    title: "POST 1",
  },
  {
    id: 2,
    title: "POST 2",
  },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(2000).then(() => [...POSTS]),
    // queryFn: () => {
    //   console.log("calling the query function", Date.now());
    //   return Promise.reject("Error");
    // },
  });

  const newPostMutation = useMutation({
    mutationFn: (a) => {
      return wait(2000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title: a })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  // console.log("Query status", {
  //   status: postsQuery.status, // Only useful for initial fetch
  //   isLoading: postsQuery.isLoading, // True only once
  //   isFetching: postsQuery.isFetching, // Use this to detect background refetch
  //   data: postsQuery.data,
  // });

  if (postsQuery.isLoading) {
    return <h3>(initial) Loading...</h3>;
  }
  if (postsQuery.isFetching) {
    return <h3>Refreshing data...</h3>;
  }
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  }

  return (
    <>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isPending}
        onClick={() => {
          newPostMutation.mutate("New Post");
        }}
      >
        Add New Post
      </button>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
