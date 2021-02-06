import { Fragment, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";

enum Page {
  LOGIN,
  REGISTER
}

interface Props {
  setToken: (tokenString: string) => void;
}

function AuthPage({ setToken }: Props) {
  const [page, setPage] = useState<Page>(Page.REGISTER);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [registerMutation] = useRegisterMutation();
  const [loginMutation] = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (page === Page.LOGIN) {
      login(values.email, values.password);
    } else {
      register(values.email, values.password, values.name);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    registerMutation({
      variables: { email, password, name }
    })
      .then(response => {
        if (response.data?.register?.token)
          setToken(response.data.register.token);
      })
      .catch(error => console.log(error));
  };

  const login = async (email: string, password: string) => {
    loginMutation({
      variables: { email, password }
    })
      .then(response => {
        if (response.data?.login?.token) setToken(response.data.login.token);
      })
      .catch(error => console.log(error));
  };

  return (
    <Fragment>
      <h1>Auth Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        {page === Page.REGISTER && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={e =>
                setValues(values => ({ ...values, name: e.target.value }))
              }
            />
          </div>
        )}
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={e =>
              setValues(values => ({ ...values, email: e.target.value }))
            }
          />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={e =>
              setValues(values => ({ ...values, password: e.target.value }))
            }
          />
        </div>
        <div>
          <button type="submit">
            {page === Page.LOGIN ? "Log in" : "Sign up"}
          </button>
          <button
            type="button"
            onClick={() =>
              setPage(page =>
                page === Page.LOGIN ? Page.REGISTER : Page.LOGIN
              )
            }
          >
            Switch to {page === Page.LOGIN ? "Sign up" : "Log in"}
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default AuthPage;
