<template>
  <div>
    <div class="hero">
      <b-container class="container">
        <b-row align-v="center" data-aos="fade-up" data-aos-duration="1000">
          <b-col cols lg="5" md="12" sm="12" offset-lg="1">
              <h1>{{ $t("landingpage.top.mainTitle") }}</h1>
            <p>{{$t("landingpage.top.subTitle")}}</p>
            <div id="hero-button-wrapper">
              <b-button class="btn-cta" to="/register">{{$t("landingpage.top.btn_join")}}</b-button>
            </div>
          </b-col>
          <b-col cols lg="5" md="12" sm="12">
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
              <p>{{$t("landingpage.top.selected")}}</p>
            <figure>
             <a href="https://wirvsvirushackathon.org/weiterfuehrung-2/" target="_blank"> <img class="img-hover" src="../assets/logo-wirvsvirus-enabler.png" alt="Wir vs. Virus Solution Enabler" width="auto" height="56" /> </a>
            </figure>
          </b-col>
          <b-col cols="6" lg="3" md="4" sm="6" class="text-center">
              <p>{{$t("landingpage.top.collaboration")}}</p>
            <figure>
             <a href="https://www.steiger-stiftung.de/ueber-die-stiftung" target="_blank"> <img id="collaboration" class="img-hover" src="../assets/logo-bjoern-steiger-stiftung-de.png" alt="Björn Steiger Stiftung" width="auto" height="48" /> </a>
            </figure>
          </b-col>
          <b-col cols="6" lg="3" md="4" sm="6" class="text-center" id="funded">
              <p>{{$t("landingpage.top.sponsoredBy")}}</p>
            <figure>
             <a href="https://www.bmbf.de/" target="_blank"> <img class="img-hover" src="../assets/logo-bmbf.png" alt="Bundesministerium für Bildung und Forschung" width="auto" height="56" /> </a>
            </figure>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="container about">
      <b-row align-h="center" class="about-intro">
        <b-col cols lg="6" md="12" class="text-center">
            <h3 data-aos="fade" data-aos-duration="750">{{$t("landingpage.details.title")}}</h3>
            <p data-aos="fade" data-aos-duration="750">{{$t("landingpage.details.text")}}</p>
        </b-col>
      </b-row>

      <b-row data-aos="fade-up" data-aos-duration="750" class="about-block-bottom-margin" align-v="center">
        <b-col lg="5" offset-lg="1" md="12" order="2" order-lg="1">
          <h5>{{$t("landingpage.details.diagnosticCenters.subtitle")}}</h5>
          <h3>{{$t("landingpage.details.diagnosticCenters.title")}}</h3>
          <p>{{$t("landingpage.details.diagnosticCenters.text")}}</p>
          <b-button class="btn-cta" to="/search">{{$t("landingpage.details.diagnosticCenters.button")}}</b-button>
        </b-col>
        <b-col lg="3" offset-lg="1" md="12" order="1" order-lg="2">
            <img src="../assets/decoration-3-2.svg" alt="Illustration" width="90%" height="auto" />
        </b-col>
      </b-row>

      <b-row data-aos="fade-up" data-aos-duration="750" class="about-block-bottom-margin" align-v="center">
        <b-col lg="3" offset-lg="2" md="12">
            <img src="../assets/decoration-3-3.svg" alt="Illustration" width="90%" height="auto" />
        </b-col>
        <b-col lg="5" offset-lg="1" md="12">
          <h5>{{$t("landingpage.details.researchLabs.subtitle")}}</h5>
          <h3>{{$t("landingpage.details.researchLabs.title")}}</h3>
          <p>{{$t("landingpage.details.researchLabs.text")}}</p>
          <b-button class="btn-cta" to="/register">{{$t("landingpage.details.researchLabs.button")}}</b-button>
        </b-col>
      </b-row>

      <b-row data-aos="fade-up" data-aos-duration="750" class="about-block" align-v="center">
        <b-col lg="5" offset-lg="1" md="12" order="2" order-lg="1">
          <h5>{{$t("landingpage.details.volunteers.subtitle")}}</h5>
          <h3>{{$t("landingpage.details.volunteers.title")}}</h3>
          <p>{{$t("landingpage.details.volunteers.text")}}</p>
          <b-button class="btn-cta" to="/register">{{$t("landingpage.details.volunteers.button")}}</b-button>
        </b-col>
        <b-col lg="3" offset-lg="1" md="12" order="1" order-lg="2">
            <img src="../assets/decoration-3-1.svg" alt="Illustration" width="90%" height="auto" />
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
    margin-bottom: 0;
}

h1 {
  font-weight: 500;
  font-size: 36px;
  letter-spacing: 0;
  margin: 0 0 15px 0;
}

h3 {
  font-weight: normal;
  font-size: 32px;
  letter-spacing: 0;
  color: #000;
  margin: 0 0 15px 0;
}

h5 {
  font-weight: normal;
  font-size: 15px;
  font-weight: normal;
  text-transform: uppercase;
  color: rgba(23, 120, 103, 0.75);
  margin-bottom: 15px;
}

.has_hero {
  background-color: #fff;
}

.hero {
  background: $color-bkg-primary;
  padding: 80px 0 80px 0;
  position: relative;

  .container {
    position: relative;
    z-index: 5;
  }

  p {
    @media (max-width: 991px) {
      text-align: center;
    }
  }

  .partners {
    margin-top: 80px;

    figure {
      display: inline-block;
      margin-top: 20px;
    }

    @media (max-width: 767px) {
      font-size: 13px;
      margin-top: 20px;

      img {
        height: 48px;
      }

      #collaboration {
          height: 40px;
      }

      figure {
        margin: 8px 0 16px 0;
      }

      #funded {
        margin-top: 20px;
      }
    }
  }
}

.text-center img {
  max-height: 160px;
  width: auto;
}

.about {
  padding: 80px 0 80px 0;
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

.about-intro {
  margin-bottom: 80px;
}

.about-block-bottom-margin {
  margin-bottom: 140px;
}

.has-subtitle {
  margin: 0;
}

@media (max-width: 991px) {
  .hero {

    padding: 40px 15px 40px 15px;

    h2 {
      margin-top: 0;
    }

    figure {
      margin-top: 15px;
    }

    .img-fluid {
      display: block;
      margin: 0 auto;
    }


    #hero-button-wrapper {
      text-align: center !important;
    }
  }

  .about {
    padding: 40px 15px 40px 15px;
    text-align: center;

    img {
      width: 25%;
      margin-bottom: 30px;

      @media (max-width: 767px) {
        width: 50%;
      }
    }
  }

  .about-intro, .about-block-bottom-margin {
    margin-bottom: 80px;
  }
}

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
