import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import pbHelper from "@/utilities/pb-helper";

import { useMainStore } from "@/stores/main.js";

vi.mock("../../src/utilities/pb-helper");

describe("main store", () => {
  let mainStore, mockPB;
  beforeEach(() => {
    pbHelper.logout = vi.fn();
    pbHelper.create = vi.fn();
    pbHelper.requestVerification = vi.fn();
    setActivePinia(createPinia());

    mainStore = useMainStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should clear store when clear is called", () => {
    mainStore.clear();
    expect(mainStore.user).toEqual({});
  });

  it("calls create on register", async () => {
    await mainStore.register("username", "email", "password", "password");
    expect(pbHelper.create).toHaveBeenCalledWith("users", {
      username: "username",
      email: "email",
      emailVisibility: false,
      password: "password",
      passwordConfirm: "password",
    });
    expect(pbHelper.requestVerification).toHaveBeenCalled();
  });

  it("logout when pb is called", () => {
    mainStore.logout();
    expect(pbHelper.logout).toHaveBeenCalled();
  });

  it("on successful login, user sets user data and loads all data", async () => {
    pbHelper.getAll = vi.fn().mockResolvedValue([]);
    pbHelper.isLoggedIn = vi.fn().mockReturnValue(true);
    pbHelper.login = vi.fn().mockResolvedValue({
      name: "user",
    });
    const actual = await mainStore.login("email", "bad-password");
    expect(mainStore.user.name).toEqual("user");
    expect(actual).toEqual(true);

    // expect(pbHelper.getAll).toHaveBeenCalledWith("YOUR COLLECTION");
  });

  it("returns false if user fails to logs in", async () => {
    pbHelper.isLoggedIn = vi.fn().mockReturnValue(false);
    pbHelper.login = vi.fn().mockResolvedValue({
      name: "user",
    });
    const actual = await mainStore.login("email", "bad-password");
    expect(actual).toEqual(false);
  });

  it("returns if user is logged in", async () => {
    pbHelper.isLoggedIn = vi.fn().mockReturnValue(true);
    const actual = mainStore.isLoggedIn();
    expect(actual).toEqual(true);
  });

  it("loadAll gets data and maps", async () => {
    pbHelper.getAll = vi.fn().mockResolvedValue([]);
    await mainStore.loadAll();
    // expect(pbHelper.getAll).toHaveBeenCalledWith("YOUR COLLECTION");
  });
});
