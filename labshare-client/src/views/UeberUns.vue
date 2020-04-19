<i18n>
    {
    "en": {
   "ourTeam": "Our Team",
    "ourStoryHeadline": "Our Story",
    "ourStoryText": "The LabHive team came together from two teams with a similar idea as part of the German government's hackathon #WirVsVirus.whie had a similar idea and are now developing it further with new team members. The team now consists of a variety of personalities with different interests and nationalities. From natural sciences to humanities, almost every discipline is represented. The virus knows no boundaries and therefore a solution for the situation must also combine different disciplines. Our team, which now consists of 15 people, works in a networked, digital and international way to create a digital platform for an efficient diagnostic network. So that you have the opportunity to increase your test capacities and we can all benefit from your expertise. Together we unleash the concentrated power of science."
    },
    "de": {
    "ourTeam": "Unser Team",
    "ourStoryHeadline": "Unsere Geschichte",
    "ourStoryText": "Das Team von LabHive kam aus zwei Teams des Hackathons #WirvsVirus der Bundesregierung zusammen, die eine ähnliche Idee verfolgten und diese nun gemeinsam mit neuen Teammitgliedern weiterentwickeln. So besteht das Team mittlerweile aus verschiedensten Persönlichkeiten mit diversen Interessenschwerpunkten und mit unterschiedlichsten Nationalitäten. Von Naturwissenschaften bis Geisteswissenschaften ist fast jede Disziplin vertreten. Das Virus kennt keine Grenzen und somit muss auch eine Lösung für die Situation verschiedene Disziplinen verbinden. Unser mittlerweile 15  Personen starkes Team arbeitet vernetzt, digital und international daran, eine digitale Platform für ein effizientes Diagnostiknetzwerk zu schaffen. Damit Sie die Möglichkeit bekommen Ihre Testkapazitäten zu erhöhen und wir alle von Ihrer Expertise profitieren können. Gemeinsam entfesseln wir die geballte Kraft der Wissenschaft."
    }
    }
</i18n>
  
<template>
  <div>
    <b-container class="story">
      <b-row align-h="center">
        <b-col sm="12" lg="10" xl="8">
          <h1>{{ $t("ourStoryHeadline") }}</h1>
          <p>{{ $t("ourStoryText") }}</p>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="team">
      <h1>{{ $t("ourTeam") }}</h1>
      <b-row align-h="center">
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Tobias.png"
            alt="Dr. rer.-nat. Tobias Opialla"
            class="avatar"
          />
          <p class="name">Dr. rer.-nat. Tobias Opialla</p>
          <p class="role">Scientific Expert, Solution Enabler Lead</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Lisa.png"
            alt="Lisa Rieble"
            class="avatar"
          />
          <p class="name">Lisa Rieble</p>
          <p class="role">Scientific Expert, Communication</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Jo.png"
            alt="Dr. Johannes Richers"
            class="avatar"
          />
          <p class="name">Dr. Johannes Richers</p>
          <p class="role">Design, Communication</p>
        </b-col>
     
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Jasmine.png"
            alt="Jasmine Hubrich"
            class="avatar"
          />
          <p class="name">Jasmine Hubrich</p>
          <p class="role">Scientific Expert, Communication</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Hannes.png"
            alt="Dr. Hannes Witt"
            class="avatar"
          />
          <p class="name">Dr. Hannes Witt</p>
          <p class="role">Scientific Expert</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Eleonora.png"
            alt="Eleonora Nushi"
            class="avatar"
          />
          <p class="name">Eleonora Nushi</p>
          <p class="role">Medical Expert</p>
        </b-col>
     
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Kenneth.png"
            alt="Kenneth Ruiz Eiro"
            class="avatar"
          />
          <p class="name">Kenneth Ruiz Eiro</p>
          <p class="role">Project Management, Data Protection and Liability</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_FredericW.png"
            alt="Frederic Weichel"
            class="avatar"
          />
          <p class="name">Frederic Weichel</p>
          <p class="role">Design, Communication</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Thess.png"
            alt="Theresa Müller"
            class="avatar"
          />
          <p class="name">Theresa Müller</p>
          <p class="role">Design</p>
        </b-col>
    
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Laura.png"
            alt="Laura Heimerl"
            class="avatar"
          />
          <p class="name">Laura Heimerl</p>
          <p class="role">Scientific Expert</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Philipp.png"
            alt="Philipp Nieting"
            class="avatar"
          />
          <p class="name">Philipp Nieting</p>
          <p class="role">Software Development, IT-Security</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Seth.png"
            alt="Seth G"
            class="avatar"
          />
          <p class="name">Seth G</p>
          <p class="role">Software Development</p>
        </b-col>
     
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Valentin.png"
            alt="Valentin Arkhipov"
            class="avatar"
          />
          <p class="name">Valentin Arkhipov</p>
          <p class="role">Software Development</p>
        </b-col>
        
        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_Andrei.png"
            alt="Andrei Serban"
            class="avatar"
          />
          <p class="name">Andrei Serban</p>
          <p class="role">Frontend Development</p>
        </b-col>

        <b-col sm="12" lg="6" xl="4" class="team-member">
          <img
            src="../assets/team-members/LabHive_FredericS.png"
            alt="Frederic Schade"
            class="avatar"
          />
          <p class="name">Frederic Schade</p>
          <p class="role">UX/UI Design, Frontend Development</p>
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
</style>
