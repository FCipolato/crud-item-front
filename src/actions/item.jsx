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