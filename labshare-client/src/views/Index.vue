<i18n>
    {
    "en":{
    "mainTitle": "We combine forces for more SARS-CoV-2 tests",
    "subTitle": "Together we unleash the cumulative power of Science!",
    "Joinbutton": "Join now!",
    "partner": "In collaboration with",
    "weconnect": "We connect",
    "qualif-vol": "Qualified volunteers",
    "res-lab": "Research laboratories",
    "diag-cent": "Diagnostic centers",
    "text4": "Test capacity and support",
    "testsweek": "Tests per week",
    "aboutIntro": "We want to improve SARS-CoV-2 diagnostic and support diagnostic laboratories to increase test numbers. Therefore we foster communication and connect:",
    "aboutEpilog": "The SARS-CoV-2 virus can be detected by rt-qPCR in nasal and throat swabs in order to detemine infections and the test is an important measure in controling the pandemic. To increase test capacity important resources like personnel, machines and reagents are missing. For this aim our platform fosters the development of a strong diagnostic network and facilitates the efficient access to resources for diagnostic centers through connection of qualified volunteers, research laboratories and diagnostic centers. Spread the test, beat the virus!"
    },
    "de":{
    "mainTitle": "Wir bündeln Kräfte für mehr SARS-CoV-2 Tests",
    "subTitle": "Gemeinsam entfesseln wir die geballte Kraft der Wissenschaft!",
    "Joinbutton": "Jetzt mitmachen!",
    "partner": "In Zusammenarbeit mit",
    "weconnect": "Wir bringen zusammen",
    "qualif-vol": "Qualifizierte Freiwillige",
    "res-lab": "Forschungslabore",
    "diag-cent": "Diagnostikzentren",
    "text4": "Testkapazitäten und Unterstützung",
    "testsweek": "Tests pro Woche",
    "aboutIntro": "Wir möchten die SARS-CoV-2 Diagnostik verbessern und die diagnostischen Labore unterstützen, um die Testzahlen zu erhöhen. Dazu fördern wir die Kommunikation und verbinden:",
    "aboutEpilog": "Das SARS-CoV-2 Virus kann über rt-qPCR in Nasen-und Rachenabstrichen nachgewiesen werden um Infektionen festzustellen und der Test ist eine wichtige Maßnahme bei der Bekämpfung der Pandemie. Um Testkapazitäten zu erhöhen fehlen Ressourcen wie Personal, Geräte und Reagenzien. Unsere Plattform fördert dazu den Aufbau eines starken Diagnostik-Netzwerk und erleichtert Diagnostikzentren den effizienten Zugang zu Ressourcen durch die Verknüpfung von qualifizierten Freiwilligen, Forschungslaboren und Diagnostikzentren. Spread the test, beat the virus!"
    }
    }

</i18n>
<template>
  <div>
    <div class="banner">
      <b-container class="container">
        <b-row>
          <b-col cols lg="6" md="12" sm="12">
              <h1>{{ $t("mainTitle") }}</h1>
            <p>{{$t("subTitle")}}</p>
            <b-button class="btn-secondary" href="#/register">{{$t("Joinbutton")}}</b-button>
          </b-col>
          <b-col cols lg="6" md="12" sm="12">
            <figure>
              <img
                class="img-fluid"
                src="../assets/decoration-1.svg"
                alt="Illustration"
                width="445"
                height="334"
              />
            </figure>
          </b-col>
        </b-row>
        <b-row class="partners">
          <b-col class="text-center">
              <p>{{$t("partner")}}</p>
            <figure>
              <img src="../assets/logo-partner-3.png" width="160" height="46" />
            </figure>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="container about">
      <b-row>
        <b-col class="text-center">
            <h3 class="has-subtitle">{{$t("subTitle")}}</h3>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="text-center" sm="12" lg="10" xl="8">
          <p>{{ $t("aboutIntro") }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-1.svg"
              alt="Illustration"
              width="170"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("qualif-vol")}}</h4>
          <p class="bit-sized">
              {{$t("Textqualif-vol")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-2.svg"
              alt="Illustration"
              width="218"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("res-lab")}}</h4>
          <p class="bit-sized">
              {{$t("Textres-lab")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-3.svg"
              alt="Illustration"
              width="164"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("diag-cent")}}</h4>
          <p class="bit-sized">
              {{$t("Textdiag-cent")}}
          </p>
        </b-col>
      </b-row>
       <b-row align-h="center">
        <b-col>
          <p>{{ $t("aboutEpilog") }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center" style="margin-bottom: 44px;">
          <b-button class="btn-secondary" href="#/register">{{$t("Joinbutton")}}</b-button>
        </b-col>
      </b-row>
    </b-container>

    <Coverage />
  </div>
</template>

<script>
import Coverage from "../components/Coverage";

export default {
  name: "Index",
  props: {},
  components: { Coverage }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-green: #177867;
$color-bkg-primary: #f7f6fd;

p {
  margin: 12px 12px 44px 12px;
}

.has_banner {
  background-color: #fff;
}

.banner {
  background: $color-bkg-primary;
  margin-bottom: 65px;
  padding: 70px 0 25px;
  position: relative;

  &:before {
    content: "";
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    position: absolute;
    z-index: 3;
  }

  &:after {
    content: "";
    background: $color-bkg-primary;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
    position: absolute;
    border-radius: 50%;
    z-index: 4;
  }

  .container {
    position: relative;
    z-index: 5;
  }

  p {
    margin: 10px 0 0;
  }

  figure {
    margin-bottom: 0;
  }

  .partners {
    margin-top: 40px;

    figure {
      font-size: 15px;
      display: inline-block;
      margin: 15px;
    }
  }
}

.text-center img {
  max-height: 160px;
  width: auto;
}

.about {
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 1.2;

  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.2;
    color: $color-green;
    margin: 0;
  }
  .bit-sized {
    max-width: 300px;
  }
}

.has-subtitle {
  margin: 0;
}

@media (max-width: 767px) {
  .banner {
    margin-bottom: 40px;
    h2 {
      margin-top: 0;
    }
    figure {
      margin-top: 40px;
    }
  }
  .about {
    .col-sm-12 + .col-sm-12 {
      margin-top: 40px;
    }
  }
}
</style>
