export const bcPostalCodeValidator = (value) => {
  const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
  return criteria.test(value);
};
export const clinicNameValidator = (value) => {
  const criteria = /^[0-9a-zA-Z-.' ]*$/;
  return criteria.test(value);
}
