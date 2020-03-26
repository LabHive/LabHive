<template>
  <div class="lab-form">
    <h3 class="form-element-spacer">Contact details</h3>
    
    <span class="p-float-label form-element-spacer">
      <InputText id="firstName" type="text" v-model="formData.contact.firstname" />
      <label for="firstName">First name</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="lastName" type="text" v-model="formData.contact.lastname" />
      <label for="lastName">Last name</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="phone" type="text" v-model="formData.contact.phone" />
      <label for="phone">Phone</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="email" type="text" v-model="formData.contact.email" />
      <label for="email">Email</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="password" type="password" v-model="formData.password" />
      <label for="password">Password</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="organization" type="text" v-model="formData.organization" />
      <label for="organization">Labore/Institut</label>
    </span>    

    <h3>Location</h3>

    <span class="p-float-label form-element-spacer">
      <InputText id="city" type="text" v-model="formData.address.city" />
      <label for="city">City</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="zipcode" type="text" v-model="formData.address.zipcode" />
      <label for="zipcode">Zipcode</label>
    </span>

    <h3>Skills</h3>

    <div class="checkbox-group form-element-spacer">
      <template v-for="(option, key) in labSkills">
        <div class="checkbox" :key="key">
          <Checkbox
            :id="key"
            :inputId="key"
            :name="key"
            :value="key"
            v-model="formData.details.skills"
          />
          <label class="p-checkbox-label" :for="key">{{ option }}</label>
        </div>
      </template>
    </div>

    <span class="p-float-label form-element-spacer">
      <InputText id="description" type="text" v-model="formData.description" />
      <label for="description">Comments</label>
    </span>

    <div class="checkbox-group form-element-spacer">
      <div class="checkbox form-element-spacer" key="consentProcessing">
        <Checkbox id="consentProcessing" v-model="formData.consent.processing" :binary="true"/>
        <label for="consentProcessing" class="p-checkbox-label">Ich bin damit einverstanden, dass meine Daten von labHive Testshare zum Zweck der Weiterleitung an Labore oder Institute für die Möglichkeit einer Zusammenarbeit im Rahmen der SARS-CoV-2 Pandemie erhoben, verarbeitet und gespeichert werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DS-GVO sind von der Einwilligung unberührt. Weitere Hinweise finden Sie in unserer Datenschutzerklärung.
        </label>
      </div>

      <div class="checkbox form-element-spacer" key="consentPublicContact">
        <Checkbox id="consentPublicContact" v-model="formData.consent.publicContact" :binary="true"/>
        <label for="consentPublicContact" class="p-checkbox-label">Ich bin damit einverstanden, dass meine Kontaktdaten für registrierte Labore oder Institute der Platform über die Suchfunktion einsehbar sind.</label>
      </div>
    </div>
  
    <div style="color: red" v-if="error.state">
      {{ error.description }}
    </div>
    <Button
      icon="pi pi-chevron-right"
      iconPos="right"
      label="Registrieren"
      @click="submit"
    />
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

export default {
  name: 'HelperForm',
  data: function() {
    return {
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
      labSkills: {
        sample_processing: "Vor/Aufbereitung klinischer Proben",
        rna_isolation: "RNA isolation (Mit Kit)",
        qpcr: "qPCR",
        bsl2: "Arbeit unter BSL2 Regulationen/Sicherheitsstandards",
        bsl3: "Arbeit unter BSL3 Regulationen/Sicherheitsstandards",
        sample_collection: "klinische Erfahrung (Probenkollektion)"
      }
    }
  },
  computed: {
    error: function() {
      return this.$store.state.error
    }
  },
  components: {
    InputText,
    Checkbox,
    Button
  },
  methods: {
    submit: function() {
      this.$emit('formcomplete', this.formData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
