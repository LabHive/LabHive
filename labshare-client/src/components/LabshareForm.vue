<template>
  <div class="labshare-form">
    <div class="labshare-progress mb-5">
      <ProgressBar :value="progessPercentage" :showValue="false" />
    </div>
<template v-for="(step, index) in formDefinition">
      <template v-if="currentStep === index">
        <h2 :key="index" class="step__title">{{ step.title }}</h2>
      </template>
      <template v-for="(element, elementIndex) in step.formElements">
        <template v-if="currentStep === index">
          <!-- input type text -->
          <template v-if="element.type == 'text'">
            <span class="p-float-label form-element-spacer" :key="index + '-' + elementIndex">
              <InputText
                :id="element.type + index + elementIndex"
                :type="element.type"
                v-model="formDefinition[index]['formElements'][elementIndex]['value']"
              />
              <label :for="element.type + index + elementIndex">{{ element.label }}</label>
            </span>
          </template>

          <!-- input type password -->
          <template v-if="element.type == 'password'">
            <span class="p-float-label form-element-spacer" :key="index + '-' + elementIndex">
              <InputText
                :id="element.type + index + elementIndex"
                :type="element.type"
                v-model="formDefinition[index]['formElements'][elementIndex]['value']"
              />
              <label :for="element.type + index + elementIndex">{{ element.label }}</label>
            </span>
          </template>

          <!-- select -->
          <div v-if="element.type == 'select'" class="dropdown form-element-spacer" :key="index + '-' + elementIndex">
              <Dropdown
                v-model="element.value"
                :options="element.options"
                :placeholder="element.name"
              />
          </div>

          <!-- description -->
          <template v-if="element.type == 'desc'">
            <div class="labshare__description" :key="index + '-' + elementIndex">
                <p><strong>{{ element.title }}</strong></p>
                <p>{{ element.description }}</p>
            </div>
          </template>

          <!-- checkbox -->
          <template v-if="element.type == 'checkbox'">
            <div class="checkbox-group checkbox--inline form-element-spacer" :key="index + '-' + elementIndex">
              <template v-for="(option, elementIndex) in element.options">
                <div class="checkbox" :key="element.type + index + elementIndex">
                  <Checkbox
                    :id="element.type + index + elementIndex"
                    :inputId="element.type + index + elementIndex"
                    :name="element.name"
                    :value="option"
                    v-model="element.value"
                  />
                  <label
                    class="p-checkbox-label"
                    :for="element.type + index + elementIndex"
                  >{{ option }}</label>
                </div>
              </template>
            </div>
          </template>
        </template>
      </template>
    </template>
    <template v-if="currentStep < formDefinition.length -1">
      <Button
        icon="pi pi-chevron-right"
        iconPos="right"
        :label="formDefinition[currentStep+1].title"
        @click="currentStep = currentStep+1"
      />
    </template>
    <template v-else>
      <Button
        icon="pi pi-chevron-right"
        iconPos="right"
        label="Registrieren"
        @click="submit"
      />
    </template>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import ProgressBar from "primevue/progressbar";

export default {
  name: 'LabshareForm',
  data: function () {
      return {
          currentStep: 0
      }
  },
  props: {
      formDefinition: Array
  },
  computed: {
    progessPercentage: function() {
      return this.currentStep / this.formDefinition.length * 100
    }
  },
  methods: {
      submit: function() {
            let formValues = {};
            this.formDefinition.forEach(step => {
                step.formElements.forEach(element => {
                    if(element.submit) {
                        formValues[element.name] = element.value
                    }
                });
            });
            this.$emit('formcomplete', formValues)
      }
  },
  components: {
    InputText,
    Checkbox,
    Button,
    Dropdown,
    ProgressBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .labshare__description {
        text-align: left;
        font-size: 12px;
        margin-top: 1rem;
        margin-bottom: 1rem;

        p {
            margin: 0;
        }
    }
</style>
