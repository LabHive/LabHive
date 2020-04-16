<i18n>
    {
    "en":{
    "mainTitle": "We combine forces for more SARS-CoV-2 tests",
    "subTitle": "Together we unleash the cumulative Power of Science!",
    "Joinbutton": "Join now!",
    "partner": "In collaboration with",
    "weconnect": "We connect",
    "qualif-vol": "qualified volunteers",
    "Textqualif-vol": "scientific staff or technical assistants with training and experience in the use of laboratory equipment, sample preparation or data analysis",
    "res-lab": "research laboratories",
    "Textres-lab": "academic or industrial research laboratory with access to materials, reagents, equipment or suitable laboratories (BSL-2/3)",
    "diag-cent": "diagnotic centers",
    "Textdiag-cent": "active diagnostic centers that currently offer SARS-CoV-2 tests including sample processing and analysis and need support",
    "text4": "test capacities and support",
    "testsweek": "tests per week"
    },
    "de":{
    "mainTitle": "Wir bündeln Kräfte für mehr SARS-CoV-2 Tests",
    "subTitle": "Gemeinsam entfesseln wir die geballte Kraft der Wissenschaft!",
    "Joinbutton": "Jetzt mitmachen!",
    "partner": "In Zusammenarbeit mit",
    "weconnect": "Wir bringen zusammen",
    "qualif-vol": "qualifizierte Freiwillige",
    "Textqualif-vol": "Wissenschaftliche Mitarbeiter*innen oder technische Assistent*innen mit Ausbildung und Erfahrung in der Anwendung von Laborgeräten, Probenvorbereitung oder Datenanalyse",
    "res-lab": "Forschungslabore",
    "Textres-lab": "Akademische oder industrielle Forschungseinrichtungen mit Zugang zu Materialien, Reagenzien, Ausrüstung oder geeigneten Laboren (BSL-2/3)",
    "diag-cent": "Diagnostikzentren",
    "Textdiag-cent": "Aktive Diagnosezentren, die derzeit SARS-CoV-2-Tests anbieten, d.h. Proben verarbeiten und Analysen durchführen und Hilfe brauchen",
    "text4": "Testkapazitäten und Unterstützung",
    "testsweek": "Tests pro Woche"
    }
    }

</i18n>
<template>
  <div>
    <div class="banner">
      <b-container class="container">
        <b-row>
          <b-col cols lg="6" md="12" sm="12">
              <h2>{{ $t("mainTitle") }}</h2>
            <p>{{$t("subTitle")}}</p>
            <b-button href="#/register">{{$t("Joinbutton")}}</b-button>
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
              <img src="../assets/logo-partner.svg" width="222" height="64" />
            </figure>
            <figure>
              <img src="../assets/logo-partner.svg" width="222" height="64" />
            </figure>
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
            <h3>{{$t("subTitle")}}</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/decoration-3-1.svg"
              alt="Illustration"
              width="170"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("qualif-vol")}}</h4>
          <p>
              {{$t("Textqualif-vol")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/decoration-3-2.svg"
              alt="Illustration"
              width="218"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("res-lab")}}</h4>
          <p>
              {{$t("Textres-lab")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              class="img-fluid"
              src="../assets/decoration-3-3.svg"
              alt="Illustration"
              width="164"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("diag-cent")}}</h4>
          <p>
              {{$t("Textdiag-cent")}}
          </p>
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

  h2 {
    font-weight: normal;
    font-size: 36px;
    line-height: 1.2;
    letter-spacing: 0.1em;
    color: #282e40;
    margin: 60px 0 0;
  }

  p {
    margin: 10px 0 0;
  }

  .btn {
    margin: 25px 0 0;
    padding: 14px 32px;
    background: $color-green;
    border: none;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.10);
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1em;
  }

  .btn:hover {
    background: #fff;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
    color: $color-green;
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

.about {
  margin-bottom: 50px;
  font-size: 12px;
  line-height: 1.2;

  h4 {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: $color-green;
    margin: 0;
  }
  p {
    max-width: 300px;
    margin: 12px auto 0;
  }
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
