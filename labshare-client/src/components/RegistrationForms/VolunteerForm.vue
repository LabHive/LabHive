<template>
  <div class="volunteer-form">
    <b-form @submit="submit">
      <template v-if="!profileUpdate">
        <transition :name="transition" mode="out-in">
          <component
            :is="formSection"
            v-model="formData"
            :role="role"
            @nextState="nextFormSection"
            @previousState="previousFormSection"
            :profileUpdate="profileUpdate"
            @submit="submit"
          ></component>
        </transition>
      </template>

      <template v-else>
        <b-modal
          id="deleteModal"
          :title="$t('deleteProfile')"
          :ok-title="$t('delete')"
          :cancel-title="$t('cancel')"
          ok-variant="danger"
          @ok="$emit('deleteProfile')"
        >
          <p class="my-4">{{ $t('deleteConfirmation') }}</p>
        </b-modal>
        <div v-for="i in formSections" :key="i">
          <component
            :is="i"
            v-model="formData"
            :role="role"
            @nextState="nextFormSection"
            @previousState="previousFormSection"
            :profileUpdate="profileUpdate"
          ></component>
        </div>
        <b-row>
          <b-col cols="auto">
            <b-button variant="primary" @click="submit" :disabled="disableSubmit">{{ $t("save") }}</b-button>
          </b-col>
          <b-col cols="auto">
            <b-button variant="danger" v-b-modal.deleteModal>{{ $t("deleteProfile") }}</b-button>
          </b-col>
        </b-row>
      </template>
      
    </b-form>
  </div>
</template>

<script>
import registrationForm from "@/mixins/registrationForm";

export default {
  name: "VolunteerForm",
  mixins: [registrationForm],
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
          lastname: ""
        },
        password: "",
        description: "",
        details: {
          skills: [],
          qualifications: []
        },
        organization: "",
        website: "",
        availability: null,
        consent: {
          publicSearch: true,
          mailUpdates: true
        }
      },
      formSections: [
        "LoginInformation",
        "Vol_Qualification",
        "Vol_Skills",
        "Vol_Contact",
        "Vol_Consent"
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  margin-top: 50px;
}

.forward-enter-active,
.forward-leave-active {
  transition: all 0.2s ease;
}
.forward-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.forward-enter {
  opacity: 0;
  transform: translateX(400px);
}

.back-enter-active,
.back-leave-active {
  transition: all 0.2s ease;
}
.back-leave-to {
  opacity: 0;
  transform: translateX(400px);
}

.back-enter {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
