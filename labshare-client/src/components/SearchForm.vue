<i18n>
    {
    "en": {
    "Lookingfor": "Looking for",
    "diag-cent": "Diagnostic Centers",
    "res-lab": "Research Laboratories",
    "Filterfor": "Filter for",
    "req-skills": "Wanted Skills",
    "req-equip": "Wanted Equipment",
    "req-advice": "Wanted Advice/Know-How",
    "equipOffer": "Offered Equipment",
    "adviceOffer": "Offered Advice/Know-How",
    "skills": "Skills",
    "equip": "Equipment",
    "advice": "Advice/Know-How"
    },
    "de": {
    "Lookingfor": "Suche für",
    "diag-cent": "Diagnostikzentren",
    "res-lab": "Forschungslabore",
    "qualif-vol": "Qualifizierte Freiwillige",
    "Filterfor": "Filtern für",
    "req-skills": "Gesuchte Fähigkeiten",
    "req-equip": "Gesuchtes Equipment",
    "req-advice": "Gesuchter Rat/Know-How",
    "equipOffer": "Angebotenes Equipment",
    "adviceOffer": "Angebotener Rat/Know-How",
    "skills": "Faehigkeiten",
    "equip": "Equipment",
    "advice": "Rat/Know-How"
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
          <b-form-group :label="$t('Lookingfor')">
              <b-form-select v-model="filters.role" name="role" label @change="changeLookingFor">
              <b-form-select-option value="lab_diag">{{$t("diag-cent")}}</b-form-select-option>
              <b-form-select-option value="lab_research">{{$t("res-lab")}}</b-form-select-option>
              <b-form-select-option value="volunteer">{{$t("qualif-vol")}}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="col-md4">
          <b-form-group :label="$t('Filterfor')" v-if="'lab_diag' === filters.role">
            <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
                <b-form-select-option value="skills">{{$t("req-skills")}}</b-form-select-option>
                <b-form-select-option value="equipment">{{$t("req-equip")}}</b-form-select-option>
                <b-form-select-option value="advice">{{$t("req-advice")}}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group :label="$t('Filterfor')" v-if="'lab_research' === filters.role">
            <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
              <b-form-select-option value="equipment">{{$t("equipOffer")}}</b-form-select-option>
              <b-form-select-option value="advice">{{$t("adviceOffer")}}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>
      </div>

      <div class="search-filters">
        <template v-if="filterBy === 'skills'">
          <h5>{{$t("skills")}}</h5>
          <CheckboxGroup
            name="skills"
            :data="volunteerSkillsOptions"
            v-model="filters.volunteerSkills"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'equipment'">
            <h5>{{$t("equip")}}</h5>
          <CheckboxGroup
            name="equipment"
            :data="equipmentOptions"
            v-model="filters.equipment"
            :saveChanges="searchChange"
          ></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'advice'">
            <h5>{{$t("advice")}}</h5>
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
