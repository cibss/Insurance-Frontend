<template>
  <div inline class="w-full">
    <q-card-title>
      Daftar Group
      <div slot="right">
        <q-btn color="primary" label="Tambah Group Baru" />
      </div>
    </q-card-title>
    <q-card-separator />
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
        <q-td key="id" :id="props">
          <span>{{ props.row.id }}</span>
        </q-td>
        <q-td key="id_admin" :id_admin="props">
          <span>{{ props.row.id_admin }}</span>
        </q-td>
        <q-td key="name" :name="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="status" :status="props">
          <span>{{ props.row.status }}</span>
        </q-td>
        <q-td key="action" :props="props">
          <!-- <q-btn size="sm" round dense color="secondary" icon="edit" @click="$router.push('/main/sales/detail/'+props.row.id)"/> -->
          <q-btn v-if="props.row.status === 0" size="sm" round dense color="positive" icon="payment" @click="$router.push('/main/sales/detail/'+props.row.id)">
          </q-btn>
          <q-btn v-if="props.row.status === 1 || props.row.status === 2" size="sm" round dense color="secondary" icon="receipt" @click="$router.push('/main/sales/detail/'+props.row.id)">
          </q-btn>
        </q-td>
      </q-tr>
    </q-table>
    </q-card-main>
  </div>

</template>

<style>
</style>

<script>
export default {
  data () {
    return {
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
          name: 'id',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'id',
          sortable: true
        },
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
          console.log(this.tableData)
        }
      })
    }
  }
}
</script>
