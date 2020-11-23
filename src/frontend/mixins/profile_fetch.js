// Fetch user profile automatically if logged in
export default {
  computed: {
    $user: function () { return this.$store.state.profile; },
    $authenticated: function () { return this.$store.getters.authenticated }
  },
  mounted: function() {
    
    if(this.$authenticated && !this.$user.role && !this.$store.fetcingProfile)
    {
      this.$store.fetcingProfile = true;
      this.$store.dispatch("getProfile").then((profile) => {
        this.$root.$emit('gotProfile', profile)
      })
    }
  },
}
