<template>
  <el-card class="box-card">
    <mianbao mydb="商品管理" mydb2="商品列表"></mianbao>
    <!-- 表格 -->
    <template>
      <el-table :data="list" border style="width: 100%; margin-top: 15px">
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="400">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
            <template slot-scope="scope">
                <span v-if="scope.row.order_pay=='0'">否</span>
                <span v-if="scope.row.order_pay=='1'">是</span>
            </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
            <template slot-scope="scope">
          <p>  {{scope.row.create_time  |  TimeFilter(scope.row.create_time)}}</p>
            </template>
    </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="">
            <el-row>
              <!-- 编辑 -->
              <el-button
                @click="edit()"
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 编辑弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible" width="700px">
     <el-form :model="form">   
         
         <div class="block" style="margin-bottom:35px">
  <span class="demonstration">省市区</span>
  <el-cascader
    v-model="selectedoptions"
    clearable
    :options="catlist"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange"></el-cascader>
</div>
  
    <el-form-item label="详细地址" label-width="70px">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modify">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>
  


<script>
import citydata from "../components/citydata";
import instance from "../axios/axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
     list:[],
     form:{
         address:''
     },
     catlist:[],
     selectedoptions:[]
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    // 编辑
    modify(){
        this.dialogFormVisible=false;
        
    },
    edit() {
      this.dialogFormVisible = true;this.catlist=citydata;
    },
    getdata(){
        instance.get(`orders?pagenum=1&pagesize=10`).then(res=>{
            this.list=res.data.data.goods;
            console.log(this.list)
        })
    }
  },
};
</script>

<style  scoped>
</style>