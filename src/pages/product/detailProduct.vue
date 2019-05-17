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
          <span>Description</span>
          <div>
            <textarea placeholder="Deskripsi" v-model="product.description">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <form-upload-img
          v-model="product.logo"
          label="Upload Logo"
          v-if="!loading"/>
        <form-upload-doc v-model="product.pdf"/>
        <!-- <q-btn
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
        </div> -->
        <!-- <div class="form-group">
          <span>Status</span>
          <div>
            <input placeholder="Status"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div> -->
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" @click="updateData" />
          <q-btn color="secondary" label="batal" @click="$router.back()" />
        </div>
        <q-inner-loading :visible="loading">
          <q-spinner color="secondary" :size="60" />
        </q-inner-loading>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import FormUploadIMG from 'components/FormUploadPhoto.vue'
import FormUploadDoc from 'components/FormUploadDoc.vue'

export default {
  components: {
    'form-upload-doc': FormUploadDoc,
    'form-upload-img': FormUploadIMG
  },
  mounted () {
    this.fetchData()
  },
  data () {
    return {
      product: {
        name: '',
        description: '',
        logo: null,
        pdf: null
      },
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
        console.log(res.data.data[0])
        if (res.data.success) {
          this.product = res.data.data[0]
          if (this.product.logo.filename !== '') {
            this.selectedImage = this.product.logo.url
          }
        } else {
          console.log(res)
        }
        this.loading = false
      }).catch(error => {
        this.$q.notify({
          message: error.response.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'negative'
        })
        this.loading = false
      })
    },
    updateData () {
      this.loading = true
      var bodyForm = new FormData()
      bodyForm.append('name', this.product.name)
      bodyForm.append('description', this.product.description)
      bodyForm.append('logo', this.product.logo)
      bodyForm.append('pdf', this.product.pdf)

      this.$axios.post('/admin/product/' + this.$route.params.id + '/edit', bodyForm, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authorization'))
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
            message: error.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          this.loading = false
        })
    },
    upload_logo (foto) {
      this.product.logo = foto.target.files[0]
      this.selectedImage = URL.createObjectURL(this.product.logo)
    },
    upload_pdf (file) {
      this.product.pdf = file.target.files[0]
    },
    openURL () {
      window.open(this.product.pdf.url)
    }
  }
}
</script>

<style lang="css">
</style>
