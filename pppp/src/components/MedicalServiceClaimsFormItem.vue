<template>
  <div>
    <DateInput label='Service Date:'
              :cypressId="'serviceDate' + index"
              :id="'msc-service-date-' + index"
              :modelValue='serviceDate'
              @blur="handleBlurField(v$.serviceDate)"
              @processDate='handleProcessServiceDate($event)'
              @update:modelValue="$emit('update:serviceDate', $event)" />
    <div class="text-danger"
        v-if="v$.serviceDate.$dirty && v$.serviceDate.serviceDateValidator.$invalid"
        aria-live="assertive">Service Date must be a valid date.</div>
    <div class="text-danger"
        v-if="v$.serviceDate.$dirty
          && !v$.serviceDate.serviceDateValidator.$invalid
          && v$.serviceDate.required.$invalid"
        aria-live="assertive">Service Date is required.</div>
    <div class="text-danger"
        v-if="v$.serviceDate.$dirty
          && !v$.serviceDate.required.$invalid
          && v$.serviceDate.serviceDateFutureValidator.$invalid"
        aria-live="assertive">{{getServiceDateFutureErrorMessage(feeItem)}}</div>
    <div class="text-danger"
        v-if="v$.serviceDate.$dirty
          && !v$.serviceDate.required.$invalid
          && v$.serviceDate.distantPastValidator.$invalid"
        aria-live="assertive">Service Date is too far in the past.</div>
    <div class="text-danger"
        v-if="v$.serviceDate.$dirty
          && !v$.serviceDate.required.$invalid
          && v$.serviceDate.serviceDateCutOffValidator.$invalid"
        aria-live="assertive">Service Date is invalid for the Service Location Code.</div>
    <DigitInput label='Number of Services:'
          :id='"msc-number-of-services-" + index'
          :cypressId="'numberOfServices' + index"
          class='mt-3'
          :modelValue='numberOfServices'
          maxlength='2'
          :inputStyle='extraSmallStyles'
          @update:modelValue="$emit('update:numberOfServices', $event);"
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
          :id='"msc-service-clarification-code-" + index'
          class='mt-3'
          :modelValue='serviceClarificationCode'
          maxlength='2'
          :isUpperCaseForced='true'
          :inputStyle='extraSmallStyles'
          @update:modelValue="$emit('update:serviceClarificationCode', $event)"
          @blur='handleBlurField(v$.serviceClarificationCode)' />
    <div class="text-danger"
        v-if="v$.serviceClarificationCode.$dirty && v$.serviceClarificationCode.clarificationCodeValidator.$invalid"
        aria-live="assertive">Service Clarification Code is invalid.</div>  
    <DigitInput label='Fee Item:'
          :id='"msc-fee-item-" + index'
          :cypressId="'feeItem' + index"
          class='mt-3'
          :modelValue='feeItem'
          maxlength='5'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.feeItem)'
          @update:modelValue='handleInputServiceFeeItem($event)' />
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
        v-if="medicalServiceClaimsFeeItemValidationError"
        aria-live="assertive">Fee Item does not match our records.</div>
    <NumberInput label='Amount Billed:'
          :id='"msc-amount-billed-" + index'
          :cypressId="'amountBilled' + index"
          class='mt-3'
          :modelValue='amountBilled'
          maxlength='8'   
          :inputStyle='smallStyles'
          @update:modelValue="$emit('update:amountBilled', $event)"
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
    <TimeInput 
              :label='"Called Start Time" + (isCSR ? "" : " (optional)") + ":"'
              :id='"msc-called-start-time-" + index'
              className='mt-3'
              :modelValue='calledStartTime'
              :isHourTwoDigits='true'
              @update:modelValue="$emit('update:calledStartTime', $event)"
              @blur='handleBlurField(v$.calledStartTime)' />
    <div class="text-danger"
        v-if="v$.calledStartTime.$dirty && v$.calledStartTime.partialTimeValidator.$invalid"
        aria-live="assertive">Called start time must be an exact value.</div>
    <TimeInput 
              :label='"Rendered Finish Time" + (isCSR ? "" : " (optional)") + ":"'
              :id='"msc-rendered-finish-time-" + index'
              className='mt-3'
              :modelValue='renderedFinishTime'
              :isHourTwoDigits='true'
              @update:modelValue="$emit('update:renderedFinishTime', $event)"
              @blur='handleBlurField(v$.renderedFinishTime)' />
    <div class="text-danger"
        v-if="v$.renderedFinishTime.$dirty && v$.renderedFinishTime.partialTimeValidator.$invalid"
        aria-live="assertive">Rendered finish time must be an exact value.</div>
    <InputComponent label='Diagnostic Code:'
          :id='"msc-diagnostic-code-" + index'
          :cypressId="'diagnosticCode' + index"
          :isUpperCaseForced='true' 
          class='mt-3'
          :modelValue='diagnosticCode'
          maxlength='5'
          :inputStyle='smallStyles'
          @update:modelValue="$emit('update:diagnosticCode', $event)"
          @blur='handleBlurField(v$.diagnosticCode)' />
    <div class="text-danger"
        v-if="v$.diagnosticCode.$dirty && v$.diagnosticCode.required.$invalid"
        aria-live="assertive">Diagnostic code is required.</div>
    <div class="text-danger"
        v-if="v$.diagnosticCode.$dirty && ((!v$.diagnosticCode.required.$invalid && v$.diagnosticCode.diagnosticCodeValidator.$invalid) || v$.diagnosticCode.alphanumericValidator.$invalid)"
        aria-live="assertive">Diagnostic code must be valid.</div>
    <SelectComponent label='Service Location Code:'
          :id='"msc-location-of-service-" + index'
          :cypressId="'serviceLocationCode' + index"
          class='mt-3'
          :modelValue='locationOfService'
          :options='serviceLocationOptions'
          :inputStyle='extraLargeStyles'
          @update:modelValue="$emit('update:locationOfService', $event)"
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
          && v$.locationOfService.serviceLocationCodeValidator.$invalid"
        aria-live="assertive">Service Location Code is invalid for the Service Date.</div>
    <SelectComponent 
        :label='"Correspondence Attached" + (isCSR ? "" : " (optional)") + ":"'
        :id='"msc-correspondence-attached-" + index'
        class='mt-3'
        :modelValue='correspondenceAttached'
        @update:modelValue="$emit('update:correspondenceAttached', $event)"
        :options='correspondenceAttachedOptions'
        defaultOptionLabel='None'
        :inputStyle='largeStyles' />
    <SelectComponent :label='"Submission Code" + ((isCSR || isSubmissionCodeRequired()) ? "" : " (optional)") + ":"'
        :id='"msc-submission-code-" + index'
        :cypressId="'submissionCode' + index"
        class='mt-3'
        :modelValue='submissionCode'
        defaultOptionLabel='None'
        :options='submissionCodeOptions'
        :inputStyle='largeStyles'
        @update:modelValue="$emit('update:submissionCode', $event)"
        @blur='handleBlurField(v$.submissionCode)' />
    <div class="text-danger"
        v-if="v$.submissionCode.$dirty && isSubmissionCodeRequired() && v$.submissionCode.submissionCodeValidator.$invalid"
        aria-live="assertive">Submission code is required.</div>
    <TextareaComponent
          :label='"Notes/Additional Information" + (isCSR ? "" : " (optional)") + ":"'
          :id='"msc-notes-" + index'
          :cypressId="'medNotesAttach' + index"
          class='mt-3'
          :modelValue='notes'
          @update:modelValue="$emit('update:notes', $event)"
          :remainingCharsMaxlength='400'
          :isRemainingCharsShown='true'
          :inputStyle='textareaStyle' />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { requiredIf, maxLength } from '@vuelidate/validators';
