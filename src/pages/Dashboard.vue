<template>
  <span>
    Dashboard Page (on progress)
  </span>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
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
