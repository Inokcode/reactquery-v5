import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";
// import { useIsFetching } from "@tanstack/react-query";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todoQueries = useTodos(todosIdsQuery.data);
  //   const isFetching = useIsFetching();

  //   if (todosIdsQuery.isPending) {
  //     return <span>loading...</span>;
  //   }

  //   if (todosIdsQuery.isError) {
  //     return <span>There is an error</span>;
  //   }

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  //
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const { register, handleSubmit } = useForm<Todo>();

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
          <h4>New todo:</h4>
          <input placeholder="Title" {...register("title")} />
          <br />
          <input placeholder="Description" {...register("description")} />
          <br />
          <input
            type="submit"
            disabled={createTodoMutation.isPending}
            value={createTodoMutation.isPending ? "Creating..." : "Create todo"}
          />
        </form>
      </div>
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
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "done" : "Mark as done"}
              </button>
              {data && data.id && (
                <button onClick={() => handleDeleteTodo(data.id!)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
