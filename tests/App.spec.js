import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import AppVue from "@/App.vue";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("App.vue", () => {
  it("renders", () => {
    const wrapper = mount(AppVue, {
      stubs: ["router-view"],
      pinia: createTestingPinia,
    });

    expect(wrapper.text()).toMatch("");
  });
});
