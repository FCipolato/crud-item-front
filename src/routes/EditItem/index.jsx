import { redirect, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { editItem, getItem } from "../../actions/item";
import { useEffect, useState } from "react";
import { getStoredUser } from "../../actions/auth";
import './styles.scss';

export async function action({ request, params }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const accessToken = getStoredUser();
    await editItem(params.id, data, accessToken);
    return redirect('/dashboard');
  } catch(e) {
    if(e.response.status === 401) {
      window.localStorage.removeItem('user');
      return redirect('/');
    }
    console.error('error', e);
  }
}

export async function loader({ params }) {
  try {
    const accessToken = getStoredUser();
    const item = await getItem(params.id, accessToken);
    if (!item) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { item };
  } catch(e) {
    if(e.response.status === 401) {
      window.localStorage.removeItem('user');
      return redirect('/');
    }
    console.error('error', e);
  }
}

export default function EditItem() {
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const { item } = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  useEffect(() => {
    setInputValueName(item.name);
    setInputValueDesc(item.description);
  }, [item])

  const handleInputNameItemChange = (event) => {
    setInputValueName(event.target.value);
  };

  const handleInputDescItemChange = (event) => {
    setInputValueDesc(event.target.value);
  };

  return (
    <div className="container crud-edit-page">
      <div className="row justify-content-center align-items-center h-100 row">
        <fetcher.Form method="post" className="col-12 col-md-8" id="item-form">
          <h1 className="h3 mb-3 fw-normal">Edit Item</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floating-input-name"
              name="name"
              placeholder="Item name"
              defaultValue={item.name}
              onChange={handleInputNameItemChange}
            />
            <label htmlFor="form-floating" className="form-label">Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="floating-input-description"
              name="description"
              placeholder="Item description"
              defaultValue={item.description}
              onChange={handleInputDescItemChange}
            />
            <label className="form-label">Description</label>
          </div>
          <div className="new-group-button">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={ () => navigate(-1) }
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              disabled={!(inputValueName && inputValueDesc) || fetcher.state === 'submitting'}
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
              ) : 'Save'}
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div> 
  );
}