<template>
  <div>
    <h1>Error Job</h1>
    <ul>
      <li v-for="errorName in jobErrorNames" :key="errorName">
        エラー:{{ errorName }}
        <input type="checkbox" :value="errorName" @input="handleClickCheckbox" />
      </li>
    </ul>
    <button @click="run">処理開始</button>
    <button @click="reset">リセット</button>
    <ul>
      <li v-for="(error, i) in jobErrors" :key="i">{{ error.message }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { _ } from '@/common'
import { jobErrorNameDict, JobErrorName, JobError } from './JobError'

@Component
export default class JobErrorsPage extends Vue {
  jobErrorNames: JobErrorName[] = [
    jobErrorNameDict.CONFLICTED,
    jobErrorNameDict.FORBIDDEN,
    jobErrorNameDict.NOT_ENOUGH_PARAMETER,
    jobErrorNameDict.NOT_FOUND,
    jobErrorNameDict.TIMEOUT
  ]
  enabledJobErrorNames: JobErrorName[] = []
  jobErrors: JobError[] = []

  handleClickCheckbox({ target }: { target: HTMLInputElement }) {
    const errorName = target.value as JobErrorName
    this.enabledJobErrorNames = target.checked
      ? _.uniq([...this.enabledJobErrorNames, errorName])
      : _.without(this.enabledJobErrorNames, errorName)
  }

  run() {
    this.jobErrors = this.jobErrorNames.reduce(
      (acc: JobError[], cur: JobErrorName) =>
        this.enabledJobErrorNames.includes(cur)
          ? [...acc, new JobError(cur)]
          : acc,
      []
    )
  }

  reset() {
    this.jobErrors = []
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
