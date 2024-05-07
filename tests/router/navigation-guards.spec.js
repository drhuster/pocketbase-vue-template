import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useMainStore } from "@/stores/main";

import navigationGuard from "@/router/navigation-guards";

describe("navigationGuard", () => {
  let mainStore;
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
      })
    );
    vi.resetAllMocks();

    mainStore = useMainStore();
  });

  describe("unsecured routes", () => {
    it("continues to route when it is unsecured", () => {
      const actual = navigationGuard.accessGuard({ name: "home" });
      expect(mainStore.isLoggedIn).toHaveBeenCalledTimes(0);
      expect(actual).toEqual(null);
    });
  });

  describe("secured routes", () => {
    it("redirect to login if going to secure route and are not valid", () => {
      mainStore.isLoggedIn = vi.fn(() => false);
      const actual = navigationGuard.accessGuard({ name: "dashboard" });
      expect(actual).toEqual("/login");
    });
    it("continues to protected route if isLoggedIn", () => {
      mainStore.isLoggedIn = vi.fn(() => true);
      const actual = navigationGuard.accessGuard({ name: "dashboard" });
      expect(actual).toEqual(null);
    });
  });
});
