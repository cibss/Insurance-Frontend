<template>
  <div style="padding: 36px; position:relative">
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div class="q-headline" style="margin-bottom:15px;">#{{ customerPackage.id }} {{ customerPackage.name }}</div>
    <q-card>
    <div class="product-data">
      <p>Expired ContractedDate</p>
      <input v-model="customerPackage.expired_at" type="date" />
    </div>
    <div class="product-data">
      <p>No SPAJ</p>
      <input v-model="customerPackage.spaj" />
    </div>
    <div class="product-data">
      <p>No. Polis</p>
      <input v-model="customerPackage.polis" />
    </div>
    <div class="product-data">
      <p>Tanggal Masuk</p>
      <p class="bold">{{ this.$pl.dateFormat(customerPackage.approved_at) }}</p>
    </div>
    <div class="product-data">
      <p>Tanggal Submit</p>
      <p class="bold">{{ this.$pl.dateFormat(customerPackage.created_at) }}</p>
    </div>
    <div class="product-data">
      <p>PaymentDueDate</p>
      <input v-model="customerPackage.payment_due_at" type="date" />
    </div>
    <!-- <div class="product-data">
      <p>Tanggal Pencairan Dana</p>
      <p class="bold">05/08/2018</p>
    </div>
    <div class="product-data">
      <p>Jumlah Dana Dicairkan</p>
      <p class="bold">200.000.000</p>
    </div> !-->
    <div class="product-data">
      <p>Nominal</p>
      <input v-model="customerPackage.nominal" type="number" />
    </div>
    <div class="product-data">
      <p>MGI</p>
      <input v-model="customerPackage.mgi" type="number"/>
    </div>
    <div class="product-data">
      <p>FYP</p>
      <input v-model="customerPackage.fyp" type="number" />
    </div>
    <div class="product-data">
      <p>Rate</p>
      <input v-model="customerPackage.rate" type="number" />
    </div>
    <div class="product-data">
      <p>Tenor</p>
      <input v-model="customerPackage.tenor" type="number" />
    </div>
    <div class="product-data">
      <p>Form</p>
      <a :href=" customerPackage.form != null ? customerPackage.form.url : '' " target="_blank">
        <p class="bold">{{ customerPackage.form != null ? customerPackage.form.filename : '' }}</p>
      </a>
      <input @change="onformSelected" type="file">
    </div>
    <div class="product-data">
      <p>Status</p>
      <select>
        <option :selected="customerPackage.status == v.id" v-for="v of optionStatus" v-bind:key="v.id">{{ v.status }}</option>
      </select>
    </div>
    <div class="btn-confirm" style="padding-bottom:20px;">
      <q-btn color="primary" v-close-overlay @click.native="submitcustomerPackage" label="submit" />
      <q-btn color="secondary" v-close-overlay label="Close" />
    </div>
    </q-card>
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
export default {
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
      })
    },
    openURL (url) {
      window.open(url)
    }
  }
}
</script>
