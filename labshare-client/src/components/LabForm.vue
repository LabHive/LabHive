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
      <h3>{{ $t("loginInfo") }}</h3>
      <b-form-group id="email" :label="$t('email')">
        <b-form-input type="email" id="email" v-model="formData.contact.email" trim></b-form-input>
      </b-form-group>

      <template v-if="!profileUpdate">
        <b-form-group id="password" :label="$t('password')">
          <b-form-input type="password" id="password" v-model="formData.password" trim></b-form-input>
        </b-form-group>

        <b-form-group id="password" :label="$t('repeatPassword')">
          <b-form-input type="password" id="password" v-model="passwordRepeat" trim></b-form-input>
        </b-form-group>
      </template>

      <h3>{{ $t("contactInfo") }}</h3>
      <b-form-group id="firstname" :label="$t('firstName')">
        <b-form-input id="firstname" v-model="formData.contact.firstname" trim></b-form-input>
      </b-form-group>

      <b-form-group id="lastname" :label="$t('lastName')">
        <b-form-input id="lastname" v-model="formData.contact.lastname" trim></b-form-input>
      </b-form-group>

      <b-form-group id="phone" :label="$t('phone')">
        <b-form-input id="phone" v-model="formData.contact.phone" trim></b-form-input>
      </b-form-group>

      <h3>{{ $t("labInfo") }}</h3>
      <b-form-group id="name" :label="$t('labName')">
        <b-form-input id="name" v-model="formData.name" trim></b-form-input>
      </b-form-group>

      <b-form-group id="city" :label="$t('city')">
        <b-form-input id="city" v-model="formData.address.city" trim></b-form-input>
      </b-form-group>

      <b-form-group id="zipcode" :label="$t('postCode')">
        <b-form-input id="zipcode" v-model="formData.address.zipcode" trim></b-form-input>
      </b-form-group>

      <b-form-group id="street" :label="$t('street')">
        <b-form-input id="street" v-model="formData.address.street" trim></b-form-input>
      </b-form-group>

      <h3>Weitere Informationen</h3>
      <b-form-group id="description">
        <b-form-textarea
          id="textarea"
          v-model="formData.description"
          placeholder="Weitere Informationen..."
          rows="4"
          max-rows="10"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="processing"
          v-model="formData.consent.processing"
          name="processing"
        >{{ $t("consentProcessing") }}</b-form-checkbox>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="publicContact"
          v-model="formData.consent.publicContact"
          name="publicContact"
        >{{ $t("consentContact") }}</b-form-checkbox>
      </b-form-group>

      <template v-if="profileUpdate">
        <b-button variant="primary" type="submit">{{ $t("save") }}</b-button>
      </template>
      <template v-else>
        <b-button variant="primary" type="submit">
          {{
          $t("register")
          }}
        </b-button>
      </template>
    </b-form>
  </div>
</template>

<script>
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
          publicContact: false,
          processing: false
        }
      }
    };
  },
  props: {
    profileUpdate: {
      default: false,
      type: Boolean
    }
  },
  mounted: function() {
    if (this.$store.state.profile.role)
      this.formData = this.$store.state.profile;
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
      this.$emit("formcomplete", this.formData);
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  max-width: 360px;
}
</style>
