<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Detail Agen
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>NIK</span>
          <div>
            <input type="number" name="" placeholder="0022xxx">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Username</span>
          <div>
            <input type="text" placeholder="Username"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>First Name</span>
          <div>
            <input placeholder="Nama Depan"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Last Name</span>
          <div>
            <input placeholder="Nama Belakang"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Address</span>
          <div>
            <textarea placeholder="Jl.Pulau kelapa blok f6 No 54. perumahan Bekasi jaya indah, kecamatan Bekasi">
            </textarea>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Birth Date</span>
          <div>
            <input type="date" name="">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Email</span>
          <div>
            <input type="email" name="" placeholder="saya@gmail.com">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Password</span>
          <div>
            <input type="password" name="" placeholder="xxxxx">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Phone</span>
          <div>
            <input type="number" name="" placeholder="0022xxx">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Status</span>
          <div>
            <input placeholder="1">
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Photo</span>
          <div>
            <input type="file">
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
  data () {
    return {
      loading: false
    }
  }
}
</script>

<style lang="css">
</style>
