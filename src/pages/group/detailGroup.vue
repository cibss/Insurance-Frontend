<template>
  <div>
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <q-card class="col-lg-6 q-mb-md">
        <q-card-title>
          Detail Group
        </q-card-title>
        <q-card-main>
          <forminput
            label="Name"
            placeholder="Nama Grup"
            error=""
          />
          <forminput
            label="Team Leader"
            placeholder="Cari Nama Agen"
            error=""
          />
          <div class="form-group">
            <span class="list-header">List Member</span>
            <q-btn
              :icon="iconMember"
              round
              color="primary"
              size="xs"
              @click="addmember"/>
            <div v-if="searchMember" class="search-input">
              <forminput
                placeholder="Cari Nama Agen"
                error=""
              />
            </div>
          </div>
          <div style="margin-top: 8px; text-align: center">
            <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" />
            <q-btn color="secondary" label="batal" @click="$router.back()" />
          </div>
        </q-card-main>
      </q-card>
      <div class="col-xs-12">
        <q-table
          title="Group Member"
          :data="tableData"
          :columns="columns"
          row-key="name"
        >
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="first_name" :first_name="props">
              <span>{{ props.row.first_name }}</span>
            </q-td>
            <q-td key="status" :status="props">
              <q-icon color="negative" v-if="props.row.status == -6" name="remove_circle" size="16px"/>
              <q-icon color="positive" v-if="props.row.status == 1" name="check_circle" size="16px"/>
            </q-td>
            <q-td key="action" :status="props">
              <q-btn size="sm" round dense color="primary" icon="create">
                <q-popover anchor="bottom right" self="top right">
                  <q-list separator link>
                    <q-item v-if="props.row.status == 0" @click.native="openReject(props)">
                      <q-item-side>
                        <q-icon name="create"/>
                      </q-item-side>
                      <q-item-main label="Reject" />
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
      </div>
      <q-modal v-model="modalApprove" minimized>
        <div style="padding: 50px">
          <div class="q-title q-mb-md">Approve {{selectedData.first_name}}?</div>
          <p>Action will be performed to this data by click "Reject"</p>
          <div class="btn-confirm">
            <q-btn color="positive" v-close-overlay label="Approve" @click.native="setStatus('approve')" />
            <q-btn color="secondary" v-close-overlay label="Cancel" />
          </div>
        </div>
      </q-modal>
      <q-modal v-model="modalReject" minimized>
        <div style="padding: 50px">
          <div class="q-title q-mb-md">Reject {{selectedData.first_name}}?</div>
          <p>Action will be performed to this data by click "Reject"</p>
          <div class="btn-confirm">
            <q-btn color="negative" v-close-overlay label="Reject" @click.native="setStatus('reject')" />
            <q-btn color="secondary" v-close-overlay label="Cancel" />
          </div>
        </div>
      </q-modal>
    </div>
  </div>
</template>

<script>
import forminput from 'components/FormInput.vue'

export default {
  components: {
    'forminput': forminput
  },
  data () {
    return {
      loading: false,
      selectedData: {},
      modalApprove: false,
      modalReject: false,
      searchMember: false,
      iconMember: 'add',
      tableData: [{
        first_name: 'Frozen Yogurt',
        status: '1'
      }],
      columns: [
        {
          name: 'Name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'Status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'status',
          sortable: true
        },
        {
          name: 'Action',
          required: false,
          label: 'Action',
          align: 'left',
          field: 'Action',
          sortable: false
        }
      ]
    }
  },
  created () {
    this.fetchMember()
  },
  methods: {
    openApprove (props) {
      this.modalApprove = true
      this.selectedData = props.row
    },
    setStatus (status) {
      this.$axios.get(`/admin/group/usergroup/${status}/` + this.selectedData.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        this.tableData = res.data.data
        if (res.data.success) {
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
            color: 'negative'
          })
        }
        this.fetchMember()
      })
    },
    openReject (props) {
      this.modalReject = true
      this.selectedData = props.row
    },
    addmember () {
      this.searchMember = !this.searchMember
      if (this.searchMember) {
        this.iconMember = 'remove'
      } else {
        this.iconMember = 'add'
      }
    },
    fetchMember () {
      this.$axios.get('/admin/group/usergroup?id_group=' + this.$route.params.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    addleader () {
      this.searchLeader = !this.searchLeader
      if (this.searchLeader) {
        this.iconLeader = 'remove'
      } else {
        this.iconLeader = 'add'
      }
    }
  }
}
</script>

<style lang="css">
.list-header {
  padding-right: 8px;
}
.search-input {
  margin-top: 8px;
}
.btn-confirm {
  text-align: center;
  margin-top: 32px;
}
.btn-confirm > button {
  margin: 0 12px;
}
</style>
