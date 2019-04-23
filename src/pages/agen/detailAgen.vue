<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Detail Agen
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <q-p>Username</q-p>
          <div>
            <input type="text" placeholder="Username"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>First Name</q-p>
          <div>
            <input placeholder="Nama Depan"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Last Name</q-p>
          <div>
            <input placeholder="Nama Belakang"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Address</q-p>
          <div>
            <textarea placeholder="Jl.Pulau kelapa blok f6 No 54. perumahan Bekasi jaya indah, kecamatan Bekasi">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" />
          <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
