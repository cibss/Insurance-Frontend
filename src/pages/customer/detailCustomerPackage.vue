<template>
  <div style="position:relative">
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <div class="col-lg-4 col-xs-12 q-mr-md q-mb-md">
        <q-card class="relative-position">
          <q-card-title>
            Detail Customer Product
            <span slot="subtitle">
              {{ customerPackage.customer_name }} / {{customerPackage.product_type == 1?'Insurance':'Investment'}} / {{customerPackage.product_name}}
            </span>
          </q-card-title>
          <q-card-main>
            <forminput
              v-if="!loading"
              label="Expired Contracted Date"
              type="date"
              error=""
              v-model="customerPackage.expired_at"
            />
            <forminput
              v-if="!loading"
              label="No SPAJ"
              error=""
              v-model="customerPackage.spaj"
            />
            <forminput
              v-if="!loading"
              label="No Polis"
              error=""
              v-model="customerPackage.polis"
            />
            <forminput
              v-if="!loading"
              label="Tanggal Masuk"
              type="date"
              error=""
              v-model="customerPackage.approved_at"
            />
            <forminput
              v-if="!loading"
              label="Tanggal Submit"
              type="date"
              error=""
              v-model="customerPackage.created_at"
            />
            <forminput
              v-if="!loading"
              label="Payment Due Date"
              type="date"
              error=""
              v-model="customerPackage.payment_due_at"
            />
            <forminput
              v-if="!loading"
              label="Nominal"
              type="number"
              error=""
              v-model="customerPackage.nominal"
            />
            <forminput
              v-if="!loading"
              label="MGI"
              type="number"
              error=""
              v-model="customerPackage.mgi"
            />
            <forminput
              v-if="!loading"
              label="FYP"
              type="number"
              error=""
              v-model="customerPackage.fyp"
            />
            <div class="form-group">
              <span>Tenor</span>
              <div>
                <select v-model="customerPackage.tenor">
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                </select>
              </div>
            </div>
            <forminput
              v-if="!loading"
              label="Rate"
              type="number"
              error=""
              v-model="customerPackage.rate"
            />
            <div class="form-group">
              <span>Status</span>
              <select>
                <option :selected="customerPackage.status == v.id" v-for="v of optionStatus" v-bind:key="v.id">{{ v.status }}</option>
              </select>
            </div>
            <div class="btn-confirm" style="padding-bottom:20px;">
              <q-btn color="primary" v-close-overlay @click.native="submitcustomerPackage" label="update" />
              <q-btn color="secondary" v-close-overlay label="cancel" @click="$router.back()"/>
            </div>
          </q-card-main>

          <q-inner-loading :visible="loading">
            <q-spinner color="secondary" :size="60" />
          </q-inner-loading>
        </q-card>
      </div>
      <div class="col-lg-4 col-xs-12">
        <q-card class="relative-position q-mb-md">
          <q-card-title>
            Tertanggung
            <q-btn round dense size="sm" color="primary" icon="add" class="q-ml-xs"/>
          </q-card-title>
          <q-card-main>
            <q-list no-border separator>
              <q-item>
                <q-item-side>
                  <q-icon name="person"/>
                </q-item-side>
                <q-item-main label="Eka" />
                <q-item-side right>
                  <q-btn size="sm" round dense color="primary" icon="create">
                    <q-popover anchor="bottom right" self="top right">
                      <q-list separator link>
                        <q-item v-close-overlay >
                          <q-item-side>
                            <q-icon name="create"/>
                          </q-item-side>
                          <q-item-main label="Detail" />
                        </q-item>
                        <q-item v-close-overlay >
                          <q-item-side>
                            <q-icon name="delete"/>
                          </q-item-side>
                          <q-item-main label="Delete" />
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
        <q-card class="relative-position q-md-md">
          <q-card-title>
            Ahli Waris
            <q-btn round dense size="sm" color="primary" icon="add" class="q-ml-xs"/>
          </q-card-title>
          <q-card-main>
            <q-list no-border separator>
              <q-item>
                <q-item-side>
                  <q-icon name="assignment"/>
                </q-item-side>
                <q-item-main label="Eka" />
                <q-item-side right>
                  <span class="q-mr-xl">Adik</span>
                  <q-btn size="sm" round dense color="primary" icon="create">
                    <q-popover anchor="bottom right" self="top right">
                      <q-list separator link>
                        <q-item v-close-overlay >
                          <q-item-side>
                            <q-icon name="create"/>
                          </q-item-side>
                          <q-item-main label="Detail" />
                        </q-item>
                        <q-item v-close-overlay >
                          <q-item-side>
                            <q-icon name="delete"/>
                          </q-item-side>
                          <q-item-main label="Delete" />
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>

