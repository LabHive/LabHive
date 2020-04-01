<template>
  <b-form-group>
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
            ></b-form-checkbox-group>
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
    data: Array,
    cols: {
      type: String,
      default: "2"
    },
    name: String,
    value: Array
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
    }
  }
};
</script>