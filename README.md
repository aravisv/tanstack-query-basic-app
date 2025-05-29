Basic app using tanstack query aka react query

Steps:

1. installed @tanstack/react-query, @tanstack/react-query-devtools
2. create a client like
   const queryClient = new QueryClient();
   then wrap the app with QueryClientProvider and pass the above created client
3. create a query, pass queryKey and queryFn as 2 mandatory fields
   use the isFetching, isError status first. if neither,then we can use the data to render
   in case the async queryFn throws error, it will retry again few times, before the query's status - isError becomes true
   isLoading -->
   true whenever the first fetch for a query is in-flight
   same as isFetching && isPending
   isPending -->
   if there's no cached data and no query attempt was finished yet
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
7. updated code to add dummy apis, 2 posts components with same query
   when each component mounts, the query gets called again and data will be fetched
8. add a stale time to override the default behaviour of query going to stale state immediately
   with this, when we change the posts component, the query wont be called again
   since the data is still fresh, until total of 2 mins
9. use refetchInterval in query to fetch the query every certain period of time
10. enabled property in the useQuery gives the ability to enable or disable a query / call at a later point of time when certain conditon is met.
    ex: subsequent api call / based on some user action
11. use the queryClient from the context and prefetchQuery on hover of the first post button. so that the data will be cached.
    when we go to the page first post, the content will load faster, because the data is already in cache.
