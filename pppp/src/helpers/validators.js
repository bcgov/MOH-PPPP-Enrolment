import {
  getISODateString,
  isValidISODateString,
  alphanumericValidator
} from 'common-lib-vue';
import {
  isAfter,
  isBefore,
  startOfToday,
  subDays,
  parseISO,
  addDays,
} from 'date-fns';
import { selectOptionsSpecialtyCode } from '@/constants/select-options';
import { diagnosticCodes } from '@/constants/diagnostic-codes';

export const bcPostalCodeValidator = (value) => {
  const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
  return criteria.test(value);
};

export const clinicNameValidator = (value) => {
  const criteria = /^[0-9a-zA-Z-.' ]*$/;
  return criteria.test(value);
};

export const clarificationCodeValidator = (csr) => {
  return (value) => {
    if (csr) {
      return alphanumericValidator(value);
    }
    const codes = ["AC","A1","A2","A3","A4","A5","A6","A7","A8","BA","BB","BR","B1","B2","B3","B4","B5","B6","B7","B8","B9","CA","CB","CC","CE","CF","CH","CL","CM","CN","CR","CS","CV","C2","C3","C4","C5","C6","C7","C8","D1","D2","D3","D4","D5","E1","E2","E3","F1","F2","F3","F4","F5","F6","F7","GF","GK","GR","G1","G2","G3","G4","G5","G6","G7","G8","G9","H1","H2","H3","H4","H5","H6","H7","H8","H9","KK","KL","KM","K1","K2","K3","K4","K5","K6","K7","K8","K9","LS","L1","L2","L3","L4","L5","L6","L7","L8","MB","MC","MH","MR","MT","M1","M2","M3","M4","M5","M6","M7","M8","M9","NA","NT","NV","N1","N2","N3","N4","N5","OL","OS","PA","PF","PG","PI","PN","PQ","PR","PV","P1","P2","P3","P4","P5","P6","P7","P8","P9","Q1","Q2","Q3","Q4","R1","R2","R3","R4","SA","SB","SC","SD","SE","SG","SI","SK","SL","SM","SN","SO","SP","SQ","SS","ST","SU","SV","SZ","S1","S2","S3","S4","S5","S6","S7","S8","S9","TA","TC","TK","TL","TP","TR","T1","T2","T3","T4","T5","T6","T7","T8","T9","U1","VM","V1","V2","WE","WY","W1","W3","W4","W5","W6","W7","W8","Y1","Z1"];
    return codes.indexOf(value) > -1;
  };
};

export const diagnosticCodeValidator = (value) => {
  return diagnosticCodes.indexOf(value) > -1;
};

export const birthDateValidator = (_, vm) => {
  const data = vm.birthDateData;
  if (!data || (!data.year && typeof data.month !== 'number' && !data.day)) {
    return true;
  }
  const year = data.year;
  const month = data.month;
  const day = data.day;
  if (!(year && typeof month === 'number' && day)
    && (year || typeof month === 'number' || day)) {
    return false;
  }
  const isoDateString = getISODateString(year, month + 1, day);
  return isValidISODateString(isoDateString);
};

export const serviceDateValidator = (_, vm) => {
  const data = vm.serviceDateData;
  if (!data || (!data.year && typeof data.month !== 'number' && !data.day)) {
    return true;
  }
  const year = data.year;
  const month = data.month;
  const day = data.day;
  if (!(year && typeof month === 'number' && day)
    && (year || typeof month === 'number' || day)) {
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
  if (value === 'A' && serviceDate && isAfter(serviceDate, subDays(parseISO('2021-10-01'), 1))) {
    return false;
  }
  return true;
};

export const serviceDateCutOffValidator = (value, vm) => {
  const locationOfService = vm.locationOfService;
  if (locationOfService === 'A' && value && isAfter(value, subDays(parseISO('2021-10-01'), 1))) {
    return false;
  }
  return true;
}