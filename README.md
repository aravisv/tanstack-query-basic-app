Basic app using tanstack query aka react query

Steps:

1. installed @tanstack/react-query, @tanstack/react-query-devtools
2. create a client like
   const queryClient = new QueryClient();
   then wrap the app with QueryClientProvider and pass the above created client
3. create a query, pass queryKey and queryFn as 2 mandatory fields
   use the isLoading, isError status first. if neither,then we can use the data to render
   in case the async queryFn throws error, it will retry again few times, before the query's status - isError becomes true
4. create a mutation function using useMutation. one argument is mandatory - mutationFn
   it may or may not have variable - single variable or object
   it also has states - isIdle, isPending, isSuccess, isError
   returns data or error
5. to check the posts getting updated, we can use devtools
   import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
   and just render that component in the main.jsx
6. use the useQueryClient hook to get the query client in scope
   then use that object to invalidate the queries by passing the query ids
   this way the query will be marked as stale and new data will be fetched again
