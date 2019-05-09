<template>
  <div inline class="w-full">
    <q-card-title>
      Daftar Produk
      <div slot="right">
        <q-btn color="primary" label="Tambah Produk Baru" @click="$router.push('/product/new')"/>
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
        <!-- <q-td key="id" :props="props">
          <span>{{ props.row.id }}</span>
        </q-td> -->
        <q-td key="brand" :props="props">
          <img style="max-width: 80px" :src="props.row.logo.url">
        </q-td>
        <q-td key="name" :props="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="file" :props="props">
          <q-btn v-if="props.row.pdf.url !== ''" size="sm" round dense color="positive" icon="attachment" @click="openURL(props.row.pdf.url)" />
        </q-td>
        <q-td key="action" :props="props">
          <!-- <q-btn size="sm" round dense color="secondary" icon="edit" @click="$router.push('/main/sales/detail/'+props.row.id)"/> -->
          <q-btn size="sm" round dense color="primary" icon="create">
            <q-popover anchor="bottom right" self="top right">
              <q-list separator link>
                  <q-item @click.native="$router.push('/product/detail/'+props.row.id)">
                    <q-item-side>
                      <q-icon name="create"/>
                    </q-item-side>
                    <q-item-main label="Edit" />
                  </q-item>
                  <q-item @click.native="$router.push('/product/'+props.row.id+'/package')">
                    <q-item-side>
                      <q-icon name="create"/>
                    </q-item-side>
                    <q-item-main label="Add Package" />
                  </q-item>
                  <q-item v-close-overlay @click.native="openModal(props)">
                    <q-item-side>
                    <q-icon name="delete"/>
                  </q-item-side>
                  <q-item-main label="Delete" />
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
    <q-modal v-model="opened" minimized>
      <div style="padding: 50px">
        <div class="q-title q-mb-md">Delete {{selectedData.name}}?</div>
        <p>This content will be deleted if you click "yes"</p>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="YES" :loading="loading" @click="deleteProduct" />
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
</style>

<script>
export default {
  data () {
    return {
      selectedData: {},
      opened: false,
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
          name: 'brand',
          required: true,
          label: 'Brand',
          align: 'left',
          field: 'logo',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'file',
          required: true,
          label: 'Document',
          align: 'left',
          field: 'pdf',
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
    openModal (props) {
      this.opened = true
      this.selectedData = props.row
    },
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/product?page=' + this.pagination.page + '&per_page=' + this.page.rowsPerPage, {
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
