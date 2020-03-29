<template>
  <div class="lab-form">
    <b-form @submit="submit">

      <h3>Login Informationen</h3>
      <b-form-group id="email" label="E-Mail Adresse">
        <b-form-input type="email" id="email" v-model="formData.contact.email" trim></b-form-input>
      </b-form-group>

      <template v-if="!profileUpdate">
        <b-form-group id="password" label="Passwort">
          <b-form-input type="password" id="password" v-model="formData.password" trim></b-form-input>
        </b-form-group>

        <b-form-group id="password" label="Passwort wiederholen">
          <b-form-input type="password" id="password" v-model="passwordRepeat" trim></b-form-input>
        </b-form-group>
      </template>

      <h3>Kontakt Informationen</h3>
      <b-form-group id="firstname" label="Vorname">
        <b-form-input id="firstname" v-model="formData.contact.firstname" trim></b-form-input>
      </b-form-group>

      <b-form-group id="lastname" label="Nachname">
        <b-form-input id="lastname" v-model="formData.contact.lastname" trim></b-form-input>
      </b-form-group>

      <b-form-group id="phone" label="Telefonnummer">
        <b-form-input id="phone" v-model="formData.contact.phone" trim></b-form-input>
      </b-form-group>

      <h3>Wohnort</h3>
      <b-form-group id="city" label="Ort">
        <b-form-input id="city" v-model="formData.address.city" trim></b-form-input>
      </b-form-group>

      <b-form-group id="zipcode" label="Postleitzahl">
        <b-form-input id="zipcode" v-model="formData.address.zipcode" trim></b-form-input>
      </b-form-group>

      <h3>Fähigkeiten</h3> 
      <b-form-group id="organization" label="Organisation">
        <b-form-input id="organization" v-model="formData.organization" trim></b-form-input>
      </b-form-group>

      <b-form-group label="Erfahrungen in folgenden Bereichen">
        <b-form-checkbox-group
          id="skills"
          v-model="formData.details.skills"
          :options="labSkills"
          name="name"
          stacked></b-form-checkbox-group>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="processing"
          v-model="formData.consent.processing"
          name="processing"
        >Ich bin damit einverstanden, dass meine Daten von labHive Testshare zum Zweck der Weiterleitung an Labore oder Institute für die Möglichkeit einer Zusammenarbeit im Rahmen der SARS-CoV-2 Pandemie erhoben, verarbeitet und gespeichert werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DS-GVO sind von der Einwilligung unberührt. Weitere Hinweise finden Sie in unserer Datenschutzerklärung.</b-form-checkbox>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="publicContact"
          v-model="formData.consent.publicContact"
          name="publicContact"
        >Ich bin damit einverstanden, dass meine Kontaktdaten für registrierte Labore oder Institute der Platform über die Suchfunktion einsehbar sind.</b-form-checkbox>
      </b-form-group>

      <template v-if="profileUpdate">
        <b-button variant="primary" type="submit">Speichern</b-button>
      </template>
      <template v-else>
        <b-button variant="primary" type="submit">Registrieren</b-button>
      </template>
      
    </b-form>
  </div>
    
</template>

<script>
export default {
  name: 'HelperForm',
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
          lastname: "",
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
          publicContact: false,
        }
      },
      labSkills: [
        {value: "bsl2", text: "Arbeit unter BSL2 Regulationen/Sicherheitsstandards"},
        {value: "bsl3", text: "Arbeit unter BSL3 Regulationen/Sicherheitsstandards"},
        {value: "sample_processing", text: "Vor/Aufbereitung klinischer Proben"},
        {value: "rna_isolation", text: "RNA isolation (Mit Kit)"},
        {value: "qpcr", text: "qPCR"},
        {value: "sample_collection", text: "Klinische Erfahrung (Probenkollektion)"}
      ]
    }
  },
  props: {
    profileUpdate: {
      default: false,
      type: Boolean
    }
  },
  mounted: function(){
    if(this.$store.state.profile.role)
      this.formData = this.$store.state.profile
  },
  methods: {
    submit: function(event) {
      event.preventDefault()
      this.$emit('formcomplete', this.formData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
