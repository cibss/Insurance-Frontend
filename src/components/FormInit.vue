<!-- USING FOR GET INIT SELECTION SEX, RELIGION, & NATIONALITY -->
<template>
  <div class="form-group">
    <span>{{this.label}}</span>
    <div>
      <select v-model="selectedValue" class="select_box" style="height:40px;">
        <option v-for="v in selectOptions" v-bind:key="v.value" :value="v.value">{{v.label}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'url', 'label'],
  data () {
    return {
      selectOptions: [],
      selectedValue: this.value
    }
  },
  created () {
    this.$axios.get(this.url, {
    }).then(res => {
      // this.$data.customer.email = 'Tendi Firmansyah'
      let selectOptions = []
      let i = 0
      for (let v of res.data.data) {
        selectOptions[i] = {}
        selectOptions[i].label = v.name
        selectOptions[i].value = v.id
        i++
      }
      this.$data.selectOptions = selectOptions
    })
  },
  watch: {
    selectedValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
</style>
