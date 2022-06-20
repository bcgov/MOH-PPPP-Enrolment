<template>
  <div>
    <DateInput label='Service Date:'
              :cypressId="'serviceDate' + index"
              :id="'service-date-' + index"
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
          && !v$.serviceDate.serviceDateFutureValidator.$invalid
          && v$.serviceDate.distantPastValidator.$invalid"
        aria-live="assertive">Service Date is too far in the past.</div>
    <div class="text-danger"
        v-if="v$.serviceDate.$dirty
          && !v$.serviceDate.required.$invalid
          && v$.serviceDate.serviceDateCutOffValidator.$invalid"
        aria-live="assertive">Service Date is invalid for the Service Location Code.</div>
    <DigitInput label='Number of Services:'
          :id='"number-of-services-" + index'
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
          :id='"service-clarification-code-" + index'
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
          :id='"fee-item-" + index'
          :cypressId="'feeItem' + index"
          class='mt-3'
          :modelValue='feeItem'
          maxlength='5'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.feeItem)'
          @update:modelValue='handleInputServiceFeeItem($event)' />
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
        v-if="medicalServiceClaimsFeeItemValidationError"
        aria-live="assertive">Fee Item does not match our records.</div>
    <NumberInput label='Amount Billed:'
          :id='"amount-billed-" + index'
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
    <!--<TimeInput 
              :label='"Called Start Time" + (isCSR ? "" : " (optional)") + ":"'
              :id='"called-start-time-" + index'
              className='mt-3'
              v-model='calledStartTime'
              :isHourTwoDigits='true'
              @blur='handleBlurField(v$.medicalServiceClaims.$each[index].calledStartTime)' />
    <div class="text-danger"
        v-if="v.calledStartTime.$dirty && !v.calledStartTime.partialTimeValidator"
        aria-live="assertive">Called start time must be an exact value.</div>
    <TimeInput 
              :label='"Rendered Finish Time" + (isCSR ? "" : " (optional)") + ":"'
              :id='"rendered-finish-time-" + index'
              className='mt-3'
              v-model='renderedFinishTime'
              :isHourTwoDigits='true'
              @blur='handleBlurField(v$.medicalServiceClaims.$each[index].renderedFinishTime)' />
    <div class="text-danger"
        v-if="v.renderedFinishTime.$dirty && !v.renderedFinishTime.partialTimeValidator"
        aria-live="assertive">Rendered finish time must be an exact value.</div>
    <Input label='Diagnostic Code:'
          :id='"diagnostic-code-" + index'
          :cypressId="'diagnosticCode' + index"
          :isUpperCaseForced='true' 
          class='mt-3'
          v-model='diagnosticCode'
          maxlength='5'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].diagnosticCode)' />
    <div class="text-danger"
        v-if="v.diagnosticCode.$dirty && !v.diagnosticCode.required"
        aria-live="assertive">Diagnostic code is required.</div>
    <div class="text-danger"
        v-if="v.diagnosticCode.$dirty && ((v.diagnosticCode.required && !v.diagnosticCode.diagnosticCodeValidator) || !v.diagnosticCode.alphanumericValidator)"
        aria-live="assertive">Diagnostic code must be valid.</div>
    <Select label='Service Location Code:'
          :id='"location-of-service-" + index'
          :cypressId="'serviceLocationCode' + index"
          class='mt-3'
          v-model='locationOfService'
          :options='serviceLocationOptions'
          :inputStyle='extraLargeStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].locationOfService)'>
      <template v-slot:description>
        <p class="input-description" v-if="!isCSR">
          MSP Claims submitted with Service Location Code (<b>A</b>) for dates of service on or after October 1, 2021, will not be accepted.
        </p>
      </template>
    </Select>
    <div class="text-danger"
        v-if="v.locationOfService.$dirty
          && !v.locationOfService.required"
        aria-live="assertive">Service Location Code is required.</div>
    <div class="text-danger"
        v-if="v.locationOfService.$dirty
          && v.locationOfService.required
          && !v.locationOfService.serviceLocationCodeValidator"
        aria-live="assertive">Service Location Code is invalid for the Service Date.</div>
    <Select 
        :label='"Correspondence Attached" + (isCSR ? "" : " (optional)") + ":"'
        :id='"correspondence-attached-" + index'
        class='mt-3'
        v-model='correspondenceAttached'
        :options='correspondenceAttachedOptions'
        defaultOptionLabel='None'
        :inputStyle='largeStyles' />
    <Select :label='"Submission Code" + ((isCSR || isSubmissionCodeRequired(index)) ? "" : " (optional)") + ":"'
        :id='"submission-code-" + index'
        :cypressId="'submissionCode' + index"
        class='mt-3'
        v-model='submissionCode'
        defaultOptionLabel='None'
        :options='submissionCodeOptions'
        :inputStyle='largeStyles'
        @blur='handleBlurField(v$.medicalServiceClaims.$each[index].submissionCode)' />
    <div class="text-danger"
        v-if="v.submissionCode.$dirty && isSubmissionCodeRequired(index) && !v.submissionCode.submissionCodeValidator"
        aria-live="assertive">Submission code is required.</div>
    <Textarea 
          :label='"Notes/Additional Information" + (isCSR ? "" : " (optional)") + ":"'
          :id='"notes-" + index'
          :cypressId="'notesAttach' + index"
          class='mt-3'
          v-model='notes'
          :remainingCharsMaxlength='400'
          :isRemainingCharsShown='true'
          :inputStyle='textareaStyle' /> -->
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { requiredIf, maxLength } from '@vuelidate/validators';
import {
  startOfToday,
  addDays,
  isBefore,
} from 'date-fns';
import {
  extraSmallStyles,
  smallStyles,
} from '@/constants/input-styles';
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
      extraSmallStyles,
      smallStyles,
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
      this.$emit('update:feeItem', value)
      this.$emit('update:medicalServiceClaimsFeeItemValidationError', false)
    },
    getServiceDateFutureErrorMessage(feeItem) {
      if (feeItem === '03333') {
        return 'Service date cannot be more than 90 days in the future.';
      }
      return 'Service date cannot be in the future.';
    },
  },
  computed: {
    isCSR() {
      return isCSR(this.$router.currentRoute.value.path);
    },
  },
};
</script>
