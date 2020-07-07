<template>
  <div>
    <h1>Loading Button</h1>
    <radio v-model="status" :options="radioOptions" />
    <btn :disabled="isButtonDisabled" @click="handleClickButton">
      {{ buttonLabel }}
    </btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Radio, RadioOption, Button } from '@/components'

const statuses = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed'
} as const
type StatusKey = keyof typeof statuses
type Status = typeof statuses[StatusKey]

@Component({
  components: {
    Radio,
    btn: Button
  }
})
export default class LoadingButtonPage extends Vue {
  status: Status = statuses.LOADING
  radioOptions: RadioOption[] = [
    statuses.LOADING,
    statuses.SUCCESS,
    statuses.FAILED
  ].map((s: Status) => ({ label: s, value: s }))

  get isButtonDisabled(): boolean {
    return this.status === statuses.LOADING
  }

  get buttonLabel(): string {
    if (this.status === statuses.SUCCESS) {
      return 'Click Me!!'
    }
    if (this.status === statuses.FAILED) {
      return 'Please Retry'
    }
    return 'Now Loading...'
  }

  handleClickButton(_event: Event) {
    if (this.status === statuses.SUCCESS) {
      alert('Success!!')
    }
    if (this.status === statuses.FAILED) {
      location.reload()
    }
  }
}
</script>
