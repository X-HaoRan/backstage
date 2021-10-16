<template>
  <div class="bg">
    <el-form
      class="forms"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password" type="password"></el-input>
      </el-form-item>
      <el-button class="btn" type="primary" @click="Sinin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import instance from "../axios/axios";
export default {
  name: "login",
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    Sinin() {
      instance
        .post("login", this.formdata)
        .then((res) => {
          console.log(res);
          const {
            data,
            meta: { msg, status },
          } = res.data;
          console.log(status);
          if (status === 200) {
            localStorage.setItem("token",data.token);
            this.$message.success(msg);
            this.$router.push({ name: "home" });
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  scoped>
.bg {
  height: 100%;
  background: #324152;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg .forms {
  width: 400px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
}
.btn {
  width: 100%;
  margin-top: 20px;
}
</style>