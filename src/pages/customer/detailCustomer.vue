<template>
  <div class="">
    <div class="q-mb-md" @click="$router.back()">
      <q-icon name="arrow_back"/>
      <span class="q-ml-sm">Kembali</span>
    </div>
    <div inline class="row">
      <div class="col-lg-5 col-xs-12 q-mr-md q-mb-md">
        <q-card class="relative-position">
          <q-card-title>
            Detail Customer
          </q-card-title>
          <q-card-main>
            <forminput
              v-if="!loading_customer"
              label="Name"
              placeholder="Nama"
              error=""
              v-model="customer.name"
            />
            <forminput
              v-if="!loading_customer"
              label="Address"
              type="textarea"
              error=""
              v-model="customer.address"
            />
            <form-birth-date
              v-model="customer.birth_date"
              v-if="!loading_customer"/>
            <forminput
              v-if="!loading_customer"
              label="Phone"
              type="number"
              v-model="customer.phone"
              error=""
            />
            <forminput
              v-if="!loading_customer"
              label="Email"
              type="email"
              v-model="customer.email"
              error=""
            />
            <forminput
              v-if="!loading_customer"
              label="NPWP"
              v-model="customer.npwp"
              error=""
            />
            <forminput
              v-if="!loading_customer"
              label="Rek Number"
              v-model="customer.rekening_number"
              error=""
            />
            <FormInit
              v-if="!loading_customer"
              label="Religion"
              :value="customer.id_religion"
              url="/religion"/>
            <FormInit
              v-if="!loading_customer"
              label="Nationality"
              :value="customer.id_nationality"
              url="/nationality"/>
            <FormInit
              v-if="!loading_customer"
              label="Sex"
              :value="customer.id_sex"
              url="/sex"/>
            <form-upload-img
              v-model="customer.ktp"
              label="KTP"
              v-if="!loading_customer"/>
            <form-upload-img
              v-model="customer.rekening"
              label="Rekening"
              v-if="!loading_customer"/>
            <div style="margin-top: 8px; text-align: center">
              <q-btn style="margin-right: 8px" color="primary" label="update" @click.native="updateCustomer" :loading="loading_customer" />
              <q-btn color="secondary" label="batal" @click="$router.back()" />
            </div>
            <q-inner-loading :visible="loading_customer">
              <q-spinner color="secondary" :size="60" />
            </q-inner-loading>
          </q-card-main>
        </q-card>
      </div>

      <div class="col-lg-5 col-xs-12">
        <q-card class="relative-position">
          <q-card-title>
            List Package
            <q-btn round dense size="sm" color="primary" icon="add" class="q-ml-xs"/>
            <div slot="right">
              <div class="row">
                <q-select
                  v-model="filter_package"
                 :options="filter_package_options"
                 class="q-mr-md"
                />
              </div>
            </div>
          </q-card-title>
          <q-card-main>
            <q-list no-border separator>
              <q-item v-for="v of listPackage" v-bind:key="v.id" style="align-items:normal">
                <q-item-side>
                  <q-icon name="assignment"/>
                </q-item-side>
                <q-item-main>
                  <q-item-tile label>{{v.product_name}}</q-item-tile>
                  <q-item-tile sublabel>Rp {{v.nominal}}</q-item-tile>
                </q-item-main>
                <q-item-side right>
                  <span class="q-mr-xl">{{v.status}}</span>
                  <q-btn size="sm" round dense color="primary" icon="create">
                    <q-popover anchor="bottom right" self="top right">
                      <q-list separator link>
                        <q-item v-close-overlay @click.native="$router.push('/packageCustomer/detail/'+v.id)">
                          <q-item-side>
                            <q-icon name="create"/>
                          </q-item-side>
                          <q-item-main label="Detail" />
                        </q-item>
                        <q-item v-close-overlay @click.native="openModal(v, 'modalApprove')">
                          <q-item-side>
                            <q-icon name="check_circle"/>
                          </q-item-side>
                          <q-item-main label="Approve" />
                        </q-item>
                        <q-item v-close-overlay @click.native="openModal(v, 'modalReject')" >
                          <q-item-side>
                            <q-icon name="cancel"/>
                          </q-item-side>
                          <q-item-main label="Reject" />
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </q-item-side>
              </q-item>
              <q-item v-if="listPackage.length == 0">
                <span style="color:grey">Belum ada data</span>
              </q-item>
            </q-list>
            <div v-if="listPackage.length > 0">
              <div class="row justify-center">
                <!-- <div style="margin: 5px 16px;">
                  Data per halaman
                </div>
                <q-select
                  v-model="page.rowsPerPage"
                 :options="rowsPerPage"
                 style="margin-right: 16px;height: 28px;font-size: 14px;"
                 @input="fetchData"/> -->
                <q-btn
                  color="grey"
                  :disable="packagePagination.current_page == 1"
                  round
                  icon="keyboard_arrow_left"
                  style="margin-right: 16px; font-size: 10px"
                  @click="prev_package"/>
                <q-btn
                  color="grey"
                  :disable="packagePagination.is_last == 1"
                  round
                  icon="keyboard_arrow_right"
                  style="font-size:10px"
                  @click="next_package"/>
              </div>
            </div>
          </q-card-main>
          <q-inner-loading :visible="loading_package">
            <q-spinner color="secondary" :size="60" />
          </q-inner-loading>
        </q-card>
      </div>

      <q-modal v-model="modalApprove" minimized>
        <div style="padding: 50px">
          <div class="q-title q-mb-md">Approve {{selectedData.first_name}}?</div>
        <select v-model="approveIdPackage">
          <option v-for="v of optionPackage" v-bind:key="v.id" :value="v.id">{{ v.title }}</option>
        </select>
          <p>Action will be performed to this data by click "Approve"</p>
          <div class="btn-confirm">
            <q-btn color="positive" v-close-overlay label="Approve" @click.native="setStatus(selectedCustomerPackage.id, 'approve')" />
            <q-btn color="secondary" v-close-overlay label="Cancel" />
          </div>
        </div>
      </q-modal>
      <q-modal v-model="modalReject" minimized>
        <div style="padding: 50px">
          <div class="q-title q-mb-md">Reject {{selectedData.first_name}}?</div>
          <textarea v-model="rejectDesc" placeholder="Reject Description"></textarea>
          <p>Action will be performed to this data by click "Reject"</p>
          <div class="btn-confirm">
            <q-btn color="negative" v-close-overlay label="Reject" @click.native="setStatus(selectedCustomerPackage.id, 'reject')" />
            <q-btn color="secondary" v-close-overlay label="Cancel" />
          </div>
        </div>
      </q-modal>
    </div>
  </div>
