<template>
  <div>
    <div class="row mb-3">
      <div class="col-md-3">
        <SelectComponent
          :id="'hvc-month-' + index"
          label="Month:"
          :cypress-id="'hospitalClaimMonth' + index"
          :model-value="month"
          :options="monthOptions"
          @update:model-value="$emit('update:month', $event)"
          @blur="handleBlurField(v$.month)"
        />
      </div>
      <div class="col-md-3">
        <DigitInput
          :id="'hvc-day-from-' + index"
          label="Day From:"
          :cypress-id="'hospitalClaimDayFrom' + index"
          maxlength="2"
          :model-value="dayFrom"
          @update:model-value="$emit('update:dayFrom', $event)"
          @blur="handleBlurField(v$.dayFrom)"
        />
      </div>
      <div class="col-md-3">
        <DigitInput
          :id="'hvc-day-to-' + index"
          :label="'Day To' + (isCSR ? '' : ' (optional)') + ':'"
          maxlength="2"
          :model-value="dayTo"
          @update:model-value="$emit('update:dayTo', $event)"
          @blur="handleBlurField(v$.dayTo)"
        />
      </div>
      <div class="col-md-3">
        <DigitInput
          :id="'hvc-year-' + index"
          label="Year:"
          :cypress-id="'hospitalClaimYear' + index"
          maxlength="4"
          :model-value="year"
          @update:model-value="$emit('update:year', $event)"
          @blur="handleBlurField(v$.year)"
        />
      </div>
    </div>

    <div
      v-if="v$.month.$dirty && v$.month.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Month is required.
    </div>
    <div
      v-if="v$.month.$dirty && !v$.month.required.$invalid && v$.month.intValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Month must be an integer.
    </div>
    <div
      v-if="
        v$.month.$dirty && !v$.month.required.$invalid && v$.month.positiveNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Month must be a positive number.
    </div>
    <div
      v-if="v$.dayFrom.$dirty && v$.dayFrom.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Day From is required.
    </div>
    <div
      v-if="v$.dayFrom.$dirty && !v$.dayFrom.required.$invalid && v$.dayFrom.intValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Day from must be an integer.
    </div>
    <div
      v-if="
        v$.dayFrom.$dirty &&
        !v$.dayFrom.required.$invalid &&
        v$.dayFrom.positiveNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Day from must be a positive number.
    </div>
    <div
      v-if="v$.dayTo.$dirty && v$.dayTo.intValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Day to must be an integer.
    </div>
    <div
      v-if="v$.dayTo.$dirty && v$.dayTo.positiveNumberValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Day to must be a positive number.
    </div>
    <div
      v-if="v$.year.$dirty && v$.year.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Year is required.
    </div>
    <div
      v-if="v$.year.$dirty && !v$.year.required.$invalid && v$.year.intValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Year must be an integer.
    </div>
    <div
      v-if="
        v$.year.$dirty && !v$.year.required.$invalid && v$.year.positiveNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Year must be a positive number.
    </div>
    <div
      v-if="
        v$.month.$dirty &&
        v$.dayFrom.$dirty &&
        v$.year.$dirty &&
        !v$.month.required.$invalid &&
        !v$.dayFrom.required.$invalid &&
        !v$.year.required.$invalid &&
        v$.hospitalVisitDateValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Hospital Service date must be valid.
    </div>
    <div
      v-if="
        v$.month.$dirty &&
        v$.dayFrom.$dirty &&
        v$.year.$dirty &&
        !v$.month.required.$invalid &&
        !v$.dayFrom.required.$invalid &&
        !v$.year.required.$invalid &&
        !v$.hospitalVisitDateValidator.$invalid &&
        v$.hospitalVisitDatePastValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Hospital Service Day From is over 18 months in the past.
    </div>
    <div
      v-if="
        v$.month.$dirty &&
        v$.dayFrom.$dirty &&
        v$.year.$dirty &&
        !v$.month.required.$invalid &&
        !v$.dayFrom.required.$invalid &&
        !v$.year.required.$invalid &&
        !v$.hospitalVisitDateValidator.$invalid &&
        v$.hospitalVisitDateFutureValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Hospital Service Day From cannot be in the future.
    </div>
    <div
      v-if="
        v$.month.$dirty &&
        v$.dayFrom.$dirty &&
        v$.year.$dirty &&
        !v$.month.required.$invalid &&
        !v$.dayFrom.required.$invalid &&
        !v$.year.required.$invalid &&
        !v$.hospitalVisitDateValidator.$invalid &&
        !v$.hospitalVisitDateFutureValidator.$invalid &&
        v$.hospitalVisitDateToFutureValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Hospital Service Day To cannot be in the future.
    </div>
    <div
      v-if="
        v$.month.$dirty &&
        v$.dayFrom.$dirty &&
        v$.year.$dirty &&
        !v$.month.required.$invalid &&
        !v$.dayFrom.required.$invalid &&
        !v$.year.required.$invalid &&
        !v$.hospitalVisitDateValidator.$invalid &&
        !v$.hospitalVisitDatePastValidator.$invalid &&
        !v$.hospitalVisitDateFutureValidator.$invalid &&
        v$.hospitalVisitDateRangeValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Hospital Service date range must be valid.
    </div>
    <div
      v-if="
        v$.month.$dirty &&
        v$.dayFrom.$dirty &&
        v$.year.$dirty &&
        !v$.month.required.$invalid &&
        !v$.dayFrom.required.$invalid &&
        !v$.year.required.$invalid &&
        !v$.hospitalVisitDateValidator.$invalid &&
        !v$.hospitalVisitDatePastValidator.$invalid &&
        !v$.hospitalVisitDateFutureValidator.$invalid &&
        v$.hospitalVisitDateCutOffValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Date is invalid for the Service Location Code.
    </div>
    <DigitInput
      :id="'hvc-number-of-services-' + index"
      label="Number of Services:"
      :cypress-id="'hospitalClaimNumberOfServices' + index"
      class="mt-3"
      maxlength="2"
      :model-value="numberOfServices"
      :input-style="extraSmallStyles"
      @update:model-value="$emit('update:numberOfServices', $event)"
      @blur="handleBlurField(v$.numberOfServices)"
    />
    <div
      v-if="v$.numberOfServices.$dirty && v$.numberOfServices.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Number of Services is required.
    </div>
    <div
      v-if="
        v$.numberOfServices.$dirty &&
        !v$.numberOfServices.required.$invalid &&
        v$.numberOfServices.intValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Number of Services must be an integer.
    </div>
    <div
      v-if="
        v$.numberOfServices.$dirty &&
        !v$.numberOfServices.required.$invalid &&
        v$.numberOfServices.positiveNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Number of Services must be greater than 0.
    </div>
    <div
      v-if="
        v$.numberOfServices.$dirty &&
        !v$.numberOfServices.required.$invalid &&
        !v$.numberOfServices.positiveNumberValidator.$invalid &&
        v$.numberOfServices.nonZeroNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Number of Services must be greater than 0.
    </div>
    <InputComponent
      :id="'hvc-service-clarification-code-' + index"
      :label="'Service Clarification Code' + (isCSR ? '' : ' (optional)') + ':'"
      class="mt-3"
      maxlength="2"
      :model-value="serviceClarificationCode"
      :is-upper-case-forced="true"
      :input-style="extraSmallStyles"
      @update:model-value="$emit('update:serviceClarificationCode', $event)"
      @blur="handleBlurField(v$.serviceClarificationCode)"
    />
    <div
      v-if="
        v$.serviceClarificationCode.$dirty &&
        v$.serviceClarificationCode.clarificationCodeValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Clarification Code is invalid.
    </div>
    <DigitInput
      :id="'hvc-fee-item-' + index"
      label="Fee Item:"
      :cypress-id="'hospitalClaimFeeItem' + index"
      class="mt-3"
      maxlength="5"
      :model-value="feeItem"
      :input-style="smallStyles"
      @update:model-value="handleInputHospitalVisitFeeItem($event)"
      @blur="handleBlurField(v$.feeItem)"
    />
    <div
      v-if="v$.feeItem.$dirty && v$.feeItem.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Fee Item is required.
    </div>
    <div
      v-if="v$.feeItem.$dirty && !v$.feeItem.required.$invalid && v$.feeItem.intValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Fee Item must be an integer.
    </div>
    <div
      v-if="
        v$.feeItem.$dirty &&
        !v$.feeItem.required.$invalid &&
        v$.feeItem.positiveNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Fee Item must be a positive number.
    </div>
    <div
      v-if="hospitalVisitClaimsFeeItemValidationError"
      class="text-danger"
      aria-live="assertive"
    >
      Fee Item does not match our records.
    </div>
    <NumberInput
      :id="'hvc-amount-billed-' + index"
      label="Amount Billed:"
      :cypress-id="'hospitalClaimAmountBilled' + index"
      class="mt-3"
      maxlength="8"
      :model-value="amountBilled"
      :input-style="smallStyles"
      @update:model-value="$emit('update:amountBilled', $event)"
      @blur="handleBlurField(v$.amountBilled)"
    />
    <div
      v-if="v$.amountBilled.$dirty && v$.amountBilled.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Amount billed is required.
    </div>
    <div
      v-if="
        v$.amountBilled.$dirty &&
        !v$.amountBilled.required.$invalid &&
        v$.amountBilled.dollarNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Amount billed must be a dollar amount. Example: 10.00
    </div>
    <div
      v-if="
        v$.amountBilled.$dirty &&
        !v$.amountBilled.required.$invalid &&
        v$.amountBilled.positiveNumberValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Amount billed must be a positive number.
    </div>
    <div
      v-if="
        v$.amountBilled.$dirty &&
        !v$.amountBilled.required.$invalid &&
        v$.amountBilled.amountBilledZeroValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Amount billed must be zero if Fee item is '03333'.
    </div>
    <InputComponent
      :id="'hvc-diagnostic-code-' + index"
      label="Diagnostic Code:"
      :cypress-id="'hospitalClaimDiagnosticCode' + index"
      :is-upper-case-forced="true"
      class="mt-3"
      maxlength="5"
      :model-value="diagnosticCode"
      :input-style="smallStyles"
      @update:model-value="$emit('update:diagnosticCode', $event)"
      @blur="handleBlurField(v$.diagnosticCode)"
    />
    <div
      v-if="v$.diagnosticCode.$dirty && v$.diagnosticCode.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Diagnostic code is required.
    </div>
    <div
      v-if="
        v$.diagnosticCode.$dirty &&
        ((!v$.diagnosticCode.required.$invalid &&
          v$.diagnosticCode.diagnosticCodeValidator.$invalid) ||
          v$.diagnosticCode.alphanumericValidator.$invalid)
      "
      class="text-danger"
      aria-live="assertive"
    >
      Diagnostic code must be valid.
    </div>
    <SelectComponent
      :id="'hvc-location-of-service-' + index"
      label="Service Location Code:"
      :cypress-id="'hospitalClaimServiceLocation' + index"
      class="mt-3"
      :model-value="locationOfService"
      :options="serviceLocationOptions"
      :input-style="extraLargeStyles"
      @update:model-value="$emit('update:locationOfService', $event)"
      @blur="handleBlurField(v$.locationOfService)"
    >
      <template #description>
        <p
          v-if="!isCSR"
          class="input-description"
        >
          MSP Claims submitted with Service Location Code (<b>A</b>) for dates of service on or
          after October 1, 2021, will not be accepted.
        </p>
      </template>
    </SelectComponent>
    <div
      v-if="v$.locationOfService.$dirty && v$.locationOfService.required.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Service Location Code is required.
    </div>
    <div
      v-if="
        v$.locationOfService.$dirty &&
        !v$.locationOfService.required.$invalid &&
        v$.locationOfService.hospitalVisitLocationCodeValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Location Code is invalid for the Service Date.
    </div>
    <SelectComponent
      :id="'hvc-correspondence-attached-' + index"
      :label="'Correspondence Attached' + (isCSR ? '' : ' (optional)') + ':'"
      class="mt-3"
      :model-value="correspondenceAttached"
      :options="correspondenceAttachedOptions"
      default-option-label="None"
      :input-style="largeStyles"
      @update:model-value="$emit('update:correspondenceAttached', $event)"
    />
    <SelectComponent
      :id="'hvc-submission-code-' + index"
      :label="
        'Submission Code' +
        (isCSR || isHospitalVisitSubmissionCodeRequired() ? '' : ' (optional)') +
        ':'
      "
      :cypress-id="'hospitalClaimSubmissionCode' + index"
      class="mt-3"
      :model-value="submissionCode"
      default-option-label="None"
      :options="submissionCodeOptions"
      :input-style="largeStyles"
      @update:model-value="$emit('update:submissionCode', $event)"
      @blur="handleBlurField(v$.submissionCode)"
    />
    <div
      v-if="
        v$.submissionCode.$dirty &&
        isHospitalVisitSubmissionCodeRequired() &&
        v$.submissionCode.hospitalVisitSubmissionCodeValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Submission code is required.
    </div>
    <TextareaComponent
      :id="'hvc-hospital-notes-' + index"
      :label="'Notes/Additional Information' + (isCSR ? '' : ' (optional)') + ':'"
      :cypress-id="'hospitalNotesAttach' + index"
      class="mt-3"
      :model-value="notes"
      :remaining-chars-maxlength="400"
      :is-remaining-chars-shown="true"
      :input-style="textareaStyle"
      @update:model-value="$emit('update:notes', $event)"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { requiredIf, maxLength } from "@vuelidate/validators";
