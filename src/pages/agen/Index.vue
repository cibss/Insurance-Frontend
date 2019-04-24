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
        <q-td key="name" :props="props">
          <span>{{ props.row.first_name }} {{ props.row.last_name }}</span>
        </q-td>
        <q-td key="address" :props="props">
          <span>{{ props.row.address }}</span>
        </q-td>
        <q-td key="status" :props="props">
          <q-icon color="negative" v-if="props.row.status == -2" name="remove_circle" size="16px"/>
          <q-icon color="positive" v-if="props.row.status == 1" name="check_circle" size="16px"/>
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
                    <q-icon name="remove_circle"/>
                  </q-item-side>
                  <q-item-main label="Reject" />
                </q-item>
                <q-item @click.native="openModal">
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
     <q-modal v-model="opened" style="position: center">
    <h6>Really Delete this Data?</h6>
    <div style="padding: 5px; display: inline-block;">
      <q-btn
      color="primary"
      @click="opened = false"
      label="Yes"
    />
    </div>
    <div style="padding: 5px; display: inline-block;">
      <q-btn
      color="primary"
      @click="opened = false"
      label="No"
    />
    </div>
  </q-modal>
  </div>
</template>

<style>
h6{
  font-size: 15px;
  text-align: center;
}
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      opened: false,
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
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
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
    openModal () {
      this.opened = true
    },
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
