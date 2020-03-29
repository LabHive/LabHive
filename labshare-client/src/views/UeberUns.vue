<i18n>
{ 
  "en": {
  "welcome": "Welcome to LabShare!"
},
  "de": {
    "welcome": "Wilkommen bei LabShare!",
    "listHead": "Wir unterstützen diagnostischen Labore, Wissenschaftler und technische Mitarbeiter bei der Verbesserung ihrer COVID-19 Diagnostik. LabShare fördert die Kommunikation und verbindet",
    "listItemHelpers": "Hilfsbereite Wissenschaftler und Technische Mitarbeiter mit dem nächstgelegenen Labor, welches Unterstützung sucht",
    "listItemLabs": "Labore mit Laboren zum Austausch von Geräten",
    "listItemSpecialists": "Labore mit Wissenschaftlern mit spezialisiertem Know-How",
    "aboutUs": "Im Frühjahr 2020 breitete sich das neue SARS-CoV-2 Virus über die Welt aus. Die durch eine Infektion ausgelöste Krankheit COVID-19 zeigt eine sehr hohe Ausbreitungsrate bei Vergleichsweise schweren und langen Verlauf. Hierdurch besteht die Gefahr, dass auch in entwickelten Ländern Gesundheitssysteme unter der massiven Anzahl an Erkrankten zusammenbrechen, was zu einer erhöhten Mortalität führt. Patienten sind häufig bereits vor dem Auftreten von Symptomen infektiös, was zu der Beobachteten hohen Ausbreitungsrate beiträgt. Um die Ausbreitung in der Bevölkerung zu verfolgen, infizierte zu quarantänisieren und bei abklingen der Infektion aus der quarantäne zu entlassen werden RT-PCR Tests eingesetzt um das Virus nachzuweisen. Um zusätzliche Ressourcen von Menschen mit benötigtem Know-How und stillstehende Geräte aus geschlossenen Labors zu aktivieren erleichtern wir die Kommunikation zwischen engagierten Menschen und der Diagnostik und helfen somit dabei die Infektionswelle bestmöglich zu bewältigen."
  }
}
</i18n>

<template>
  <div class="index">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1 class="display-4">{{ $t("welcome") }}</h1>
          <p class="lead">{{$t("listHead")}}</p>
          <ul>
            <li>{{$t("listItemHelpers")}}</li>
            <li>{{$t("listItemLabs")}}</li>
            <li>{{$t("listItemSpecialists")}}</li>
          </ul>
          <hr class="my-4" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <p>{{$t("aboutUs")}}</p>
        </div>
      </div>
    </div>
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
<style scoped></style>
