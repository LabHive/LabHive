<template>
  <div>
    <div class="banner">
      <b-container class="container">
        <b-row data-aos="fade-up" data-aos-duration="1000">
          <b-col cols lg="6" md="12" sm="12">
            <h1>{{ $t("landingpage.top.mainTitle") }}</h1>
            <p>{{$t("landingpage.top.subTitle")}}</p>
            <div id="hero-button-wrapper">
              <b-button class="btn-cta" href="/22-05-12-LabHive-Presskit.zip">{{$t("press.btn_download")}}</b-button>
            </div>
          </b-col>
          <b-col cols lg="4" md="12" sm="12">
            <figure style="text-align: center;">
              <img
                class="img-fluid"
                src="../assets/Press-Illustration.svg"
                alt="Illustration"
                style="max-height: 250px"
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

}

.text-center img {
  max-height: 160px;
  width: auto;
}

.has-subtitle {
  margin: 0;
}

figure {
  margin-top: 16px;

  @media (min-width: 991px) {
    margin-top: 40px;
  }
}

@media (max-width: 991px) {
  .banner {
    padding: 0px 0 25px;

    h2 {
      margin-top: 0;
    }

    #hero-button-wrapper {
      text-align: center !important;
    }
  }
}

$aos-distance: 40px; // It has to be above import
@import "node_modules/aos/src/sass/aos.scss";
</style>
