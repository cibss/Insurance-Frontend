<template>
    <div inline class="row">
      <q-card class="col-lg-6">
        <q-card-title>
          Detail Customer
        </q-card-title>
        <q-card-main>
          <div class="form-group">
            <span>Name</span>
            <div>
              <input v-model="customer.name" placeholder="Nama"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Address</span>
            <div>
              <textarea v-model="customer.address"></textarea>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Birth Date</span>
            <div>
              <input v-model="customer.birth_date" type="date" />
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Phone</span>
            <div>
              <input v-model="customer.phone"  />
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Email</span>
            <div>
              <input v-model="customer.email"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>NPWP</span>
            <div>
              <input v-model="customer.npwp" />
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Rek Number</span>
            <div>
              <input v-model="customer.rekening_number"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Sex</span>
            <div>
              <select>
                <option v-for="v of sexOpstions" v-bind:key="v.id" :value="v.id">{{ v.name }}</option>
              </select>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>Religion</span>
            <div>
              <select>
                <option v-for="v of religionOpstions" v-bind:key="v.id" :value="v.id">{{ v.name }}</option>
              </select>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>nationality</span>
            <div>
              <select>
                <option v-for="v of nationalityOpstions" v-bind:key="v.id" :value="v.id">{{ v.name }}</option>
              </select>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>ktp</span>
            <div>
              <input @change="fileKtp" type="file">
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group">
            <span>rekening</span>
            <div>
              <input @change="fileRekening" type="file">
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div style="margin-top: 8px; text-align: center">
            <q-btn style="margin-right: 8px" color="primary" label="update" @click.native="updateCustomer" :loading="false" />
            <q-btn color="secondary" label="batal" :loading="false" @click="$router.back()" />
          </div>
        </q-card-main>
      </q-card>
      <q-modal v-model="modalApprove" minimized>
        <div style="padding: 50px">
          <div class="q-title q-mb-md">Approve {{selectedData.first_name}}?</div>
          <p>Action will be performed to this data by click "Reject"</p>
          <div class="btn-confirm">
            <q-btn color="positive" v-close-overlay label="Approve" @click.native="setStatus('approve')" />
            <q-btn color="secondary" v-close-overlay label="Cancel" />
          </div>
        </div>
      </q-modal>
    </div>
</template>

<script>
export default {
  data () {
    return {
      customer: {
        address: '',
        birth_date: '',
        email: '',
        name: '',
        nik: '',
        npwp: '',
        phone: '',
        rekening_number: '',
        id_nationality: null,
        id_religion: null,
        id_sex: null,
        ktp: null,
        rekening: null
      },
      sexOpstions: [],
      religionOpstions: [],
      nationalityOpstions: [],
      selectedData: {},
      modalApprove: false,
      searchMember: false
    }
  },
  created () {
    this.$axios.get('/admin/customer?id=' + this.$route.params.id, {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      this.customer = res.data.data[0]
    })
    this.$axios.get('/religion', {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      this.religionOpstions = res.data.data
    })
    this.$axios.get('/sex', {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      console.log(res.data.data)
      this.sexOpstions = res.data.data
    })
    this.$axios.get('/nationality', {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      this.nationalityOpstions = res.data.data
    })
  },
  methods: {
    fileKtp (foto) {
      this.customer.ktp = foto.target.files[0]
    },
    fileRekening (foto) {
      this.customer.rekening = foto.target.files[0]
    },
    updateCustomer () {
      let fd = new FormData()
      for (let k in this.customer) {
        fd.append(k, this.customer[k])
      }
      this.$axios.put('/admin/customer/' + this.$route.params.id, fd, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization')),
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      })
    },
    openApprove (props) {
      this.modalApprove = true
      this.selectedData = props.row
    }
  }
}
</script>

<style lang="css">
.list-header {
  padding-right: 8px;
}
.search-input {
  margin-top: 8px;
}
.btn-confirm {
  text-align: center;
  margin-top: 32px;
}
.btn-confirm > button {
  margin: 0 12px;
}
</style>
