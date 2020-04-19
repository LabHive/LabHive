<i18n>
    {
    "en": {
    "welcome": "Welcome to LabHive!",
    "aboutUs": "<h1>Welcome to LabHive!</h1><p>We support diagnosic centers, scientists and technical staff with the improvment of their SARS-CoV-2 diagnostic capacity. LabHive promotes communication and connects</p><ul>    <li>qualified volunteers from science with the closest diagnostic laboratory looking for support</li>    <li>Diagnostic centers with research laboratories for equipment and reagent exchange</li>    <li>Diagnostic centers with scientists providing special know-how</li></ul><hr /><p>In early 2020 the new SARS-CoV-2 virus spread accross the globe. The viral infection is widespread and can cause COVID-19, an acute respiratory disease that can cause severe and long-lasting symptoms especially in older patients and patients with preexisting diseases. In the worst case the patients require ventilation in an intensive care unit. Therefore the danger arises of overwhelming the healthcare system, even in developed countries, with large numbers of patients, leading to an increase in expected mortality. Patients are often already infectious before showing any symptoms, adding to the observed high infection rate. In order to track the spread within the population, put infected patients under quarantine and end quarantine measures after recovery, RT-qPCR tests are used. These tests are able to detect the virus in nose and throat swabs in the case of infection. In order to increase test capacity and flatten the curve of infection numbers in the best possible way resources like qualified personel, machines and reagents are needed. Our platform conveys between qualified volunteers, closed research laboratories with unused machines and unused reagents and diagnostic centers, so that the diagnostic capacity can be increased. Spread the test, not the virus!</p>",
    "ourTeam": "Our Team",
    "ourStoryHeadline": "Our Story",
    "ourStoryText": "Irgendwas darüber, dass sich die das Core-Team beim Hackathon getroffen hat und seit dem immer weider Leute hinhzugekommen sind. Alles online sicher auch interessant. Viele Disziplinen vertreten."
    },
    "de": {
    "welcome": "Willkommen bei LabHive!",
    "aboutUs": "<h1>Wilkommen bei LabHive!</h1><p>Wir unterstützen diagnostischen Labore, Wissenschaftler und technische Mitarbeiter bei der Verbesserung ihrer Kapazität für SARS-CoV-2 Diagnostik. LabHive fördert die Kommunikation und verbindet</p><ul>    <li>qualifizierte Wissenschaftler*innen und Technische Mitarbeiter*innen mit dem nächstgelegenen Diagnostikzentrum das Unterstützung sucht</li>    <li>Diagnostikzentren mit Forschungslaboren zum Austausch von Geräten und Reagenzien</li>    <li>Diagnostikzentren mit Wissenschaftlern mit spezialisiertem Know-How</li></ul><hr /><p>Im Frühjahr 2020 breitete sich das neue SARS-CoV-2 Virus über die Welt aus. Der Virus zeichnet sich durch eine hohe Infektionsrate aus und löst die Atemwegserkrankung COVID-19 aus, die besonders bei älteren und vorerkrankten Patient*innen einen schweren und lang andauernden Verlauf zeigt. Im schlimmsten Fall wird eine Beatmung auf der Intensivstation notwendig. Hierdurch besteht die Gefahr, dass auch in entwickelten Ländern Gesundheitssysteme unter der massiven Anzahl an Erkrankten zusammenbrechen, was zu einer erhöhten Mortalität führt. Patient*innen sind häufig bereits vor dem Auftreten von Symptomen infektiös, was zu der beobachteten hohen Ausbreitungsrate beiträgt. Um die Ausbreitung in der Bevölkerung zu verfolgen, Infizierte unter Quarantäne zu stellen und bei Abklingen der Infektion aus dieser zu entlassen werden RT-qPCR Tests eingesetzt. Diese sind in der Lage, bei Infektion das Virus in Nasen- und Rachenabstrichen nachzuweisen. Um die Testkapazität zu erhöhen und die Zahl der Infektionen möglichst gering zu halten, fehlt es an Ressourcen wie qualifiziertem Personal, Geräten und Reagenzien. Unsere Plattform vermittelt zwischen qualifizierten Freiwilligen, geschlossenen Laboren mit stillstehenden Geräten und nicht benötigte Reagenzien und Diagnostikzentren, damit die Diagnostik ihre Kapazität erhalten und steigern kann. Spread the test, not the virus!</p>",
    "ourTeam": "Unser Team",
    "ourStoryHeadline": "Unsere Geschichte",
    "ourStoryText": "Irgendwas darüber, dass sich die das Core-Team beim Hackathon getroffen hat und seit dem immer weider Leute hinhzugekommen sind. Alles online sicher auch interessant. Viele Disziplinen vertreten."
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
    margin-bottom: 24px;
    text-align: center;
  }

  .team h1 {
    margin-bottom: 88px;
  }

  .story {
    margin: 88px 0;
    text-align: center;
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
