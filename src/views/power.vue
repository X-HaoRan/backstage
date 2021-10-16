<template>
  <el-card class="box-card">
    <mianbao mydb="权限管理" mydb2="权限列表"></mianbao>
    <el-button style="margin: 15px" @click="adddata">添加角色</el-button>

    <template>
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column prop="role" type="expand" width="50"> -->
        <!-- <el-row>
                <el-col>
          <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
            {{ tag.name }}
          </el-tag>
          </el-col>
          </el-row> -->
        <!-- </el-table-column> -->
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="230">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="230">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-row>
              <!-- 编辑 -->
              <el-button
                @click="
                  Editrole(scope.row.roleName, scope.row.roleDesc, scope.row.id)
                "
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <!-- 权限分配 -->
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle
                @click="edit(scope.row)"
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
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleedit">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
        <el-button type="primary" @click="showdituserdia">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="650px">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*角色描述" label-width="100px">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="showadduserdia">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配弹框 -->
    <el-dialog title="修改权限" :visible.sync="dialogVisible" width="700px">
      <el-tree
        ref="tree"
        :data="handleClose"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="distribution()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import instance from "../axios/axios";
export default {
  data() {
    return {
      form: {
        roleName: "",
        roleDesc: "",
      },
      tableData: [],
      tag: {},
      dialogVisible: false,
      handleClose: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },

      arrcheck: [],
      id: -1,
      id2: -1,
      dialogFormVisible: false,
      dialogFormVisibleedit: false,
    };
  },
  created() {
    this.getrightlist();
  },
  methods: {
    //   编辑角色
    showdituserdia() {
      instance.put(`roles/${this.id2}`, this.form).then((res) => {
        console.log(res, "1521212");
        const {
          meta: { msg, status },
        } = res.data;
        if (status === 200) {
          this.getrightlist();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      });
      this.dialogFormVisibleedit = false;
    },
    Editrole(value, value2, value3) {
      this.dialogFormVisibleedit = true;
      this.id2 = value3;
      this.form.roleName = value;
      this.form.roleDesc = value2;
    },
    //   添加角色
    showadduserdia() {
      instance.post("roles", this.form).then((res) => {
        console.log(res, "9666666");
        const {
          meta: { msg, status },
        } = res.data;
        if (status === 201) {
          this.getrightlist();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      });
      this.dialogFormVisible = false;
    },
    adddata() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    //   分配权限
    distribution() {
      let arr1 = this.$refs.tree.getCheckedKeys();
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      let arr3 = [...arr1, ...arr2];
      console.log(arr3, "33333333333333333");
      instance
        .post(`roles/${this.id}/rights`, { rids: arr3.join(",") })
        .then((res) => {
          console.log(res);
        });
      this.dialogVisible = false;
      this.getrightlist();
    },
    edit(value) {
      this.id = value.id;
      console.log(value, "6666666666");
      this.dialogVisible = true;
      instance.get(`rights/tree`).then((res) => {
        this.handleClose = res.data.data;
        let arr = [];
        value.children.forEach((item1) => {
          //   arr.push(item1.id)
          item1.children.forEach((item2) => {
            //   arr.push(item2.id)
            item2.children.forEach((item3) => {
              arr.push(item3.id);
            });
          });
        });
        this.arrcheck = arr;
      });
    },
    // 删除用户
    open(userid) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (userid != 30) {
            instance.delete(`roles/${userid}`).then((res) => {
              if (res.data.meta.status === 200) {
                this.getrightlist();
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
    getrightlist() {
      instance.get(`roles`).then((res) => {
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
    },
  },
};
</script>

<style scoped>
</style>