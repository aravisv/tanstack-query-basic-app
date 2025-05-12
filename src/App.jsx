import { useQuery, useMutation } from "@tanstack/react-query";
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
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(2000).then(() => [...POSTS]),
    // queryFn: () => {
    //   console.log("calling the query function", Date.now());
    //   return Promise.reject("Error");
    // },
  });
  console.log({ postsQuery });
  if (postsQuery.isLoading) {
    return <h3>Loading...</h3>;
  }
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  }
  console.log(postsQuery.data);

  return (
    <>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
