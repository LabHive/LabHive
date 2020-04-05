<i18n>
{
  "en": {},
  "de": {
    "address": "Wohnort",
    "competencies": "Fähigkeiten",
    "organization": "Organisation",
    "skills": "Erfahrungen in folgenden Bereichen",
    "bsl2": "Arbeit unter BSL2 Regulationen/Sicherheitsstandards",
    "bsl3": "Arbeit unter BSL3 Regulationen/Sicherheitsstandards",
    "sample_processing": "Vor/Aufbereitung klinischer Proben",
    "rna_isolation": "RNA isolation (Mit Kit)",
    "qpcr": "qPCR",
    "sample_collection": "Klinische Erfahrung (Probenkollektion)"
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

      <h3 class="section">{{ $t("address") }}</h3>
      <InputForm name="city" v-model="formData.address.city" :valFunc="val.validCity"></InputForm>

      <InputForm name="zipcode" v-model="formData.address.zipcode" :valFunc="val.validZipcode"></InputForm>

      <h3 class="section">{{ $t("competencies") }}</h3>

      <InputForm
        name="organization"
        v-model="formData.organization"
        :valFunc="val.validOrganization"
      ></InputForm>

      <b-form-group :label="$t('skills')">
        <b-form-checkbox-group id="skills" v-model="formData.details.skills" name="name" stacked>
          <b-form-checkbox
            v-for="(skill, i) in labSkills"
            :key="`Skill${i}`"
            :value="skill.value"
          >{{ $t(skill.value) }}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

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


      <h3 class="section">Einwilligung</h3>
      <fieldset class="form-group">
        <div tabindex="-1" role="group" class="bv-no-focus-ring">
          <div class="custom-control custom-checkbox">
            <input
              id="processing"
              type="checkbox"
              name="processing"
              autocomplete="off"
              class="custom-control-input"
              v-model="formData.consent.publicContact"
            />
            <label for="processing" class="custom-control-label" v-html="$t('consentProcessing')"></label>
          </div>
        </div>
      </fieldset>

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
import { labSkills } from "../../dist-browser/lib/selectLists";
import { Validator } from "../../dist-browser/lib/validation";
import InputForm from "./InputForm";

export default {
  name: "HelperForm",
  data: function() {
    return {
      passwordRepeat: "",
      formData: {
        address: {
          city: "",
          zipcode: ""
        },
        contact: {
          email: "",
          phone: "",
          firstname: "",
          lastname: ""
        },
        password: "",
        description: "",
        details: {
          skills: []
        },
        organization: "",
        availability: true,
        consent: {
          processing: true,
          publicContact: false,
        }
      },
      labSkills: labSkills,
      disableSubmit: true,
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
    },
  },
  mounted: function() {
    if (this.$user.role) {
      this.formData = this.$user;
      this.$nextTick(() => {
        this.disableSubmit = this.$el.querySelectorAll(".is-invalid").length > 0;
      })
    }
    else {
      this.$root.$on('gotProfile', () => {
        this.formData = this.$user;
        this.$nextTick(() => {
          this.disableSubmit = this.$el.querySelectorAll(".is-invalid").length > 0;
        })
      })
    }


    this.$children.map((a) => {
      a.$on('input', () => {
        console.log("triggered")
        if (!this.$el) return

        // after the event is triggered it needs some time until the DOM is updated
        this.$nextTick(() => {
          this.disableSubmit = this.$el.querySelectorAll(".is-invalid").length > 0;
        });
      })
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
