<template>
  <el-card class="box-card">
    <mianbao mydb="商品管理" mydb2="商品列表"></mianbao>
    <div style="display: flex; margin-top: 15px">
      <div style="width: 300px">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser"
          ></el-button>
        </el-input>
      </div>
      <el-button @click="adddata" type="success" style="margin-left: 8px"
        >添加商品
      </el-button>
    </div>
    <!-- 表格 -->
    <template>
      <el-table :data="list" border style="width: 100%; margin-top: 15px">
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="400">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="upd_time" label="操作日期"> 
          <template slot-scope="scope">
          <p>  {{scope.row.upd_time  |  TimeFilter(scope.row.upd_time)}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-row>
              <!-- 编辑 -->
              <el-button
                @click="
                  edit(
                    scope.row.goods_name,
                    scope.row.goods_price,
                    scope.row.goods_weight,
                    scope.row.goods_id,
                    scope.row.goods_number,
                    scope.row.goods_cat
                  )
                "
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <!-- 删除 -->
              <el-button
                @click.stop="open(scope.row.goods_id)"
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <div class="block" style="display: flex; justify-content: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="750px">
      <el-form :model="form">
        <el-form-item label="*商品名称" label-width="100px">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="以 , 分割的分类列表" label-width="100px">
          <el-input v-model="form.goods_cat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" label-width="100px">
          <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input v-model="form.goods_number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="showadduserdia">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleedit">
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="以 , 分割的分类列表" label-width="100px">
          <el-input v-model="form.goods_cat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" label-width="100px">
          <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input v-model="form.goods_number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
        <el-button type="primary" @click.stop="showdituserdia(form.id)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>
  


<script>
import instance from "../axios/axios";
export default {
  data() {
    return {
      dialogFormVisibleedit: false,
      dialogFormVisible: false,
      query: "",
      list: [],
      pagenum: 1,
      pagesize: 4,
      total: -1,
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: -1,
        goods_number: -1,
        goods_weight: -1,

        goods_number: -1,
      },
      goods_id: -1,
    };
  },
  created() {
    this.getgoods();
  },
  methods: {
    open(userid) {
      console.log(userid);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          instance.delete(`goods/${userid}`).then((res) => {
            console.log(res, "6666666666666");
            if (res.data.meta.status === 200) {
              this.getgoods();
              this.$message({ type: "success", message: res.data.meta.msg });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除
    // 编辑
    edit(value, value2, value3, value4, value5, value6) {
      console.log(value4);
      this.dialogFormVisibleedit = true;
      this.form.goods_name = value;
      this.form.goods_price = value2;
      this.form.goods_weight = value3;
      this.goods_id = value4;
      this.form.goods_number = value5;
      this.form.goods_cat = value6;
    },
    showdituserdia() {
      instance.put(`goods/${this.goods_id}`, this.form).then((res) => {
        const {
          meta: { msg, status },
        } = res.data;
        if (status === 200) {
          this.getgoods();
          this.$message.success(msg);
          this.dialogFormVisibleedit = false;
        } else {
          this.$message.warning(msg);
          this.dialogFormVisible = true;
        }
      });
    },
    searchUser() {
      instance.get(`goods/${this.query}`).then((res) => {
        this.getgoods();
        console.log(res, "222222222222");
      });
    },
    // 查询
    getgoods() {
      instance
        .get("goods", {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        })
        .then((res) => {
          console.log(res, "7777777777777777");
          this.total = res.data.data.total;
          this.list = res.data.data.goods;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getgoods();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getgoods();
    },
    adddata() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    showadduserdia() {
      instance.post("goods", this.form).then((res) => {
        console.log(res, "11111111111111111111111111");
        const {
          meta: { status, msg },
        } = res.data;
        if (status === 201) {
          this.getgoods();
          this.$message.success(msg);
          this.dialogFormVisible = false;
        } else {
          this.$message.warning(msg);
          this.dialogFormVisible = true;
        }
      });
    },
    searchUser() {
      this.getuserlist();
    },
    getuserlist() {
      instance
        .get("users", {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        })
        .then((res) => {
          console.log(res);
          const {
            meta: { msg, status },
            data: { users, total },
          } = res.data;
          if (status === 200) {
            this.userlist = users;
            this.total = total;
          } else {
            this.$message.warning(msg);
          }
        });
    },
  },
};
</script>

<style  scoped>
</style>