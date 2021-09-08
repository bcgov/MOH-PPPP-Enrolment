import { bcPostalCodeValidator,
  clinicNameValidator,
  clarificationCodeValidator,
  diagnosticCodeValidator,
  birthDateValidator,
  serviceDateValidator, } from "@/helpers/validators.js";

describe("validators.js bcPostalCodeValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns false if not given a value", () => {
    const result = bcPostalCodeValidator();
    expect(result).toEqual(false);
  });

  it("returns true if given a BC postal code", () => {
    const result = bcPostalCodeValidator("V8W1L4");
    expect(result).toEqual(true);
  });

  it("returns true if given a BC postal code with a space in it", () => {
    const result = bcPostalCodeValidator("V8W 1L4");
    expect(result).toEqual(true);
  });

  it("returns false if given an Alberta postal code", () => {
    const result = bcPostalCodeValidator("T5T 0A2");
    expect(result).toEqual(false);
  });
});