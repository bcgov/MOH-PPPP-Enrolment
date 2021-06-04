<template>
  <div :class='className'>
    <fieldset>
      <legend class="time-legend">{{label}}</legend>
      <div class="time-row">
        <label v-bind:for="'hour-select' + label">Hour:</label>
        <select :id="id + 'hour-select'"
                class="form-control hour-select"
                v-model="hour"
                @input="hourInputHandler($event)"
                :disabled='disabled'>
          <!-- We show the blank option so the user can clear out their data.-->
          <option value="HH">HH</option>
          <option v-for="(hour, index) in hours"
                  :key="index"
                  :value="hour">{{hour}}</option>
        </select>

        <div class="time-colon d-flex align-items-center">:</div>

        <label v-bind:for="'minute-select' + label">Minute:</label>
        <select :id="id + 'minute-select'"
                class="form-control minute-select"
                v-model="minute"
                @input="minuteInputHandler($event)"
                :disabled='disabled'>
          <!-- We show the blank option so the user can clear out their data.-->
          <option value="MM">MM</option>
          <option v-for="(minute, index) in minutes"
                  :key="index"
                  :value="minute">{{minute}}</option>
        </select>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    value: {
      type: String,
    },
    id: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hour: null,
      minute: null,
      hours: [],
      minutes: [],
    }
  },
  created() {
    if (this.value) {
      const timeCollection = this.value.split(':')
      this.hour = timeCollection[0];
      this.minute = timeCollection[1];
    } else {
      this.hour = 'HH';
      this.minute = 'MM';
    }

    for (let i=0; i<24; i++) {
      this.hours.push(this.getDoubleDigitNumber(i));
    }
    for (let i=0; i<60; i++) {
      this.minutes.push(this.getDoubleDigitNumber(i));
    }
  },
  methods: {
    getDoubleDigitNumber(number) {
      if (number > 9) {
        return `${number}`;
      } else {
        return `0${number}`;
      }
    },
    hourInputHandler(event) {
      this.hour = event.target.value;
      this.emitInput();
    },
    minuteInputHandler(event) {
      this.minute = event.target.value;
      this.emitInput();
    },
    emitInput() {
      if (this.isInputsValidTime()) {
        this.$emit('input', this.getTime());
      } else {
        this.$emit('input', null);
      }
    },
    isInputsValidTime() {
      if (this.hour && this.minute && this.isTimeValid(this.getTime())) {
        return true;
      }
      return false;
    },
    isTimeValid(time) {
      const criteria = /^\d\d:\d\d*$/;
      return criteria.test(time);
    },
    getTime() {
      return `${this.hour}:${this.minute}`;
    }
  },
  watch: {
    value(value) {
      if (value && this.isTimeValid(value)) {
        const timeCollection = value.split(':');
        this.hour = timeCollection[0];
        this.minute = timeCollection[1];
      }
    }
  }
}
</script>

<style scoped>
legend {
  font-size: 1rem;
}
.time-row {
  display: flex;
  flex-wrap: nowrap;
}
label {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.hour-select {
  width: 70px;
  max-width: auto;
  margin-right: 5px;
}
.time-colon {
  margin-right: 5px;
  font-size: 24px;
}
.minute-select {
  width: 70px;
  max-width: auto;
}
</style>
