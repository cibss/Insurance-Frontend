<template>
  <div>
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <q-card class="col-lg-6">
        <q-card-title>
          Tambah Agen Privilege Club
        </q-card-title>
        <q-card-main>
          <div class="form-group">
            <span>NIK</span>
            <div>
              <input type="number" placeholder="Nomor Induk" v-model="agen.nik"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Username</span>
            <div>
              <input placeholder="Username" v-model="agen.username"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>First Name</span>
            <div>
              <input placeholder="Nama Depan" v-model="agen.first_name"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Last Name</span>
            <div>
              <input placeholder="Nama Belakang" v-model="agen.last_name"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Address</span>
            <div>
              <textarea placeholder="Jl.Pulau kelapa blok f6 No 54. perumahan Bekasi jaya indah, kecamatan Bekasi" v-model="agen.address">
              </textarea>
              <q-field class="field-input" :error="false" error-label="error this"/>
            </div>
          </div>
          <div class="form-group">
            <span>Birth Date</span>
            <div>
              <input type="date" style="width:80%;" v-model="agen.birth_date"/>
              <q-icon name="date_range" style="font-size:22px; margin-bottom:2px; margin-left:3px; color:goldenrod;"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Email</span>
            <div>
              <input type="email" placeholder="email@email.com" v-model="agen.email"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Phone</span>
            <div>
              <input type="number" placeholder="08xxxx" v-model="agen.phone"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Password</span>
            <div>
              <input type="password" placeholder="••••••••" v-model="agen.password"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div style="margin-top: 8px; text-align: center">
            <q-btn style="margin-right: 8px" color="primary" label="tambah" :loading="loading" @click="addAgen" />
            <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
          </div>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      agen: {
        username: '',
        email: '',
        first_name: '',
        password: '',
        last_name: '',
        phone: '',
        address: '',
        birth_date: '',
        nik: ''
      },
      loading: false
    }
  },
  methods: {
    addAgen () {
      this.loading = true
      var bodyForm = new FormData()
      bodyForm.append('username', this.agen.username)
      bodyForm.append('email', this.agen.email)
      bodyForm.append('first_name', this.agen.first_name)
      bodyForm.append('password', this.agen.password)
      bodyForm.append('last_name', this.agen.last_name)
      bodyForm.append('phone', this.agen.phone)
      bodyForm.append('address', this.agen.address)
      bodyForm.append('birth_date', this.agen.birth_date)
      bodyForm.append('nik', this.agen.nik)

      this.$axios.post('/admin/register/agen', bodyForm, {
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
