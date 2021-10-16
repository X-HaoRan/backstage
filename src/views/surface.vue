<template>
  <el-card class="box-card">
    <mianbao mydb="权限管理" mydb2="权限列表"></mianbao>

      <el-table height="800px" :data="tableData" border style="width: 100%; margin-top: 25px;">
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="250">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="250">
        </el-table-column>
        <el-table-column  label="层级"> 
          <template slot-scope="scope">
            <span v-if="scope.row.level==0">一级</span>
            <span v-if="scope.row.level==1">二级</span>
            <span v-if="scope.row.level==2">三级</span>
          </template>
        </el-table-column>
      </el-table> 

      </el-card>
    </template>
  </el-card>
</template>

<script>
import instance from "../axios/axios";
export default {
    data() {
        return{
            tableData:[],
        }
    },
    created(){
        this.getrightlist()
    },
    methods:{
       getrightlist(){
           instance.get(`rights/list`).then(res=>{
               this.tableData=res.data.data;
               console.log(this.tableData)
           })
       }
    }
};
</script>

<style scoped>
</style>