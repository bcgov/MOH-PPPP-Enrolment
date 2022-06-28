<template>
  <div>
    <div class="row mb-3">
      <div class="col-md-3">
        <SelectComponent label='Month:'
              :id="'hvc-month-' + index"
              :cypressId="'hospitalClaimMonth' + index"
              v-model='claim.month'
              :options='monthOptions'
              @blur='handleBlurField(v$.month)' />
      </div>
      <div class="col-md-3">
        <DigitInput label='Day From:'
              :id="'hvc-day-from-' + index"
              :cypressId="'hospitalClaimDayFrom' + index"
              maxlength="2"
              v-model='claim.dayFrom'
              @blur='handleBlurField(v$.dayFrom)' />
      </div>
      <div class="col-md-3">
        <DigitInput 
              :label='"Day To" + (isCSR ? "" : " (optional)") + ":"'
              :id="'hvc-day-to-' + index"
              maxlength="2"
              v-model='claim.dayTo'
              @blur='handleBlurField(v$.dayTo)' />
      </div>
      <div class="col-md-3">
        <DigitInput label='Year:'
              :id="'hvc-year-' + index"
              :cypressId="'hospitalClaimYear' + index"
              maxlength="4"
              v-model='claim.year'
              @blur='handleBlurField(v$.year)' />
      </div>
    </div>

    <div class="text-danger"
        v-if="v$.month.$dirty && !v$.month.required"
        aria-live="assertive">Month is required.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty && v$.month.required && !v$.month.intValidator"
        aria-live="assertive">Month must be an integer.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty && v$.month.required && !v$.month.positiveNumberValidator"
        aria-live="assertive">Month must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.dayFrom.$dirty && !v$.dayFrom.required"
        aria-live="assertive">Day From is required.</div>
    <div class="text-danger"
        v-if="v$.dayFrom.$dirty && v$.dayFrom.required && !v$.dayFrom.intValidator"
        aria-live="assertive">Day from must be an integer.</div>
    <div class="text-danger"
        v-if="v$.dayFrom.$dirty && v$.dayFrom.required && !v$.dayFrom.positiveNumberValidator"
        aria-live="assertive">Day from must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.dayTo.$dirty && !v$.dayTo.intValidator"
        aria-live="assertive">Day to must be an integer.</div>
    <div class="text-danger"
        v-if="v$.dayTo.$dirty && !v$.dayTo.positiveNumberValidator"
        aria-live="assertive">Day to must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.year.$dirty && !v$.year.required"
        aria-live="assertive">Year is required.</div>
    <div class="text-danger"
        v-if="v$.year.$dirty && v$.year.required && !v$.year.intValidator"
        aria-live="assertive">Year must be an integer.</div>
    <div class="text-danger"
        v-if="v$.year.$dirty && v$.year.required && !v$.year.positiveNumberValidator"
        aria-live="assertive">Year must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && v$.month.required
            && v$.dayFrom.required
            && v$.year.required
            && !v$.hospitalVisitDateValidator"
        aria-live="assertive">Hospital Service date must be valid.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && v$.month.required
            && v$.dayFrom.required
            && v$.year.required
            && v$.hospitalVisitDateValidator
            && !v$.hospitalVisitDatePastValidator"
        aria-live="assertive">Hospital Service Day From is over 18 months in the past.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && v$.month.required
            && v$.dayFrom.required
            && v$.year.required
            && v$.hospitalVisitDateValidator
            && !v$.hospitalVisitDateFutureValidator"
        aria-live="assertive">Hospital Service Day From cannot be in the future.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && v$.month.required
            && v$.dayFrom.required
            && v$.year.required
            && v$.hospitalVisitDateValidator
            && v$.hospitalVisitDateFutureValidator
            && !v$.hospitalVisitDateToFutureValidator"
        aria-live="assertive">Hospital Service Day To cannot be in the future.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && v$.month.required
            && v$.dayFrom.required
            && v$.year.required
            && v$.hospitalVisitDateValidator
            && v$.hospitalVisitDatePastValidator
            && v$.hospitalVisitDateFutureValidator
            && !v$.hospitalVisitDateRangeValidator"
        aria-live="assertive">Hospital Service date range must be valid.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
          && v$.dayFrom.$dirty
          && v$.year.$dirty
          && v$.month.required
          && v$.dayFrom.required
          && v$.year.required
          && v$.hospitalVisitDateValidator
          && v$.hospitalVisitDatePastValidator
          && v$.hospitalVisitDateFutureValidator
          && !v$.hospitalVisitDateCutOffValidator"
        aria-live="assertive">Service Date is invalid for the Service Location Code.</div>
    <DigitInput label='Number of Services:'
          :id='"hvc-number-of-services-" + index'
          :cypressId="'hospitalClaimNumberOfServices' + index"
          class='mt-3'
          maxlength="2"
          v-model='claim.numberOfServices'
          :inputStyle='extraSmallStyles'
          @blur='handleBlurField(v$.numberOfServices)' />
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty && !v$.numberOfServices.required"
        aria-live="assertive">Number of Services is required.</div>
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty && v$.numberOfServices.required && !v$.numberOfServices.intValidator"
        aria-live="assertive">Number of Services must be an integer.</div>
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty && v$.numberOfServices.required && !v$.numberOfServices.positiveNumberValidator"
        aria-live="assertive">Number of Services must be greater than 0.</div>
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty
          && v$.numberOfServices.required
          && v$.numberOfServices.positiveNumberValidator
          && !v$.numberOfServices.nonZeroNumberValidator"
        aria-live="assertive">Number of Services must be greater than 0.</div>
    <InputComponent 
          :label='"Service Clarification Code" + (isCSR ? "" : " (optional)") + ":"'
          :id='"hvc-service-clarification-code-" + index'
          class='mt-3'
          maxlength="2"
          v-model='claim.serviceClarificationCode'
          :isUpperCaseForced='true'
          :inputStyle='extraSmallStyles'
          @blur='handleBlurField(v$.serviceClarificationCode)' />
    <div class="text-danger"
        v-if="v$.serviceClarificationCode.$dirty && !v$.serviceClarificationCode.clarificationCodeValidator"
        aria-live="assertive">Service Clarification Code is invalid.</div>
    <DigitInput label='Fee Item:'
          :id='"hvc-fee-item-" + index'
          :cypressId="'hospitalClaimFeeItem' + index"
          class='mt-3'
          maxlength="5"
          v-model='claim.feeItem'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.feeItem)'
          @input='handleInputHospitalVisitFeeItem(index)' />
    <div class="text-danger"
        v-if="v$.feeItem.$dirty && !v$.feeItem.required"
        aria-live="assertive">Fee Item is required.</div>
    <div class="text-danger"
        v-if="v$.feeItem.$dirty && v$.feeItem.required && !v$.feeItem.intValidator"
        aria-live="assertive">Fee Item must be an integer.</div>
    <div class="text-danger"
        v-if="v$.feeItem.$dirty && v$.feeItem.required && !v$.feeItem.positiveNumberValidator"
        aria-live="assertive">Fee Item must be a positive number.</div>
    <div class="text-danger"
        v-if="hospitalVisitClaimsFeeItemValidationError[index]"
        aria-live="assertive">Fee Item does not match our records.</div>
    <NumberInput label='Amount Billed:'
          :id='"hvc-amount-billed-" + index'
          :cypressId="'hospitalClaimAmountBilled' + index"
          class='mt-3'
          maxlength="8"
          v-model='claim.amountBilled'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.amountBilled)' />
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && !v$.amountBilled.required"
        aria-live="assertive">Amount billed is required.</div>
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && v$.amountBilled.required && !v$.amountBilled.dollarNumberValidator"
        aria-live="assertive">Amount billed must be a dollar amount. Example: 10.00</div>
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && v$.amountBilled.required && !v$.amountBilled.positiveNumberValidator"
        aria-live="assertive">Amount billed must be a positive number.</div> 
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && v$.amountBilled.required && !v$.amountBilled.amountBilledZeroValidator"
        aria-live="assertive">Amount billed must be zero if Fee item is '03333'.</div>
    <InputComponent label='Diagnostic Code:'
          :id='"hvc-diagnostic-code-" + index'
          :cypressId="'hospitalClaimDiagnosticCode' + index"
          :isUpperCaseForced='true'
          class='mt-3'
          maxlength="5"
          v-model='claim.diagnosticCode'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.diagnosticCode)' />
    <div class="text-danger"
        v-if="v$.diagnosticCode.$dirty && !v$.diagnosticCode.required"
        aria-live="assertive">Diagnostic code is required.</div>
    <div class="text-danger"
        v-if="v$.diagnosticCode.$dirty && ((v$.diagnosticCode.required && !v$.diagnosticCode.diagnosticCodeValidator) || !v$.diagnosticCode.alphanumericValidator)"
        aria-live="assertive">Diagnostic code must be valid.</div>
    <SelectComponent label='Service Location Code:'
          :id='"hvc-location-of-service-" + index'
          :cypressId="'hospitalClaimServiceLocation' + index"
          class='mt-3'
          v-model='claim.locationOfService'
          :options='serviceLocationOptions'
          :inputStyle='extraLargeStyles'
          @blur='handleBlurField(v$.locationOfService)'>
      <template v-slot:description>
        <p class="input-description" v-if="!isCSR">
          MSP Claims submitted with Service Location Code (<b>A</b>) for dates of service on or after October 1, 2021, will not be accepted.
        </p>
      </template>
    </SelectComponent>
    <div class="text-danger"
        v-if="v$.locationOfService.$dirty
          && !v$.locationOfService.required"
        aria-live="assertive">Service Location Code is required.</div>
    <div class="text-danger"
        v-if="v$.locationOfService.$dirty
          && v$.locationOfService.required
          && !v$.locationOfService.hospitalVisitLocationCodeValidator"
        aria-live="assertive">Service Location Code is invalid for the Service Date.</div>
    <SelectComponent
          :label='"Correspondence Attached" + (isCSR ? "" : " (optional)") + ":"'
          :id='"hvc-correspondence-attached-" + index'
          class='mt-3'
          v-model='claim.correspondenceAttached'
          :options='correspondenceAttachedOptions'
          defaultOptionLabel='None'
          :inputStyle='largeStyles' />
    <SelectComponent 
          :label='"Submission Code" + ((isCSR || isHospitalVisitSubmissionCodeRequired(index)) ? "" : " (optional)") + ":"'
          :id='"hvc-submission-code-" + index'
          :cypressId="'hospitalClaimSubmissionCode' + index"
          class='mt-3'
          v-model='claim.submissionCode'
          defaultOptionLabel='None'
          :options='submissionCodeOptions'
          :inputStyle='largeStyles'
          @blur='handleBlurField(v$.submissionCode)' />
    <div class="text-danger"
        v-if="v$.submissionCode.$dirty && isHospitalVisitSubmissionCodeRequired(index) && !v$.submissionCode.hospitalVisitSubmissionCodeValidator"
        aria-live="assertive">Submission code is required.</div>
    <TextareaComponent 
          :label='"Notes/Additional Information" + (isCSR ? "" : " (optional)") + ":"'
          :id="'hvc-hospital-notes-' + index"
          :cypressId="'hospitalNotesAttach' + index"
          class="mt-3"
          v-model="claim.notes"
          :remainingCharsMaxlength="400"
          :isRemainingCharsShown="true"
          :inputStyle="textareaStyle" />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { requiredIf, maxLength } from '@vuelidate/validators/dist/raw.esm';
