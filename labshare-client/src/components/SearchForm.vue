<i18n>
    {
    "en": {
    "searchFor": "For what user group do you want to search?",
    "dlabs": "Diagnostic Center",
    "rlabs": "Research Laboratory",
    "volunteers": "Qualified Volunteer",
    "skills": "Skills",
    "equipment": "Devices/Equipment",
    "advice": "Advice/Know-How",
    "workers": "Workers",
    "request": "What is needed?",
    "offer": "What can be offered?",
    "searchInSurroundings": "Search in the surroundings",
    "zipcode": "Enter Zipcode"
    },
    "de": {
    "searchFor": "Wonach möchten Sie suchen?",
    "dlabs": "Diagnostikzentrum",
    "rlabs": "Forschungslabor",
    "volunteers": "Qualifizierte Freiwillige",
    "skills": "Fähigkeiten",
    "equipment": "Equipment",
    "advice": "Beratung",
    "workers": "Arbeitskraft",
    "request": "Was wird benötigt?",
    "offer": "Was kann abgegeben werden?",
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
          <b-form-group :label="$t('searchFor')">
            <div class="lh-button-group">
              <LhButton :text="$t('dlabs')" :active="filters.role === 'lab_diag'" @click="() => changeLookingFor('lab_diag')" />
              <LhButton :text="$t('rlabs')" :active="filters.role === 'lab_research'" @click="() => changeLookingFor('lab_research')" />
              <LhButton :text="$t('volunteers')" :active="filters.role === 'volunteer'" @click="() => changeLookingFor('volunteer')" />
            </div>
          </b-form-group>
        </div>
      </div>
      <div class="form-row" v-if="filterBy !== ''">
        <div class="col-md4">
          <b-form-group :label="filters.role === 'lab_diag' ? $t('request'): $t('offer')" v-if="'volunteer' !== filters.role">
            <div class="lh-button-group">
              <LhButton :text="$t('equipment')" :active="filterBy === 'equipment'" @click="() => changeFilterBy('equipment')" />
              <LhButton :text="$t('advice')" :active="filterBy === 'advice'" @click="() => changeFilterBy('advice')" />
              <LhButton :text="$t('workers')" v-if="'lab_diag' === filters.role" :active="filterBy === 'skills'" @click="() => changeFilterBy('skills')" />
            </div>
          </b-form-group>
        </div>
      </div>

      <div class="search-filters">
        <template v-if="filterBy === 'skills'">
          <CheckboxGroup
            name="skills"
            :data="volunteerSkillsOptions"
            v-model="filters.volunteerSkills"
            :saveChanges="searchChange"
            :cols="'2'"
          ></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'equipment'">
          <CheckboxGroup
            name="equipment"
            :data="equipmentOptions"
            v-model="filters.equipment"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'advice'">
          <CheckboxGroup
            name="advice"
            :data="adviceOptions"
            v-model="filters.advice"
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
            v-model="filters.zipcode"
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
      filters: {
        role: "",
        zipcode: "",
        volunteerSkills: [],
        equipment: [],
        advice: []
      },
      volunteerSkillsOptions: labSkills,
      equipmentOptions: equipment,
      adviceOptions: advices,
      val: Validator,
      filterBy: ""
    };
  },
  methods: {
    searchChange: function() {
      this.$emit("searchChange", this.filters);
    },
    changeFilterBy: function(type) {
      this.filterBy = type;
      this.filters.volunteerSkills = [];
      this.filters.equipment = [];
      this.filters.advice = [];
      this.searchChange();
    },
    changeLookingFor: function(type) {
      this.filterBy = "skills";
      this.filters.role = type;

      switch(type) {
        case "volunteers":
        case "lab_diag":
          this.filterBy = "skills";
          break;
        case "lab_research":
          this.filterBy = "equipment";
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
          this.filters.role = "lab_diag";
          this.filterBy = "skills";
          break;
        case "lab_research":
          this.filters.role = "lab_diag";
          this.filterBy = "equipment";
          break;
        case "lab_diag":
          this.filters.role = "lab_research";
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
