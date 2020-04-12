<i18n>
    {
    "en": {
    "text1": "Looking for",
    "text1a": "Diagnostic centers",
    "text1b": "Research laboratories",
    "text1c": "Qualified Volunteers",
    "text2": "Filter for",
    "text2a": "Wanted skills",
    "text2b": "Wanted equipment",
    "text2c": "Wanted advice/know-how",
    "text3a": "Offered equipment",
    "text3b": "Offered advice/know-how",
    "text4": "Skills",
    "text5": "Equipment",
    "text6": "Advice/Know-How"
    },
    "de": {
    "text1": "Suche für",
    "text1a": "Diagnostikzentren",
    "text1b": "Forschungslabore",
    "text1c": "Qualifizierte Freiwillige",
    "text2": "Filtern für",
    "text2a": "Gesuchte Fähigkeiten",
    "text2b": "Gesuchtes Equipment",
    "text2c": "Gesuchter Rat/Know-How",
    "text3a": "Angebotenes Equipment",
    "text3b": "Angebotener Rat/Know-How",
    "text4": "Fähigkeiten",
    "text5": "Equipment",
    "text6": "Rat/Know-How"
    }
    }
</i18n>

<template>
  <div>
    <b-form @submit="submit">
      <div class="form-row">
        <div class="col-md5">
          <InputForm
            :verticalLabel="true"
            name="zipcode"
            v-model="filters.zipcode"
            :valFunc="val.validZipcode"
            @valid="searchChange"
          ></InputForm>
        </div>

        <div class="col-md3">
          <b-form-group :label="$t('text1')">
              <b-form-select v-model="filters.role" name="role" label @change="changeLookingFor">
              <b-form-select-option value="lab_diag">{{$t("text1a")}}</b-form-select-option>
              <b-form-select-option value="lab_research">{{$t("text1b")}}</b-form-select-option>
              <b-form-select-option value="volunteer">{{$t("text1c")}}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="col-md4">
          <b-form-group :label="$t('text2')" v-if="'lab_diag' === filters.role">
            <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
                <b-form-select-option value="skills">{{$t("text2a")}}</b-form-select-option>
                <b-form-select-option value="equipment">{{$t("text2b")}}</b-form-select-option>
                <b-form-select-option value="advice">{{$t("text2c")}}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group :label="$t('text2')" v-if="'lab_research' === filters.role">
            <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
              <b-form-select-option value="equipment">{{$t("text3a")}}</b-form-select-option>
              <b-form-select-option value="advice">{{$t("text3b")}}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>
      </div>

      <div class="search-filters">
        <template v-if="filterBy === 'skills'">
          <h5>{{$t("text4")}}</h5>
          <CheckboxGroup
            name="skills"
            :data="volunteerSkillsOptions"
            v-model="filters.volunteerSkills"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'equipment'">
            <h5>{{$t("text5")}}</h5>
          <CheckboxGroup
            name="equipment"
            :data="equipmentOptions"
            v-model="filters.equipment"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'advice'">
            <h5>{{$t("text6")}}</h5>
          <CheckboxGroup
            name="advice"
            :data="adviceOptions"
            v-model="filters.advice"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>
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

export default {
  data: function() {
    return {
      filters: {
        role: "lab_diag",
        zipcode: "",
        volunteerSkills: [],
        equipment: [],
        advice: []
      },
      volunteerSkillsOptions: labSkills,
      equipmentOptions: equipment,
      adviceOptions: advices,
      val: Validator,
      filterBy: "skills"
    };
  },
  methods: {
    searchChange: function() {
      this.$emit("searchChange", this.filters);
    },
    changeFilterBy: function() {
      this.filters.volunteerSkills = [];
      this.filters.equipment = [];
      this.filters.advice = [];
      this.searchChange();
    },
    changeLookingFor: function() {
      this.filterBy = "skills";
      if (this.filters.role === "lab_research") {
        this.filterBy = "equipment";
      }
      this.searchChange();
    },
    submit: function(ev) {
      ev.preventDefault();
      this.searchChange();
    }
  },
  mounted: function() {
    this.searchChange();
    if (this.$user.address) {
      this.filters.zipcode = this.$user.address.zipcode;
    } else {
      this.$root.$once("gotProfile", () => {
        this.filters.zipcode = this.$user.address.zipcode;
      });
    }
  },
  components: {
    CheckboxGroup,
    InputForm
  }
};
</script>