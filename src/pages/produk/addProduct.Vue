<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Tambah Produk Privilege Club
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <q-p>Name</q-p>
          <div>
            <input placeholder="Nama"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Description</q-p>
          <div>
            <textarea placeholder="Deskripsi">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <img
          style="max-width: 160px"
          v-if="selectedImage !== null"
          :src="selectedImage">
        <div class="form-group">
          <q-p>Upload Logo</q-p>
          <input
            accept=".gif,.jpg,.jpeg,.png"
            @change="upload_logo"
            type="file"/>
            <q-field class="field-input" :error="false" error-label="error this" />
        </div>
        <div class="form-group">
          <q-p>Upload Document</q-p>
          <div>
            <input
              @change="upload_pdf"
              type="file"/>
              <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="tambah" :loading="loading" />
          <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script scoped>
export default {
  data () {
    return {
      product: {
        name: '',
        description: '',
        logo: null,
        pdf: null
      },
      selectedImage: null
    }
  },
  methods: {
    upload_logo (event) {
      this.product.logo = event.target.files[0]
      this.selectedImage = URL.createObjectURL(this.product.logo)
    },
    upload_pdf (event) {
      this.product.pdf = event.target.files[0]
    }
  }
}
</script>

<style lang="css">
</style>
