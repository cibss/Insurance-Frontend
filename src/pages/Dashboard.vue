<template>
  <div inline class="w-full">
    <q-card-title >
      Dashboard
      <span slot="subtitle">
        Welcome {{user.Username}}
      </span>
    </q-card-title >
    <q-card-main>
      <div class="row">
        <q-card class="col-lg-3 col-xs-12 q-mr-md q-mb-md">
          <q-card-title >
            Card 1
          </q-card-title >
        </q-card>
        <q-card class="col-lg-3 col-xs-12 q-mr-md q-mb-md">
          <q-card-title >
            Card 2
          </q-card-title >
        </q-card>
      </div>
    </q-card-main>
    <q-card-separator inset/>
    <q-card-title >
      Action Needed
    </q-card-title >
    <q-card-main>
      <div class="row">
        <q-card class="col-lg-3 col-xs-12 q-mr-md q-mb-md">
          <q-card-title >
            Card 1
          </q-card-title >
        </q-card>
        <q-card class="col-lg-3 col-xs-12 q-mr-md q-mb-md">
          <q-card-title >
            Card 2
          </q-card-title >
        </q-card>
        <q-card class="col-lg-3 col-xs-12 q-mr-md q-mb-md">
          <q-card-title >
            Card 3
          </q-card-title >
        </q-card>
        <q-card class="col-lg-3 col-xs-12 q-mr-md q-mb-md">
          <q-card-title >
            Card 3
          </q-card-title >
        </q-card>
      </div>
    </q-card-main>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    // localStorage.clear()
    if (localStorage.getItem('user') == null) {
      this.$router.replace({
        path: '/login'
      })
    }
  }
}
</script>
