import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login, {
  action as loginUser,
  loader as loginLoader
} from './routes/login.jsx';
import Dashboard, {
  loader as itemsLoader,
} from './routes/dashboard.jsx';
import ProtectedLayout from './routes/Layout/protectedLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        index
        element={<Login />}
        action={loginUser}
        loader={loginLoader}
        errorElement={<Login hasError />}
      />
      <Route
        element={<ProtectedLayout />}
      >
        <Route
          path='dashboard'
          element={<Dashboard />}
          loader={itemsLoader}
        />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className='w-100 h-100 m-auto'>
      <RouterProvider router={ router } />
    </main>
  </React.StrictMode>,
)
