<i18n>
{ 
  "en": {
  "welcome": "Welcome to LabShare!"
},
  "de": {
    "aboutUs": "<h1>Wilkommen bei LabShare!</h1><p>Wir unterstützen diagnostischen Labore, Wissenschaftler und technische Mitarbeiter bei der Verbesserung ihrer COVID-19 Diagnostik. LabShare fördert die Kommunikation und verbindet</p><ul>    <li>Hilfsbereite Wissenschaftler und Technische Mitarbeiter mit dem nächstgelegenen Labor, welches Unterstützung sucht</li>    <li>Labore mit Laboren zum Austausch von Geräten</li>    <li>Labore mit Wissenschaftlern mit spezialisiertem Know-How</li></ul><hr /><p>Im Frühjahr 2020 breitete sich das neue SARS-CoV-2 Virus über die Welt aus. Die durch eine Infektion ausgelöste Krankheit COVID-19 zeigt eine sehr hohe Ausbreitungsrate bei Vergleichsweise schweren und langen Verlauf. Hierdurch besteht die Gefahr, dass auch in entwickelten Ländern Gesundheitssysteme unter der massiven Anzahl an Erkrankten zusammenbrechen, was zu einer erhöhten Mortalität führt. Patienten sind häufig bereits vor dem Auftreten von Symptomen infektiös, was zu der Beobachteten hohen Ausbreitungsrate beiträgt. Um die Ausbreitung in der Bevölkerung zu verfolgen, infizierte zu quarantänisieren und bei abklingen der Infektion aus der quarantäne zu entlassen werden RT-PCR Tests eingesetzt um das Virus nachzuweisen. Um zusätzliche Ressourcen von Menschen mit benötigtem Know-How und stillstehende Geräte aus geschlossenen Labors zu aktivieren erleichtern wir die Kommunikation zwischen engagierten Menschen und der Diagnostik und helfen somit dabei die Infektionswelle bestmöglich zu bewältigen.</p>"
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
