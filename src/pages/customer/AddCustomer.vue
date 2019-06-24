<template>
  <div>
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <q-card class="col-lg-6">
        <q-card-title>
          Tambah Nasabah
        </q-card-title>
        <q-card-main>
          <div class="btn-confirm">
            <q-btn color="primary" v-close-overlay label="Submit" />
            <q-btn color="secondary" v-close-overlay label="cancel" @click="$router.back()"/>
          </div>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.btn-confirm {
  text-align: center;
  margin-top: 32px;
  padding-bottom:20px;
}
.btn-confirm > button {
  margin: 0 12px;
}
</style>
