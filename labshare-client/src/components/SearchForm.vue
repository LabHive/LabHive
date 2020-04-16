<i18n>
    {
    "en": {
    "searchModeSelection": "What do you search for?",
    "dlabs": "Diagnostic Center",
    "rlabs": "Research Laboratory",
    "volunteers": "Qualified Volunteer",
    "skills": "Skills",
    "equipment": "Devices/Equipment",
    "advice": "Advice/Know-How",
    "workers": "Workforce",
    "request": "What is needed?",
    "offer": "What can be offered?",
    "theOffers": "Offers",
    "theRequests": "Requests",
    "searchInSurroundings": "Search in the surroundings",
    "zipcode": "Enter Zipcode"
    },
    "de": {
    "searchModeSelection": "Wonach suchen Sie?",
    "dlabs": "Diagnostikzentrum",
    "rlabs": "Forschungslabor",
    "volunteers": "Qualifizierte Freiwillige",
    "skills": "Fähigkeiten",
    "equipment": "Equipment",
    "advice": "Beratung",
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
    <b-form @submit="submit">
      <div class="form-row">
        <div class="col-md3">
          <b-form-group :label="$t('searchModeSelection')">
            <div class="lh-button-group">
              <LhButton :text="$t('theOffers')" v-model="filter.mode" value="offers" @change="changeMode" />
              <LhButton :text="$t('theRequests')" v-model="filter.mode" value="lookingFor" @change="changeMode" />
              <LhButton :text="$t('volunteers')" v-model="filter.mode" value="volunteers" @change="changeMode" />
            </div>
          </b-form-group>
        </div>
      </div>
      <div class="form-row" v-if="filter.mode !== ''">
        <div class="col-md4">
          <b-form-group :label="filter.mode === 'lookingFor' ? $t('request'): $t('offer')" v-if="'volunteers' !== filter.mode">
            <div class="lh-button-group">
              <LhButton :text="$t('equipment')" v-model="filter.filterBy" value="equipment" @change="changeFilterBy" />
              <LhButton :text="$t('advice')" v-model="filter.filterBy" value="advice" @change="changeFilterBy" />
            </div>
          </b-form-group>
        </div>
      </div>

      <div class="search-filters">
        <template v-if="filter.mode === 'volunteers'">
          <CheckboxGroup
            name="volunteerSkills"
            :data="volunteerSkillsOptions"
            v-model="filter.filters"
            :saveChanges="searchChange"
            :cols="'2'"
          ></CheckboxGroup>
        </template>

        <template v-if="filter.filterBy === 'equipment'">
          <CheckboxGroup
            name="equipment"
            :data="equipmentOptions"
            v-model="filter.filters"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>

        <template v-if="filter.filterBy === 'advice'">
          <CheckboxGroup
            name="advice"
            :data="adviceOptions"
            v-model="filter.filters"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>
      </div>

      <div class="form-row">
        <div class="col-md5">
          <InputForm
            :verticalLabel="true"
            name="zipcode"
            :label="$t('searchInSurroundings')"
            v-model="filter.zipcode"
            :valFunc="optionalZip"
            :validFeedback="() => ''"
            :placeholder="$t('zipcode')"
            @valid="searchChange"
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

export default {
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
        this.$emit("searchChange", this.filter);
      })
    },
    changeFilterBy: function(type) {
      this.filter.filterBy = type;
      this.filter.filters = []
      this.searchChange();
    },
    changeMode: function(mode) {
      this.filter.mode = mode;

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
      this.searchChange();
    },
    submit: function(ev) {
      ev.preventDefault();
      this.searchChange();
    },
    initSearchForm() {
      switch(this.$user.role) {
        case "volunteer":
          this.filter.mode = "lookingFor";
          this.filterBy = "volunteerSkills";
          break;
        case "lab_research":
          this.filter.mode = "lookingFor";
          this.filterBy = "equipment";
          break;
        case "lab_diag":
          this.filter.mode = "offers";
          this.filterBy = "equipment";
          break;
      }
    },
    optionalZip(data) {
      if (data === "") {
        return {valid: null}
      }
      return this.val.validZipcode(data)
    }
  },
  mounted: function() {
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
    LhButton
  }
};
</script>

<style lang="scss" scoped>
$color-green: #177867;
$color-bkg-primary: #f7f6fd;

.lh-button-group {
  .lh-button + .lh-button { margin-left: 24px; }  
}
.lh-button {
  padding: 12px 24px;
  background: #D9F0EF;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #177867;

  &.active {
    background: #177867;
    color: #fff;
  }
}
</style>
