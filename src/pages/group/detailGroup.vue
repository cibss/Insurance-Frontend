<template>
  <div inline class="row">
    <q-card class="col-lg-6">
      <q-card-title>
        Detail Group
      </q-card-title>
      <q-card-main>
        <div class="form-group">
          <span>Name</span>
          <div>
            <input placeholder="Nama Grup"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span>Team Leader</span>
          <div>
            <input placeholder="Cari Nama Agen"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div class="form-group">
          <span class="list-header">List Member</span>
          <q-btn
            :icon="iconMember"
            round
            color="primary"
            size="xs"
            @click="addmember"/>
          <div v-if="searchMember" class="search-input">
            <input placeholder="Cari Nama Agen"/>
            <q-field class="field-input" :error="false" error-label="error this" />
          </div>
        </div>
        <div style="margin-top: 8px; text-align: center">
          <q-btn style="margin-right: 8px" color="primary" label="update" :loading="loading" />
          <q-btn color="secondary" label="batal" :loading="loading" @click="$router.back()" />
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchMember: false,
      iconMember: 'add'
    }
  },
  methods: {
    addmember () {
      this.searchMember = !this.searchMember
      if (this.searchMember) {
        this.iconMember = 'remove'
      } else {
        this.iconMember = 'add'
      }
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
</style>
