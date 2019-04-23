<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Tambah Group Privilege Club
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <q-p>Id</q-p>
          <div>
            <input type="number" placeholder="Id"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Id Admin</q-p>
          <div>
            <input placeholder="Id Admin"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Name</q-p>
          <div>
            <input placeholder="Name"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Status</q-p>
          <div>
            <textarea placeholder="Status">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="tambah" :loading="loading" />
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
