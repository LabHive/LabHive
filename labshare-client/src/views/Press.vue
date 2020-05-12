<i18n>
{
  "en":{
    "mainTitle": "We align efforts for more SARS-CoV-2 tests",
    "subTitle": "The digital platform for a strong diagnostic network",
    "Joinbutton": "Download Press Kit",
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
    "Joinbutton": "Download Press Kit",
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
              <b-button class="btn-cta" href="/22-05-12-LabHive-Presskit.zip">{{$t("Joinbutton")}}</b-button>
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
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  components: { }
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
  .bit-sized {
    max-width: 300px;
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

$aos-distance: 40px; // It has to be above import
@import "node_modules/aos/src/sass/aos.scss";
</style>
