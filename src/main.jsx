import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login, {
  action as loginUser,
  loader as loginLoader
} from './routes/Login';
import Dashboard, {
  loader as itemsLoader,
} from './routes/Dashboard';
import NewItem, {
  action as createItem,
} from "./routes/NewItem";
import EditItem, {
  action as editAction,
  loader as itemLoader,
} from './routes/EditItem';
import ProtectedLayout from './routes/Layout/protectedLayout.jsx';
import NotFound from './routes/NotFound';

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
        errorElement={<NotFound />}
      >
        <Route
          path='dashboard'
          element={<Dashboard />}
          loader={itemsLoader}
        />
        <Route
          path='dashboard/item/new'
          element={<NewItem />}
          action={createItem}
        />
        <Route
          path='dashboard/item/:id'
          element={<EditItem />}
          loader={itemLoader}
          action={editAction}
        />
      </Route>
      <Route path='*' element={<NotFound />} />
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
