import * as scroll from "@/helpers/scroll.js";
import { nextTick } from "vue";

const spyOnWindowScrollTo = vi.spyOn(window, "scrollTo");

const spyOnScrollToElement = vi.spyOn(scroll, "scrollToElement");
const spyOnScrollTo = vi.spyOn(scroll, "scrollTo");

describe("Helper scroll.js scrollTo()", () => {
  beforeEach(() => {
    //to prevent JSDOM console errors about window.scrollTo not being implemented
    window.scrollTo = () => {};
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls window.scrollTo() when helperscrollTo() is called", () => {
    scroll.scrollTo(0);
    expect(spyOnWindowScrollTo).toHaveBeenCalled();
  });
});

//unfortunately, due to the nested function calls,
//further testing is not possible without refactoring the source code
//more details available in this SO link:
//https://stackoverflow.com/questions/51269431/jest-mock-inner-function/55193363#55193363
//https://vitest.dev/guide/mocking.html#mocking-pitfalls
//I've left the half-finished tests skipped below in case somebody gets them working later

describe.skip("Helper scroll.js scrollToError()", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls scrollToElement() when scrollToError() is called", async () => {
    vi.useFakeTimers();
    scroll.scrollToError();
    vi.advanceTimersByTime(5);
    await nextTick();
    expect(spyOnScrollToElement).toHaveBeenCalled();
  });
});

describe.skip("Helper scroll.js scrollToElement()", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("returns undefined when scrollToElement() is called without arguments", () => {
    expect(scroll.scrollToElement()).toBeUndefined();
  });

  it("calls spyOnScrollTo when called with an argument", async () => {
    vi.useFakeTimers();
    scroll.scrollTo();
    vi.advanceTimersByTime(5);
    await nextTick();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});
