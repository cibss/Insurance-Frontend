<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Tambah Produk Privilege Club
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>Name</span>
          <div>
            <input placeholder="Nama" v-model="productPackage.name"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Description</span>
          <div>
            <textarea placeholder="Deskripsi" v-model="productPackage.description">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Price</span>
          <div>
            <input type="number" placeholder="Price" v-model="productPackage.price"/>
            <q-field  class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <img
          style="max-width: 160px"
          v-if="selectedImage !== null"
          :src="selectedImage">
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
      productPackage: {
        name: '',
        description: '',
        price: ''
      },
      selectedImage: null,
      loading: false
    }
  },
  methods: {
    addProduct () {
      this.loading = true
      var bodyForm = new FormData()
      bodyForm.append('title', this.productPackage.name)
      bodyForm.append('description', this.productPackage.description)
      bodyForm.append('price', this.productPackage.price)

      this.$axios.post('/admin/product/' + this.$route.params.id_product + '/create/package', bodyForm, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authorization'))
        }
      })
        .then(response => {
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
            message: error.message,
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
