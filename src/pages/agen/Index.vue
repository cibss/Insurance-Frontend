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
           @input="fetchData"
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
      :pagination.sync="page"
      row-key="name"
      no-data-label="Tidak terdapat data"
      no-results-label="Agen tidak ditemukan"
      loading-label="Memuat"
      class="bg-white"
      hide-bottom
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
          <q-icon color="negative" v-if="props.row.status == -6" name="remove_circle" size="16px"/>
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
        <div class="q-title q-mb-md">Delete {{selectedData.first_name}} {{selectedData.last_name}}?</div>
        <p>This content will be deleted if you click "yes"</p>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="YES" />
          <q-btn color="negative" v-close-overlay label="No" />
        </div>
      </div>
    </q-modal>
    <q-modal v-model="modalApprove" minimized>
      <div style="padding: 50px">
        <p>Input username & password to appove {{selectedData.first_name}} {{selectedData.last_name}}</p>
        <div class="form-group">
          <span>Username</span>
          <div>
            <input type="text" placeholder="Username" v-model="selectedData.username"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Password</span>
          <div>
            <input placeholder="Password" v-model="selectedData.password"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="btn-confirm">
          <q-btn color="positive" v-close-overlay label="Approve" :loading="loading" @click="approveAgen"/>
          <q-btn color="negative" v-close-overlay label="Reject" @click="rejectAgen" />
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
  margin: 4px 12px;
}
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      selectedData: {},
      modalDelete: false,
      modalApprove: false,
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
          value: '-6'
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
      this.selectedData.password = ''
    },
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/agen?status=' + this.select + '&page=' + this.pagination.page + '&per_page=' + this.page.rowsPerPage, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        console.log(res.data.data)
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
        this.loading = false
        console.log(error.response)
      })
    },
    rejectAgen () {
      this.$axios.get('/admin/agen/reject/' + this.selectedData.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.tableData = res.data.data
          this.$q.notify({
            message: res.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'positive'
          })
        } else {
          this.$q.notify({
            message: res.data.message,
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'warning'
          })
        }
      })
    },
    approveAgen () {
      this.loading = true
      let bodyForm = new FormData()
      bodyForm.append('id_user', this.selectedData.id)
      bodyForm.append('username', this.selectedData.username)
      bodyForm.append('password', this.selectedData.password)

      this.$axios.post('/admin/agen/approve', bodyForm, {
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
