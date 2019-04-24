<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Detail Product
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>Name</span>
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
          <span v-if="product.logo.filename == ''">Upload Brand</span>
          <input
            ref="foto"
            accept=".gif,.jpg,.jpeg,.png"
            @change="upload_logo"
            type="file"/>
            <q-field class="field-input" :error="false" error-label="error this" />
        </div>
        <q-btn
          v-if="product.pdf.filename != ''"
          icon="attachment"
          color="positive"
          label="lihat dokumen"
          size="12px"
          style="margin-bottom: 8px"
          @click="openURL"/>
        <div class="form-group">
          <span v-if="product.pdf.filename == ''">Upload Document</span>
          <div>
            <input
              ref="pdf"
              @change="upload_pdf"
              type="file"/>
              <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <!-- <div class="form-group">
          <span>Status</span>
          <div>
            <input placeholder="Status"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div> -->
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" />
          <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
        </div>
        <q-inner-loading :visible="loading">
          <q-spinner color="secondary" :size="60" />
        </q-inner-loading>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      product: {},
      loading: false,
      selectedImage: null
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/product/' + this.$route.params.id + '/detail', {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        if (res.data.success) {
          this.product = res.data.data[0]
          console.log(this.product)
          if (this.product.logo.filename !== '') {
            this.selectedImage = 'http://' + this.product.logo.url
          }
        } else {
          this.$q.notify({
            message: res.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'warning'
          })
        }
      }).catch(error => {
        this.$q.notify({
          message: error.response.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'negative'
        })
      })
      this.loading = false
    },
    upload_logo (foto) {
      this.product.logo = foto.target.files[0]
      this.selectedImage = URL.createObjectURL(this.product.logo)
    },
    upload_pdf (file) {
      this.product.pdf = file.target.files[0]
    },
    openURL () {
      window.open('http://' + this.product.pdf.url)
    }
  }
}
</script>

<style lang="css">
</style>
