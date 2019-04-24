<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Tambah Agen Privilege Club
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>NIK</span>
          <div>
            <input type="number" placeholder="Nomor Induk"/>
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
            <input type="date" style="width:80%;"/>
            <q-icon name="date_range" style="font-size:22px; margin-bottom:2px; margin-left:3px; color:goldenrod;"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Username</span>
          <div>
            <input type="number" placeholder="username"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Email</span>
          <div>
            <input type="number" placeholder="email@email.com"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Phone</span>
          <div>
            <input type="number" placeholder="08xxxx"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Password</span>
          <div>
            <input type="password" placeholder="••••••••"/>
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
