import { useUserQuery } from "../generated/graphql";

function TodosPage() {
  const { data, loading, error } = useUserQuery();

  console.log({ data, loading, error });

  return data ? (
    <main>
      <span>{data.user?.name}</span>
    </main>
  ) : null;
}

export default TodosPage;
