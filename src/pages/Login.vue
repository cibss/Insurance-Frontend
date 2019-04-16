<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="login-container">
          <div class="component">
            <img class="icon" src="~assets/PCid_logos/prvlg_clb_p01.png">
          </div>
          <div class="component row flex-center">
            <div class="col-md-2">
              <q-field
                :error="this.error.username != ''"
                :error-label="this.error.username"
                class="login-input"
              >
                <q-input
                  type="text"
                  v-model="user.username"
                  :before="[{icon: 'person', handler () {}}]"
                  placeholder="username"
                />
              </q-field>
              <q-field
                :error="this.error.password != ''"
                :error-label="this.error.password"
                class="login-input"
              >
                <q-input
                  type="password"
                  v-model="user.password"
                  :before="[{icon: 'lock', handler () {}}]"
                  placeholder="password"
                />
              </q-field>
            </div>
          </div>
          <div class="component row flex-center">
            <div class="col-sm-2">
              <q-btn color="primary" class="w-full" label="Login" :loading="loading" @click="doLogin" />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus">
.login-container
  margin 0 auto
  text-align center
  width 100%
.icon
  height 80px
  width 80px
.component
  padding-bottom 32px
  input
    padding 16px 4px
.q-if-control
  color goldenrod
</style>

<script>
import { colors } from 'quasar'

colors.setBrand('primary', '#DAA520')
colors.setBrand('secondary', '#ccc')

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      error: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  created () {
    if (localStorage.getItem('user') != null) {
      this.$router.replace({
        path: '/'
      })
    }
  },
  methods: {
    doLogin () {
      var bodyLogin = new FormData()
      bodyLogin.set('email_username', this.user.username)
      bodyLogin.set('password', this.user.password)
      this.error.username = ''
      this.error.password = ''
      this.loading = true

      this.$axios.post('/admin/login', bodyLogin).then(response => {
        var data = response.data

        if (data.success) {
          // console.log(data.data.Token)
          this.$q.notify({
            message: data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'positive'
          })
          localStorage.setItem('user', JSON.stringify(data.data))
          localStorage.setItem('authorization', JSON.stringify(data.data.Token))
          this.$router.push('/')
        } else {
          this.error.username = data.message
        }
        this.loading = false
      })
        .catch(error => {
          this.loading = false
          this.$q.notify({
            message: 'Login Error',
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          var data = error.response.data

          if (data.error.hasOwnProperty('email_username')) {
            this.error.username = data.error.email_username
          }
          if (data.error.hasOwnProperty('password')) {
            this.error.password = data.error.password
          }
        })
    }
  }
}
</script>
