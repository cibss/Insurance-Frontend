<template>
  <div inline class="w-full">
    <q-card-title>
      Daftar Produck Package
      <div slot="right">
        <q-btn flat size="sm" label="kembali" color="primary" @click="$router.back()"/>
        <q-btn @click.native="addPackage" color="primary" label="Tambah Package Baru" />
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
        <q-td key="description" :description="props">
          <span>{{ props.row.description }}</span>
        </q-td>
        <q-td key="id" :price ="props">
          <span>{{ props.row.price   }}</span>
        </q-td>
        <q-td key="status" :status="props">
          <span>{{ props.row.status }}</span>
        </q-td>
        <q-td key="title" :title="props">
          <span>{{ props.row.title }}</span>
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
          description: '',
          id: '',
          id_product: '',
          status: '',
          title: ''
        }
      ],
      columns: [
        {
          name: 'Description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          price: '2000',
          required: true,
          label: 'Price',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          status: '',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          title: '10',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'id',
          sortable: true
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
    addPackage () {
      console.log('hai')
      this.$router.push('/product/' + this.$route.params.id_product + '/package/new')
    },
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/product/' + this.$route.params.id_product + '/package', {
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
