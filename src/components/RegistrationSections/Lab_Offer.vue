<template>
  <div>
      
    <Offer v-model="formData.offers" :showSubmit="false" :registration="true"></Offer>

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";

//import CheckboxGroup from "@/components/CheckboxGroup";

export default {
  mixins: [registrationSection],
  data() {
    return {

    };
  },
  components: {
  //  CheckboxGroup
  }
};
</script>