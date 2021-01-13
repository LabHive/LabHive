<template>
  <div>
    <b-container class="team">
      <h1 data-aos="fade" data-aos-duration="750">{{ $t("aboutUs.title") }}</h1>
      <b-row align-h="center" data-aos="fade" data-aos-duration="1000">
        <b-col class="text-center title-subtitle" sm="12" lg="10" xl="8">
          <p v-html="$t('aboutUs.ourStoryText')"></p>
        </b-col>
      </b-row>
      <b-row align-h="center" align-v="center">
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
            src="../assets/team-members/LabHive_FredericS.png"
            alt="Frederic Schade"
            class="avatar"
          />
          <p class="name">Frederic Schade</p>
          <p class="role">UX/UI, Frontend Development</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member team-member-names" data-aos="fade-up" data-aos-duration="750">
          <p class="heading">With support from</p>
          <p class="supporter">Frederic Weichel</p>
          <p class="supporter">Seth G</p>
          <p class="supporter">Valentin Arkhipov</p>
          <p class="supporter">Andrei Serban</p>
        </b-col>
      </b-row>

      <h1 data-aos="fade" data-aos-duration="750" id="advisory-board-title">Advisory Board</h1>

      <b-row align-h="center" align-v="center">
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Advisory_Board_Joachim_von_Beesten.png"
            alt="Joachim von Beesten"
            class="avatar"
          />
          <p class="name">Joachim von Beesten</p>
          <p class="role">Björn Steiger Stiftung, Managing Director</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Advisory_Board_Charles_Auffray.png"
            alt="Prof. Dr. Charles Auffray"
            class="avatar"
          />
          <p class="name">Prof. Dr. Charles Auffray</p>
          <p class="role">EISBM, Founding Director</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Advisory_Board_Martin_Drees.png"
            alt="Martin Drees"
            class="avatar"
          />
          <p class="name">Martin Drees</p>
          <p class="role">coliquio, Founder/CEO</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member" data-aos="fade-up" data-aos-duration="750">
          <img
            src="../assets/team-members/LabHive_Advisory_Board_Corinna_Fehr.png"
            alt="Corinna Fehr"
            class="avatar"
          />
          <p class="name">Corinna Fehr</p>
          <p class="role">Testtheworld</p>
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

  #advisory-board-title {
    margin-top: 75px;
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

    .name, .heading {
      font-size: 20px;
    }

    .role {
      font-size: 14px;
    }

    .heading {
      margin-bottom: 25px;
    }

    .supporter{
      font-size: 16px;
      margin-bottom: 5px;
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