import {
  DigitInput,
  InputComponent,
  NumberInput,
  SelectComponent,
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
} from "common-lib-vue";
import {
  startOfToday,
  addDays,
  subDays,
  isBefore,
  isAfter,
  parseISO,
  isValid,
  subMonths,
} from "date-fns";
import {
  extraSmallStyles,
  smallStyles,
  largeStyles,
  extraLargeStyles,
} from "@/constants/input-styles";
import {
  selectOptionsSubmissionCode,
  selectOptionsCorrespondenceAttached,
  selectOptionsServiceLocation,
} from "@/constants/select-options";
import { isCSR } from "@/helpers/url";
import {
  clarificationCodeValidator,
  diagnosticCodeValidator,
  validateIf,
} from "@/helpers/validators";

const amountBilledZeroValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  const parsedValue = parseFloat(value);
  if (feeItem && feeItem === "03333" && parsedValue !== 0) {
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

    return (
      isValidISODateString(isoDateString) &&
      isValid(date) &&
      (isAfter(date, subDays(subMonths(startOfToday(), 18), 1)) || csr)
    );
  };
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

    return (
      isValidISODateString(isoDateString) &&
      isValid(date) &&
      isBefore(date, addDays(startOfToday(), 1))
    );
  };
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

  return (
    isValidISODateString(isoDateString) &&
    isValid(date) &&
    isBefore(date, addDays(startOfToday(), 1))
  );
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

  return isValid(dateFrom) && isValid(dateTo) && isBefore(dateFrom, addDays(dateTo, 1));
};

