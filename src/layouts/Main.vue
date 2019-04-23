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
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <img class="header-icon" src="~assets/PCid_logos/prvlg_clb_i01.png">
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      side="left"
      v-model="leftDrawerOpen"
      :behavior="$q.platform.is.mobile ? 'mobile' : 'desktop' "
    >
      <div class="sidebar-profile">
        <div style="text-align:right;" @click="leftDrawerOpen = !leftDrawerOpen">
          <q-icon style="font-size:30px; margin: 10px 10px 0 0;" name="arrow_back" color="black" />
        </div>
        <div style="padding: 16px;">
          <img class="sidebar-profile-picture" src="~assets/PCid_logos/prvlg_clb_l01.png">
          <p style="color: black;padding-top:8px;font-weight:bold; margin-bottom:0px;">{{user.Username}}</p>
          <p style="color:goldenrod; font-size:13px; font-weight:bold;">{{user.Email}}</p>
        </div>
      </div>
      <!-- QScrollArea is optional -->
      <!-- Content here -->
      <q-item to="/dashboard">
        <q-item-side icon="home" class="sidebar-icon" />
        <q-item-main label="Dashboard" />
      </q-item>
      <q-item to="/product">
        <q-item-side icon="assessment" class="sidebar-icon" />
        <q-item-main label="Product" />
      </q-item>
      <q-item to="/agen">
        <q-item-side icon="people" class="sidebar-icon" />
        <q-item-main label="Agen" />
      </q-item>
      <q-item to="/group">
        <q-item-side icon="alarm" class="sidebar-icon" />
        <q-item-main label="Group" />
      </q-item>
      <q-item to="/ListChat">
        <q-item-side icon="chat" class="sidebar-icon" />
        <q-item-main label="Chat" />
      </q-item>
      <q-item to="/Setting">
        <q-item-side icon="settings" class="sidebar-icon" />
        <q-item-main label="Setting" />
      </q-item>
      <q-item @click.native="logout">
        <q-item-side icon="exit_to_app" class="sidebar-icon" />
        <q-item-main label="Log Out" />
      </q-item>
  </q-layout-drawer>

    <q-page-container>
      <q-page style="padding: 32px">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { colors } from 'quasar'

colors.setBrand('primary', '#DAA520')
colors.setBrand('secondary', '#ccc')

export default {
  name: 'MyLayout',
  created () {
    if (localStorage.getItem('user') == null) {
      this.$router.replace({
        path: '/login'
      })
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  data () {
    return {
      leftDrawerOpen: true,
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
