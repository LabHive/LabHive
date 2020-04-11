<template>
  <div>
    <div class="banner">
      <b-container class="container">
        <b-row>
          <b-col cols="6">
            <h2>Wir bündeln Kräfte für mehr SARS-CoV-2 Tests</h2>
            <p>Gemeinsam entfesseln wir die geballte Kraft der Wissenschaft!</p>
            <b-button href="#">Jetzt mitmachen</b-button>
          </b-col>
          <b-col cols="6">
            <figure>
              <img class="img-fluid" src="../assets/decoration-1.svg" alt="Illustration" />
            </figure>
          </b-col>
        </b-row>
        <b-row class="partners">
          <b-col class="text-center">
            <p>In Zusammenarbeit mit</p>
            <figure>
              <img src="../assets/logo-partner.svg" />
            </figure>
            <figure>
              <img src="../assets/logo-partner.svg" />
            </figure>
            <figure>
              <img src="../assets/logo-partner-3.svg" />
            </figure>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <b-container class="container about">
      <b-row>
        <b-col class="text-center">
          <h3>Wir bringen zusammen</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <figure class="text-center">
            <img class="img-fluid" src="../assets/decoration-3-1.svg" alt="Illustration" />
          </figure>
          <h4 class="text-center">Qualifizierte Freiwillige</h4>
          <p>
            Wissenschaftliche Mitarbeiter oder technische Assistenten mit Ausbildung und Erfahrung in der Anwendung von Laborgeräten, Probenvorbereitung oder Datenanalyse.
          </p>
        </b-col>
        <b-col cols="4">
          <figure class="text-center">
            <img class="img-fluid" src="../assets/decoration-3-2.svg" alt="Illustration" />
          </figure>
          <h4 class="text-center">Forschungslabor</h4>
          <p>
            Akademische oder industrielle Forschungseinrichtungen mit Zugang zu Materialien, Reagenzien, Ausrüstung oder geeigneten Laboren (BSL-2/3)
          </p>
        </b-col>
        <b-col cols="4">
          <figure class="text-center">
            <img class="img-fluid" src="../assets/decoration-3-3.svg" alt="Illustration" />
          </figure>
          <h4 class="text-center">Diagnostikzentrum</h4>
          <p>
            Aktive Diagnosezentren, die derzeit SARS-CoV-2-Tests anbieten, d.h. Proben verarbeiten und Analysen durchführen
          </p>
        </b-col>
      </b-row>
    </b-container>

    <div class="coverage">
      <b-container>
        <b-row class="text-center">
          <b-col>
            <h3>Testkapazität und Unterstützung</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <figure class="text-center">
              <img class="img-fluid" src="../assets/map.svg" />
            </figure>
          </b-col>
          <b-col cols="6">
            <dl>
              <dt>354,521</dt>
              <dd>Tests pro Woche</dd>
            </dl>
            <dl>
              <dt>531</dt>
              <dd>Qualifizierte Freiwillige</dd>
              <dt>61</dt>
              <dd>Forschungslabore</dd>
              <dt>142</dt>
              <dd>Diagnostikzentren</dd>
            </dl>
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
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-bkg-primary: #F7F6FD;

.banner {
  background: $color-bkg-primary;
  margin-bottom: 65px;
  padding: 70px 0 40px;
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

  figure {
    margin-bottom: 0;
  }

  .partners {
    margin-top: 40px;
    
    figure {
      font-size: 15px;
      display: inline-block;
      margin: 0 15px;
    }
  }
}

.about {
  margin-bottom: 50px;
}

.coverage {
  background: $color-bkg-primary;
  position: relative;
  padding: 65px 0;

  &:before {
    content: "";
    background: #fff;
    left: 0;
    right: 0;
    top: 0;
    height: 40px;
    position: absolute;
    z-index: 3;
  }

  &:after {
    content: "";
    background: $color-bkg-primary;
    left: 0;
    right: 0;
    top: 0;
    height: 80px;
    position: absolute;
    border-radius: 50%;
    z-index: 4;
  }

  .container {
    position: relative;
    z-index: 5;
  }

  figure {
    margin: 0;
  }
  
  dl {
    overflow: hidden;

    dt {
      width: 50%;
      float: left;
      clear: both;
      color: #177867;
      font-family: Fira Sans;
      font-size: 44px;
      line-height: 53px;
    }
    dd {
      float: right;
      width: 50%;
      margin: 0;
    }
  } 
}
</style>