const hospitalVisitDateCutOffValidator = (value) => {
  const month = value.month;
  const dayFrom = value.dayFrom;
  const year = value.year;
  const locationOfService = value.locationOfService;
  const isoDateString = getISODateString(year, month, dayFrom);
  const date = parseISO(isoDateString);

  if (
    locationOfService === "A" &&
    isValidISODateString(isoDateString) &&
    isValid(date) &&
    isAfter(date, subDays(parseISO("2021-10-01"), 1))
  ) {
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

  if (
    value === "A" &&
    isValidISODateString(isoDateString) &&
    isValid(date) &&
    isAfter(date, subDays(parseISO("2021-10-01"), 1))
  ) {
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
};

export default {
  name: "HospitalVisitClaimsFormItem",
  components: {
    DigitInput,
    InputComponent,
    NumberInput,
    SelectComponent,
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
  emits: [
    "update:month",
    "update:dayFrom",
    "update:dayTo",
    "update:year",
    "update:numberOfServices",
    "update:serviceClarificationCode",
    "update:amountBilled",
    "update:diagnosticCode",
    "update:locationOfService",
    "update:correspondenceAttached",
    "update:submissionCode",
    "update:notes",
    "update:feeItem",
    "update:hospitalVisitClaimsFeeItemValidationError",
  ],
  setup() {
    return {
      v$: useVuelidate(),
    };
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
        height: "150px",
      },
    };
  },
  validations() {
    const isCSRRoute = isCSR(this.$router.currentRoute.value.path);
    const alwaysValidValidator = () => {
      return true;
    };
    return {
      hospitalVisitDateValidator: hospitalVisitDateValidator(
        isCSR(this.$router.currentRoute.value.path)
      ),
      hospitalVisitDatePastValidator: hospitalVisitDatePastValidator(
        isCSR(this.$router.currentRoute.value.path)
      ),
      hospitalVisitDateFutureValidator: hospitalVisitDateFutureValidator(
        isCSR(this.$router.currentRoute.value.path)
      ),
      hospitalVisitDateToFutureValidator,
      hospitalVisitDateRangeValidator,
      hospitalVisitDateCutOffValidator: isCSRRoute
        ? alwaysValidValidator
        : hospitalVisitDateCutOffValidator,
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
        nonZeroNumberValidator:
          isCSRRoute || !this.numberOfServices ? alwaysValidValidator : nonZeroNumberValidator,
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
        diagnosticCodeValidator:
          isCSRRoute || !this.diagnosticCode ? alwaysValidValidator : diagnosticCodeValidator,
      },
      locationOfService: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        hospitalVisitLocationCodeValidator: validateIf(
          !isCSR(this.$router.currentRoute.value.path),
          hospitalVisitLocationCodeValidator
        ),
      },
      serviceClarificationCode: {
        clarificationCodeValidator: optionalValidator(
          clarificationCodeValidator(isCSR(this.$router.currentRoute.value.path))
        ),
      },
      submissionCode: {
        hospitalVisitSubmissionCodeValidator: validateIf(
          !isCSR(this.$router.currentRoute.value.path),
          hospitalVisitSubmissionCodeValidator
        ),
      },
      notes: {
        maxLength: maxLength(400),
      },
    };
  },
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
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
      const ISODateStr = getISODateString(this.year, this.month, this.dayFrom);
      const serviceDate = parseISO(ISODateStr);
      if (!isValid(serviceDate) || !isValidISODateString(ISODateStr)) {
        return false;
      }
      return isBefore(serviceDate, past90Days);
    },
    handleInputHospitalVisitFeeItem(value) {
      this.$emit("update:feeItem", value);
      this.$emit("update:hospitalVisitClaimsFeeItemValidationError", false);
    },
  },
};
</script>
