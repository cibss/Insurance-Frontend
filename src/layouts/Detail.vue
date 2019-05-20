<template>
  <q-layout view="hHh Lpr lFf">
    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar style="height:60px;" color="white" text-color="black">
        <q-btn
          style="font-size:20px;"
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <img class="header-icon" src="~assets/PCid_logos/prvlg_clb_i01.png">
              <q-btn
        style="font-size:16px;"
        flat
        round
        dense
        icon="notifications"
        @click="rightDrawer = !rightDrawer"
      />
      <q-p style="position:absolute; right:15px; bottom:30px;">{{ notif.length }}</q-p>
      </q-toolbar>
    </q-layout-header>

    <my-notif/>

    <q-page-container>
      <q-page style="padding: 32px">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { colors } from 'quasar'
import Notif from 'components/Notification.vue'

colors.setBrand('primary', '#DAA520')
colors.setBrand('secondary', '#ccc')

export default {
  name: 'MyLayout',
  components: {
    'my-notif': Notif
  },
  data () {
    return {
      leftDrawerOpen: true,
      rightDrawer: true,
      notif: [],
      user: {}
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.replace({
        path: '/login'
      })
      this.$q.notify({
        color: 'blue',
        message: 'Anda berhasil Keluar'
      })
    }
  }
}
</script>

<style lang="stylus">
  .sidebar-profile
    background-image url('https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?size=626&ext=jpg')
    background-repeat no-repeat
    background-size cover
    color white
    height 200px
  .sidebar-profile-picture
    height 80px
    width 75%
    margin-left -8px
</style>
