<template>
  <li>{{ errorMessage }}</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export const jobErrorNameDict = {
  FORBIDDEN: 'forbidden',
  CONFLICTED: 'conflict',
  NOT_ENOUGH_PARAMETER: 'not-enough',
  NOT_FOUND: 'not-found',
  TIMEOUT: 'timeout'
} as const
export type JobErrorKey = keyof typeof jobErrorNameDict
export type JobErrorName = typeof jobErrorNameDict[JobErrorKey]

@Component
export default class JobErrorDisplay extends Vue {
  @Prop() jobErrorName!: JobErrorName

  get errorMessage(): string {
    let message: string
    switch (this.jobErrorName) {
      case jobErrorNameDict.FORBIDDEN:
        message = '処理は許可されていません'
        break
      case jobErrorNameDict.CONFLICTED:
        message = '処理がコンフリクトしました'
        break
      case jobErrorNameDict.NOT_ENOUGH_PARAMETER:
        message = '処理に必要な情報が不足しています'
        break
      case jobErrorNameDict.NOT_FOUND:
        message = '指定された処理が見つかりませんでした'
        break
      case jobErrorNameDict.TIMEOUT:
        message = '処理がタイムアウトしました'
        break
      default:
        message = '処理に問題が発生しました'
    }

    return message
  }
}
</script>
