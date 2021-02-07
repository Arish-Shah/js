import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  useUserQuery,
  useAddTodoMutation,
  UserDocument,
  useUpdateTodoMutation,
  Todo
} from "../generated/graphql";

interface Props {
  setToken: (tokenString: string) => void;
}

function TodosPage({ setToken }: Props) {
  const { data } = useUserQuery({
    fetchPolicy: "network-only"
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      addTodo({
        variables: {
          title: inputRef.current.value
        },
        update(cache, { data }) {
          const { user } = cache.readQuery({ query: UserDocument }) as any;
          const todos = user.todos;
          const updatedTodos = [...todos, data?.addTodo];
          cache.writeQuery({
            query: UserDocument,
            data: {
              user: {
                ...user,
                todos: updatedTodos
              }
            }
          });
        }
      });
    }
  };

  const handleTodoChange = async (_id: string, done: boolean) => {
    updateTodo({
      variables: { _id, done }
    });
  };

  const handleLogout = () => {
    setToken("");
  };

  return data ? (
    <Fragment>
      <div className="flex justify-between">
        <h2>Hi, {data?.user?.name}</h2>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
      <main className="container">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter task" ref={inputRef} />
          <button>Add</button>
        </form>
        <ul>
          {data.user?.todos?.map(todo => (
            <li key={todo._id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={e => handleTodoChange(todo._id, e.target.checked)}
                />
                {todo.done ? <del>{todo.title}</del> : todo.title}
              </label>
            </li>
          ))}
        </ul>
      </main>
    </Fragment>
  ) : null;
}

export default TodosPage;
