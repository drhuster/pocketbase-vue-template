import { defineStore } from "pinia";
import pbHelper from "@/utilities/pb-helper";

export const useMainStore = defineStore("main", {
  state: () => ({
    user: {},
  }),
  actions: {
    clear() {
      this.user = {};
    },
    async register(username, email, password, passwordConfirm) {
      const data = {
        username: username,
        email: email,
        emailVisibility: false,
        password,
        passwordConfirm,
      };

      const record = await pbHelper.create("users", data);

      return await pbHelper.requestVerification(email);
    },
    async requestPasswordRest(email) {
      return await pbHelper.requestPasswordReset(email);
    },
    async sendVerificationEmail(email) {
      return await pbHelper.sendVerificationEmail(email);
    },
    logout() {
      pbHelper.logout();
    },
    async login(email, password) {
      const authData = await pbHelper.login(email, password);
      if (pbHelper.isLoggedIn()) {
        this.user = authData;
        await this.loadAll();
        return true;
      }
      return false;
    },
    isLoggedIn() {
      return pbHelper.isLoggedIn();
    },
    async loadAll() {
      // LOAD YOUR DATA
      // const dbData = await pbHelper.getAll("YOUR COLLECTION");
    },
  },
  persist: true,
});
