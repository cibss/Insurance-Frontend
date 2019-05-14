<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Detail Agen
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>NIK</span>
          <div>
            <input type="number" v-model="agent.nik" placeholder="0022xxx">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Username</span>
          <div>
            <input type="text" v-model="agent.username" placeholder="Username"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>First Name</span>
          <div>
            <input v-model="agent.first_name" placeholder="Nama Depan"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Last Name</span>
          <div>
            <input v-model="agent.last_name" placeholder="Nama Belakang"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Address</span>
          <div>
            <textarea v-model="agent.address" placeholder="Jl.Pulau kelapa blok f6 No 54. perumahan Bekasi jaya indah, kecamatan Bekasi">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <form-birth-date
          v-model="agent.birth_date"
          v-if="!loading"/>
        <div class="form-group">
          <span>Email</span>
          <div>
            <input type="email" v-model="agent.email" placeholder="saya@gmail.com">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <!-- <div class="form-group">
          <span>Password</span>
          <div>
            <input type="password" name="" placeholder="xxxxx">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div> -->
        <div class="form-group">
          <span>Phone</span>
          <div>
            <input type="number" v-model="agent.phone" placeholder="0022xxx">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <!-- <div class="form-group">
          <span>Status</span>
          <div>
            <input placeholder="1">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div> -->
        <!-- <div class="form-group">
          <span>Photo</span>
          <div>
            <input type="file">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div> -->
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" />
          <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
        </div>
      </q-card-main>
    </q-card>
    <q-inner-loading :visible="loading">
      <q-spinner color="secondary" :size="60" />
    </q-inner-loading>
  </div>
</template>

<script>
import FormBirthDate from 'components/FormBirthDate.vue'

export default {
  components: {
    'form-birth-date': FormBirthDate
  },
  data () {
    return {
      loading: false,
      agent: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/agen?id=' + this.$route.params.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        if (res.data.success) {
          this.$data.agent = res.data.data[0]
        } else {
          console.log(res)
          this.$route.back()
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
    }
  }
}
</script>

<style lang="css">
</style>
