<i18n>
{
  "en": {
    
  },
  "de": {
    
  }
}
</i18n>

<template>
  <div>
    <b-form @submit="submit">
      <div class="form-row">
        <div class="col-md5">
          <InputForm name="zipcode" v-model="filters.zipcode" :valFunc="val.validZipcode" @valid="searchChange"></InputForm>
        </div>

        <div class="col-md3">
          <b-form-group label="Looking for">
            <b-form-select v-model="filters.role" name="role" label @change="changeLookingFor">
              <b-form-select-option value="lab_diag">Diagnostic Labs</b-form-select-option>
              <b-form-select-option value="lab_research">Research Labs</b-form-select-option>
              <b-form-select-option value="volunteer">Volunteers</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="col-md4">
          <b-form-group label="Filter by" v-if="'lab_diag' === filters.role">
            <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
              <b-form-select-option value="skills">Wanted Skills</b-form-select-option>
              <b-form-select-option value="equipment">Wanted Equipment</b-form-select-option>
              <b-form-select-option value="advice">Wanted Advice</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Filter by" v-if="'lab_research' === filters.role">
            <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
              <b-form-select-option value="equipment">Offered Equipment</b-form-select-option>
              <b-form-select-option value="advice">Offered Advice</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </div>
      </div>

      <div class="search-filters">
        <template v-if="filterBy === 'skills'">
          <h5>Skills</h5>
          <CheckboxGroup name="skills" :data="volunteerSkillsOptions" v-model="filters.volunteerSkills" :saveChanges="searchChange"></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'equipment'">
          <h5>Equipment</h5>
          <CheckboxGroup name="equipment" :data="equipmentOptions" v-model="filters.equipment" :saveChanges="searchChange"></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'advice'">
          <h5>Advice</h5>
          <CheckboxGroup name="advice" :data="adviceOptions" v-model="filters.advice" :saveChanges="searchChange"></CheckboxGroup>
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
import InputForm from "./InputForm"

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
      filterBy: "skills",
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
      this.filterBy = "skills"
      if (this.filters.role === 'lab_research') {
        this.filterBy = "equipment"
      }
      this.searchChange()
    },
    submit: function(ev) {
      ev.preventDefault();
      this.searchChange();
    }
  },
  mounted: function() {
    this.searchChange();
  },
  components: {
    CheckboxGroup,
    InputForm
  }
};
</script>