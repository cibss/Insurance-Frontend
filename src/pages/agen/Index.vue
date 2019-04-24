<template>
  <div inline class="w-full">
    <q-card-title>
      Daftar Agen
      <div slot="right">
        <div class="row">
          <q-select
            v-model="select"
           :options="selectOptions"
           style="margin-right: 16px"
           @change="fetchData"
          />
          <q-btn color="primary" label="Tambah Agen Baru" @click="$router.push('/agen/new')"/>
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
      no-data-label="Tidak terdapat data"
      no-results-label="Agen tidak ditemukan"
      loading-label="Memuat"
      class="bg-white"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <!-- <q-td key="id" :props="props">
          <span>{{ props.row.id }}</span>
        </q-td> -->
        <q-td key="username" :props="props">
          <span>{{ props.row.username }}</span>
        </q-td>
        <q-td key="first_name" :props="props">
          <span>{{ props.row.first_name }}</span>
        </q-td>
        <q-td key="last_name" :props="props">
          <span>{{ props.row.last_name }}</span>
        </q-td>
        <q-td key="address" :props="props">
          <span>{{ props.row.address }}</span>
        </q-td>
        <q-td key="action" :props="props">
          <!-- <q-btn size="sm" round dense color="secondary" icon="edit" @click="$router.push('/main/sales/detail/'+props.row.id)"/> -->
          <q-btn size="sm" round dense color="primary" icon="create" >
            <q-popover anchor="bottom right" self="top right">
              <q-list separator link>
                <q-item @click.native="$router.push('/agen/detail/'+props.row.id)">
                  <q-item-side>
                    <q-icon name="create"/>
                  </q-item-side>
                  <q-item-main label="Detail" />
                </q-item>
                <q-item >
                  <q-item-side>
                    <q-icon name="check_circle"/>
                  </q-item-side>
                  <q-item-main label="Approve" />
                </q-item>
                <q-item>
                  <q-item-side>
                    <q-icon name="highlight_off"/>
                  </q-item-side>
                  <q-item-main label="Reject" />
                </q-item>
                <q-item >
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
      tableData: [],
      columns: [
        {
          name: 'username',
          required: true,
          label: 'Username',
          align: 'left',
          field: 'username',
          sortable: true
        },
        {
          name: 'first_name',
          required: true,
          label: 'First Name',
          align: 'left',
          field: 'first_name',
          sortable: true
        },
        {
          name: 'last_name',
          required: true,
          label: 'Last Name',
          align: 'left',
          field: 'last_name',
          sortable: true
        },
        {
          name: 'address',
          required: true,
          label: 'Alamat',
          align: 'left',
          field: 'address',
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
    fetchData () {
      console.log(this.select)
      this.loading = true
      this.$axios.get('/admin/agen?status=' + this.select, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        if (res.data.success) {
          this.tableData = res.data.data
        } else {
          this.$q.notify({
            message: res.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'warning'
          })
        }
      }).catch(error => {
        console.log(error.response)
      })
      this.loading = false
    }
  }
}
</script>
