<template>
  <div>
    <b-container class="team">
      <h1 data-aos="fade" data-aos-duration="750">{{ $t("aboutUs.title") }}</h1>
      <b-row align-h="center" data-aos="fade" data-aos-duration="1000">
        <b-col class="text-center title-subtitle" sm="12" lg="10" xl="8">
          <p v-html="$t('aboutUs.ourStoryText')"></p>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Tobias.png"
            alt="Dr. rer.-nat. Tobias Opialla"
            class="avatar"
          />
          <p class="name">Dr. Tobias Opialla</p>
          <p class="role">Scientific Expert, Team Lead</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Lisa.png"
            alt="Lisa Rieble"
            class="avatar"
          />
          <p class="name">Lisa Rieble</p>
          <p class="role">Scientific Expert, Communication</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Jo.png"
            alt="Dr. Johannes Richers"
            class="avatar"
          />
          <p class="name">Dr. Johannes Richers</p>
          <p class="role">Design, Communication</p>
        </b-col>
     
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Jasmine.png"
            alt="Jasmine Hubrich"
            class="avatar"
          />
          <p class="name">Jasmine Hubrich</p>
          <p class="role">Scientific Expert, Communication</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Hannes.png"
            alt="Dr. Hannes Witt"
            class="avatar"
          />
          <p class="name">Dr. Hannes Witt</p>
          <p class="role">Scientific Expert</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Eleonora.png"
            alt="Eleonora Nushi"
            class="avatar"
          />
          <p class="name">Eleonora Nushi</p>
          <p class="role">Medical Expert</p>
        </b-col>
     
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Kenneth.png"
            alt="Kenneth Ruiz Eiro"
            class="avatar"
          />
          <p class="name">Kenneth Ruiz Eiro</p>
          <p class="role">Project Management, Legal</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_FredericW.png"
            alt="Frederic Weichel"
            class="avatar"
          />
          <p class="name">Frederic Weichel</p>
          <p class="role">Design, Communication</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Thess.png"
            alt="Theresa Müller"
            class="avatar"
          />
          <p class="name">Theresa Müller</p>
          <p class="role">Design</p>
        </b-col>
    
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Laura.png"
            alt="Laura Heimerl"
            class="avatar"
          />
          <p class="name">Laura Heimerl</p>
          <p class="role">Scientific Expert</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Philipp.png"
            alt="Philipp Nieting"
            class="avatar"
          />
          <p class="name">Philipp Nieting</p>
          <p class="role">Software Development, IT-Security</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Seth.png"
            alt="Seth G"
            class="avatar"
          />
          <p class="name">Seth G</p>
          <p class="role">Software Development</p>
        </b-col>
     
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Valentin.png"
            alt="Valentin Arkhipov"
            class="avatar"
          />
          <p class="name">Valentin Arkhipov</p>
          <p class="role">Software Development</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Andrei.png"
            alt="Andrei Serban"
            class="avatar"
          />
          <p class="name">Andrei Serban</p>
          <p class="role">Frontend Development</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_FredericS.png"
            alt="Frederic Schade"
            class="avatar"
          />
          <p class="name">Frederic Schade</p>
          <p class="role">UX/UI, Frontend Development</p>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="claim">
          <p>Spread the test, beat the virus!</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .story h1, .team h1 {
    font-weight: normal;
    font-size: 36px;
    letter-spacing: 0.1em;
    margin-bottom: 64px;
    text-align: center;
  }


  .story {
    margin: 64px 0;
    text-align: center;

    p {
      font-size: 15px;
      text-align: left;
      margin-bottom: 0;
    }
  }

  .team-member {
    margin-bottom: 64px;

    .avatar {
      max-width: 180px;
      max-height: 180px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
    }

    p {
      font-style: normal;
      font-weight: normal;
      text-align: center;
      letter-spacing: 0.05em;
      color: #000000;
      margin-bottom: 0;
    }

    .name {
      font-size: 20px;
    }

    .role {
      font-size: 14px;
    }
  }

  .claim {
    text-align: center;
    font-size: 32px;
    color: #177867;
    font-weight: 500;
    text-transform: uppercase;
    margin-top: 32px;

    @media (max-width: 767px) {
      font-size: 20px;
      margin-top: 16px;
    }
  }

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
