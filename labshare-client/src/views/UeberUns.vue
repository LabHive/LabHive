<i18n>
    {
    "en": {
    "welcome": "Welcome to LabHive!",
    "aboutUs": "<h1>Welcome to LabHive!</h1><p>We support diagnosic centers, scientists and technical staff with the improvment of their SARS-CoV-2 diagnostic. LabHive promotes communication and connects</p><ul>    <li>qualified volunteers from science with the closest diagnostic laboratory looking for support</li>    <li>Diagnostic centers with research laboratories for equipment and reagent exchange</li>    <li>Diagnostic centers with scientists providing special Know-How</li></ul><hr /><p>In early 2020 the new SARS-CoV-2 virus spread accross the globe. The viral infection is widespread and can cause COVID-19, an acute respiratory disease that can cause severe and long-lasting symptoms especially in older patients and patients with preexisting diseases. In the worst case the patients require ventilation in an intensive care unit. Therefore the danger of overwhelming the healthcare system, even in developed countries, with the large number of patients arises, leading to an increase in expected mortality. Patients are often already infectious before showing any symptoms, adding to the observed high infection rate. In order to track the spread within the population, put infected patients under quarantine and end quarantine measures after recovery, RT-qPCR tests are used. These tests are able to detect the virus in nose and throat swabs in the case of infection. In order to increase test capacities and master the infection wave in the best possible way ressources like qualified personel, machines and reagents are missing. Our platform conveys between qualified volunteers, closed research laboratories with unused machines and unused reagents and diagnostic centers, so that the diagnostic can uphold and increase their capacities. Spread the test, not the virus!</p>"
    },
    "de": {
    "welcome": "Willkommen bei LabHive!",
    "aboutUs": "<h1>Wilkommen bei LabHive!</h1><p>Wir unterstützen diagnostischen Labore, Wissenschaftler und technische Mitarbeiter bei der Verbesserung ihrer SARS-CoV-2 Diagnostik. LabHive fördert die Kommunikation und verbindet</p><ul>    <li>qualifizierte Wissenschaftler*innen und Technische Mitarbeiter*innen mit dem nächstgelegenen Diagnostikzentrum das Unterstützung sucht</li>    <li>Diagnostikzentren mit Forschungslaboren zum Austausch von Geräten und Reagenzien</li>    <li>Diagnostikzentren mit Wissenschaftlern mit spezialisiertem Know-How</li></ul><hr /><p>Im Frühjahr 2020 breitete sich das neue SARS-CoV-2 Virus über die Welt aus. Der Virus zeichnet sich durch eine hohe Infektionsrate aus und löst die Atemwegserkrankung COVID-19 aus, die besonders bei älteren und vorerkrankten Patient*innen einen schweren und lang andauernden Verlauf zeigt. Im schlimmsten Fall wird eine Beatmung auf der Intensivstation notwendig. Hierdurch besteht die Gefahr, dass auch in entwickelten Ländern Gesundheitssysteme unter der massiven Anzahl an Erkrankten zusammenbrechen, was zu einer erhöhten Mortalität führt. Patient*innen sind häufig bereits vor dem Auftreten von Symptomen infektiös, was zu der beobachteten hohen Ausbreitungsrate beiträgt. Um die Ausbreitung in der Bevölkerung zu verfolgen, Infizierte unter Quarantäne zu stellen und bei Abklingen der Infektion aus dieser zu entlassen werden RT-qPCR Tests eingesetzt. Diese sind in der Lage, bei Infektion das Virus in Nasen- und Rachenabstrichen nachzuweisen. Um Testkapazitäten zu erhöhen und die Infektionswelle bestmöglich zu bewältigen fehlt es an Ressourcen wie qualifiziertem Personal, Geräten und Reagenzien. Unsere Plattform vermittelt zwischen qualifizierten Freiwilligen, geschlossenen Laboren mit stillstehenden Geräten und nicht benötigte Reagenzien und Diagnostikzentren, damit die Diagnostik ihre Kapazität erhalten und steigern kann. Spread the test, not the virus!</p>"
    }
    }
</i18n>

<template>
  <div v-html="$t('aboutUs')"></div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
