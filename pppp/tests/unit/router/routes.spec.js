import { isPastPath, payPatientRouteStepOrder } from "@/router/routes.js";

const stepOrderLength = payPatientRouteStepOrder.length;

describe("Helper routes.js isPastPath", () => {
  it("returns false on invalid data", () => {
    const result = isPastPath("default1", "default2");

    expect(result).toBe(false);
  });

  it("returns false if argument 1 doesn't exist in the path order but argument 2 does", () => {
    const result = isPastPath("default1", payPatientRouteStepOrder[0].path);

    expect(result).toBe(false);
  });

  it("returns true if argument 2 doesn't exist in the path order but argument 1 does", () => {
    const result = isPastPath(payPatientRouteStepOrder[0].path, "default2");

    expect(result).toBe(true);
  });

  it("returns true if first argument is before the second argument in step order", () => {
    const result = isPastPath(
      payPatientRouteStepOrder[0].path,
      payPatientRouteStepOrder[1].path
    );

    expect(result).toBe(true);
  });

  it("returns true if first argument is before the second argument in step order (case 2)", () => {
    const result = isPastPath(
      payPatientRouteStepOrder[stepOrderLength - 2].path,
      payPatientRouteStepOrder[stepOrderLength - 1].path
    );

    expect(result).toBe(true);
  });

  it("returns false if second argument is before the first argument in step order", () => {
    const result = isPastPath(
      payPatientRouteStepOrder[1].path,
      payPatientRouteStepOrder[0].path
    );

    expect(result).toBe(false);
  });

  it("returns false if second argument is before the first argument in step order (case 2)", () => {
    const result = isPastPath(
      payPatientRouteStepOrder[stepOrderLength - 1].path,
      payPatientRouteStepOrder[stepOrderLength - 2].path
    );

    expect(result).toBe(false);
  });
});
