<template>
  <div inline class="w-full">
    <q-card-title>
      Daftar Customer Package
      <div slot="right">
        <!-- <q-btn color="primary" label="Tambah Produk Baru" @click="$router.push('/product/new')"/> -->
      </div>
    </q-card-title>
    <q-card-main>
      <q-table
      :data="tableData"
      :columns="columns"
      :loading="loading"
      :pagination.sync="page"
      row-key="name"
      rows-per-page-label="Data per halaman"
      no-data-label="Tidak terdapat data"
      no-results-label="Produk tidak ditemukan"
      loading-label="Memuat"
      class="bg-white"
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="brand" :props="props">
          <img style="max-width: 80px" src="#">
        </q-td>
        <q-td key="name" :props="props">
          <span>#{{ props.row.id }} {{ props.row.name }}</span>
        </q-td>
        <q-td key="title" :props="props">
          <span>{{ props.row.title }}</span>
        </q-td>
        <q-td key="status" :props="props">
          <q-icon color="negative" v-if="props.row.status == -6" name="remove_circle" size="16px"/>
          <q-icon color="positive" v-if="props.row.status == 1" name="check_circle" size="16px"/>
          <q-icon color="warning" v-if="props.row.status == 0" name="pause_circle_filled" size="16px"/>
        </q-td>
        <q-td key="action" :props="props">
          <q-btn size="sm" round dense color="primary" icon="create">
            <q-popover anchor="bottom right" self="top right">
              <q-list separator link>
                <q-item v-close-overlay @click.native="openModal(props, 'modalDetail')">
                  <q-item-side>
                    <q-icon name="create"/>
                  </q-item-side>
                  <q-item-main label="Detail" />
                </q-item>
                <q-item v-close-overlay @click.native="openModal(props, 'modalApprove')">
                  <q-item-side>
                    <q-icon name="check_circle"/>
                  </q-item-side>
                  <q-item-main label="Approve" />
                </q-item>
                <q-item v-close-overlay @click.native="openModal(props, 'modalReject')" >
                  <q-item-side>
                    <q-icon name="cancel"/>
                  </q-item-side>
                  <q-item-main label="Reject" />
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </q-td>
      </q-tr>
    </q-table>
    <!-- PAGINATION -->
    <q-card-title>
      <q-inner-loading :visible="loading">
        <q-spinner color="secondary" :size="60" />
      </q-inner-loading>
      <div v-if="tableData.length == 0" style="text-align:center" class="text-faded">
        Tidak ada data
      </div>
      <div v-if="tableData.length > 0" slot="right">
        <div class="row">
          <div style="margin: 5px 16px;">
            Data per halaman
          </div>
          <q-select
            v-model="page.rowsPerPage"
           :options="rowsPerPage"
           style="margin-right: 16px;height: 28px;font-size: 14px;"
           @input="fetchData"/>
          <q-btn
            color="grey"
            :disable="pagination.page == 1"
            round
            icon="keyboard_arrow_left"
            style="margin-right: 16px; font-size: 10px"
            @click="prev_page"/>
          <q-btn
            color="grey"
            :disable="pagination.is_last"
            round
            icon="keyboard_arrow_right"
            style="font-size:10px"
            @click="next_page"/>
        </div>
      </div>
    </q-card-title>
    <!-- PAGINATION END -->
    </q-card-main>
    <q-modal v-model="modalDetail" :content-css="{minWidth: '40vw', minHeight: 'auto'}">
      <div style="padding: 36px; position:relative">
        <q-btn
          flat
          icon="close"
          size="lg"
          v-close-overlay
          style="position:absolute; right:-8px; top:0;"/>
        <div class="q-headline">#{{ selectedData.id }} {{ selectedData.name }}</div>
        <div class="product-data">
          <p>Expired ContractedDate</p>
          <p class="bold">{{ this.$pl.dateFormat(selectedData.expired_at) }}</p>
        </div>
        <div class="product-data">
          <p>No SPAJ</p>
          <p class="bold">{{ selectedData.spaj }}</p>
        </div>
        <div class="product-data">
          <p>No. Polis</p>
          <p class="bold">{{ selectedData.polis }}</p>
        </div>
        <div class="product-data">
          <p>Tanggal Masuk</p>
          <p class="bold">{{ this.$pl.dateFormat(selectedData.approved_at) }}</p>
        </div>
        <div class="product-data">
          <p>Tanggal Submit</p>
          <p class="bold">{{ this.$pl.dateFormat(selectedData.created_at) }}</p>
        </div>
        <div class="product-data">
          <p>PaymentDueDate</p>
          <p class="bold">{{ this.$pl.dateFormat(selectedData.payment_due_at) }}</p>
        </div>
        <div class="product-data">
          <p>Tanggal Pencairan Dana</p>
          <p class="bold">05/08/2018</p>
        </div>
        <div class="product-data">
          <p>Jumlah Dana Dicairkan</p>
          <p class="bold">200.000.000</p>
        </div>
        <div class="product-data">
          <p>Nominal</p>
          <p class="bold">{{ selectedData.nominal }}</p>
        </div>
        <div class="product-data">
          <p>MGI</p>
          <p class="bold">{{ selectedData.mgi }} month</p>
        </div>
        <div class="product-data">
          <p>FYP</p>
          <p class="bold">{{ selectedData.fyp }}</p>
        </div>
        <div class="product-data">
          <p>Rate</p>
          <p class="bold">{{ selectedData.rate }}%</p>
        </div>
        <div class="product-data">
          <p>Form</p>
          <a :href=" selectedData.form != null ? selectedData.form.url : '' " target="_blank">
            <p class="bold">{{ selectedData.form != null ? selectedData.form.filename : '' }}</p>
          </a>
        </div>
        <div class="product-data">
          <p>Status</p>
          <p class="bold">{{ selectedData.status }}</p>
        </div>
        <div class="btn-confirm">
          <q-btn color="secondary" v-close-overlay label="Close" />
        </div>
      </div>
    </q-modal>
    <q-modal v-model="modalApprove" minimized>
      <div style="padding: 50px">
        <div class="q-title q-mb-md">Approve {{selectedData.name}}?</div>
        <select v-model="approveIdPackage">
          <option v-for="v of optionPackage" v-bind:key="v.id" :value="v.id">{{ v.title }}</option>
        </select>
        <p>Approve By Choose Package than "yes"</p>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="YES" :loading="loading" @click="setStatus(selectedData.id, 'approve')" />
          <q-btn color="negative" v-close-overlay label="No" />
        </div>
      </div>
    </q-modal>
    <q-modal v-model="modalReject" minimized>
      <div style="padding: 50px">
        <div class="q-title q-mb-md">Reject {{selectedData.name}}?</div>
        <p>Reject Customer Package by Click "yes"</p>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="YES" :loading="loading" @click="setStatus(selectedData.id, 'reject' )" />
          <q-btn color="negative" v-close-overlay label="No" />
        </div>
      </div>
    </q-modal>
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
  .product-data:nth-child(even){
    background:#efefef;
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
      optionPackage: [],
      approveIdPackage: null,
      selectedData: {},
      modalApprove: false,
      modalReject: false,
      modalDetail: false,
      pagination: {
        page: 1,
        is_last: false
      },
      page: {
        rowsPerPage: 5
      },
      tableData: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Customer',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'title',
          required: true,
          label: 'Package',
          align: 'left',
          field: 'title',
          sortable: true
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'status',
          sortable: true
        },
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          sortable: false
        }
      ],
      rowsPerPage: [
        {
          label: '5',
          value: 5
        },
        {
          label: '10',
          value: 10
        },
        {
          label: '25',
          value: 25
        }
      ],
      tableFilter: {
        type: '',
        start: '',
        end: ''
      },
      separator: 'horizontal',
      filter: '',
      loading: false
    }
  },
  created () {
    var start = (new Date())
    start.setDate((new Date()).getDate() - 60)
    this.$data.tableFilter.start = start
    this.$data.tableFilter.end = new Date()
    this.fetchData()
  },
  methods: {
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
        this.fetchData()
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
      this.selectedData = props.row
    },
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/customer/package?page=' + this.pagination.page + '&per_page=' + this.page.rowsPerPage, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        if (res.data.success) {
          this.tableData = res.data.data
          if (res.data.pagination.is_last === 1) {
            this.pagination.is_last = true
          } else {
            this.pagination.is_last = false
          }
        } else {
          this.$q.notify({
            message: res.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'warning'
          })
        }
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
    deleteProduct () {
      this.loading = true
      this.$axios.post('/admin/product/' + this.selectedData.id + '/delete', null, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      })
        .then(response => {
          this.$q.notify({
            message: response.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'positive'
          })
          this.fetchData()
        })
        .catch(error => {
          console.log(error.response)
          this.$q.notify({
            message: error.response.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          this.loading = false
        })
    },
    openURL (url) {
      window.open(url)
    },
    prev_page () {
      this.pagination.page--
      this.fetchData()
    },
    next_page () {
      this.pagination.page++
      this.fetchData()
    }
  }
}
</script>
