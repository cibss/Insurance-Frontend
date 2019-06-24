<template>
  <div class="form-group q-pb-sm">
    <div style="width:60%; display:inline-block;">
      <span style="display:block;">Date Of Birth</span>
      <input
        type="date"
        style="width:80%;"
        v-model="birth_date"
        @change="birthDateChange"/>
      <q-icon name="date_range" style="font-size:22px; margin-bottom:2px; margin-left:3px; color:goldenrod;"/>
    </div>
    <div style="width:40%; padding-left:10px; display:inline-block;">
      <span style="display:block;">Age</span>
      <input
        disabled
        v-model="age"
        placeholder="27" />
    </div>
    <q-field
      class="field-input"
      v-if="error != ''"
      :error="true"
      :error-label="error" />
  </div>
</template>

<script>
export default {
  props: ['value', 'error'],
  data () {
    return {
      birth_date: '',
      age: ''
    }
  },
  watch: {
    birth_date (val) {
      this.$emit('input', val)
    }
  },
  mounted () {
    if (this.value != null && this.value !== '') {
      this.$data.birth_date = this.value
      this.birthDateChange()
    }
  },
  methods: {
    birthDateChange () {
      const date = new Date()
      const birthDate = new Date(this.$data.birth_date)
      var diff = (date.getTime() - birthDate.getTime()) / 1000 / 60 / 60 / 24
      diff = Math.abs(Math.round(diff / 365.25))
      this.$data.age = diff + ' tahun'
    }
  }
}
</script>

<style>
</style>
