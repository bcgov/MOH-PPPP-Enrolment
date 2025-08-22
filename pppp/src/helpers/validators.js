import { getISODateString, isValidISODateString, alphanumericValidator } from "common-lib-vue";
import { isAfter, isBefore, startOfToday, subDays, parseISO, addDays } from "date-fns";
import { selectOptionsSpecialtyCode } from "@/constants/select-options";
import { diagnosticCodes } from "@/constants/diagnostic-codes";
import { helpers } from "@vuelidate/validators";
import { clarificationCodes } from "@/constants/clarification-codes";

export const validateIf = (prop, validator) =>
  helpers.withParams({ type: "validatedIf", prop }, function (value, parentVm) {
    return prop ? validator(value, parentVm) : true;
  });

export const bcPostalCodeValidator = (value) => {
  const criteria = RegExp("^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$");
  return criteria.test(value);
};

export const clarificationCodeValidator = (csr) => {
  return (value) => {
    if (csr) {
      return alphanumericValidator(value);
    }
    return clarificationCodes.indexOf(value) > -1;
  };
};

export const diagnosticCodeValidator = (value) => {
  return diagnosticCodes.indexOf(value) > -1;
};

export const birthDateValidator = (_, vm) => {
  const data = vm.birthDateData;
  if (!data || (!data.year && typeof data.month !== "number" && !data.day)) {
    return true;
  }
  const year = data.year;
  const month = data.month;
  const day = data.day;
  if (!(year && typeof month === "number" && day) && (year || typeof month === "number" || day)) {
    return false;
  }
  const isoDateString = getISODateString(year, month + 1, day);
  return isValidISODateString(isoDateString);
};

export const motorVehicleAccidentClaimNumberMaskValidator = (value) => {
  const criteria = new RegExp("^[A-Za-z][A-Za-z0-9]\\d\\d\\d\\d\\d\\d$");
  return criteria.test(value);
};

export const serviceDateValidator = (_, vm) => {
  const data = vm.serviceDateData;
  if (!data || (!data.year && typeof data.month !== "number" && !data.day)) {
    return true;
  }
  const year = data.year;
  const month = data.month;
  const day = data.day;
  if (!(year && typeof month === "number" && day) && (year || typeof month === "number" || day)) {
    return false;
  }
  const isoDateString = getISODateString(year, month + 1, day);
  return isValidISODateString(isoDateString);
};

export const submissionCodeValidator = (value, vm) => {
  const past90Days = subDays(startOfToday(), 90);
  const serviceDate = vm.serviceDate;
  if (!serviceDate) {
    return true;
  }
  if (isBefore(serviceDate, addDays(past90Days, 1))) {
    return !!value;
  }
  return true;
};

export const specialtyCodeValidator = (value) => {
  const index = selectOptionsSpecialtyCode.findIndex((item) => item.value === value);
  return index > -1;
};

export const serviceLocationCodeValidator = (value, vm) => {
  const serviceDate = vm.serviceDate;
  if (value === "A" && serviceDate && isAfter(serviceDate, subDays(parseISO("2021-10-01"), 1))) {
    return false;
  }
  return true;
};

export const serviceDateCutOffValidator = (value, vm) => {
  const locationOfService = vm.locationOfService;
  if (locationOfService === "A" && value && isAfter(value, subDays(parseISO("2021-10-01"), 1))) {
    return false;
  }
  return true;
};

export const phnNineValidator = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  if (value && value[0] === "9") {
    return true;
  }
  return false;
};
