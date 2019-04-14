<template>
  <div class="row">
    <div class="col-lg-6 col-padding">
      <q-card inline style="width: 100%">
        <q-card-title>
          Cafe Basilico
          <q-rating slot="subtitle" v-model="stars" :max="5" />
          <div slot="right" class="row items-center">
            <q-icon name="place" /> 250 ft
          </div>
        </q-card-title>
        <q-card-main>
          <p>$・Italian, Cafe</p>
          <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          <q-btn flat round dense icon="event" />
          <q-btn flat label="5:30PM" />
          <q-btn flat label="7:30PM" />
          <q-btn flat label="9:00PM" />
          <q-btn flat color="primary" label="Reserve" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-lg-6 col-padding">
      <q-card inline style="width: 100%">
        <q-card-title>
          Form Input
        </q-card-title>
        <q-card-main>
          <q-field
            style="margin-bottom: 16px"
          >
            <q-input
              type="text"
              :before="[{icon: 'person', handler () {}}]"
              placeholder="material theme input"
            />
          </q-field>
          <div class="form-group">
            <q-p>.form-group</q-p>
            <div>
              <input placeholder="Input"/>
              <q-field class="field-input" :error="false" error-label="error this" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-6 col-padding">
              <q-p>.col-md-6 .col-padding</q-p>
              <div>
                <input placeholder="Input"/>
                <q-field class="field-input" />
              </div>
            </div>
            <div class="col-md-6 col-padding">
              <q-p>col-md-6</q-p>
              <div>
                <input placeholder="Input Error"/>
                <q-field class="field-input" :error="true" error-label="error messages" />
              </div>
            </div>
          </div>
          <div style="margin-top: 8px">
            <q-btn style="margin-right: 8px" color="primary" label="button primary" :loading="loading" />
            <q-btn color="secondary" label="button secondary" :loading="loading" />
            <q-btn style="margin-top: 8px" class="w-full" label="class w-full" :loading="loading" />
          </div>
        </q-card-main>
      </q-card>
    </div>
  </div>

</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
