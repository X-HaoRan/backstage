<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{mydb}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{mydb2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:['mydb','mydb2']
}
</script>

<style scoped>

</style>