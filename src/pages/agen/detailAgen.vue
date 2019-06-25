<template>
  <div>
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <q-card class="col-lg-5 col-xs-12 q-mr-md q-mb-md">
        <q-card-title>
          Detail Agen
        </q-card-title>
        <q-card-main>
          <forminput
            v-if="!loading"
            label="NIK"
            placeholder="NIK"
            type="number"
            error=""
            v-model="agent.nik"
          />
          <forminput
            v-if="!loading"
            label="Username"
            placeholder="Username"
            error=""
            v-model="agent.username"
          />
          <forminput
            v-if="!loading"
            label="First Name"
            placeholder="First Name"
            error=""
            v-model="agent.first_name"
          />
          <forminput
            v-if="!loading"
            label="Last Name"
            placeholder="Last Name"
            error=""
            v-model="agent.last_name"
          />
          <forminput
            v-if="!loading"
            label="Address"
            type="textarea"
            error=""
            v-model="agent.address"
          />
          <form-birth-date
            v-model="agent.birth_date"
            v-if="!loading"/>
          <forminput
            v-if="!loading"
            label="Email"
            placeholder="Email"
            type="email"
            error=""
            v-model="agent.email"
          />
          <forminput
            v-if="!loading"
            label="Phone"
            placeholder="Phone"
            type="number"
            error=""
            v-model="agent.phone"
          />

          <div style="margin-top: 8px; text-align: center">
            <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" />
            <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
          </div>
        </q-card-main>
      </q-card>
      <div class="col-lg-5 col-xs-12 q-mr-md q-mb-md">
        <q-card>
          <q-card-title>
            Team
            <q-btn round dense size="sm" color="primary" icon="add" class="q-ml-xs"/>
          </q-card-title>
          <q-card-main>
            <q-list no-border separator>
              <q-item>
                <q-item-main>
                  <q-item-tile label>{{ team.team_direct_leader.first_name }}</q-item-tile>
                  <q-item-tile sublabel>Direct Leader</q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-for="v of team.team_leaders " v-bind:key="v.id">
                <q-item-main>
                  <q-item-tile label>{{ v.first_name }}</q-item-tile>
                  <q-item-tile sublabel>Leader</q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-for="v of team.team_members " v-bind:key="v.id">
                <q-item-main>
                  <q-item-tile label>{{ v.first_name }}</q-item-tile>
                  <q-item-tile sublabel>Member</q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-if="team.length == 0">
                <span style="color:grey">Belum ada data</span>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <q-inner-loading :visible="loading">
        <q-spinner color="secondary" :size="60" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import FormBirthDate from 'components/FormBirthDate.vue'
import forminput from 'components/FormInput.vue'

export default {
  components: {
    forminput,
    'form-birth-date': FormBirthDate
  },
  data () {
    return {
      loading: false,
      agent: {},
      team: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$axios.get('/admin/agen?id=' + this.$route.params.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        if (res.data.success) {
          this.$data.agent = res.data.data[0]
          this.getTeam()
        } else {
          console.log(res)
          this.$route.back()
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
    getTeam () {
      this.$axios.get('/team?id_user=' + this.$route.params.id, {
      }).then(res => {
        let data = res.data.data
        console.log(data)
        this.team = data
      })
    }
  }
}
</script>

<style lang="css">
</style>
