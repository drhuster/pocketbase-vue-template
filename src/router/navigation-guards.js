import { useMainStore } from "@/stores/main";

const unsecuredPaths = ["home", "register", "login", "password-reset"];

const accessGuard = (to) => {
  if (unsecuredPaths.includes(to.name)) {
    return null;
  }
  const main = useMainStore();
  if (!main.isLoggedIn()) {
    return "/login";
  }
  return null;
};

export default { accessGuard };
