import { Validator } from "@/../dist-browser/lib/validation";
import InputForm from "@/components/InputForm";
import LoginInformation from "@/components/RegistrationSections/LoginInformation";
import PersonalInformation from "@/components/RegistrationSections/PersonalInformation";
import Consent from "@/components/RegistrationSections/Consent";
import SpecificVolunteer from "@/components/RegistrationSections/SpecificVolunteer";
import SpecificDLab from "@/components/RegistrationSections/SpecificDLab";
import Lab_Offer from "@/components/RegistrationSections/Lab_Offer";
import Lab_Request from "@/components/RegistrationSections/Lab_Request";

export default {
  data: function () {
    return {
      disableSubmit: true,
      formSections: [],
      currentFormSection: 0,
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
      return this.formSections[this.currentFormSection]
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
  },
  methods: {
    submit: function () {
      this.$emit("formcomplete", this.formData);
    },
    nextFormSection() {
      this.transition = "forward"
      this.currentFormSection += 1
      this.updateProgress()
    },
    previousFormSection() {
      this.transition = "back"
      this.currentFormSection -= 1
      this.updateProgress()
    },
    updateProgress() {
      let progress = this.currentFormSection / (this.formSections.length - 1) * 100
      this.$emit("updateProgress", progress)
    }
  },
  components: {
    InputForm,
    LoginInformation,
    PersonalInformation,
    SpecificVolunteer,
    Consent,
    Lab_Offer,
    Lab_Request,
    SpecificDLab
  }
};