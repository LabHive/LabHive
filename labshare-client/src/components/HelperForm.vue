<i18n>
{
  "en": {},
  "de": {
    "loginInfo": "Login Informationen",
    "contactInfo": "Kontakt Informationen",
    "address": "Wohnort",
    "competencies": "Fähigkeiten",
    "consentProcessing": "Ich bin damit einverstanden, dass meine Daten von labHive Testshare zum Zweck der Weiterleitung an Labore oder Institute für die Möglichkeit einer Zusammenarbeit im Rahmen der SARS-CoV-2 Pandemie erhoben, verarbeitet und gespeichert werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DS-GVO sind von der Einwilligung unberührt. Weitere Hinweise finden Sie in unserer Datenschutzerklärung.",
    "consentContact": "Ich bin damit einverstanden, dass meine Kontaktdaten für registrierte Labore oder Institute der Platform über die Suchfunktion einsehbar sind.",
    "submit": "Registrieren",
    "email": "E-Mail Adresse",
    "password": "Passwort",
    "repeatPassword": "Passwort wiederholen",
    "firstName": "Vorname",
    "lastName": "Nachname",
    "phone": "Telefonnummer",
    "city": "Ort",
    "postCode": "Postleitzahl",
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
      <h3>{{$t("loginInfo")}}</h3>
      <b-form-group id="email" :label="$t('email')">
        <b-form-input type="email" id="email" v-model="formData.contact.email" trim></b-form-input>
      </b-form-group>

      <b-form-group id="password" :label="$t('password')">
        <b-form-input type="password" id="password" v-model="formData.password" trim></b-form-input>
      </b-form-group>

      <b-form-group id="password" :label="$t('repeatPassword')">
        <b-form-input type="password" id="password" v-model="passwordRepeat" trim></b-form-input>
      </b-form-group>

      <h3>{{$t("contactInfo")}}</h3>
      <b-form-group id="firstname" :label="$t('firstName')">
        <b-form-input id="firstname" v-model="formData.contact.firstname" trim></b-form-input>
      </b-form-group>

      <b-form-group id="lastname" :label="$t('lastName')">
        <b-form-input id="lastname" v-model="formData.contact.lastname" trim></b-form-input>
      </b-form-group>

      <b-form-group id="phone" :label="$t('phone')">
        <b-form-input id="phone" v-model="formData.contact.phone" trim></b-form-input>
      </b-form-group>

      <h3>{{$t("address")}}</h3>
      <b-form-group id="city" :label="$t('city')">
        <b-form-input id="city" v-model="formData.address.city" trim></b-form-input>
      </b-form-group>

      <b-form-group id="zipcode" :label="$t('postCode')">
        <b-form-input id="zipcode" v-model="formData.address.zipcode" trim></b-form-input>
      </b-form-group>

      <h3>{{$t("competencies")}}</h3>
      <b-form-group id="organization" :label="$t('organization')">
        <b-form-input id="organization" v-model="formData.organization" trim></b-form-input>
      </b-form-group>

      <b-form-group :label="$t('skills')">
        <b-form-checkbox-group id="skills" v-model="formData.details.skills" name="name" stacked>
          <b-form-checkbox
            v-for="(skill, i) in labSkills"
            :key="`Skill${i}`"
            value="skill.value"
          >{{$t(skill.value)}}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="processing"
          v-model="formData.consent.processing"
          name="processing"
        >{{$t("consentProcessing")}}</b-form-checkbox>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="publicContact"
          v-model="formData.consent.publicContact"
          name="publicContact"
        >{{$t("consentContact")}}</b-form-checkbox>
      </b-form-group>

      <b-button variant="primary" type="submit">{{$t("submit")}}</b-button>
    </b-form>
  </div>
</template>

<script>
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
          processing: false,
          publicContact: false
        }
      },
      labSkills: [
        {
          value: "bsl2"
        },
        {
          value: "bsl3"
        },
        {
          value: "sample_processing"
        },
        { value: "rna_isolation" },
        { value: "qpcr" },
        {
          value: "sample_collection"
        }
      ]
    };
  },
  computed: {
    error: function() {
      return this.$store.state.error;
    }
  },
  components: {},
  methods: {
    submit: function(event) {
      event.preventDefault();
      this.$emit("formcomplete", this.formData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
