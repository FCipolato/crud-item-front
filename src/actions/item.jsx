import api from "../services/bff";

export async function getItems(accessToken) {
  let { data } = await api.get('items', {headers: {Authorization: `Bearer ${accessToken}`}});
  if (!data) data = [];
  return data;
}

export async function deleteItem(id, accessToken) {
  const { data } = await api.delete(`items/${id}`, {headers: {Authorization: `Bearer ${accessToken}`}});
  return data;
}

export async function newItem(newItem, accessToken) {
    const { data } = await api.post("items", newItem, {headers: {Authorization: `Bearer ${accessToken}`}});
    return data;
}

export async function editItem(id, editItem, accessToken) {
  const { data } = await api.patch(`items/${id}`, editItem, {headers: {Authorization: `Bearer ${accessToken}`}});
  return data;
}

export async function getItem(id, accessToken) {
  const { data } = await api.get(`items/${id}`, {headers: {Authorization: `Bearer ${accessToken}`}});
  return data;
}