<template>
  <div>
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <q-card class="col-lg-6">
        <q-card-title>
          Tambah Group Privilege Club
        </q-card-title>
        <q-card-main>
          <div class="form-group">
            <span>Name</span>
            <div>
              <input v-model="name" placeholder="Name"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
        <!-- <div class="form-group">
            <span>Team Leader</span>
            <div>
              <input placeholder="Cari Nama Agen"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div> -->
          <div style="margin-top: 8px; text-align: center">
            <q-btn style="margin-right: 8px" color="primary" @click.native="addGroup" label="tambah" :loading="loadingBtnAddGroup" />
            <q-btn color="secondary" label="batal" :loading="false" @click="$router.back()" />
          </div>
        </q-card-main>
      </q-card>
      <!-- <div class="col-lg-1">
      </div>
      <q-card class="col-lg-5">
        <q-card-title>
          Import Excel
        </q-card-title>
        <q-card-main>
          <div class="form-group" style="margin-bottom:18px;">
            <q-btn @click="getTemplate" style="margin-right: 8px" color="primary" label="Get Template" :loading="btnGetTemplate" />
          </div>
          <div class="form-group">
            <span>Name</span>
            <div>
              <input type="file" @change="upload_excel" accept=".xlsx"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div style="margin-top: 8px; text-align: center">
            <q-btn style="margin-right: 8px" color="primary" label="tambah" @click="postImport" :loading="false" />
            <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
          </div>
        </q-card-main>
      </q-card> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingBtnAddGroup: false,
      name: '',
      btnGetTemplate: false,
      excelImport: null
    }
  },
  methods: {
    upload_excel (foto) {
      this.excelImport = foto.target.files[0]
      console.log(this.excelImport)
    },
    addGroup () {
      this.loadingBtnAddGroup = true

      let fd = new FormData()
      fd.append('name', this.name)
      this.$axios.post('/admin/group', fd, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(response => {
        this.$q.notify({
          message: response.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'positive'
        })
        this.loadingBtnAddGroup = false
      }).catch(error => {
        console.log(error.response)
        this.$q.notify({
          message: error.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'negative'
        })
        this.loadingBtnAddGroup = false
      })
    },
    postImport () {
      let fd = new FormData()
      fd.append('tabel', 'groups')
      fd.append('excel', this.excelImport)
      this.$axios.post('/admin/import', fd, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        console.log(res)
        let data = res.data
        if (data.success) {
          this.$q.notify({
            message: data.message,
            timeout: 1000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'positive'
          })
        }
      })
    },
    getTemplate () {
      let fd = new FormData()
      fd.append('tabel', 'groups')
      fd.append('only_header', 'true')
      fd.append('cols[]', 'name')
      fd.append('cols[]', 'status')
      fd.append('cols[]', 'id_admin')
      this.$axios.post('/admin/export', fd, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        let data = res.data.data
        if (data.filename) {
          window.open(data.url)
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
