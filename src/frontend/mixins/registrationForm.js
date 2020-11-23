import { Validator } from "@lib/validation";
import InputForm from "@/components/InputForm";


import LoginInformation from "@/components/RegistrationSections/LoginInformation";
import Vol_Qualification from "@/components/RegistrationSections/Vol_Qualification";
import Vol_Skills from "@/components/RegistrationSections/Vol_Skills";
import Vol_Contact from "@/components/RegistrationSections/Vol_Contact";
import Vol_Consent from "@/components/RegistrationSections/Vol_Consent";

import Lab_Contact from "@/components/RegistrationSections/Lab_Contact";
import Lab_Offer from "@/components/RegistrationSections/Lab_Offer";
import Lab_Request from "@/components/RegistrationSections/Lab_Request";
import Lab_Consent from "@/components/RegistrationSections/Lab_Consent";

export default {
  data: function () {
    return {
      disableSubmit: true,
      formSections: [],
      transition: "forward",
    };
  },
  props: {
    profileUpdate: {
      default: false,
      type: Boolean
    },
    role: String
  },
  computed: {
    val() {
      return Validator;
    },
    formSection() {
      return this.formSections[this.$route.params.id - 1]
    }
  },
  mounted: function () {
    if (this.$user.role) {
      this.formData = this.$user;
      this.$nextTick(() => {
        this.disableSubmit = this.$el.querySelectorAll(".is-invalid, .invalid-feedback.d-block").length > 0;
      })
    }
    else {
      this.$root.$on('gotProfile', () => {
        this.formData = this.$user;
        this.$nextTick(() => {
          this.disableSubmit = this.$el.querySelectorAll(".is-invalid, .invalid-feedback.d-block").length > 0;
        })
      })
    }

    this.$root.$on("inputForm_changed", () => {
      this.$nextTick(() => {
        this.disableSubmit = this.$el.querySelectorAll(".is-invalid, .invalid-feedback.d-block").length > 0; 
      });
    })

    this.$on('updateTransition', (transition) => {
      this.transition = transition
    })
  },
  methods: {
    submit: function () {
      this.$emit("formcomplete", this.formData);
    },
    nextFormSection() {
      this.transition = "forward"
      this.updateStep(parseInt(this.$route.params.id) + 1)
    },
    previousFormSection() {
      this.transition = "back"
      this.updateStep(parseInt(this.$route.params.id) - 1)
    },
    updateStep(i) {
      this.$emit("updateStep", i)
    }
  },
  components: {
    InputForm,
  
    LoginInformation,
    Vol_Qualification,
    Vol_Skills,
    Vol_Contact,
    Vol_Consent,

    Lab_Offer,
    Lab_Request,
    Lab_Consent,
    Lab_Contact,
  }
};