</template>

<style>
.btn-confirm {
  text-align: center;
  margin-top: 32px;
}
.btn-confirm > button {
  margin: 0 12px;
}
.product-data{
    margin:auto;
    padding:15px;
    padding-left:30px;
  }
  .product-data > p {
    margin-bottom:8px;
  }
  .bold {
    font-weight:bold;
  }
</style>

<script>
import forminput from 'components/FormInput.vue'

export default {
  components: {
    forminput
  },
  data () {
    return {
      customerPackage: {},
      optionStatus: [],
      optionPackage: [],
      approveIdPackage: null,
      separator: 'horizontal',
      filter: '',
      loading: false
    }
  },
  created () {
    this.fetchData()
    this.$axios.get('/status', {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('authorization'))
      }
    }).then(res => {
      this.optionStatus = res.data.data
    })
  },
  methods: {
    submitcustomerPackage () {
      let fd = new FormData()
      fd.append('id_product_package', this.customerPackage.id_product_package)
      fd.append('expired_at', this.customerPackage.expired_at)
      fd.append('payment_due_at', this.customerPackage.payment_due_at)
      fd.append('mgi', this.customerPackage.mgi)
      fd.append('fyp', this.customerPackage.fyp)
      fd.append('rate', this.customerPackage.rate)
      fd.append('nominal', this.customerPackage.nominal)
      fd.append('tenor', this.customerPackage.tenor)
      if (this.customerPackage) {
        fd.append('form', this.customerPackage.form)
      }
      this.$axios.put('/admin/update/customerpackage/' + this.$route.params.id, fd, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization')),
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.$q.notify({
          message: res.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'positive'
        })
      }).catch(res => {
        this.$q.notify({
          message: res.response.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'negative'
        })
      })
    },
    setStatus (id, status) {
      this.loading = true
      if (status === 'approve') {
        console.log(this.approveIdPackage)
        if (!this.approveIdPackage) {
          this.$q.notify({
            message: 'Pilih Package Terlebih Dahulu',
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          this.loading = false
          return
        }
        id += '?id_product_package=' + this.approveIdPackage
      }
      this.$axios.get('/admin/customer/package/' + status + '/' + id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        this.$q.notify({
          message: res.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'positive'
        })
        this.loading = false
      }).catch(error => {
        this.$q.notify({
          message: error.response.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'negative'
        })
        this.loading = false
      })
    },
    onformSelected (e) {
      this.customerPackage.form = e.target.files[0]
    },
    openModal (props, modal) {
      if (modal === 'modalApprove') {
        console.log(props)
        this.$axios.get('/admin/package', {
          headers: {
            'Authorization': JSON.parse(localStorage.getItem('authorization'))
          }
        }).then(res => {
          this.optionPackage = res.data.data
        })
      }
      this[modal] = true
      if (props.row.expired_at) {
        props.row.expired_at = this.$pl.dateFormat(props.row.expired_at)
      }
      if (props.row.payment_due_at) {
        props.row.payment_due_at = this.$pl.dateFormat(props.row.payment_due_at)
      }

      this.customerPackage = props.row
    },
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/customer/package?id=' + this.$route.params.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        if (res.data.data[0].expired_at) {
          res.data.data[0].expired_at = this.$pl.dateFormat(res.data.data[0].expired_at)
        }
        if (res.data.data[0].payment_due_at) {
          res.data.data[0].payment_due_at = this.$pl.dateFormat(res.data.data[0].payment_due_at)
        }
        this.customerPackage = res.data.data[0]
        this.loading = false
      })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    },
    openURL (url) {
      window.open(url)
    }
  }
}
</script>
