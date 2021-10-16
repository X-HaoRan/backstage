<template>
  <el-container class="container">
    <el-header class="header">
      <div class="header-left">
        <img class="img" src="../assets/logo.png" alt="" />
        <h3>电商后台管理系统</h3>
      </div>
      <el-button class="btn" type="info" round @click="signout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 菜单栏 -->
      <el-aside class="aside" width="200px">
        <el-menu
        unique-opened
        :router="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#40A0FF"
        >
          <el-submenu :index="item.order" v-for="(item,index) in menus" :key='index'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item :index="item2.path" v-for="(item2,index) in item.children" :key='index'>
                
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
               
              </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <!-- <el-submenu index="2" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <router-link :to="{ name: 'power' }" class="router-link">
              <el-menu-item index="1-2"
                ><i class="el-icon-menu"></i>
                <span> 角色列表</span>
              </el-menu-item>
              </router-link>
              <router-link :to="{ name: 'surface' }" class="router-link">
              <el-menu-item index="1-6">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </el-menu-item>
              </router-link>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-7"
              ><i class="el-icon-menu"></i> <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-8"
              ><i class="el-icon-menu"></i> <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-9"
              ><i class="el-icon-menu"></i> <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-4">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-5">选项1</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <!-- 内容部分 -->
      <el-main class="main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import instance from "../axios/axios";
export default {
  data(){
    return{
      menus:[],

    }
  },
  beforeCreate() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  created(){
    this.getmenus()
  },
  methods: {
  getmenus(){
  instance.get(`menus`).then(res=>{
        this.menus=res.data.data;
        console.log(this.menus)
      })
    },
    signout() {
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
    isLogin(){
      return true;
    }
  },
};
</script>

<style  scoped>
.container {
  height: 100%;
}
.header {
  background: #373f41;
  color: #fff;
  position: relative;
}
.header-left {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
}
.img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.btn {
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -20px;
  color: #fff;
  background: #909399;
}
.aside {
  background: #333744;
}
.main {
  background: #e9eef3;
}
</style>