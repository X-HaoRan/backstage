<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <mianbao mydb="用户管理" mydb2="用户列表"></mianbao>
    <!-- 输入框 -->
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
        >添加用户
      </el-button>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="650px">
      <el-form :model="form">
        <el-form-item label="*用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="showadduserdia">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
      <el-table style="width: 100%" :data="userlist">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="用户"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column  label="创建日期"> 
          <template slot-scope="scope">
          <p>  {{scope.row.create_time  |  TimeFilter(scope.row.create_time)}}</p>
            </template>
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch
              @change="changemastate(scope.row.mg_state, scope.row.id)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-row>
              <!-- 编辑 -->
              <el-button
                @click.stop="
                  edit(scope.row.username, scope.row.email, scope.row.mobile,scope.row.id)
                "
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <!-- 角色分配 -->
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle
                @click="Assign(scope.row.username,scope.row.id)"
              ></el-button>
              <!-- 删除 -->
              <el-button
                @click.stop="open(scope.row.id)"
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-row>
            <!-- 角色分配弹框 -->
              <el-dialog title="角色分配" :visible.sync="distribution">
                <el-form :model="form">
                  <el-form-item label="用户名:" label-width="100px">
                    <span>{{ form.username }}</span>
                    <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  </el-form-item>
                  <el-form-item label="角色" label-width="100px">
                    <el-select v-model="currrbleid" placeholder="请选择">
                      
                      <el-option
                        :label="item.roleName"
                        :value="item.id"
                        v-for="(item, index) in roles"
                        :key="index"
                     >
                     </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="distribution = false">取 消</el-button>
                  <el-button type="primary" @click="Assignroles(id)"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <!-- 编辑弹框 -->
              <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleedit">
                <el-form :model="form">
                  <el-form-item label="*用户名" label-width="100px">
                    <el-input
                      disabled
                      v-model="form.username"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" label-width="100px">
                    <el-input
                      v-model="form.email"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="电话" label-width="100px">
                    <el-input
                      v-model="form.mobile"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleedit = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click.stop="showdituserdia(form.id)"
                    >确 定</el-button>
                </div>
              </el-dialog>
          </template>
        </el-table-column>
      </el-table>

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
  </el-card>
</template>

<script>
import instance from "../axios/axios";
export default {
  data() {
    return {
      visible: false,
      query: "",
      pagenum: 1,
      pagesize: 4,
      userlist: [],
      total: -1,
      distribution: false,
      dialogFormVisible: false,
      dialogFormVisibleedit: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      roles: [],
      currrbleid: -3,
      id:-3
    }
  },
  created() {
    this.getuserlist();
  },
  methods: {
    //   角色分配
    Assign(value, value2) {
      console.log(value2,'6666666666666666666666')
      // this.distribution = value2;
      this.id=value2;
      this.distribution = true;
      this.form.username = value;
      instance.get(`roles`).then((res) => {
        this.roles = res.data.data;
        console.log(this.roles,'111111111111111111111')
      });
      instance.get(`users/${value2}`).then((res) => {
        console.log(res,'88888888888888888')
        this.currrbleid = res.data.data.rid;
      });
    },
    Assignroles(value) {
      if(value!=500){
      this.distribution = false;
      instance.put(`users/${value}/role`, {
        rid: this.currrbleid,
      });}else{
        this.distribution = false;
        this.$message.error('此用户不能修改');
      }
    },
    //   用户状态
    changemastate(value, value2) {
      console.log(value, value2);
        instance.put(`users/${value2}/state/${value}`).then((res) => {
          console.log(res,'1111111111111111111');
          const {
            meta: { msg, status },
          } = res.data;
          if (status === 200) {
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        });
      // } else {
      //   value.mg_state = true;
      //   this.$message.error("此用户不能修改");
      // }
    },
    //   编辑用户
    edit(value, value2, value3,value4) {
      this.dialogFormVisibleedit = true;
      this.form.username = value;
      this.form.email = value2;
      this.form.mobile = value3;
      this.form.id = value4;
    },
    showdituserdia() {
      if(this.form.id!=500){
      instance.put(`users/${this.form.id}`, this.form).then((res) => {
        console.log(this.form.id)
        let {
          meta: { msg, status },
        } = res.data;
        console.log(res.data, "4564685");
        if (status === 200) {
          console.log(res);
          this.getuserlist();
          this.$message.success(msg);
          this.dialogFormVisibleedit = false;
        }
      });}else{
        this.$message.error("此用户不能修改");
      }
    },
    //   删除用户
    open(userid) {
      console.log(userid);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (userid != 500) {
            instance.delete(`users/${userid}`).then((res) => {
              if (res.data.meta.status === 200) {
                this.getuserlist();
                this.$message({ type: "success", message: res.data.meta.msg });
              }
            });
          } else {
            this.$message.error("此用户不能删除");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //   添加用户
    adddata() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    showadduserdia() {
      instance.post("users", this.form).then((res) => {
        console.log(res,'11111111111111111111111111')
        const {
          meta: { status, msg },
          data:{role_id}
        } = res.data;
        if (status === 201) {
          this.getuserlist();
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getuserlist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
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

<style scoped>
</style>