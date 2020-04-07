import { Validator } from "@/../dist-browser/lib/validation";
import InputForm from "@/components/InputForm";
import NavButtons from "@/components/RegistrationSections/NavButtons";
import Offer from "@/components/Offer";
import Request from "@/components/Request";

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    profileUpdate: {
      type: Boolean,
      default: false
    },
    role: String
  },
  data() {
    return {
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
    InputForm,
    NavButtons,
    Offer,
    Request
  }
};