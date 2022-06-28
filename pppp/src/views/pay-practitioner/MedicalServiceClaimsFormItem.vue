<template>
  <div>
    <DateInput label='Service Date:'
              :cypressId="'serviceDate' + index"
              :id="'msc-service-date-' + index"
              v-model='claim.serviceDate'
              @blur='handleBlurField(v$.medicalServiceClaims.$each[index].serviceDate)'
              @processDate='handleProcessServiceDate($event, index)' />
    <div class="text-danger"
        v-if="v.serviceDate.$dirty && !v.serviceDate.serviceDateValidator"
        aria-live="assertive">Service Date must be a valid date.</div>
    <div class="text-danger"
        v-if="v.serviceDate.$dirty
          && v.serviceDate.serviceDateValidator
          && !v.serviceDate.required"
        aria-live="assertive">Service Date is required.</div>
    <div class="text-danger"
        v-if="v.serviceDate.$dirty
          && v.serviceDate.required
          && !v.serviceDate.serviceDateFutureValidator"
        aria-live="assertive">{{getServiceDateFutureErrorMessage(claim.feeItem)}}</div>
    <div class="text-danger"
        v-if="v.serviceDate.$dirty
          && v.serviceDate.required
          && !v.serviceDate.distantPastValidator"
        aria-live="assertive">Service Date is too far in the past.</div>
    <div class="text-danger"
        v-if="v.serviceDate.$dirty
          && v.serviceDate.required
          && !v.serviceDate.serviceDateCutOffValidator"
        aria-live="assertive">Service Date is invalid for the Service Location Code.</div>
    <DigitInput label='Number of Services:'
          :id='"msc-number-of-services-" + index'
          :cypressId="'numberOfServices' + index"
          class='mt-3'
          maxlength="2"
          v-model='claim.numberOfServices'
          :inputStyle='extraSmallStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].numberOfServices)' />
    <div class="text-danger"
        v-if="v.numberOfServices.$dirty && !v.numberOfServices.required"
        aria-live="assertive">Number of Services is required.</div>
    <div class="text-danger"
        v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.intValidator"
        aria-live="assertive">Number of Services must be an integer.</div>
    <div class="text-danger"
        v-if="v.numberOfServices.$dirty && v.numberOfServices.required && !v.numberOfServices.positiveNumberValidator"
        aria-live="assertive">Number of Services must be greater than 0.</div>
    <div class="text-danger"
        v-if="v.numberOfServices.$dirty
          && v.numberOfServices.required
          && v.numberOfServices.positiveNumberValidator
          && !v.numberOfServices.nonZeroNumberValidator"
        aria-live="assertive">Number of Services must be greater than 0.</div>
    <InputComponent 
          :label='"Service Clarification Code" + (isCSR ? "" : " (optional)") + ":"'
          :id='"msc-service-clarification-code-" + index'
          class='mt-3'
          maxlength="2"
          v-model='claim.serviceClarificationCode'
          :isUpperCaseForced='true'
          :inputStyle='extraSmallStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].serviceClarificationCode)' />
    <div class="text-danger"
        v-if="v.serviceClarificationCode.$dirty && !v.serviceClarificationCode.clarificationCodeValidator"
        aria-live="assertive">Service Clarification Code is invalid.</div>
    <DigitInput label='Fee Item:'
          :id='"msc-fee-item-" + index'
          :cypressId="'feeItem' + index"
          class='mt-3'
          maxlength="5"
          v-model='claim.feeItem'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].feeItem)'
          @input='handleInputServiceFeeItem(index)' />
    <div class="text-danger"
        v-if="v.feeItem.$dirty && !v.feeItem.required"
        aria-live="assertive">Fee Item is required.</div>
    <div class="text-danger"
        v-if="v.feeItem.$dirty && v.feeItem.required && !v.feeItem.intValidator"
        aria-live="assertive">Fee Item must be an integer.</div>
    <div class="text-danger"
        v-if="v.feeItem.$dirty && v.feeItem.required && !v.feeItem.positiveNumberValidator"
        aria-live="assertive">Fee Item must be a positive number.</div>
    <div class="text-danger"
        v-if="medicalServiceClaimsFeeItemValidationError[index]"
        aria-live="assertive">Fee Item does not match our records.</div>
    <NumberInput label='Amount Billed:'
          :id='"msc-amount-billed-" + index'
          :cypressId="'amountBilled' + index"
          class='mt-3'
          maxlength="8"   
          v-model='claim.amountBilled'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].amountBilled)' />
    <div class="text-danger"
        v-if="v.amountBilled.$dirty && !v.amountBilled.required"
        aria-live="assertive">Amount billed is required.</div>
    <div class="text-danger"
        v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.dollarNumberValidator"
        aria-live="assertive">Amount billed must be a dollar amount. Example: 10.00</div>
    <div class="text-danger"
        v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.positiveNumberValidator"
        aria-live="assertive">Amount billed must be a positive number.</div> 
    <div class="text-danger"
        v-if="v.amountBilled.$dirty && v.amountBilled.required && !v.amountBilled.amountBilledZeroValidator"
        aria-live="assertive">Amount billed must be zero if Fee item is '03333'.</div>
    <TimeInput 
              :label='"Called Start Time" + (isCSR ? "" : " (optional)") + ":"'
              :id='"msc-called-start-time-" + index'
              className='mt-3'
              v-model='claim.calledStartTime'
              :isHourTwoDigits='true'
              @blur='handleBlurField(v$.medicalServiceClaims.$each[index].calledStartTime)' />
    <div class="text-danger"
        v-if="v.calledStartTime.$dirty && !v.calledStartTime.partialTimeValidator"
        aria-live="assertive">Called start time must be an exact value.</div>
    <TimeInput 
              :label='"Rendered Finish Time" + (isCSR ? "" : " (optional)") + ":"'
              :id='"msc-rendered-finish-time-" + index'
              className='mt-3'
              v-model='claim.renderedFinishTime'
              :isHourTwoDigits='true'
              @blur='handleBlurField(v$.medicalServiceClaims.$each[index].renderedFinishTime)' />
    <div class="text-danger"
        v-if="v.renderedFinishTime.$dirty && !v.renderedFinishTime.partialTimeValidator"
        aria-live="assertive">Rendered finish time must be an exact value.</div>
    <InputComponent label='Diagnostic Code:'
          :id='"msc-diagnostic-code-" + index'
          :cypressId="'diagnosticCode' + index"
          :isUpperCaseForced='true' 
          class='mt-3'
          maxlength="5"
          v-model='claim.diagnosticCode'
          :inputStyle='smallStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].diagnosticCode)' />
    <div class="text-danger"
        v-if="v.diagnosticCode.$dirty && !v.diagnosticCode.required"
        aria-live="assertive">Diagnostic code is required.</div>
    <div class="text-danger"
        v-if="v.diagnosticCode.$dirty && ((v.diagnosticCode.required && !v.diagnosticCode.diagnosticCodeValidator) || !v.diagnosticCode.alphanumericValidator)"
        aria-live="assertive">Diagnostic code must be valid.</div>
    <SelectComponent label='Service Location Code:'
          :id='"msc-location-of-service-" + index'
          :cypressId="'serviceLocationCode' + index"
          class='mt-3'
          v-model='claim.locationOfService'
          :options='serviceLocationOptions'
          :inputStyle='extraLargeStyles'
          @blur='handleBlurField(v$.medicalServiceClaims.$each[index].locationOfService)'>
      <template v-slot:description>
        <p class="input-description" v-if="!isCSR">
          MSP Claims submitted with Service Location Code (<b>A</b>) for dates of service on or after October 1, 2021, will not be accepted.
        </p>
      </template>
    </SelectComponent>
    <div class="text-danger"
        v-if="v.locationOfService.$dirty
          && !v.locationOfService.required"
        aria-live="assertive">Service location code is required.</div>
    <div class="text-danger"
        v-if="v.locationOfService.$dirty
          && v.locationOfService.required
          && !v.locationOfService.serviceLocationCodeValidator"
        aria-live="assertive">Service Location Code is invalid for the Service Date.</div>
    <SelectComponent 
        :label='"Correspondence Attached" + (isCSR ? "" : " (optional)") + ":"'
        :id='"msc-correspondence-attached-" + index'
        class='mt-3'
        v-model='claim.correspondenceAttached'
        :options='correspondenceAttachedOptions'
        defaultOptionLabel='None'
        :inputStyle='largeStyles' />
    <SelectComponent :label='"Submission Code" + ((isCSR || isSubmissionCodeRequired(index)) ? "" : " (optional)") + ":"'
        :id='"msc-submission-code-" + index'
        :cypressId="'submissionCode' + index"
        class='mt-3'
        v-model='claim.submissionCode'
        defaultOptionLabel='None'
        :options='submissionCodeOptions'
        :inputStyle='largeStyles'
        @blur='handleBlurField(v$.medicalServiceClaims.$each[index].submissionCode)' />
    <div class="text-danger"
        v-if="v.submissionCode.$dirty && isSubmissionCodeRequired(index) && !v.submissionCode.submissionCodeValidator"
        aria-live="assertive">Submission code is required.</div>
    <TextareaComponent 
      :label='"Notes/Additional Information" + (isCSR ? "" : " (optional)") + ":"'
      :id="'msc-medical-notes-' + index"
      :cypressId="'medNotesAttach' + index"
      class="mt-3"
      v-model='claim.notes'
      :remainingCharsMaxlength='400'
      :isRemainingCharsShown="true"
      :inputStyle="textareaStyle" />
  </div>
</template>

<script>
import {
  TimeInput,
} from 'common-lib-vue';

export default {
  name: 'MedicalServiceClaimsFormItem',
  components: {
    TimeInput,
  },
};
</script>
