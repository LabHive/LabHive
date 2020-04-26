<template>
  <b-form-group :invalid-feedback="$t('required')" :state="valid" valid-feedback="OK" :label="label">
    <b-container>
      <b-row>
        <template v-for="i in cols_number">
          <b-col sm :key="i" md="auto">
            <b-form-checkbox-group
              stacked
              :id="name + i"
              v-model="inputVal"
              :options="arrD[i-1]"
              :name="name + i"
              @change="saveChanges"
              v-if="!radio"
              :required="required"
            ></b-form-checkbox-group>
            <b-form-radio-group
              stacked
              :id="name + i"
              v-model="inputVal"
              :options="arrD[i-1]"
              :name="name + i"
              @change="saveChanges"
              :required="required"
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
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cols_number: parseInt(this.cols)
    };
  },
  methods: {

  },
  computed: {
    translatedData() {
      return this.data.map((x) => {
        x.text = this.$t(x.value)
        return x
      })
    },
    arrD() {
      return arraySplitter(this.translatedData, this.cols);
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
