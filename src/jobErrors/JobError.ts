import { _ } from '@/common'

export const jobErrorNameDict = {
  FORBIDDEN: 'forbidden',
  CONFLICTED: 'conflict',
  NOT_ENOUGH_PARAMETER: 'not-enough',
  NOT_FOUND: 'not-found',
  TIMEOUT: 'timeout'
} as const
export type JobErrorKey = keyof typeof jobErrorNameDict
export type JobErrorName = typeof jobErrorNameDict[JobErrorKey]

export class JobError {
  constructor(private readonly errorName: JobErrorName) {}

  get message(): string {
    let errorMessage: string
    switch (this.errorName) {
      case jobErrorNameDict.FORBIDDEN:
        errorMessage = '処理は許可されていません'
        break
      case jobErrorNameDict.CONFLICTED:
        errorMessage = '処理がコンフリクトしました'
        break
      case jobErrorNameDict.NOT_ENOUGH_PARAMETER:
        errorMessage = '処理に必要な情報が不足しています'
        break
      case jobErrorNameDict.NOT_FOUND:
        errorMessage = '指定された処理が見つかりませんでした'
        break
      case jobErrorNameDict.TIMEOUT:
        errorMessage = '処理がタイムアウトしました'
        break
      default:
        errorMessage = '処理に問題が発生しました'
    }

    return errorMessage
  }
}