import {
  DigitInput,
  Input,
  NumberInput,
  Select,
  Textarea,
  alphanumericValidator,
  dollarNumberValidator,
  getISODateString,
  intValidator,
  isValidISODateString,
  optionalValidator,
  nonZeroNumberValidator,
  positiveNumberValidator,
} from 'common-lib-vue';
import {
  startOfToday,
  addDays,
  subDays,
  isBefore,
  isAfter,
  parseISO,
  isValid,
  subMonths,
} from 'date-fns';
import {
  isCSR,
} from '@/helpers/url';
import {
  clarificationCodeValidator,
  diagnosticCodeValidator,
  validateIf,
} from '@/helpers/validators';

const amountBilledZeroValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  const parsedValue = parseFloat(value);
  if (feeItem && feeItem === '03333' && parsedValue !== 0) {
    return false;
  }
  return true;
};

const hospitalVisitDateValidator = (csr) => {
  return (value) => {
    const month = value.month;
    const dayFrom = value.dayFrom;
    const year = value.year;
    const isoDateString = getISODateString(year, month, dayFrom);
    const date = parseISO(isoDateString);

    if (csr && !month && !dayFrom && !year) {
      return true;
    }

    return (
      !!month &&
      month.length <= 2 &&
      !!dayFrom &&
      dayFrom.length <= 2 &&
      !!year &&
      year.length === 4 &&
      isValidISODateString(isoDateString) &&
      isValid(date)
    );
  };
};

