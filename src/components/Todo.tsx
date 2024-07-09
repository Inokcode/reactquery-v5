import { useTodos, useTodosIds } from "../services/queries";
// import { useIsFetching } from "@tanstack/react-query";

export default function Todo() {
  const todosIdsQuery = useTodosIds();
  const todoQueries = useTodos(todosIdsQuery.data);
  //   const isFetching = useIsFetching();

  //   if (todosIdsQuery.isPending) {
  //     return <span>loading...</span>;
  //   }

  //   if (todosIdsQuery.isError) {
  //     return <span>There is an error</span>;
  //   }

  return (
    <div>
      {/* <p>Query function status: {todosIdsQuery.fetchStatus}</p>
      <p>Query data status:{todosIdsQuery.status}</p>
      <p>Global isFetching:{isFetching}</p> */}
      {todosIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}

      <ul>
        {todoQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id:{data?.id}</div>
            <span>
              <strong>Title:</strong> {data?.title},
              <strong>Description:</strong>
              {data?.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
