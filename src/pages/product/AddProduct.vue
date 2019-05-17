<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Tambah Produk Privilege Club
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>Type</span>
          <div>
            <select v-model="product.id_product_type">
              <option v-for="v of optionType" v-bind:key="v.id" :value="v.id">{{v.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <span>Name</span>
          <div>
            <input placeholder="Nama" v-model="product.name"/>
          </div>
        </div>
        <div class="form-group">
          <span>Description</span>
          <div>
            <textarea placeholder="Deskripsi" v-model="product.description">
            </textarea>
          </div>
        </div>
        <form-upload-img
          v-model="product.logo"
          label="Upload Logo"
          v-if="!loading"/>
        <form-upload-doc v-model="product.pdf"/>
        <!-- <div class="form-group">
          <span>Upload Document</span>
          <div>
            <input
              ref="pdf"
              @change="upload_pdf"
              type="file"/>
          </div>
        </div> -->
        <div class="form-group">
          <q-checkbox
            v-model="derivative"
            color="primary"
            label="Derivative"
            left-label
          />
          <div v-if="derivative">
            <select v-model="product.id_parent">
              <option v-for="v of optionParent" v-bind:key="v.id" :value="v.id">{{v.name}}</option>
            </select>
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
import FormUploadIMG from 'components/FormUploadPhoto.vue'
import FormUploadDoc from 'components/FormUploadDoc.vue'

export default {
  components: {
    'form-upload-doc': FormUploadDoc,
    'form-upload-img': FormUploadIMG
  },
  data () {
    return {
      product: {
        name: '',
        description: '',
        logo: null,
        pdf: null,
        id_parent: 0,
        id_product_type: 1
      },
      optionParent: [{ name: 'Name Product', id: 1 }],
      optionType: [],
      selectedImage: null,
      loading: false,
      derivative: false
    }
  },
  created () {
    this.$axios.get('/admin/product', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      this.optionParent = res.data.data
    })

    this.$axios.get('/admin/producttype', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      this.optionType = res.data.data
    })
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
      for (let k in this.product) {
        bodyForm.append(k, this.product[k])
      }

      this.$axios.post('/admin/create/product', bodyForm, {
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
