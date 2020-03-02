import store from "./store";

export default (to, from, next) => {
  if (!store.getters.manager) {
    next({
      path: "/signin"
    });
  } else {
    next();
  }
};
