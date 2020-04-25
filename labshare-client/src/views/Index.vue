<i18n>
    {
    "en":{
    "mainTitle": "We align efforts for more SARS-CoV-2 tests",
    "subTitle": "The digital platform for a strong diagnostic network",
    "Joinbutton": "Join now",
    "partner": "In collaboration with:",
    "titleGroups": "Together we unleash the united power of science",
    "qualif-vol": "Qualified volunteers",
    "res-lab": "Research laboratories",
    "diag-cent": "Diagnostic centers",
    "searchButton": "Search For Resources",
    "text4": "Test capacity and support",
    "testsweek": "Tests per week"
    },
    "de":{
    "mainTitle": "Wir bündeln Kräfte für mehr SARS-CoV-2 Tests",
    "subTitle": "Die digitale Plattform für ein starkes Diagnostiknetzwerk",
    "Joinbutton": "Jetzt mitmachen",
    "partner": "In Zusammenarbeit mit:",
    "titleGroups": "Gemeinsam entfesseln wir die geballte Kraft der Wissenschaft",
    "qualif-vol": "Qualifizierte Freiwillige",
    "res-lab": "Forschungslabore",
    "diag-cent": "Diagnostikzentren",
    "searchButton": "Suche nach Ressourcen",
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
              <h1>{{ $t("mainTitle") }}</h1>
            <p>{{$t("subTitle")}}</p>
            <b-button class="btn-cta" to="/register">{{$t("Joinbutton")}}</b-button>
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
             <a href="https://www.steiger-stiftung.de/ueber-die-stiftung" target="_blank"> <img class="img-hover" src="../assets/logo-partner-3.png" width="160" height="46" /> </a>
            </figure>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="container about">
      <b-row>
        <b-col class="text-center">
            <h3>{{$t("titleGroups")}}</h3>
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
              width="164"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("diag-cent")}}</h4>
          <p class="bit-sized">
              {{$t("Textdiag-cent")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-3.svg"
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
      </b-row>
      <b-row>
        <b-col class="text-center" style="margin-bottom: 44px;">
          <b-button class="btn-secondary" to="/search">{{$t("searchButton")}}</b-button>
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

@media (max-width: 991px) {
  .banner {
    margin-bottom: 40px;
    padding: 0px 0 25px;

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