import {
  startOfToday,
  addDays,
  isBefore,
  subDays,
  isValid,
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
  serviceDateValidator,
  serviceDateCutOffValidator,
  serviceLocationCodeValidator,
  submissionCodeValidator,
  validateIf,
} from '@/helpers/validators';
import {
  DateInput,
  DigitInput,
  Input,
  NumberInput,
  Select,
  Textarea,
  TimeInput,
  alphanumericValidator,
  distantPastValidator,
  dollarNumberValidator,
  intValidator,
  nonZeroNumberValidator,
  optionalValidator,
  positiveNumberValidator,
} from 'common-lib-vue';

const serviceDateFutureValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  if (!value) {
    return false;
  }
  if (feeItem === '03333') {
    const future90Days = addDays(startOfToday(), 91); // Add 1 day to include today's date.
    return isBefore(value, future90Days);
  }
  return isBefore(value, addDays(startOfToday(), 1)); // Add 1 day to include today's date.
};

const amountBilledZeroValidator = (value, vm) => {
  const feeItem = vm.feeItem;
  const parsedValue = parseFloat(value);
  if (feeItem && feeItem === '03333' && parsedValue !== 0) {
    return false;
  }
  return true;
};

const partialTimeValidator = (value) => {
  if ((value.hour && !value.minute)
    || (!value.hour && value.minute)) {
    return false;
  }
  return true;
};

export default {
  name: 'MedicalServiceClaimsFormItem',
  components: {
    DateInput,
    DigitInput,
    InputComponent: Input,
    NumberInput,
    SelectComponent: Select,
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
        height: '150px'
      },
    }
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      serviceDate: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        serviceDateValidator: optionalValidator(serviceDateValidator),
        serviceDateFutureValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), serviceDateFutureValidator)),
        distantPastValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), distantPastValidator)),
        serviceDateCutOffValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), serviceDateCutOffValidator)),
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
      calledStartTime: {
        partialTimeValidator: optionalValidator(partialTimeValidator),
      },
      renderedFinishTime: {
        partialTimeValidator: optionalValidator(partialTimeValidator),
      },
      diagnosticCode: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        alphanumericValidator: optionalValidator(alphanumericValidator),
        diagnosticCodeValidator: optionalValidator(validateIf(!isCSR(this.$router.currentRoute.value.path), diagnosticCodeValidator)),
      },
      locationOfService: {
        required: requiredIf(() => !isCSR(this.$router.currentRoute.value.path)),
        serviceLocationCodeValidator: validateIf(!isCSR(this.$router.currentRoute.value.path), serviceLocationCodeValidator),
      },
      serviceClarificationCode: {
        clarificationCodeValidator: optionalValidator(clarificationCodeValidator(isCSR(this.$router.currentRoute.value.path))),
      },
      submissionCode: {
        submissionCodeValidator: validateIf(!isCSR(this.$router.currentRoute.value.path), submissionCodeValidator),
      },
      notes: {
        maxLength: maxLength(400),
      },
    };
  },
  methods: {
    handleBlurField(validationObj) {
      if (validationObj) {
        validationObj.$touch();
      }
    },
    handleProcessServiceDate(data) {
      this.$emit('update:serviceDateData', data);
    },
    handleInputServiceFeeItem(value) {
      this.$emit('update:feeItem', value);
      this.$emit('update:medicalServiceClaimsFeeItemValidationError', false);
    },
    getServiceDateFutureErrorMessage(feeItem) {
      if (feeItem === '03333') {
        return 'Service date cannot be more than 90 days in the future.';
      }
      return 'Service date cannot be in the future.';
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
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
  },
};
</script>
