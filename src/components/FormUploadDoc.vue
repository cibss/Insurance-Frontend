<template>
  <div class="form-group">
    <span>Upload Form</span>
    <input
      class="hidden"
      type="file"
      ref="formUplaod"
      @change="onFileSelected"/>
    <br>
    <div v-for="(file, i) in docs" v-bind:key="i">
      <q-icon name="insert_drive_file" size="36px"/>
      <span class="q-body-1">{{file.name}}</span>
      <q-btn flat round icon="close" @click="deleteDoc(i)"/>
    </div>
    <q-btn
      size="sm"
      color="blue"
      style="margin: 8px 0;"
      @click="addDocs"
    >
      <q-icon name="add_circle" class="icon-btn"/>tambah dokumen
    </q-btn>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      docs: []
    }
  },
  watch: {
    docs (val) {
      this.$emit('input', val)
    }
  },
  created () {
    if (this.value != null) {
      this.$data.docs = this.value
    }
  },
  methods: {
    addDocs () {
      this.$refs.formUplaod.click()
    },
    deleteDoc (index) {
      this.$data.docs.splice(index, 1)
    },
    onFileSelected (event) {
      this.$data.docs.push(event.target.files[0])
    }
  }
}
</script>

<style>
</style>
