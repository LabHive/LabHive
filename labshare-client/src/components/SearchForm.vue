<template>
  <div>
    <b-form @submit="submit">
      <b-form-group label="Looking for" label-cols-sm="3">
        <b-form-select v-model="filters.role" name="role" label @change="changeLookingFor">
          <b-form-select-option value="lab">Labs</b-form-select-option>
          <b-form-select-option value="human">Volunteers</b-form-select-option>
        </b-form-select>
      </b-form-group>

      <InputForm name="zipcode" v-model="filters.zipcode" :valFunc="val.validZipcode" @valid="searchChange"></InputForm>
      <!-- <b-form-group label="Zipcode" label-cols-sm="2">
        <b-form-input v-model="filters.zipcode" placeholder="Zipcode" @change="searchChange"></b-form-input>
      </b-form-group> -->

      <b-form-group label="Filter by" label-cols-sm="3" v-if="filters.role === 'lab'">
        <b-form-select v-model="filterBy" name="filter" label @change="changeFilterBy">
          <b-form-select-option value="skills">Skills</b-form-select-option>
          <b-form-select-option v-if="filters.role === 'lab'" value="equipment">Equipment</b-form-select-option>
          <b-form-select-option v-if="filters.role === 'lab'" value="advice">Advice</b-form-select-option>
        </b-form-select>
      </b-form-group>

      <template v-if="filterBy === 'skills'">
        <h3 style="margin-top: 20px">Wanted Skills</h3>
        <CheckboxGroup name="skills" :data="humanSkillsOptions" v-model="filters.humanSkills"></CheckboxGroup>
      </template>

      <template v-if="filters.role === 'lab'">
        <template v-if="filterBy === 'equipment'">
          <h3>Needed Equipment</h3>
          <CheckboxGroup name="equipment" :data="equipmentOptions" v-model="filters.equipment"></CheckboxGroup>
        </template>

        <template v-if="filterBy === 'advice'">
          <h3>Needed Advice</h3>
          <CheckboxGroup name="advice" :data="adviceOptions" v-model="filters.equipment"></CheckboxGroup>
        </template>
      </template>

      <b-button type="submit" variant="primary">Search</b-button>
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
        role: "lab",
        zipcode: "",
        humanSkills: [],
        equipment: [],
        advice: []
      },
      humanSkillsOptions: labSkills,
      equipmentOptions: equipment,
      adviceOptions: advices,
      filterBy: "skills",
      val: Validator
    };
  },
  methods: {
    searchChange: function() {
      this.$emit("searchChange", this.filters);
    },
    changeFilterBy: function() {
      this.filters.humanSkills = [];
      this.filters.equipment = [];
      this.filters.advice = [];
      this.searchChange();
    },
    changeLookingFor: function() {
      this.filterBy = "skills"
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