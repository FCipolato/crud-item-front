import { redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { deleteItem, getItems } from "../actions/item";
import { getStoredUser } from "../actions/auth";
import { useEffect, useState } from "react";

export async function loader() {
  try {
    const accessToken = getStoredUser();
    const items = await getItems(accessToken);
    return { items };
  } catch(e) {
    if(e.response.status === 401) {
      window.localStorage.removeItem('user');
      return redirect('/');
    }
    console.error('error', e);
  }
}

export default function Dashboard() {
  const [itemArray, setItemArray] = useState([]);
  const [idItemToDelete, setIdItemToDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useLoaderData();
  const { state } = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    setItemArray(items);
  }, [items]);

  const handleOpenModalDelete = (idItem) => {
    setIdItemToDelete(idItem);
  };

  const handleCloseModal = () => {
    setIdItemToDelete();
  };

  const handleDeleteItem = async () => {
    setIsLoading(true);
    try {
      const accessToken = getStoredUser();
      const deletedItem = await deleteItem(idItemToDelete, accessToken);
      setItemArray(items.filter(e => e._id !== deletedItem._id));
      handleCloseModal();
      setIsLoading(true);
    } catch(e) {
      if(e.response.status === 401) {
        window.localStorage.removeItem('user');
        navigate('/');
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight"><h2>Items</h2></div>
          <div className="p-2 bd-highlight">
            <button type="button" className="btn btn-secondary" onClick="showUserCreateBox()">New</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="col-3">Name</th>
                <th scope="col" className="col-7">Description</th>
                <th scope="col" className="col-1" />
                <th scope="col" className="col-1" />
              </tr>
            </thead>
            <tbody id="mytable">
              {state === "loading" ? (
                <tr>
                  <th scope="row" colSpan="5">Loading...</th>
                </tr>
              ) : (
                <>
                  {itemArray.length ? (
                    <>
                      {itemArray.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick="showUserEditBox()"
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleOpenModalDelete(item._id)}
                            >
                              Del
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <th scope="row" colSpan="5">No items</th>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {idItemToDelete && (
        <div className="modal bg-black d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleCloseModal()}
                  disabled={isLoading}
                />
              </div>
              <div className="modal-body">
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center"
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="sr-only" />
                  </div>
                ) : (
                  <p>Are you sure you want to delete the item?</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => handleCloseModal()}
                  disabled={isLoading}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDeleteItem()}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}   
    </>
  );
}