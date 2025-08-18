<template>
  <div>
    <DateInput
      :id="'msc-service-date-' + index"
      label="Service Date:"
      :cypress-id="'serviceDate' + index"
      :model-value="serviceDate"
      @blur="handleBlurField(v$.serviceDate)"
      @process-date="handleProcessServiceDate($event)"
      @update:model-value="$emit('update:serviceDate', $event)"
    />
    <div
      v-if="v$.serviceDate.$dirty && v$.serviceDate.serviceDateValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Service Date must be a valid date.
    </div>
    <div
      v-if="
        v$.serviceDate.$dirty &&
        !v$.serviceDate.serviceDateValidator.$invalid &&
        v$.serviceDate.required.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Date is required.
    </div>
    <div
      v-if="
        v$.serviceDate.$dirty &&
        !v$.serviceDate.required.$invalid &&
        v$.serviceDate.serviceDateFutureValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      {{ getServiceDateFutureErrorMessage(feeItem) }}
    </div>
    <div
      v-if="
        v$.serviceDate.$dirty &&
        !v$.serviceDate.required.$invalid &&
        v$.serviceDate.distantPastValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Date is too far in the past.
    </div>
    <div
      v-if="
        v$.serviceDate.$dirty &&
        !v$.serviceDate.required.$invalid &&
        v$.serviceDate.serviceDateCutOffValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Date is invalid for the Service Location Code.
    </div>
    <DigitInput
      :id="'msc-number-of-services-' + index"
      label="Number of Services:"
      :cypress-id="'numberOfServices' + index"
      class="mt-3"
      :model-value="numberOfServices"
      maxlength="2"
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
      :id="'msc-service-clarification-code-' + index"
      :label="'Service Clarification Code' + (isCSR ? '' : ' (optional)') + ':'"
      class="mt-3"
      :model-value="serviceClarificationCode"
      maxlength="2"
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
      :id="'msc-fee-item-' + index"
      label="Fee Item:"
      :cypress-id="'feeItem' + index"
      class="mt-3"
      :model-value="feeItem"
      maxlength="5"
      :input-style="smallStyles"
      @blur="handleBlurField(v$.feeItem)"
      @update:model-value="handleInputServiceFeeItem($event)"
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
      v-if="medicalServiceClaimsFeeItemValidationError"
      class="text-danger"
      aria-live="assertive"
    >
      Fee Item does not match our records.
    </div>
    <NumberInput
      :id="'msc-amount-billed-' + index"
      label="Amount Billed:"
      :cypress-id="'amountBilled' + index"
      class="mt-3"
      :model-value="amountBilled"
      maxlength="8"
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
    <TimeInput
      :id="'msc-called-start-time-' + index"
      :label="'Called Start Time' + (isCSR ? '' : ' (optional)') + ':'"
      class-name="mt-3"
      :model-value="calledStartTime"
      :is-hour-two-digits="true"
      @update:model-value="$emit('update:calledStartTime', $event)"
      @blur="handleBlurField(v$.calledStartTime)"
    />
    <div
      v-if="v$.calledStartTime.$dirty && v$.calledStartTime.partialTimeValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Called start time must be an exact value.
    </div>
    <TimeInput
      :id="'msc-rendered-finish-time-' + index"
      :label="'Rendered Finish Time' + (isCSR ? '' : ' (optional)') + ':'"
      class-name="mt-3"
      :model-value="renderedFinishTime"
      :is-hour-two-digits="true"
      @update:model-value="$emit('update:renderedFinishTime', $event)"
      @blur="handleBlurField(v$.renderedFinishTime)"
    />
    <div
      v-if="v$.renderedFinishTime.$dirty && v$.renderedFinishTime.partialTimeValidator.$invalid"
      class="text-danger"
      aria-live="assertive"
    >
      Rendered finish time must be an exact value.
    </div>
    <InputComponent
      :id="'msc-diagnostic-code-' + index"
      label="Diagnostic Code:"
      :cypress-id="'diagnosticCode' + index"
      :is-upper-case-forced="true"
      class="mt-3"
      :model-value="diagnosticCode"
      maxlength="5"
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
      :id="'msc-location-of-service-' + index"
      label="Service Location Code:"
      :cypress-id="'serviceLocationCode' + index"
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
        v$.locationOfService.serviceLocationCodeValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Service Location Code is invalid for the Service Date.
    </div>
    <SelectComponent
      :id="'msc-correspondence-attached-' + index"
      :label="'Correspondence Attached' + (isCSR ? '' : ' (optional)') + ':'"
      class="mt-3"
      :model-value="correspondenceAttached"
      :options="correspondenceAttachedOptions"
      default-option-label="None"
      :input-style="largeStyles"
      @update:model-value="$emit('update:correspondenceAttached', $event)"
    />
    <SelectComponent
      :id="'msc-submission-code-' + index"
      :label="'Submission Code' + (isCSR || isSubmissionCodeRequired() ? '' : ' (optional)') + ':'"
      :cypress-id="'submissionCode' + index"
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
        isSubmissionCodeRequired() &&
        v$.submissionCode.submissionCodeValidator.$invalid
      "
      class="text-danger"
      aria-live="assertive"
    >
      Submission code is required.
    </div>
    <TextareaComponent
      :id="'msc-notes-' + index"
      :label="'Notes/Additional Information' + (isCSR ? '' : ' (optional)') + ':'"
      :cypress-id="'medNotesAttach' + index"
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
import { startOfToday, addDays, isBefore, subDays, isValid } from "date-fns";
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
  serviceDateValidator,
  serviceDateCutOffValidator,
  serviceLocationCodeValidator,
  submissionCodeValidator,
} from "@/helpers/validators";
import {
  DateInput,
  DigitInput,
  InputComponent,
  NumberInput,
  SelectComponent,
  Textarea,
  TimeInput,
  alphanumericValidator,
  distantPastValidator,
  dollarNumberValidator,
  intValidator,
  nonZeroNumberValidator,
  optionalValidator,
  positiveNumberValidator,
} from "common-lib-vue";

const serviceDateFutureValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  if (!value) {
    return false;
  }
  if (feeItem === "03333") {
    const future90Days = addDays(startOfToday(), 91); // Add 1 day to include today's date.
    return isBefore(value, future90Days);
  }
  return isBefore(value, addDays(startOfToday(), 1)); // Add 1 day to include today's date.
};

const amountBilledZeroValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  const parsedValue = parseFloat(value);
  if (feeItem && feeItem === "03333" && parsedValue !== 0) {
    return false;
  }
  return true;
};

const partialTimeValidator = (value) => {
  if ((value.hour && !value.minute) || (!value.hour && value.minute)) {
    return false;
  }
  return true;
};

export default {
  name: "MedicalServiceClaimsFormItem",
  components: {
    DateInput,
    DigitInput,
    InputComponent,
    NumberInput,
    SelectComponent,
    TextareaComponent: Textarea,
    TimeInput,
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    serviceDate: {
      type: Date,
      default: null,
    },
    serviceDateData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    numberOfServices: {
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
    calledStartTime: {
      type: Object,
      default: () => {
        return {};
      },
    },
    renderedFinishTime: {
      type: Object,
      default: () => {
        return {};
      },
    },
    diagnosticCode: {
      type: String,
      default: null,
    },
    locationOfService: {
      type: String,
      default: null,
    },
    serviceClarificationCode: {
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
    medicalServiceClaimsFeeItemValidationError: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "update:serviceDate",
    "update:numberOfServices",
    "update:serviceClarificationCode",
    "update:amountBilled",
    "update:calledStartTime",
    "update:renderedFinishTime",
    "update:diagnosticCode",
    "update:locationOfService",
    "update:correspondenceAttached",
    "update:submissionCode",
    "update:notes",
    "update:serviceDateData",
    "update:feeItem",
    "update:medicalServiceClaimsFeeItemValidationError",
  ],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      // Select options.
      correspondenceAttachedOptions: selectOptionsCorrespondenceAttached,
      submissionCodeOptions: selectOptionsSubmissionCode,
      serviceLocationOptions: selectOptionsServiceLocation,
      // Component styles.
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
    const validationObject = {
      serviceDate: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        serviceDateValidator: optionalValidator(serviceDateValidator),
        serviceDateFutureValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : serviceDateFutureValidator
        ),
        distantPastValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : distantPastValidator
        ),
        serviceDateCutOffValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : serviceDateCutOffValidator
        ),
      },
      numberOfServices: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        intValidator: optionalValidator(intValidator),
        positiveNumberValidator: optionalValidator(positiveNumberValidator),
        nonZeroNumberValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : nonZeroNumberValidator
        ),
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
      calledStartTime: {
        partialTimeValidator: optionalValidator(partialTimeValidator),
      },
      renderedFinishTime: {
        partialTimeValidator: optionalValidator(partialTimeValidator),
      },
      diagnosticCode: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        alphanumericValidator: optionalValidator(alphanumericValidator),
        diagnosticCodeValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : diagnosticCodeValidator
        ),
      },
      locationOfService: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        serviceLocationCodeValidator: optionalValidator(
          isCSRRoute ? alwaysValidValidator : serviceLocationCodeValidator
        ),
      },
      serviceClarificationCode: {
        clarificationCodeValidator: optionalValidator(
          clarificationCodeValidator(isCSR(this.$router.currentRoute.value.path))
        ),
      },
      submissionCode: {
        submissionCodeValidator: isCSRRoute ? alwaysValidValidator : submissionCodeValidator,
      },
      notes: {
        maxLength: maxLength(400),
      },
    };

    return validationObject;
  },
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
  },
  methods: {
    handleBlurField(validationObj) {
      if (validationObj) {
        validationObj.$touch();
      }
    },
    handleProcessServiceDate(data) {
      this.$emit("update:serviceDateData", data);
    },
    handleInputServiceFeeItem(value) {
      this.$emit("update:feeItem", value);
      this.$emit("update:medicalServiceClaimsFeeItemValidationError", false);
    },
    getServiceDateFutureErrorMessage(feeItem) {
      if (feeItem === "03333") {
        return "Service date cannot be more than 90 days in the future.";
      }
      return "Service date cannot be in the future.";
    },
    isSubmissionCodeRequired() {
      const past90Days = subDays(startOfToday(), 90);
      let serviceDate = this.serviceDate;
      if (!isValid(serviceDate) || isCSR(this.$router.currentRoute.value.path)) {
        return false;
      }
      return isBefore(serviceDate, addDays(past90Days, 1));
    },
  },
};
</script>
