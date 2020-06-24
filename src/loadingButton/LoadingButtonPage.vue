<template>
  <div>
    <div>LoadingButtonPage</div>
    <btn :disabled="isButtonDisabled" @action="handleAction">
      {{ buttonLabel }}
    </btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Button } from '@/common'

type Status = 'loading' | 'success' | 'failed'

@Component({
  components: {
    btn: Button
  }
})
export default class LoadingButtonPage extends Vue {
  status: Status = 'loading'

  get isButtonDisabled(): boolean {
    return this.status === 'loading'
  }

  get buttonLabel(): string {
    if (this.status === 'success') {
      return 'Click Me!!'
    }
    if (this.status === 'failed') {
      return 'Please Retry'
    }
    return 'Now Loading...'
  }

  handleAction() {
    if (this.status === 'success') {
      alert('Success!!')
    }
    if (this.status === 'failed') {
      location.reload()
    }
  }
}
</script>
