<template>
  <div>
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <q-card class="col-lg-5 col-xs-12">
        <q-card-title>
          Tambah Nasabah
        </q-card-title>
        <q-card-main>
          <forminput
            v-if="!loading"
            label="NIK"
            placeholder="NIK"
            type="number"
            error=""
            v-model="customer.nik"
          />
          <forminput
            v-if="!loading"
            label="Name"
            placeholder="Nama"
            error=""
            v-model="customer.name"
          />
          <forminput
            v-if="!loading"
            label="Address"
            type="textarea"
            error=""
            v-model="customer.address"
          />
          <forminput
            v-if="!loading"
            label="Phone"
            placeholder="Phone Number"
            type="number"
            error=""
            v-model="customer.phone"
          />
          <forminput
            v-if="!loading"
            label="Email"
            placeholder="your@email.com"
            type="email"
            error=""
            v-model="customer.email"
          />
          <forminput
            v-if="!loading"
            label="NPWP"
            placeholder="NPWP"
            error=""
            v-model="customer.npwp"
          />
          <forminput
            v-if="!loading"
            label="No Rekening"
            placeholder="Rekening Number"
            error=""
            v-model="customer.rekening_number"
          />
          <div class="btn-confirm">
            <q-btn color="primary" v-close-overlay label="Submit" @click="addCustomer"/>
            <q-btn color="secondary" v-close-overlay label="cancel" @click="$router.back()"/>
          </div>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
import forminput from 'components/FormInput.vue'

export default {
  components: {
    forminput
  },
  data () {
    return {
      customer: {},
      loading: false
    }
  },
  methods: {
    addCustomer () {
      console.log(this.$data.customer)
    }
  }
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
