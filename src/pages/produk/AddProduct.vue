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
            <input placeholder="Nama" v-model="product.name"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Description</q-p>
          <div>
            <textarea placeholder="Deskripsi" v-model="product.description">
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
            ref="foto"
            accept=".gif,.jpg,.jpeg,.png"
            @change="upload_logo"
            type="file"/>
            <q-field class="field-input" :error="false" error-label="error this" />
        </div>
        <div class="form-group">
          <q-p>Upload Document</q-p>
          <div>
            <input
              ref="pdf"
              @change="upload_pdf"
              type="file"/>
              <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="tambah" :loading="loading" @click="addProduct" />
          <q-btn color="secondary" label="batal" @click="$router.back()" />
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
      selectedImage: null,
      loading: false
    }
  },
  methods: {
    upload_logo (foto) {
      this.product.logo = foto.target.files[0]
      this.selectedImage = URL.createObjectURL(this.product.logo)
    },
    upload_pdf (file) {
      this.product.pdf = file.target.files[0]
    },
    addProduct () {
      this.loading = true
      var bodyForm = new FormData()
      bodyForm.append('name', this.product.name)
      bodyForm.append('description', this.product.description)
      bodyForm.append('logo', this.product.logo)
      bodyForm.append('pdf', this.product.pdf)

      this.$axios.put('/admin/create/product', bodyForm, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('token-access'))
        }
      })
        .then(response => {
          console.log(response)
          this.$q.notify({
            message: response.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'positive'
          })
          this.loading = false
        })
        .catch(error => {
          console.log(error.response)
          this.$q.notify({
            message: error.response.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          this.loading = false
        })
    }
  }
}
</script>

<style lang="css">
</style>
