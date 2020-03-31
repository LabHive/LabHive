<i18n>
{
  "en": {},
  "de": {
    "labInfo": "Labor Informationen",
    "labName": "Name des Labors",
    "street": "Straße"
  }
}
</i18n>
<template>
  <div class="lab-form">
    <b-form @submit="submit">
      <h3 class="section">{{ $t("loginInfo") }}</h3>
      <InputForm
        name="email"
        v-model="formData.contact.email"
        :valFunc="val.validEmail"
        inType="email"
      ></InputForm>

      <template v-if="!profileUpdate">
        <InputForm name="password" v-model="formData.password" :valFunc="pwVal" inType="password"></InputForm>

        <InputForm
          name="repeatPassword"
          v-model="passwordRepeat"
          :valFunc="pwVal"
          inType="password"
        ></InputForm>
      </template>

      <h3 class="section">{{ $t("contactInfo") }}</h3>
      <InputForm
        name="firstName"
        v-model="formData.contact.firstname"
        :valFunc="val.validFirstname"
      ></InputForm>

      <InputForm name="lastName" v-model="formData.contact.lastname" :valFunc="val.validLastname"></InputForm>

      <InputForm name="phone" v-model="formData.contact.phone" :valFunc="val.validPhone"></InputForm>

      <h3 class="section">{{ $t("labInfo") }}</h3>
      <InputForm name="labName" v-model="formData.name" :valFunc="val.validOrganization"></InputForm>

      <InputForm name="city" v-model="formData.address.city" :valFunc="val.validCity"></InputForm>

      <InputForm name="zipcode" v-model="formData.address.zipcode" :valFunc="val.validZipcode"></InputForm>

      <InputForm name="street" v-model="formData.address.street" :valFunc="val.validStreet"></InputForm>

      <h3 class="section">Weitere Informationen</h3>
      <b-form-group
        id="description"
        :state="val.validDescription(formData.description).valid"
        :invalid-feedback="$t('backend.formValidation.' + val.validDescription(formData.description).err.message)"
      >
        <b-form-textarea
          id="textarea"
          v-model="formData.description"
          placeholder="Weitere Informationen..."
          rows="4"
          max-rows="10"
          :state="!val.validDescription(formData.description).valid ? false: null"
        ></b-form-textarea>
      </b-form-group>

      <template v-if="profileUpdate">
        <b-button :disabled="disableSubmit" variant="primary" type="submit">{{ $t("save") }}</b-button>
      </template>
      <template v-else>
        <b-button :disabled="disableSubmit" variant="primary" type="submit">{{ $t("register") }}</b-button>
      </template>
    </b-form>
  </div>
</template>

<script>
import { Validator } from "../../dist-browser/lib/validation";
import InputForm from "./InputForm";

export default {
  name: "LabForm",
  data: function() {
    return {
      formData: {
        address: {
          city: "",
          zipcode: "",
          street: ""
        },
        contact: {
          firstname: "",
          lastname: "",
          email: "",
          phone: ""
        },
        name: "",
        description: "",
        password: "",
        consent: {
          processing: true,
          publicContact: true
        }
      },
      passwordRepeat: "",
      disableSubmit: true
    };
  },
  props: {
    profileUpdate: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    val() {
      return Validator;
    }
  },
  mounted: function() {
    if (this.$user.role) this.formData = this.$user;
    this.$children.map(a => {
      a.$on("input", () => {
        console.log("triggered");
        if (!this.$el) return;

        // after the event is triggered it needs some time until the DOM is updated
        setTimeout(() => {
          this.disableSubmit =
            this.$el.querySelectorAll(".is-invalid").length > 0;
        }, 100);
      });
    });
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
      this.$emit("formcomplete", this.formData);
    },
    pwVal(data) {
      return {
        valid: this.passwordRepeat == this.formData.password && data != ""
      };
    }
  },
  components: {
    InputForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  margin-top: 50px;
}
</style>
