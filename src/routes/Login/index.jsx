import { useState } from "react";
import { redirect, useFetcher } from "react-router-dom";
import { loginUser } from "../../actions/auth";

export async function loader() {
  return window.localStorage.getItem('user') && redirect('/dashboard');
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { access_token } = await loginUser(data);
    window.localStorage.setItem('user', access_token);
    return redirect('/dashboard');
  } catch(e) {
    console.error('error', e);
  }
}

export default function Login({ hasError }) {
  const [inputValueUser, setInputValueUser] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");
  const fetcher = useFetcher();

  const handleInputUserChange = (event) => {
    setInputValueUser(event.target.value);
  };

  const handleInputPassChange = (event) => {
    setInputValuePass(event.target.value);
  };

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <fetcher.Form method="post" className="col-10 col-md-4" id="user-form">
          {hasError && 
            <div className="alert alert-danger" role="alert">
              Username or password is invalid!
            </div>
          }
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floating-input-user"
              name="username"
              placeholder="Username"
              onChange={handleInputUserChange}
            />
            <label htmlFor="form-floating" className="form-label">User</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floating-input-pass"
              name="password"
              placeholder="Password"
              onChange={handleInputPassChange}
            />
            <label className="form-label">Password</label>
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={!(inputValueUser && inputValuePass) || fetcher.state === 'submitting'}
          >
            {fetcher.state === "submitting"? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only" />
              </>
            ) : 'Submit'}
          </button>
        </fetcher.Form>
      </div>
    </div> 
  );
}