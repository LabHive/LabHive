<template>
  <b-form-group :invalid-feedback="$t('required')" :state="valid" valid-feedback="OK">
    <b-container>
      <b-row>
        <template v-for="i in cols_number">
          <b-col sm :key="i">
            <b-form-checkbox-group
              stacked
              :id="name + i"
              v-model="inputVal"
              :options="arrD[i-1]"
              :name="name + i"
              @change="saveChanges"
              v-if="!radio"
              :required="required"
              :state="valid"
            ></b-form-checkbox-group>
            <b-form-radio-group
              stacked
              :id="name + i"
              v-model="inputVal"
              :options="arrD[i-1]"
              :name="name + i"
              @change="saveChanges"
              :required="required"
              :state="valid"
              v-else
            ></b-form-radio-group>
          </b-col>
        </template>
      </b-row>
    </b-container>
  </b-form-group>
</template>

<script>
function arraySplitter(array, cols) {
  let aCopy = Array.from(array);
  let result = [];
  for (let i = 0; i < cols; i++) {
    result.push([]);
  }
  let rows = Math.ceil(aCopy.length / cols);

  for (let i = 0; i < cols; i++) {
    if (aCopy.length == 0) break;
    for (let j = 0; j < rows; j++) {
      if (aCopy.length == 0) break;
      result[i].push(aCopy[0]);
      aCopy.splice(0, 1);
    }
  }

  return result;
}

export default {
  props: {
    saveChanges: {
      default: () => {},
      type: Function
    },
    data: Array,
    cols: {
      type: String,
      default: "2"
    },
    name: String,
    value: null,
    radio: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cols_number: parseInt(this.cols)
    };
  },
  computed: {
    arrD() {
      return arraySplitter(this.data, this.cols);
    },
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    valid() {
      if (!this.required) {
        return null
      }
      if (this.value === "" || (typeof this.value === "object" && this.value.length === 0)) {
        return false
      }
      return true
    }
  }
};
</script>