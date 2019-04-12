<template>
  <el-card shadow="hover" class="todo-item">{{todoitem.name}}</el-card>
</template>
<script>
export default { name: "TodoItem", props: [ "todoitem"] };
</script>
<style scoped>
</style>
