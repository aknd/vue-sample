<template>
  <div>
    <h1>Error Job</h1>
    <ul>
      <li v-for="name in jobErrorNames" :key="name" class="job-error-check">
        エラー:{{ name }}
        <input type="checkbox" :value="name" v-model="enabledJobErrorNames" />
      </li>
    </ul>
    <button @click="run">処理開始</button>
    <button @click="reset">リセット</button>
    <ul>
      <job-error-display
        v-for="name in emittedJobErrorNames"
        :key="name"
        :jobErrorName="name"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JobErrorDisplay, {
  jobErrorNameDict,
  JobErrorName
} from './JobErrorDisplay.vue'

@Component({
  components: {
    JobErrorDisplay
  }
})
export default class JobErrorsPage extends Vue {
  jobErrorNames: JobErrorName[] = [
    jobErrorNameDict.CONFLICTED,
    jobErrorNameDict.FORBIDDEN,
    jobErrorNameDict.NOT_ENOUGH_PARAMETER,
    jobErrorNameDict.NOT_FOUND,
    jobErrorNameDict.TIMEOUT
  ]
  enabledJobErrorNames: JobErrorName[] = []
  emittedJobErrorNames: JobErrorName[] = []

  run() {
    this.emittedJobErrorNames = this.jobErrorNames.reduce(
      (acc: JobErrorName[], cur: JobErrorName) =>
        this.enabledJobErrorNames.includes(cur)
          ? [...acc, cur]
          : acc,
      []
    )
  }

  reset() {
    this.emittedJobErrorNames = []
  }
}
</script>

<style scoped>
.job-error-check {
  list-style: none;
}
</style>