const hospitalVisitDatePastValidator = (csr) => {
  return (value) => {
    const month = value.month;
    const dayFrom = value.dayFrom;
    const year = value.year;
    const isoDateString = getISODateString(year, month, dayFrom);
    const date = parseISO(isoDateString);

    if (csr && !month && !dayFrom && !year) {
      return true;
    }

    return isValidISODateString(isoDateString)
        && isValid(date)
        && (isAfter(date, subDays(subMonths(startOfToday(), 18), 1)) || csr);
  }
};

const hospitalVisitDateFutureValidator = (csr) => {
  return (value) => {
    const month = value.month;
    const dayFrom = value.dayFrom;
    const year = value.year;
    const isoDateString = getISODateString(year, month, dayFrom);
    const date = parseISO(isoDateString);

    if (csr && !month && !dayFrom && !year) {
      return true;
    }

    return isValidISODateString(isoDateString)
        && isValid(date)
        && isBefore(date, addDays(startOfToday(), 1));
  }
};

const hospitalVisitDateToFutureValidator = (value) => {
  const month = value.month;
  const dayTo = value.dayTo;
  const year = value.year;

  if (!dayTo) {
    return true;
  }

  const isoDateString = getISODateString(year, month, dayTo);
  const date = parseISO(isoDateString);

  return isValidISODateString(isoDateString)
      && isValid(date)
      && isBefore(date, addDays(startOfToday(), 1));
};

