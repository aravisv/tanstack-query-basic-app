Basic app using tanstack query aka react query

Steps:

1. installed @tanstack/react-query, @tanstack/react-query-devtools
2. create a client like
   const queryClient = new QueryClient();
   then wrap the app with QueryClientProvider and pass the above created client
3. create a query, pass queryKey and queryFn as 2 mandatory fields
   use the isLoading, isError status first. if neither,then we can use the data to render
   in case the async queryFn throws error, it will retry again few times, before the query's status - isError becomes true
