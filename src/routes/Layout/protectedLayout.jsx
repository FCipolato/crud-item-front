import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedLayout() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    window.localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-mynav">
        <div className="container-fluid">
          <button
            type="submit"
            className="btn btn-link"
            onClick={() => handleLogOut()}
          >
            Logout
          </button>
        </div>
      </nav>
       <Outlet />
    </>
  );
}