import {
  bcPostalCodeValidator,
  clinicNameValidator,
  clarificationCodeValidator,
  motorVehicleAccidentClaimNumberMaskValidator,
  diagnosticCodeValidator,
  birthDateValidator,
  serviceDateValidator,
} from "@/helpers/validators.js";

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
  const isCSRFunction = clarificationCodeValidator(true);
  const isNotCSRFunction = clarificationCodeValidator(false);

  afterEach(() => {
    jest.resetModules();
  });

  it("returns false if given an empty value (not CSR)", () => { 
    const result = isNotCSRFunction("")
    expect(result).toEqual(false);
  });

  it("returns false if given an empty value (CSR)", () => { 
    const result = isCSRFunction("")
    expect(result).toEqual(false);
  });

  it("returns false if given a value that's not on the list (not CSR)", () => {
    const result = isNotCSRFunction("potato");
    expect(result).toEqual(false);
  });

  it("returns true if given an alphanumeric value that's not on the list (CSR)", () => {
    const result = isCSRFunction("potato");
    expect(result).toEqual(true);
  });

  it("returns true if given a value that is on the list (not CSR)", () => {
    const result = isNotCSRFunction("AC");
    expect(result).toEqual(true);
  });

  it("returns true if given a value that is on the list (CSR)", () => {
    const result = isCSRFunction("AC");
    expect(result).toEqual(true);
  });

  it("returns false if given a non-alphanumeric value (not CSR)", () => { 
    const result = isNotCSRFunction("$$")
    expect(result).toEqual(false);
  });

  it("returns false if given a non-alphanumeric value (CSR)", () => { 
    const result = isCSRFunction("$$")
    expect(result).toEqual(false);
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

describe("validators.js birthDateValidator()", () => {
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

  it("returns true on valid date", () => {
    const testDate1 = {
      birthDateData: {
        year: 1990,
        month: 10,
        day: 11,
      },
    };
    const result = birthDateValidator("", testDate1);
    // expect(result).toEqual(false);
    expect(result).toEqual(true);
  });

  it("returns false on invalid date", () => {
    const testDate1 = {
      birthDateData: {
        year: 3.14,
        month: 3.14,
        day: 3.14,
      },
    };
    const result = birthDateValidator("", testDate1);
    // expect(result).toEqual(false);
    expect(result).toEqual(false);
  });
});

describe("validators.js serviceDateValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns true if given an empty value", () => {
    const result = serviceDateValidator("", "");
    expect(result).toEqual(true);
  });

  it("returns true if data contains null year, month, and day", () => {
    const testDate1 = {
      serviceDateData: {
        year: null,
        month: null,
        day: null,
      },
    };
    const result = serviceDateValidator("", testDate1);
    expect(result).toEqual(true);
  });

  it("returns false if some data not present (year)", () => {
    const testDate1 = {
      serviceDateData: {
        year: null,
        month: 12,
        day: 1,
      },
    };
    const result = serviceDateValidator("", testDate1);
    expect(result).toEqual(false);
  });

  it("returns false if some data not present (day)", () => {
    const testDate1 = {
      serviceDateData: {
        year: 1990,
        month: 12,
        day: null,
      },
    };
    const result = serviceDateValidator("", testDate1);
    expect(result).toEqual(false);
  });

  it("returns false if month is not a number", () => {
    const testDate1 = {
      serviceDateData: {
        year: 1990,
        month: "potato",
        day: 1,
      },
    };
    const result = serviceDateValidator("", testDate1);
    expect(result).toEqual(false);
  });

  it("returns true on valid date", () => {
    const testDate1 = {
      serviceDateData: {
        year: 1990,
        month: 10,
        day: 11,
      },
    };
    const result = serviceDateValidator("", testDate1);
    // expect(result).toEqual(false);
    expect(result).toEqual(true);
  });

  it("returns false on invalid date", () => {
    const testDate1 = {
      serviceDateData: {
        year: 3.14,
        month: 3.14,
        day: 3.14,
      },
    };
    const result = serviceDateValidator("", testDate1);
    // expect(result).toEqual(false);
    expect(result).toEqual(false);
  });
});

describe.only("validators.js motorVehicleAccidentClaimNumberMaskValidator()", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("returns false if given an empty value", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator();
    expect(result).toEqual(false);
  });

  it("returns false if given a string containing hyphens, periods, apostrophes, and spaces", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("-.'-.'-.");
    expect(result).toEqual(false);
  });

  it("returns false if given a string containing special characters", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("ÁḚȈỐÚÁḚȈ");
    expect(result).toEqual(false);
  });

  it("returns false if given a string containing other punctuation", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("()@#$%^&");
    expect(result).toEqual(false);
  });

  it("returns true if given a string containing two letters and six numbers", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("AA123456");
    expect(result).toEqual(true);
  });

  it("returns true if given a string containing one letter and seven numbers", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("A1234567");
    expect(result).toEqual(true);
  });

  it("returns false if given a string containing eight letters", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("ABCDEFGH");
    expect(result).toEqual(false);
  });

  it("returns false if given a string containing eight numbers", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("12345678");
    expect(result).toEqual(false);
  });

  it("returns false if given a string containing eight zeroes", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("00000000");
    expect(result).toEqual(false);
  });

  it("returns false if given a string with too few characters", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("A123456");
    expect(result).toEqual(false);
  });

  it("returns false if given a string with too few characters", () => {
    const result = motorVehicleAccidentClaimNumberMaskValidator("A12345678");
    expect(result).toEqual(false);
  });
});