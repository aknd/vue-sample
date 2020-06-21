<template>
  <li class="todo-panel" :style="style">
    <div>{{ todo.content }}&nbsp;{{ notification }}</div>
    <div class="todo-panel__limit">
      <div>
        期限:&nbsp;
        <input type="date" :value="todo.limitAt" @change="handleChangeLimitAt">
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { _, Todo, buildMoment } from '@/common'

const notifications = {
  CLOSE_TO_LIMIT: '※期限が迫っています',
  LIMIT_OVER: '※期限が過ぎています'
} as const
const styles = {
  NORMAL: {
    'border-color': 'green'
  },
  CLOSE_TO_LIMIT: {
    'background-color': 'yellow',
    'border-color': 'yellow'
  },
  LIMIT_OVER: {
    color: 'white',
    'font-weight': 'bold',
    'background-color': 'red',
    'border-color': 'red'
  }
} as const
type TodoState = keyof typeof notifications | keyof typeof styles

@Component
export default class TodoPanel extends Vue {
  @Prop() todo!: Todo
  @Prop() baseDate?: Date | string

  get todoState (): TodoState {
    const base = buildMoment(this.baseDate)
    const limit = buildMoment(this.todo.limitAt)
    if (limit.isAfter(base.clone().add(3, 'days'))) {
      return 'NORMAL' as TodoState
    }
    if (limit.isSameOrAfter(base)) {
      return 'CLOSE_TO_LIMIT' as TodoState
    }
    return 'LIMIT_OVER' as TodoState
  }

  get notification(): string {
    return _.get(notifications, this.todoState, '')
  }

  get style(): object {
    return _.get(styles, this.todoState, {})
  }

  handleChangeLimitAt({ target }: { target: HTMLInputElement }) {
    this.$emit('update', this.todo.id, { limitAt: target.value })
  }
}
</script>

<style scoped>
.todo-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 100px;
  margin: 10px auto;
  padding-right: 10px;
  padding-left: 10px;
  border-style: solid;
  border-width: 1px;
}
.todo-panel__limit {
  display: flex;
}
</style>
