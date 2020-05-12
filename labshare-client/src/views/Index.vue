<i18n>
    {
    "en":{
    "mainTitle": "We align efforts for more SARS-CoV-2 tests",
    "subTitle": "The digital platform for a strong diagnostic network",
    "Joinbutton": "Join now",
    "selected": "Selected for",
    "collaboration": "In collaboration with",
    "supported": "Supported by",
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
    "selected": "Ausgewählt für",
    "collaboration": "In Zusammenarbeit mit",
    "supported": "Gefördert vom",
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
        <b-row data-aos="fade-up" data-aos-duration="1000">
          <b-col cols lg="6" md="12" sm="12">
              <h1>{{ $t("mainTitle") }}</h1>
            <p>{{$t("subTitle")}}</p>
            <div id="hero-button-wrapper">
              <b-button class="btn-cta" to="/register">{{$t("Joinbutton")}}</b-button>
            </div>
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
        <b-row align-h="center" class="partners" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <b-col cols="6" lg="3" md="4" sm="6" class="text-center">
              <p>{{$t("selected")}}</p>
            <figure>
             <a href="https://wirvsvirushackathon.org/weiterfuehrung-2/" target="_blank"> <img class="img-hover" src="../assets/logo-wirvsvirus-enabler.png" alt="Wir vs. Virus Solution Enabler" width="auto" height="56" /> </a>
            </figure>
          </b-col>
          <b-col cols="6" lg="3" md="4" sm="6" class="text-center">
              <p>{{$t("collaboration")}}</p>
            <figure>
             <a href="https://www.steiger-stiftung.de/ueber-die-stiftung" target="_blank"> <img id="collaboration" class="img-hover" src="../assets/logo-bjoern-steiger-stiftung-de.png" alt="Björn Steiger Stiftung" width="auto" height="48" /> </a>
            </figure>
          </b-col>
          <b-col cols="6" lg="3" md="4" sm="6" class="text-center">
              <p>{{$t("supported")}}</p>
            <figure>
             <a href="https://www.bmbf.de/" target="_blank"> <img class="img-hover" src="../assets/logo-bmbf.png" alt="Bundesministerium für Bildung und Forschung" width="auto" height="56" /> </a>
            </figure>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="container about">
      <b-row>
        <b-col class="text-center">
            <h3 data-aos="fade" data-aos-duration="750">{{$t("titleGroups")}}</h3>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col cols lg="4" md="4" sm="12" data-aos="fade-up" data-aos-duration="750">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-1.svg"
              alt="Illustration"
              width="170"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("qualif-vol")}}</h4>
          <p class="text-center">
              {{$t("Textqualif-vol")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12" data-aos="fade-up" data-aos-duration="750" data-aos-delay="100">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-2.svg"
              alt="Illustration"
              width="164"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("diag-cent")}}</h4>
          <p class="text-center">
              {{$t("Textdiag-cent")}}
          </p>
        </b-col>
        <b-col cols lg="4" md="4" sm="12" data-aos="fade-up" data-aos-duration="750" data-aos-delay="200">
          <figure class="text-center">
            <img
              src="../assets/decoration-3-3.svg"
              alt="Illustration"
              width="218"
              height="150"
            />
          </figure>
          <h4 class="text-center">{{$t("res-lab")}}</h4>
          <p class="text-center">
              {{$t("Textres-lab")}}
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center">
          <b-button data-aos="fade" data-aos-duration="750" class="btn-cta" to="/search">{{$t("searchButton")}}</b-button>
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
  margin-bottom: 88px;
  padding: 70px 0 25px;
  position: relative;

  @media (max-width: 767px) {
    margin-bottom: 44px;
  }

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

    @media (max-width: 991px) {
      text-align: center;
    }
  }

  figure {
    margin-bottom: 0;
  }

  .partners {
    margin-top: 88px;
    margin-bottom: 44px;

    figure {
      display: inline-block;
      margin: 16px 0 16px 0;
    }

    @media (max-width: 767px) {
      font-size: 13px;
      margin-top: 32px;
      margin-bottom: 16px;

      img {
        height: 48px;
      }

      #collaboration {
          height: 40px;
      }

      figure {
        margin: 8px 0 16px 0;
      }
    }
  }
}

.text-center img {
  max-height: 160px;
  width: auto;
}

.about {
  margin-bottom: 88px;
  font-size: 15px;
  line-height: 1.2;

  @media (max-width: 767px) {
    margin-bottom: 44px;
  }

  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.2;
    color: $color-green;
    margin: 0;
  }
}

.has-subtitle {
  margin: 0;
}

@media (max-width: 991px) {
  .banner {
    padding: 0px 0 25px;

    h2 {
      margin-top: 0;
    }
    figure {
      margin-top: 16px;
    }

    .btn-cta {
      
    }

    #hero-button-wrapper {
      text-align: center !important;
    }
  }
  .about {
    .col-sm-12 + .col-sm-12 {
      margin-top: 40px;
    }
  }
}

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
