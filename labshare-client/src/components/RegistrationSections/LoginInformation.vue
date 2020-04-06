<template>
  <div>
    <h3 class="section">{{ $t("loginInfo") }}</h3>
    <InputForm
      name="email"
      v-model="formData.contact.email"
      :valFunc="val.validEmail"
      inType="email"
    ></InputForm>

    <template v-if="!profileUpdate">
      <InputForm name="password" v-model="formData.password" :valFunc="pwVal" inType="password"></InputForm>
      <InputForm name="repeatPassword" v-model="passwordRepeat" :valFunc="pwVal" inType="password"></InputForm>
    </template>

    <template v-if="!profileUpdate">
      <b-button variant="primary" @click="$emit('nextState')" :disabled="disableSubmit">Next</b-button>
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
      passwordRepeat: "",
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
  methods: {
    pwVal(data) {
      return {
        valid: this.passwordRepeat == this.formData.password && data != ""
      };
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