</template>

<script>
import forminput from 'components/FormInput.vue'
import FormInit from 'components/FormInit.vue'
import FormBirthDate from 'components/FormBirthDate.vue'
import FormUploadIMG from 'components/FormUploadPhoto.vue'

export default {
  components: {
    forminput,
    FormInit,
    'form-birth-date': FormBirthDate,
    'form-upload-img': FormUploadIMG
  },
  data () {
    return {
      customer: {
        address: '',
        birth_date: '',
        email: '',
        name: '',
        nik: '',
        npwp: '',
        phone: '',
        rekening_number: '',
        id_nationality: null,
        id_religion: null,
        id_sex: null,
        ktp: null,
        rekening: null
      },
      approveIdPackage: null,
      rejectDesc: '',
      selectedCustomerPackage: {},
      optionPackage: [],
      listPackage: [],
      packagePagination: {
        current_data: 0,
        current_page: 1,
        is_last: 1,
        limit: 5,
        offset: 0
      },
      sexOpstions: [],
      religionOpstions: [],
      nationalityOpstions: [],
      selectedData: {},
      modalApprove: false,
      modalReject: false,
      searchMember: false,
      loading_customer: false,
      loading_package: false,
      filter_package: 0,
      filter_package_options: [
        {
          label: 'All',
          value: 0
        },
        {
          label: 'Insurance',
          value: 1
        },
        {
          label: 'Investment',
          value: 2
        }
      ]
    }
  },
  created () {
    this.getDetailCustomer()
  },
  methods: {
    getDetailCustomer () {
      this.loading_customer = true
      this.$axios.get('/admin/customer?id=' + this.$route.params.id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        this.customer = res.data.data[0]
        this.loading_customer = false
        this.getListPackage()
      }).catch(error => {
        this.loading_customer = false
        console.log(error)
      })
    },
    getListPackage () {
      this.loading_package = true
      this.$axios.get('/admin/customer/package', {
        params: {
          id_customer: this.$route.params.id,
          page: this.packagePagination.current_page
        },
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        this.listPackage = res.data.data
        this.packagePagination = res.data.pagination
        this.loading_package = false
      }).catch(error => {
        this.loading_package = false
        console.log(error)
      })
    },
    setStatus (id, status) {
      if (status === 'approve') {
        if (!this.approveIdPackage) {
          this.$q.notify({
            message: 'Pilih Package Terlebih Dahulu',
            timeout: 2000,
            // Available values: 'positive', 'negative', 'warning', 'info'
            color: 'negative'
          })
          return
        }
        id += '?id_product_package=' + this.approveIdPackage
      } else {
        id += '?reject_desc=' + this.rejectDesc
      }
      this.$axios.get('/admin/customer/package/' + status + '/' + id, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization'))
        }
      }).then(res => {
        this.$q.notify({
          message: res.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'positive'
        })
        // this.loading = false
      }).catch(error => {
        this.$q.notify({
          message: error.response.data.message,
          timeout: 2000,
          // Available values: 'positive', 'negative', 'warning', 'info'
          color: 'negative'
        })
        // this.loading = false
      })
    },
    openModal (row, modal) {
      if (modal === 'modalApprove') {
        this.modalApprove = true
        this.$axios.get('/admin/package?id_product=' + row.id_product, {
          headers: {
            'Authorization': JSON.parse(localStorage.getItem('authorization'))
          }
        }).then(res => {
          this.optionPackage = res.data.data
        })
      } else {
        this.modalReject = true
      }
      this.selectedCustomerPackage = row
    },
    fileKtp (foto) {
      this.customer.ktp = foto.target.files[0]
    },
    fileRekening (foto) {
      this.customer.rekening = foto.target.files[0]
    },
    updateCustomer () {
      let fd = new FormData()
      for (let k in this.customer) {
        fd.append(k, this.customer[k])
      }
      this.$axios.put('/admin/customer/' + this.$route.params.id, fd, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('authorization')),
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      })
    },
    prev_package () {
      this.packagePagination.current_page--
      this.getListPackage()
    },
    next_package () {
      this.packagePagination.current_page++
      this.getListPackage()
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
