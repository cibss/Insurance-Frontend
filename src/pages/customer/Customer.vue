<template>
  <div inline class="w-full">
    <q-card-title >
      Daftar Nasabah
      <div slot="right">
        <div class="row">
          <q-search
            v-model="search"
            :debounce="600"
            icon="search"
            class="q-mr-md"
            v-on:input="searchClick"
          />
          <q-select
            v-model="select"
           :options="selectOptions"
           class="q-mr-md"
           @input="fetchData"
          />
          <q-btn color="primary" label="Tambah Nasabah Baru" @click="$router.push('/customer/new')" />
        </div>
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
      no-data-label="Tidak terdapat transaksi"
      no-results-label="Transaksi tidak ditemukan"
      loading-label="Memuat"
      class="bg-white"
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <!-- <q-td key="id" :props="props">
          <span>{{ props.row.id }}</span>
        </q-td> -->
        <q-td key="name" :name="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="nik" :nik="props">
          <span>{{ props.row.nik }}</span>
        </q-td>
        <q-td key="status" :status="props">
          <q-icon color="negative" v-if="props.row.status == -6" name="remove_circle" size="16px"/>
          <q-icon color="positive" v-if="props.row.status == 1" name="check_circle" size="16px"/>
        </q-td>
        <q-td key="action" :props="props">
          <!-- <q-btn size="sm" round dense color="secondary" icon="edit" @click="$router.push('/main/sales/detail/'+props.row.id)"/> -->
          <q-btn size="sm" round dense color="primary" icon="create">
            <q-popover anchor="bottom right" self="top right">
              <q-list separator link>
                <q-item @click.native="$router.push('/customer/detail/'+props.row.id)">
                  <q-item-side>
                    <q-icon name="create"/>
                  </q-item-side>
                  <q-item-main label="Detail" />
                </q-item>
                <q-item v-if="props.row.status == 0" v-close-overlay @click.native="openApprove(props)">
                  <q-item-side>
                    <q-icon name="check_circle"/>
                  </q-item-side>
                  <q-item-main label="Approve" />
                </q-item>
                <q-item v-close-overlay @click.native="openDelete(props)">
                  <q-item-side>
                    <q-icon name="delete"/>
                  </q-item-side>
                  <q-item-main label="Delete"/>
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
    <q-modal v-model="modalDelete" minimized>
      <div style="padding: 50px">
        <div class="q-title q-mb-md">Delete {{selectedData.name}}?</div>
        <p>This content will be deleted if you click "yes"</p>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="YES" :loading="loading" @click="deleteGroup" />
          <q-btn color="negative" v-close-overlay label="No" />
        </div>
      </div>
    </q-modal>
    <q-modal v-model="modalApprove" minimized>
      <div style="padding: 50px">
        <div class="q-title q-mb-md">Approvee {{selectedData.name}}?</div>
        <p>Action will be performed to this data by click "Approve" or "Reject"</p>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="Approve" @click.native="approveGroup" />
          <q-btn color="negative" v-close-overlay label="Reject" @click.native="rejectGroup" />
          <q-btn color="secondary" v-close-overlay label="Cancel" />
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
      search: '',
      modalDelete: false,
      modalApprove: false,
      pagination: {
        page: 1,
        is_last: false
      },
      page: {
        rowsPerPage: 5
      },
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
      tableData: [ ],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'nik',
          required: true,
          label: 'NIK',
          align: 'left',
          field: 'nik',
          sortable: true
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'status',
          sortable: false
        },
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'status',
          sortable: false
        }
      ],
      tableFilter: {
        type: '',
        start: '',
        end: ''
      },
      separator: 'horizontal',
      filter: '',
      loading: false,
      select: '',
      selectOptions: [
        {
          label: 'All',
          value: ''
        },
        {
          label: 'Approved',
          value: '1'
        },
        {
          label: 'Pending',
          value: '0'
        },
        {
          label: 'Rejected',
          value: '-6'
        }
      ]
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
    searchClick () {
      this.fetchData()
    },
    openDelete (props) {
      this.modalDelete = true
      this.selectedData = props.row
    },
    openApprove (props) {
      this.modalApprove = true
      this.selectedData = props.row
    },
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/customer?page=' + this.pagination.page + '&per_page=' + this.page.rowsPerPage, {
        params: {
          search: this.search,
          search_column: 'all'
        },
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.tableData = data.data
          this.loading = false
          if (data.pagination.is_last === 1) {
            this.pagination.is_last = true
          } else {
            this.pagination.is_last = false
          }
        }
      })
    },
    deleteGroup () {
      this.loading = true
      this.$axios.delete('/admin/customer/' + this.selectedData.id, {
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
          this.$q.notify({
            message: error.response.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          this.loading = false
        })
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
