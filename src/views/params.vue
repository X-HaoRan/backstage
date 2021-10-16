<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <mianbao mydb="商品管理" mydb2="分类参数"></mianbao>
    <el-alert
      style="margin: 15px 0"
      title="只允许为第三级分类设置参数"
      type="warning"
    >
    </el-alert>
    <!-- 级联选择器 -->
    <div class="block" style="margin: 15px 0">
      <span class="demonstration">商品分类</span>
      <el-cascader
        clearable
        :show-all-levels="false"
        expand-trigger="hover"
        v-model="selectedoptions"
        :options="options"
        :props="defaultprop"
        @change="handleChange"
      ></el-cascader>
    </div>
    <!-- 标签页 -->
    <template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="danger">设置动态参数</el-button>
          <el-table :data="arrDyparams" style="width: 40%">
            <el-table-column type="expand" label="#">
              <template slot-scope="scope">
                <el-tag
                  :key="tag"
                  v-for="tag in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="
                    handleClose(
                      scope.row.attr_vals,
                      scope.row.attr_id,
                      scope.row.attr_name,
                      tag
                    )
                  "
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="
                    handleInputConfirm(
                      scope.row.attr_vals,
                      scope.row.attr_id,
                      scope.row.attr_name
                    )
                  "
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="属性名称" prop="attr_name">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="second">静态参数</el-tab-pane>
      </el-tabs>
    </template>
  </el-card>
</template>

<script>
import instance from "../axios/axios";
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      activeName: "first",
      options: [],
      selectedoptions: [1, 2, 3],
      defaultprop: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      arrDyparams: [],
    };
  },
  created() {
    this.getgoodcate();
  },
  methods: {
    handleClick() {},
    handleChange() {
      if (this.selectedoptions.length === 3) {
        instance
          .get(`categories/${this.selectedoptions[2]}/attributes?sel=many`)
          .then((res) => {
            this.arrDyparams = res.data.data;
            console.log(this.arrDyparams, "999999999");
            this.arrDyparams.forEach((element) => {
              element.attr_vals =
                element.attr_vals.length === 0
                  ? []
                  : element.attr_vals.trim().split(",");
            });
            this.getgoodcate();
          });
      }
    },
    getgoodcate() {
      instance.get(`categories?type=3`).then((res) => {
        this.options = res.data.data;
        console.log(this.options);
      });
    },

    //   标签
    handleClose(value, value2, value3, tag) {
      value.splice(value.indexOf(tag), 1);
      let putdata = {
        attr_vals: value.join(","),
        attr_name: value3,
        attr_sel: "many",
      };
      instance
        .put(
          `categories/${this.selectedoptions[2]}/attributes/${value2}`,
          putdata
        )
        .then((res) => {
          const {
            meta: { msg, status },
          } = res.data;
          if (status===200) {
            console.log(res, "555555");
            this.$message.success(msg);
          } else {
            this.$message.warning(msg);
          }
        });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(attr_vals, attr_id, attr_name) {
      console.log(attr_vals, "555555555");
      let inputValue = this.inputValue;
      if (inputValue) {
        attr_vals.push(inputValue);
        let putdata = {
          attr_vals: attr_vals.join(","),
          attr_name: attr_name,
          attr_sel: "many",
        };
        instance
          .put(
            `categories/${this.selectedoptions[2]}/attributes/${attr_id}`,
            putdata
          )
          .then((res) => {
            console.log(res, "3333333333");
            const {
              meta: { msg ,status},
            } = res.data;
            if(status===200){
            this.$message.success(msg);}else{
                this.$message.warning(msg)
            }
          });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
</style>