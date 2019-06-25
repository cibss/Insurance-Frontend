<template>
  <div class="form-group">
    <span v-if="label != ''">{{label}}</span>
    <div>
      <input
        v-if="type != 'textarea'"
        :type="type"
        v-model="input"
        :class="error != ''? 'has-error' : ''"
        :placeholder="placeholder"
      />
      <textarea
        v-if="type == 'textarea'"
        v-model="input"
        :class="error != ''? 'has-error' : ''"
      >
      </textarea>
      <q-field
        class="field-input"
        v-if="error != ''"
        :error="true"
        :error-label="error"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'error', 'placeholder', 'type'],
  watch: {
    input (val) {
      this.$emit('input', val)
    },
    placeholder (val) {
      this.$emit('input', val)
    }
  },
  mounted () {
    if (this.value != null && this.value !== '') {
      this.$data.input = this.value
    }
  },
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style>
.has-error {
  border: solid 0.8px #FF6347
}
</style>
