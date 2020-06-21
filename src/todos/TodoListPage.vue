<template>
  <div>
    <h1>To-Do List</h1>
    <ul>
      <todo-panel
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @update="handlePatchTodo"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { _, API, TodoId, RawTodo, Todo } from '@/common'
import TodoPanel from './TodoPanel.vue'

@Component({
  components: {
    TodoPanel
  }
})
export default class StatePattern extends Vue {
  todos: Todo[] = []

  async created() {
    await this.handleGetTodos()
  }

  async handleGetTodos() {
    const rawTodos = await API.get('/todos') as RawTodo[]
    this.todos = _.camelCaseObject(rawTodos) as Todo[]
  }

  async handlePatchTodo(id: TodoId, partialTodo: Partial<Todo>) {
    const requestData = _.snakeCaseObject(partialTodo) as Partial<RawTodo>
    await API.patch(`/todos/${id}`, requestData)
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            ...partialTodo
          }
        : todo
    )
  }
}
</script>
