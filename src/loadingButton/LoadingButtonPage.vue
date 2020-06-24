<template>
  <div>
    <h1>Loading Button</h1>
    <radio v-model="status" :options="radioOptions" />
    <btn :disabled="isButtonDisabled" @action="handleAction">
      {{ buttonLabel }}
    </btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Radio, RadioOption, Button } from '@/common'

const statuses = ['loading', 'success', 'failed'] as const
type Status =  typeof statuses[number]

@Component({
  components: {
    Radio,
    btn: Button
  }
})
export default class LoadingButtonPage extends Vue {
  status: Status = statuses[0]
  radioOptions: RadioOption[] = statuses.map(s => ({ label: s, value: s }))

  get isButtonDisabled(): boolean {
    return this.status === statuses[0]
  }

  get buttonLabel(): string {
    if (this.status === statuses[1]) {
      return 'Click Me!!'
    }
    if (this.status === statuses[2]) {
      return 'Please Retry'
    }
    return 'Now Loading...'
  }

  handleAction() {
    if (this.status === statuses[1]) {
      alert('Success!!')
    }
    if (this.status === statuses[2]) {
      location.reload()
    }
  }
}
</script>
