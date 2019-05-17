<template>
  <div>
    <q-btn
      style="font-size:16px;"
      flat
      round
      dense
      icon="notifications"
      @click="rightDrawer = !rightDrawer">
      <q-chip v-if="notif.length != 0" floating color="red">{{ notif.length }}</q-chip>
    </q-btn>
    <!-- NOTIFIKASI -->
    <q-layout-drawer
      side="right"
      v-model="rightDrawer"
      :overlay="true"
      behavior="mobile"
    >
      <q-item style="padding: 16px">
        <q-item-side icon="arrow_forward" @click.native="rightDrawer = !rightDrawer"/>
        <q-item-main label="Notifikasi" />
      </q-item>

      <q-item :class=" notif.length == 0 ? '' : 'hidden' ">
        <q-item-main sublabel="Tidak ada notifikasi" />
      </q-item>

      <q-item v-for="v of notif"  v-bind:key="v.id">
        <q-item-main :label="v.title" :sublabel="v.description" />
        <q-icon @click.native="()=>setReadNotif(v.id)" name="close"  />
      </q-item>

    </q-layout-drawer>
  </div>
</template>

<script>
export default {
  created () {
    let getSetNotification = () => {
      this.$axios.get('/admin/notify?is_read=false', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authorization'))
        }
      })
        .then(res => {
          let data = res.data.data
          if (data) {
            this.$data.notif = data
          }
        })
        .catch(res => {
          console.error(res)
        })
    }
    getSetNotification()
    this.$pl.onMessage(function (res) {
      getSetNotification()
    })

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
      rightDrawer: false,
      notif: []
    }
  },
  methods: {
    setReadNotif (id) {
      console.log('hasdad', id)
      var fd = new FormData()
      fd.append('is_read', true)
      this.$axios.put('/admin/notify/' + id, fd, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        console.log(res)
        this.$axios.get('/admin/notify?is_read=false', {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('authorization'))
          }
        })
          .then(res => {
            let data = res.data.data
            if (data) {
              this.$data.notif = data
            }
          })
          .catch(res => {
            console.error(res)
          })
      }).catch(res => {
        console.error(res)
      })
    }
  }
}
</script>

<style>
</style>