const hospitalVisitDateRangeValidator = (value) => {
  const month = value.month;
  const dayFrom = value.dayFrom;
  const dayTo = value.dayTo;
  const year = value.year;

  if (!dayTo) {
    return true;
  }
  const dateFrom = parseISO(getISODateString(year, month, dayFrom));
  const dateTo = parseISO(getISODateString(year, month, dayTo));

  return isValid(dateFrom)
      && isValid(dateTo)
      && isBefore(dateFrom, addDays(dateTo, 1));
};

const hospitalVisitDateCutOffValidator = (value) => {
  const month = value.month;
  const dayFrom = value.dayFrom;
  const year = value.year;
  const locationOfService = value.locationOfService;
  const isoDateString = getISODateString(year, month, dayFrom);
  const date = parseISO(isoDateString);

  if (locationOfService === 'A'
    && isValidISODateString(isoDateString)
    && isValid(date)
    && isAfter(date, subDays(parseISO('2021-10-01'), 1))) {
    return false;
  }
  return true;
};

const hospitalVisitLocationCodeValidator = (value, vm) => {
  const month = vm.month;
  const dayFrom = vm.dayFrom;
  const year = vm.year;
  const isoDateString = getISODateString(year, month, dayFrom);
  const date = parseISO(isoDateString);
  
  if (value === 'A'
    && isValidISODateString(isoDateString)
    && isValid(date)
    && isAfter(date, subDays(parseISO('2021-10-01'), 1))) {
    return false;
  }
  return true;
};

const hospitalVisitSubmissionCodeValidator = (value, vm) => {
  const past90Days = subDays(startOfToday(), 90);
  const ISODateStr = getISODateString(vm.year, vm.month, vm.dayFrom);
  const serviceDate = parseISO(ISODateStr);
  if (!isValid(serviceDate) || !isValidISODateString(ISODateStr)) {
    return true;
  }
  if (isBefore(serviceDate, past90Days)) {
    return !!value;
  }
  return true;
}

export default {
  name: 'HospitalVisitClaimsFormItem',
  components: {
    DigitInput,
    InputComponent: Input,
    NumberInput,
    SelectComponent: Select,
    TextareaComponent: Textarea,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      hospitalVisitDateValidator: hospitalVisitDateValidator(isCSR(this.$router.currentRoute.value.path)),
      hospitalVisitDatePastValidator: hospitalVisitDatePastValidator(isCSR(this.$router.currentRoute.value.path)),
      hospitalVisitDateFutureValidator: hospitalVisitDateFutureValidator(isCSR(this.$router.currentRoute.value.path)),
      hospitalVisitDateToFutureValidator,
      hospitalVisitDateRangeValidator,
      hospitalVisitDateCutOffValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), hospitalVisitDateCutOffValidator)),
      month: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        intValidator: optionalValidator(intValidator),
      },
      dayFrom: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        intValidator: optionalValidator(intValidator),
      },
      dayTo: {
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      year: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        intValidator: optionalValidator(intValidator),
      },
      numberOfServices: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        nonZeroNumberValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), nonZeroNumberValidator)),
      },
      feeItem: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
      },
      amountBilled: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        dollarNumberValidator: optionalValidator(dollarNumberValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        amountBilledZeroValidator: optionalValidator(amountBilledZeroValidator),
      },
      diagnosticCode: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        alphanumericValidator: optionalValidator(alphanumericValidator),
        diagnosticCodeValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), diagnosticCodeValidator)),
      },
      locationOfService: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        hospitalVisitLocationCodeValidator: validateIf(!isCSR(this.$router.currentRoute.value.path), hospitalVisitLocationCodeValidator),
      },
      serviceClarificationCode: {
        clarificationCodeValidator: optionalValidator(clarificationCodeValidator(isCSR(this.$router.currentRoute.value.path))),
      },
      submissionCode: {
        hospitalVisitSubmissionCodeValidator: validateIf(!isCSR(this.$router.currentRoute.value.path), hospitalVisitSubmissionCodeValidator),
      },
      notes: {
        maxLength: maxLength(400),
      },
    }
  }
};
</script>
