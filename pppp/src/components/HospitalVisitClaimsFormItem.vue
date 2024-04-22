<template>
  <div>
    <div class="row mb-3">
      <div class="col-md-3">
        <SelectComponent label='Month:'
              :id="'hvc-month-' + index"
              :cypressId="'hospitalClaimMonth' + index"
              :modelValue='month'
              @update:modelValue="$emit('update:month', $event)"
              :options='monthOptions'
              @blur='handleBlurField(v$.month)' />
      </div>
      <div class="col-md-3">
        <DigitInput label='Day From:'
              :id="'hvc-day-from-' + index"
              :cypressId="'hospitalClaimDayFrom' + index"
              maxlength="2"
              :modelValue='dayFrom'
              @update:modelValue="$emit('update:dayFrom', $event)"
              @blur='handleBlurField(v$.dayFrom)' />
      </div>
      <div class="col-md-3">
        <DigitInput 
              :label='"Day To" + (isCSR ? "" : " (optional)") + ":"'
              :id="'hvc-day-to-' + index"
              maxlength="2"
              :modelValue='dayTo'
              @update:modelValue="$emit('update:dayTo', $event)"
              @blur='handleBlurField(v$.dayTo)' />
      </div>
      <div class="col-md-3">
        <DigitInput label='Year:'
              :id="'hvc-year-' + index"
              :cypressId="'hospitalClaimYear' + index"
              maxlength="4"
              :modelValue='year'
              @update:modelValue="$emit('update:year', $event)"
              @blur='handleBlurField(v$.year)' />
      </div>
    </div>

    <div class="text-danger"
        v-if="v$.month.$dirty && v$.month.required.$invalid"
        aria-live="assertive">Month is required.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty && !v$.month.required.$invalid && v$.month.intValidator.$invalid"
        aria-live="assertive">Month must be an integer.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty && !v$.month.required.$invalid && v$.month.positiveNumberValidator.$invalid"
        aria-live="assertive">Month must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.dayFrom.$dirty && v$.dayFrom.required.$invalid"
        aria-live="assertive">Day From is required.</div>
    <div class="text-danger"
        v-if="v$.dayFrom.$dirty && !v$.dayFrom.required.$invalid && v$.dayFrom.intValidator.$invalid"
        aria-live="assertive">Day from must be an integer.</div>
    <div class="text-danger"
        v-if="v$.dayFrom.$dirty && !v$.dayFrom.required.$invalid && v$.dayFrom.positiveNumberValidator.$invalid"
        aria-live="assertive">Day from must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.dayTo.$dirty && v$.dayTo.intValidator.$invalid"
        aria-live="assertive">Day to must be an integer.</div>
    <div class="text-danger"
        v-if="v$.dayTo.$dirty && v$.dayTo.positiveNumberValidator.$invalid"
        aria-live="assertive">Day to must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.year.$dirty && v$.year.required.$invalid"
        aria-live="assertive">Year is required.</div>
    <div class="text-danger"
        v-if="v$.year.$dirty && !v$.year.required.$invalid && v$.year.intValidator.$invalid"
        aria-live="assertive">Year must be an integer.</div>
    <div class="text-danger"
        v-if="v$.year.$dirty && !v$.year.required.$invalid && v$.year.positiveNumberValidator.$invalid"
        aria-live="assertive">Year must be a positive number.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && !v$.month.required.$invalid
            && !v$.dayFrom.required.$invalid
            && !v$.year.required.$invalid
            && v$.hospitalVisitDateValidator.$invalid"
        aria-live="assertive">Hospital Service date must be valid.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && !v$.month.required.$invalid
            && !v$.dayFrom.required.$invalid
            && !v$.year.required.$invalid
            && !v$.hospitalVisitDateValidator.$invalid
            && v$.hospitalVisitDatePastValidator.$invalid"
        aria-live="assertive">Hospital Service Day From is over 18 months in the past.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && !v$.month.required.$invalid
            && !v$.dayFrom.required.$invalid
            && !v$.year.required.$invalid
            && !v$.hospitalVisitDateValidator.$invalid
            && v$.hospitalVisitDateFutureValidator.$invalid"
        aria-live="assertive">Hospital Service Day From cannot be in the future.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && !v$.month.required.$invalid
            && !v$.dayFrom.required.$invalid
            && !v$.year.required.$invalid
            && !v$.hospitalVisitDateValidator.$invalid
            && !v$.hospitalVisitDateFutureValidator.$invalid
            && v$.hospitalVisitDateToFutureValidator.$invalid"
        aria-live="assertive">Hospital Service Day To cannot be in the future.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
            && v$.dayFrom.$dirty
            && v$.year.$dirty
            && !v$.month.required.$invalid
            && !v$.dayFrom.required.$invalid
            && !v$.year.required.$invalid
            && !v$.hospitalVisitDateValidator.$invalid
            && !v$.hospitalVisitDatePastValidator.$invalid
            && !v$.hospitalVisitDateFutureValidator.$invalid
            && v$.hospitalVisitDateRangeValidator.$invalid"
        aria-live="assertive">Hospital Service date range must be valid.</div>
    <div class="text-danger"
        v-if="v$.month.$dirty
          && v$.dayFrom.$dirty
          && v$.year.$dirty
          && !v$.month.required.$invalid
          && !v$.dayFrom.required.$invalid
          && !v$.year.required.$invalid
          && !v$.hospitalVisitDateValidator.$invalid
          && !v$.hospitalVisitDatePastValidator.$invalid
          && !v$.hospitalVisitDateFutureValidator.$invalid
          && v$.hospitalVisitDateCutOffValidator.$invalid"
        aria-live="assertive">Service Date is invalid for the Service Location Code.</div>
    <DigitInput label='Number of Services:'
          :id='"hvc-number-of-services-" + index'
          :cypressId="'hospitalClaimNumberOfServices' + index"
          class='mt-3'
          maxlength="2"
          :modelValue='numberOfServices'
          @update:modelValue="$emit('update:numberOfServices', $event)"
          :inputStyle='extraSmallStyles'
          @blur='handleBlurField(v$.numberOfServices)' />
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty && v$.numberOfServices.required.$invalid"
        aria-live="assertive">Number of Services is required.</div>
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty && !v$.numberOfServices.required.$invalid && v$.numberOfServices.intValidator.$invalid"
        aria-live="assertive">Number of Services must be an integer.</div>
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty && !v$.numberOfServices.required.$invalid && v$.numberOfServices.positiveNumberValidator.$invalid"
        aria-live="assertive">Number of Services must be greater than 0.</div>
    <div class="text-danger"
        v-if="v$.numberOfServices.$dirty
          && !v$.numberOfServices.required.$invalid
          && !v$.numberOfServices.positiveNumberValidator.$invalid
          && v$.numberOfServices.nonZeroNumberValidator.$invalid"
        aria-live="assertive">Number of Services must be greater than 0.</div>
    <InputComponent 
          :label='"Service Clarification Code" + (isCSR ? "" : " (optional)") + ":"'
          :id='"hvc-service-clarification-code-" + index'
          class='mt-3'
          maxlength="2"
          :modelValue='serviceClarificationCode'
          @update:modelValue="$emit('update:serviceClarificationCode', $event)"
          :isUpperCaseForced='true'
          :inputStyle='extraSmallStyles'
          @blur='handleBlurField(v$.serviceClarificationCode)' />
    <div class="text-danger"
        v-if="v$.serviceClarificationCode.$dirty && v$.serviceClarificationCode.clarificationCodeValidator.$invalid"
        aria-live="assertive">Service Clarification Code is invalid.</div>
    <DigitInput label='Fee Item:'
          :id='"hvc-fee-item-" + index'
          :cypressId="'hospitalClaimFeeItem' + index"
          class='mt-3'
          maxlength="5"
          :modelValue='feeItem'
          @update:modelValue="handleInputHospitalVisitFeeItem($event)"
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.feeItem)' />
    <div class="text-danger"
        v-if="v$.feeItem.$dirty && v$.feeItem.required.$invalid"
        aria-live="assertive">Fee Item is required.</div>
    <div class="text-danger"
        v-if="v$.feeItem.$dirty && !v$.feeItem.required.$invalid && v$.feeItem.intValidator.$invalid"
        aria-live="assertive">Fee Item must be an integer.</div>
    <div class="text-danger"
        v-if="v$.feeItem.$dirty && !v$.feeItem.required.$invalid && v$.feeItem.positiveNumberValidator.$invalid"
        aria-live="assertive">Fee Item must be a positive number.</div>
    <div class="text-danger"
        v-if="hospitalVisitClaimsFeeItemValidationError"
        aria-live="assertive">Fee Item does not match our records.</div>
    <NumberInput label='Amount Billed:'
          :id='"hvc-amount-billed-" + index'
          :cypressId="'hospitalClaimAmountBilled' + index"
          class='mt-3'
          maxlength="8"
          :modelValue='amountBilled'
          @update:modelValue="$emit('update:amountBilled', $event)"
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.amountBilled)' />
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && v$.amountBilled.required.$invalid"
        aria-live="assertive">Amount billed is required.</div>
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && !v$.amountBilled.required.$invalid && v$.amountBilled.dollarNumberValidator.$invalid"
        aria-live="assertive">Amount billed must be a dollar amount. Example: 10.00</div>
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && !v$.amountBilled.required.$invalid && v$.amountBilled.positiveNumberValidator.$invalid"
        aria-live="assertive">Amount billed must be a positive number.</div> 
    <div class="text-danger"
        v-if="v$.amountBilled.$dirty && !v$.amountBilled.required.$invalid && v$.amountBilled.amountBilledZeroValidator.$invalid"
        aria-live="assertive">Amount billed must be zero if Fee item is '03333'.</div>
    <InputComponent label='Diagnostic Code:'
          :id='"hvc-diagnostic-code-" + index'
          :cypressId="'hospitalClaimDiagnosticCode' + index"
          :isUpperCaseForced='true'
          class='mt-3'
          maxlength="5"
          :modelValue='diagnosticCode'
          @update:modelValue="$emit('update:diagnosticCode', $event)"
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.diagnosticCode)' />
    <div class="text-danger"
        v-if="v$.diagnosticCode.$dirty && v$.diagnosticCode.required.$invalid"
        aria-live="assertive">Diagnostic code is required.</div>
    <div class="text-danger"
        v-if="v$.diagnosticCode.$dirty && ((!v$.diagnosticCode.required.$invalid && v$.diagnosticCode.diagnosticCodeValidator.$invalid) || v$.diagnosticCode.alphanumericValidator.$invalid)"
        aria-live="assertive">Diagnostic code must be valid.</div>
    <SelectComponent label='Service Location Code:'
          :id='"hvc-location-of-service-" + index'
          :cypressId="'hospitalClaimServiceLocation' + index"
          class='mt-3'
          :modelValue='locationOfService'
          @update:modelValue="$emit('update:locationOfService', $event)"
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
          && v$.locationOfService.required.$invalid"
        aria-live="assertive">Service Location Code is required.</div>
    <div class="text-danger"
        v-if="v$.locationOfService.$dirty
          && !v$.locationOfService.required.$invalid
          && v$.locationOfService.hospitalVisitLocationCodeValidator.$invalid"
        aria-live="assertive">Service Location Code is invalid for the Service Date.</div>
    <SelectComponent
          :label='"Correspondence Attached" + (isCSR ? "" : " (optional)") + ":"'
          :id='"hvc-correspondence-attached-" + index'
          class='mt-3'
          :modelValue='correspondenceAttached'
          @update:modelValue="$emit('update:correspondenceAttached', $event)"
          :options='correspondenceAttachedOptions'
          defaultOptionLabel='None'
          :inputStyle='largeStyles' />
    <SelectComponent 
          :label='"Submission Code" + ((isCSR || isHospitalVisitSubmissionCodeRequired()) ? "" : " (optional)") + ":"'
          :id='"hvc-submission-code-" + index'
          :cypressId="'hospitalClaimSubmissionCode' + index"
          class='mt-3'
          :modelValue='submissionCode'
          @update:modelValue="$emit('update:submissionCode', $event)"
          defaultOptionLabel='None'
          :options='submissionCodeOptions'
          :inputStyle='largeStyles'
          @blur='handleBlurField(v$.submissionCode)' />
    <div class="text-danger"
        v-if="v$.submissionCode.$dirty && isHospitalVisitSubmissionCodeRequired() && v$.submissionCode.hospitalVisitSubmissionCodeValidator.$invalid"
        aria-live="assertive">Submission code is required.</div>
    <TextareaComponent 
          :label='"Notes/Additional Information" + (isCSR ? "" : " (optional)") + ":"'
          :id="'hvc-hospital-notes-' + index"
          :cypressId="'hospitalNotesAttach' + index"
          class="mt-3"
          :modelValue="notes"
          @update:modelValue="$emit('update:notes', $event)"
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
  selectOptionsMonths,
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
  extraSmallStyles,
  smallStyles,
  largeStyles,
  extraLargeStyles,
} from '@/constants/input-styles';
import {
  selectOptionsSubmissionCode,
  selectOptionsCorrespondenceAttached,
  selectOptionsServiceLocation,
} from '@/constants/select-options';
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
  props: {
    index: {
      type: Number,
      default: 0,
    },
    month: {
      type: String,
      default: null,
    },
    dayFrom: {
      type: String,
      default: null,
    },
    dayTo: {
      type: String,
      default: null,
    },
    year: {
      type: String,
      default: null,
    },
    numberOfServices: {
      type: String,
      default: null,
    },
    serviceClarificationCode: {
      type: String,
      default: null,
    },
    feeItem: {
      type: String,
      default: null,
    },
    amountBilled: {
      type: String,
      default: null,
    },
    diagnosticCode: {
      type: String,
      default: null,
    },
    locationOfService: {
      type: String,
      default: null,
    },
    correspondenceAttached: {
      type: String,
      default: null,
    },
    submissionCode: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    hospitalVisitClaimsFeeItemValidationError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Select options:
      monthOptions: selectOptionsMonths,
      correspondenceAttachedOptions: selectOptionsCorrespondenceAttached,
      submissionCodeOptions: selectOptionsSubmissionCode,
      serviceLocationOptions: selectOptionsServiceLocation,

      // Styles
      extraSmallStyles,
      smallStyles,
      largeStyles,
      extraLargeStyles,
      textareaStyle: {
        height: '150px'
      },
    };
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
  },
  methods: {
    handleBlurField(validation) {
      if (validation) {
        validation.$touch();
      }
    },
    isHospitalVisitSubmissionCodeRequired() {
      if (isCSR(this.$router.currentRoute.value.path)) {
        return false;
      }
      const past90Days = subDays(startOfToday(), 90);
      const ISODateStr = getISODateString(
        this.year,
        this.month,
        this.dayFrom,
      );
      const serviceDate = parseISO(ISODateStr);
      if (!isValid(serviceDate) || !isValidISODateString(ISODateStr)) {
        return false;
      }
      return isBefore(serviceDate, past90Days);
    },
    handleInputHospitalVisitFeeItem(value) {
      this.$emit('update:feeItem', value);
      this.$emit('update:hospitalVisitClaimsFeeItemValidationError', false);
    },
  },
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
  },
};
</script>
