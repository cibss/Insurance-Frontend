<template>
  <div inline class="w-full">
    <q-card-title>
      Daftar Group
      <div slot="right">
        <div class="row">
          <q-select
            v-model="select"
           :options="selectOptions"
           style="margin-right: 16px"
           @change="fetchData"
          />
          <q-btn color="primary" label="Tambah Group Baru" @click="$router.push('/group/new')"/>
        </div>
      </div>
    </q-card-title>
    <q-card-main>
      <q-table
      :data="tableData"
      :columns="columns"
      :loading="loading"
      :pagination.sync="pagination"
      :rows-per-page-options="rowsPerPage"
      :filter="filter"
      row-key="name"
      rows-per-page-label="Data per halaman"
      no-data-label="Tidak terdapat transaksi"
      no-results-label="Transaksi tidak ditemukan"
      loading-label="Memuat"
      class="bg-white"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <!-- <q-td key="id" :props="props">
          <span>{{ props.row.id }}</span>
        </q-td> -->
        <q-td key="id_admin" :id_admin="props">
          <span>{{ props.row.id_admin }}</span>
        </q-td>
        <q-td key="name" :name="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="status" :status="props">
          <q-icon color="negative" v-if="props.row.status == -2" name="remove_circle" size="16px"/>
          <q-icon color="positive" v-if="props.row.status == 1" name="check_circle" size="16px"/>
        </q-td>
        <q-td key="action" :props="props">
          <!-- <q-btn size="sm" round dense color="secondary" icon="edit" @click="$router.push('/main/sales/detail/'+props.row.id)"/> -->
          <q-btn size="sm" round dense color="primary" icon="create">
            <q-popover anchor="bottom right" self="top right">
              <q-list separator link>
                <q-item @click.native="$router.push('/group/detail/'+props.row.id)">
                  <q-item-side>
                    <q-icon name="create"/>
                  </q-item-side>
                  <q-item-main label="Detail" />
                </q-item>
                <q-item v-if="props.row.status > 0" v-close-overlay @click.native="openApprove(props)">
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
          <q-btn color="positive" v-close-overlay label="Approve"/>
          <q-btn color="negative" v-close-overlay label="Reject" />
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
      modalDelete: false,
      modalApprove: false,
      rowsPerPage: [10, 20, 50],
      pagination: {
        rowsPerPage: 10
      },
      tableData: [
        {
          id: '1',
          id_admin: '1',
          name: 'AHHA TEAM',
          status: '1'
        },
        {
          id: '2',
          id_admin: '2',
          name: 'Arisan Ibu2',
          status: '2'
        }
      ],
      columns: [
        {
          name: 'id_admin',
          required: true,
          label: 'Id_Admin',
          align: 'left',
          field: 'id_admin',
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
          value: '-2'
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
      this.$axios.get('/admin/group', {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.tableData = data.data
          this.loading = false
        }
      })
    },
    deleteGroup () {
      this.loading = true
      this.$axios.delete('/admin/group/' + this.selectedData.id, {
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
    }
  }
}
</script>
