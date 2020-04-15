<i18n>
    {
    "en": {
    "text1": "Search as",
    "text1a": "Diagnostic Center",
    "text1b": "Research Laboratory",
    "text1c": "Qualified Volunteer",
    "text2": "Filter for",
    "text2a": "Wanted skills",
    "text2b": "Wanted devices/equipment",
    "text2c": "Wanted advice/know-how",
    "text3a": "Offered devices/equipment",
    "text3b": "Offered advice/know-how",
    "text4": "Skills",
    "text5": "Devices/Equipment",
    "text6": "Advice/Know-How"
    },
    "de": {
    "text1": "Suche als",
    "text1a": "Diagnostikzentrum",
    "text1b": "Forschungslabor",
    "text1c": "Qualifizierte Freiwillige",
    "text2": "Filtern nach",
    "text2a": "Gesuchte Fähigkeiten",
    "text2b": "Gesuchte Geräte/Equipment",
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
        <div class="col-md3">
          <b-form-group label="Wähle deine Nutzergruppe">
            <div class="lh-button-group">
              <LhButton text="Diagnostic Labs" :active="filters.role === 'lab_diag'" v-bind:onClick="() => changeLookingFor('lab_diag')" />
              <LhButton text="Research Labs" :active="filters.role === 'lab_research'" v-bind:onClick="() => changeLookingFor('lab_research')" />
              <LhButton text="Volunteers" :active="filters.role === 'volunteer'" v-bind:onClick="() => changeLookingFor('volunteer')" />
            </div>
          </b-form-group>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md4">
          <b-form-group label="Filter by" v-if="'lab_diag' === filters.role">
            <div class="lh-button-group">
              <LhButton text="Wanted Skills" :active="filterBy === 'skills'" v-bind:onClick="() => changeFilterBy('skills')" />
              <LhButton text="Wanted Equipment" :active="filterBy === 'equipment'" v-bind:onClick="() => changeFilterBy('equipment')" />
              <LhButton text="Wanted Advice" :active="filterBy === 'advice'" v-bind:onClick="() => changeFilterBy('advice')" />
            </div>
          </b-form-group>

          <b-form-group label="Filter by" v-if="'lab_research' === filters.role">
            <div class="lh-button-group">
              <LhButton text="Offered Equipment" :active="filterBy === 'equipment'" v-bind:onClick="() => changeFilterBy('equipment')" />
              <LhButton text="Offered Advice" :active="filterBy === 'advice'" v-bind:onClick="() => changeFilterBy('advice')" />
            </div>
          </b-form-group>
        </div>
      </div>
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
import LhButton from './LhButton';

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

      if (this.filters.role === type) {
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
