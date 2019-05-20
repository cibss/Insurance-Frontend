<template>
  <div class="form-group">
    <span>{{this.label}}</span>
    <input
      class="hidden"
      accept=".gif,.jpg,.jpeg,.png"
      @change="upload_photo"
      type="file"
      :ref="label"/>
    <br>
    <q-btn
      v-if="imageUrl == ''"
      size="sm"
      color="blue"
      style="margin: 8px 0;"
      @click="$refs[label].click()">
      <q-icon name="publish" class="icon-btn"/>upload
    </q-btn>
    <div v-if="imageUrl != ''" class="upload-img" :style="'background-image: url('+imageUrl+')'">
      <q-btn
        class="upload-btn"
        size="sm"
        color="blue"
        icon="create"
        round
        @click="$refs[label].click()"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'label'],
  data () {
    return {
      image: null,
      imageUrl: ''
    }
  },
  created () {
    if (this.value != null && this.value !== '') {
      if (this.value.filename !== '') {
        this.$data.imageUrl = this.value.url
      }
    }
  },
  methods: {
    upload_photo (event) {
      this.image = event.target.files[0]
      this.imageUrl = URL.createObjectURL(this.image)
    }
  },
  watch: {
    image (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
.upload-img {
  height: 160px;
  max-width: 160px !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.upload-btn {
  position: absolute;
  right: 4px;
  top: 4px;
}
</style>
