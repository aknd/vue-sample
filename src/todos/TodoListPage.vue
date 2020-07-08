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
import { _, API, JSONObject, TodoId, RawTodo, Todo, Log, Catch } from '@/common'
import TodoPanel from './TodoPanel.vue'

@Component({
  components: {
    TodoPanel
  }
})
export default class TodoListPage extends Vue {
  todos: Todo[] = []

  async created() {
    await this.handleGetTodos()
  }

  @Catch('handleError')
  @Log()
  async handleGetTodos() {
    const rawTodos = (await API.get('/todos')) as RawTodo[]
    this.todos = _.camelCaseObject(rawTodos) as Todo[]
  }

  @Catch('handleError')
  @Log()
  async handlePatchTodo(id: TodoId, partialTodo: Partial<Todo>) {
    const diffTodo = _.omitDeepBy(partialTodo, _.isUndefined)
    const requestData = _.snakeCaseObject(diffTodo) as JSONObject
    await API.patch(`/todos/${id}`, requestData)
    this.todos = this.todos.map((todo: Todo) =>
      todo.id === id
        ? {
            ...todo,
            ...diffTodo
          }
        : todo
    )
  }

  handleError(error: Error) {
    alert(`エラー: ${error.toString()}`)
  }
}
</script>
