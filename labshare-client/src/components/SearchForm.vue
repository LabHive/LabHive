<i18n>
    {
    "en": {
    "searchModeSelection": "What do you search for?",
    "dlabs": "Diagnostic Center",
    "rlabs": "Research Laboratory",
    "volunteers": "Qualified Volunteer",
    "skills": "Skills",
    "equipment": "Devices/Materials",
    "advice": "Advice/Know-How",
    "workers": "Workforce",
    "request": "What is needed?",
    "offer": "What can be offered?",
    "theOffers": "Offers",
    "theRequests": "Requests",
    "searchInSurroundings": "Search in the surroundings",
    "zipcode": "Enter ZIP-Code"
    },
    "de": {
    "searchModeSelection": "Wonach suchen Sie?",
    "dlabs": "Diagnostikzentrum",
    "rlabs": "Forschungslabor",
    "volunteers": "Qualifizierte Freiwillige",
    "skills": "Fähigkeiten",
    "equipment": "Geräte/Materialien",
    "advice": "Beratung/Know-How",
    "workers": "Arbeitskraft",
    "request": "Was wird benötigt?",
    "offer": "Was kann abgegeben werden?",
    "theOffers": "Angebote",
    "theRequests": "Anfragen",
    "searchInSurroundings": "Suche in der Umgebung",
    "zipcode": "PLZ eingeben"
    }
    }
</i18n>

<template>
  <div>
    <b-form>
      <div class="form-row">
        <div class="col-md3" data-aos="fade" data-aos-duration="750">
          <b-form-group :label="$t('searchModeSelection')">
            <b-row align-v="center">
              <b-col cols="auto" class="lh-button-col">
                <LhButton :text="$t('theOffers')" v-model="filter.mode" value="offers" @change="changeMode" />
              </b-col>
              <b-col cols="auto" class="lh-button-col">
                <LhButton :text="$t('theRequests')" v-model="filter.mode" value="lookingFor" @change="changeMode" />
              </b-col>
              <b-col cols="auto" class="lh-button-col last">
                <LhButton :text="$t('volunteers')" v-model="filter.mode" value="volunteers" @change="changeMode" />
              </b-col>
            </b-row>
          </b-form-group>
        </div>
      </div>
      <HeightTransition @finished="$emit('finished')">
        <div class="form-row" v-if="filter.mode && 'volunteers' !== filter.mode">
          <div class="col-md4">
            <b-form-group :label="filter.mode === 'lookingFor' ? $t('offer'): $t('request')">
              <b-row>
                <b-col cols="auto" class="lh-button-col">
                  <LhButton :text="$t('equipment')" v-model="filter.filterBy" value="equipment" @change="changeFilterBy" />
                </b-col>
                <b-col cols="auto" class="lh-button-col last">
                  <LhButton :text="$t('advice')" v-model="filter.filterBy" value="advice" @change="changeFilterBy" />
                </b-col>
              </b-row>
            </b-form-group>
          </div>
        </div>
      </HeightTransition>

      <div class="search-filters">
        <HeightTransition @finished="$emit('finished')">
          <CheckboxGroup
            name="volunteerSkills"
            :data="volunteerSkillsOptions"
            v-model="filter.filters"
            :saveChanges="searchChange"
            :cols="'2'"
            v-if="filter.mode === 'volunteers'"
          ></CheckboxGroup>
        </HeightTransition>

        <HeightTransition @finished="$emit('finished')">
          <CheckboxGroup
            name="equipment"
            :data="equipmentOptions"
            v-model="filter.filters"
            :saveChanges="searchChange"
            v-if="filter.filterBy === 'equipment'"
          ></CheckboxGroup>
        </HeightTransition>

        <HeightTransition @finished="$emit('finished')">
          <CheckboxGroup
            name="advice"
            :data="adviceOptions"
            v-model="filter.filters"
            v-if="filter.filterBy === 'advice'"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </HeightTransition>
      </div>

      <div class="form-row" data-aos="fade" data-aos-duration="750">
        <div class="col-md5">
          <InputForm
            :verticalLabel="true"
            name="zipcode"
            :label="$t('searchInSurroundings')"
            v-model="filter.zipcode"
            :required="false"
            :placeholder="$t('zipcode')"
            :valFunc="val.validZipcode"
            @valid="searchChange"
            @input="changeZip"
          ></InputForm>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import {
  labSkills,
  equipment,
  advices
} from "../../dist-browser/lib/selectLists";
import CheckboxGroup from "./CheckboxGroup";
import { Validator } from "../../dist-browser/lib/validation";
import InputForm from "./InputForm";
import LhButton from './LhButton';
import HeightTransition from "./HeightTransition";

export default {
  name: "searchForm",
  data: function() {
    return {
      filter: {
        mode: "",
        zipcode: "",
        filterBy: "",
        filters: []
      },
      volunteerSkillsOptions: labSkills,
      equipmentOptions: equipment,
      adviceOptions: advices,
      val: Validator,
    };
  },
  methods: {
    searchChange: function() {
      this.$nextTick(() => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$emit("searchChange", this.filter);
        }, 300);
      })
    },
    changeFilterBy: function(type) {
      this.filter.filterBy = type;
      this.filter.filters = []

      this.$once('finished', () => {
        this.searchChange();
      })
    },
    changeMode: function(mode) {
      if (mode === '') {
        this.filter.filterBy = "";
        this.filter.filters = []
      }

      switch(mode) {
        case "lookingFor":
        case "offers":
          if (this.filter.filterBy === "volunteerSkills") {
            this.filter.filterBy = "";
            this.filter.filters = []
          }
          break;
        case "volunteers":
          this.filter.filterBy = "volunteerSkills";
          this.filter.filters = []
          break;
      }

      if ((mode == 'lookingFor' || mode == 'offers') && this.oldFilterMode !== 'volunteers' && this.oldFilterMode) {
        this.searchChange();
      }
      else {
        this.$once('finished', () => {
          this.searchChange();
        })
      }

      this.oldFilterMode = mode
    },
    initSearchForm() {
      switch(this.$user.role) {
        case "lab_research":
          this.filter.mode = "lookingFor";
          this.filterBy = "equipment";
          break;
        case "lab_diag":
          this.filter.mode = "offers";
          this.filterBy = "equipment";
          break;
      }
      this.filter.zipcode = this.$user.address.zipcode;
      this.searchChange()
    },
    changeZip(input) {
      if (input === "") {
        this.searchChange()
      }
    }
  },
  activated: function() {
    console.log("activated")
    if (this.filter.mode !== "") return;
    
    const timer = setTimeout(() => {
      this.searchChange();
    }, 300);

    if (this.$user.address) {
      clearTimeout(timer)
      this.initSearchForm()
    } else {
      this.$root.$once("gotProfile", () => {
        clearTimeout(timer)
        this.initSearchForm()
      });
    }
  },
  components: {
    CheckboxGroup,
    InputForm,
    LhButton,
    HeightTransition
  }
};
</script>

<style lang="scss" scoped>

.lh-button-group {
  .lh-button + .lh-button { margin-left: 24px; }  
}

.lh-button-col {
  margin-bottom: 0;

  @media (max-width: 768px) {
    margin-bottom: 13px;

    &.last {
      margin-bottom: 0
    }
  }
}

.fade-leave-active, .fade-enter-active {
  transition: height 0.25s;
  overflow: hidden;
}

.fade-enter, .fade-leave-to {
  height: 0;
}

.fade-enter-to, .fade-leave {
  height: 120px;
}

.form-row {
  margin-top: 16px;
}


</style>
