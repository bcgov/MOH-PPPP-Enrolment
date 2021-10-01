import {
  bcPostalCodeValidator,
  clinicNameValidator,
  clarificationCodeValidator,
  diagnosticCodeValidator,
  birthDateValidator,
  serviceDateValidator,
} from "@/helpers/validators.js";
import * as commonLibRaw from "common-lib-vue";

const commonLib = { ...commonLibRaw}

const spyOnGetISO = jest.spyOn(commonLib, "getISODateString");
const spyOnIsValidISO = jest.spyOn(commonLib, "isValidISODateString");

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

describe("validators.js clinicNameValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns true if given an empty value", () => {
    const result = clinicNameValidator();
    expect(result).toEqual(true);
  });

  it("returns true if given a string containing letters and numbers", () => {
    const result = clinicNameValidator("AAAaaa111");
    expect(result).toEqual(true);
  });

  it("returns true if given a string containing hyphens, periods, apostrophes, and spaces", () => {
    const result = clinicNameValidator("-.' -.' -.' ");
    expect(result).toEqual(true);
  });

  it("returns false if given a string containing special characters", () => {
    const result = clinicNameValidator("ÁḚȈỐÚ");
    expect(result).toEqual(false);
  });

  it("returns false if given a string containing other punctuation", () => {
    const result = clinicNameValidator("()@#$%^&*");
    expect(result).toEqual(false);
  });
});

describe("validators.js clarificationCodeValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns false if given an empty value", () => {
    const result = clarificationCodeValidator();
    expect(result).toEqual(false);
  });

  it("returns false if given a value that's not on the list", () => {
    const result = clarificationCodeValidator("potato");
    expect(result).toEqual(false);
  });

  it("returns true if given a value that is on the list", () => {
    const result = clarificationCodeValidator("AC");
    expect(result).toEqual(true);
  });
});

describe("validators.js diagnosticCodeValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns false if given an empty value", () => {
    const result = diagnosticCodeValidator();
    expect(result).toEqual(false);
  });

  it("returns false if given a value that's not on the list", () => {
    const result = diagnosticCodeValidator("potato");
    expect(result).toEqual(false);
  });

  it("returns true if given a value that is on the list", () => {
    const result = diagnosticCodeValidator("01A");
    expect(result).toEqual(true);
  });
});

describe.only("validators.js birthDateValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns true if given an empty value", () => {
    const result = birthDateValidator("", "");
    expect(result).toEqual(true);
  });

  it("returns true if data contains null year, month, and day", () => {
    const testDate1 = {
      birthDateData: {
        year: null,
        month: null,
        day: null,
      },
    };
    const result = birthDateValidator("", testDate1);
    expect(result).toEqual(true);
  });

  it("returns false if some data not present (year)", () => {
    const testDate1 = {
      birthDateData: {
        year: null,
        month: 12,
        day: 1,
      },
    };
    const result = birthDateValidator("", testDate1);
    expect(result).toEqual(false);
  });

  it("returns false if some data not present (day)", () => {
    const testDate1 = {
      birthDateData: {
        year: 1990,
        month: 12,
        day: null,
      },
    };
    const result = birthDateValidator("", testDate1);
    expect(result).toEqual(false);
  });

  it("returns false if month is not a number", () => {
    const testDate1 = {
      birthDateData: {
        year: 1990,
        month: "potato",
        day: 1,
      },
    };
    const result = birthDateValidator("", testDate1);
    expect(result).toEqual(false);
  });

  it.only("calls getISODateString on valid date", () => {
    const testDate1 = {
      birthDateData: {
        year: 1990,
        month: 12,
        day: 1,
      },
    };
    const result = birthDateValidator("", testDate1);
    // expect(result).toEqual(false);
    expect(spyOnGetISO).toHaveBeenCalled();
  });
});

describe.skip("validators.js serviceDateValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns false if given an empty value", () => {
    const result = serviceDateValidator();
    expect(result).toEqual(false);
  });
});
