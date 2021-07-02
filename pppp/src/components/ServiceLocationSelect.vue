<template>
  <div :class='className'>
    <label :for='id'>{{label}}</label><br/>
    <select :id='id'
            class="form-control"
            :style='inputStyle'
            :value='value'
            @change="changeHandler($event)">
      <option :value='null'>Select</option>
      <option v-for="(option, index) in options"
              :key="index"
              :value='option.value'>{{option.label}}</option>
    </select>
  </div>
</template>

<script>

const options = [
  {
    value: 'A',
    label: '(A) Practitioner\'s Office - In Community'
  },
  {
    value: 'B',
    label: '(B) Community Health Centre'
  },
  {
    value: 'C',
    label: '(C) Residential Care/Assisted Living Residence'
  },
  {
    value: 'D',
    label: '(D) Diagnostic Facility'
  },
  {
    value: 'E',
    label: '(E) Hospital Emergency Room (unscheduled patient)'
  },
  {
    value: 'F',
    label: '(F) Private medical/surgical facility'
  },
  {
    value: 'G',
    label: '(G) Hospital, Day Care (surgery)'
  },
  {
    value: 'I',
    label: '(I) Hospital Inpatient'
  },
  {
    value: 'J',
    label: '(J) First Nations Primary Health Care Clinic'
  },
  {
    value: 'K',
    label: '(K) Hybrid Primary Care Practice'
  },
  {
    value: 'L',
    label: '(L) Longitudinal Primary Care Practice (e.g., GP family practice or PCN clinic)'
  },
  {
    value: 'N',
    label: '(N) Health Care Practitioner Office (non-physician)'
  },
  {
    value: 'P',
    label: '(P) Hospital Outpatient'
  },
  {
    value: 'Q',
    label: '(Q) Specialist Physician Office'
  },
  {
    value: 'R',
    label: '(R) Patient\'s private home'
  },
  {
    value: 'T',
    label: '(T) Practitioner\'s office, in publicly administered facility'
  },
  {
    value: 'U',
    label: '(U) Urgent and Primary Care Centre'
  },
  {
    value: 'V',
    label: '(V) Exclusive Virtual Care Clinic'
  },
  {
    value: 'W',
    label: '(W) Walk-In Clinic'
  },
  {
    value: 'M',
    label: '(M) Mental Health Centre'
  },
  {
    value: 'Z',
    label: '(Z) Other, e.g., accident site or in an ambulance'
  }
];

export const getServiceLocationLabelFromValue = (value) => {
  const resultOption = options.find((option) => option.value === value);
  return resultOption ? resultOption.label : value;
};

export default {
  name: 'ServiceLocationSelect',
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      options: options,
    }
  },
  methods: {
    changeHandler(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
