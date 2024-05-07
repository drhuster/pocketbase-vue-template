import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_APP_POCKETBASE_URL);

const login = async (email, password) => {
  return pb.collection("users").authWithPassword(email, password);
};

const logout = () => {
  pb.authStore.clear();
};

const requestPasswordReset = async (email) => {
  return pb.collection("users").requestPasswordReset(email);
};

const sendVerificationEmail = async (email) => {
  return pb.collection("users").requestVerification(email);
};

const isLoggedIn = () => {
  return pb.authStore.isValid;
};

const requestVerification = async (email) => {
  return pb.collection("users").requestVerification(email);
};

const create = async (collectionName, data) => {
  return pb.collection(collectionName).create(data);
};

const get = async (collectionName, filter) => {
  return pb.collection(collectionName).getFullList({
    filter,
    sort: "-created",
  });
};

const getAll = async (collectionName) => {
  return pb.collection(collectionName).getFullList({
    sort: "-created",
  });
};

const update = async (collectionName, itemId, data) => {
  return pb.collection(collectionName).update(itemId, data);
};

const deleteItem = async (collectionName, itemId) => {
  return pb.collection(collectionName).delete(itemId);
};

export default {
  login,
  logout,
  requestPasswordReset,
  sendVerificationEmail,
  isLoggedIn,
  requestVerification,
  create,
  get,
  getAll,
  update,
  deleteItem,
};
