<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Tambah Produk Privilege Club
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <q-p>Upload Brand</q-p>
          <input
            ref="foto"
            accept=".gif,.jpg,.jpeg,.png"
            @change="upload_logo"
            type="file"/>
            <q-field class="field-input" :error="false" error-label="error this" />
        </div>
        <div class="form-group">
          <q-p>Name</q-p>
          <div>
            <input placeholder="Nama"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Upload Document</q-p>
          <div>
            <input
              ref="pdf"
              @change="upload_pdf"
              type="file"/>
              <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <q-p>Status</q-p>
          <div>
            <input placeholder="Status"/>
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
