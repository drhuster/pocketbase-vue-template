import { afterEach, describe, it, expect, beforeEach, vi } from "vitest";
import navigationGuards from "@/router/navigation-guards";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

import router from "@/router/index.js";

vi.mock("../../src/router/navigation-guards.js");

describe("router", () => {
  beforeEach(() => {
    navigationGuards.accessGuard = vi.fn();
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("is using history mode", () => {
    expect(router.options.history).toBeDefined();
  });

  it("sets scroll behavior", () => {
    expect(router.options.scrollBehavior()).toEqual({ top: 0 });
  });

  it("calls the navigation guard", async () => {
    navigationGuards.accessGuard = vi.fn().mockImplementation((to) => {
      if (to.path === "/invalid-path") {
        return "/redirect-path";
      } else {
        return null;
      }
    });
    await router.push("/invalid-path");
    expect(navigationGuards.accessGuard).toHaveBeenCalled();
    expect(router.currentRoute.value.path).toEqual("/redirect-path");
    await router.push("/valid-path");
    expect(navigationGuards.accessGuard).toHaveBeenCalled();
    expect(router.currentRoute.value.path).toEqual("/valid-path");
  });
});
