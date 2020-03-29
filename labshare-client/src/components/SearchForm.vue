<template>
  <div class="search-form">
    <label for="role">Looking for</label>
    <b-form-select v-model="filters.role" name="role" label="" @change="searchChange">
       <b-form-select-option value="lab">Labs</b-form-select-option>
       <b-form-select-option value="human">Helpers</b-form-select-option>
    </b-form-select>

    <b-form-input v-model="filters.zipcode" placeholder="Zipcode" @change="searchChange"></b-form-input>

    <b-form-group label="Wanted skills" v-if="filters.role=='human'">
      <b-form-checkbox-group id="humanSkills" v-model="filters.humanSkills" :options="humanSkillsOptions" name="humanSkills"></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Wanted equipment">
      <b-form-checkbox-group id="equipment" v-model="filters.equipment" :options="equipmentOptions" name="equipment"></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Wanted advice">
      <b-form-checkbox-group id="advice" v-model="filters.advice" :options="adviceOptions" name="advice"></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>


<script>
import { labSkills, equipment, advices } from '../../dist-browser/lib/selectLists'
export default {
  data: function(){
    return {
      filters: {
        role: 'lab',
        zipcode: null,
        humanSkills: [],
        equipment: [],
        advice: []
      },
      humanSkillsOptions: labSkills,
      equipmentOptions: equipment,
      adviceOptions: advices
    }
  },
  methods: {
    searchChange: function() {
      this.$emit('searchChange', this.filters)
    }
  },
  mounted: function(){
    this.searchChange()
  }
}
</script>