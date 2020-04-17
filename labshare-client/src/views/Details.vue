<i18n>
{
  "en": {
    "title": "Details"
  },
  "de": {
    "title": "Einzelheiten"
  }
}
</i18n>

<template>
  <div class="details-view">
    <h1 class="mt-4">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: {
    profileData: Object,
  },
  data() {
    return {
      profile: this.profileData
    }
  },
  computed: {
    title() {
      let title = ""
      console.log(this.profile)
      // switch(this.profile.role) {
      //   case "volunteer":
      //     title = "Volunteer Profile";
      //     break;
      //   case "lab_research":
      //     title = "Research Lab Profile";
      //     break;
      //   case "lab_diag":
      //     title = "Diagnostic Lab Profile";
      //     break;
      // }
      return title;
    } 
  },
  mounted() {
    if(!this.profile) {
      this.getProfile(this.$attrs.id)
        .then( body => {
          this.profile = body.data;
        })
    }
  },
  methods: {
    getProfile(profileId) {
      return new Promise((res, rej) => {
        this.$http.get(`profile/${profileId}`).then(
          success => {
            res(success.body);
          },
          error => {
            rej(error);
            console.log(error);
          }
        );
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
