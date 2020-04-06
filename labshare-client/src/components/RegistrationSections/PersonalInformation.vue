<template>
  <div>
    <h3 class="section">{{ $t("contactInfo") }}</h3>
    <InputForm name="firstName" v-model="formData.contact.firstname" :valFunc="val.validFirstname"></InputForm>

    <InputForm name="lastName" v-model="formData.contact.lastname" :valFunc="val.validLastname"></InputForm>

    <InputForm name="phone" v-model="formData.contact.phone" :valFunc="val.validPhone"></InputForm>

    <h3 class="section">{{ $t("address") }}</h3>
    <InputForm name="city" v-model="formData.address.city" :valFunc="val.validCity"></InputForm>

    <InputForm name="zipcode" v-model="formData.address.zipcode" :valFunc="val.validZipcode"></InputForm>

    <template v-if="!profileUpdate">
      <b-button variant="primary" @click="$emit('nextState')" :disabled="disableSubmit">Next</b-button>
      <b-button variant="primary" @click="$emit('previousState')">Back</b-button>
    </template>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm";
import { Validator } from "@/../dist-browser/lib/validation";

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    profileUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disableSubmit: true
    };
  },
  computed: {
    formData() {
      return this.value;
    },
    val() {
      return Validator;
    }
  },
  mounted() {
    this.$children.map(a => {
      a.$on("input", () => {
        if (!this.$el) return;

        // after the event is triggered it needs some time until the DOM is updated
        this.$nextTick(() => {
          this.disableSubmit =
            this.$el.querySelectorAll(".is-invalid").length > 0;
        });
      });
    });

    this.$nextTick(() => {
      this.disableSubmit =
        this.$el.querySelectorAll(".is-invalid").length > 0;
    });
  },
  components: {
    InputForm
  }
};
</script>