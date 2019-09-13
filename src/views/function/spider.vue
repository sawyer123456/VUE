<template>
  <div style="max-width:1600px; margin:50px;">
    <el-form :inline="true" :model="form">
      <el-form-item label="请输入网址">
        <el-input placeholder="网址" style="width:200px" v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="请输入页数">
        <el-input placeholder="页数" style="width:200px" v-model="form.pages"></el-input>
      </el-form-item>
      <el-form-item label="请输入后缀">
        <el-input placeholder="后缀" style="width:200px" v-model="form.html"></el-input>
      </el-form-item>
      <el-form-item label="请输入存入文件夹">
        <el-input placeholder="文件夹" style="width:200px" v-model="form.fileLord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:300px; float:right;" @click="onSubmit">开始下载</el-button>
      </el-form-item>
    </el-form>

    <div style="margin-top:20px;margin-bottom:20px;">
      <label>下载进度</label>
      <el-progress :percentage="this.num" :color="customColors"></el-progress>
    </div>
    <label>下载记录</label>
    <el-table :data="tableData" style="width: 100%;margin-top:5px" max-height="250">
      <el-table-column fixed prop="date" label="日期">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="url" label="网址">
        <template slot-scope="scope">{{ scope.row.url }}</template>
      </el-table-column>
      <el-table-column prop="pages" label="页数">
        <template slot-scope="scope">{{ scope.row.pages }}</template>
      </el-table-column>
      <el-table-column prop="html" label="后缀">
        <template slot-scope="scope">{{ scope.row.html }}</template>
      </el-table-column>
    </el-table>
    <template slot-scope="scope">
      <el-button
        @click.native.prevent="deleteRow(scope.$index, tableData)"
        type="text"
        size="small"
      >移除</el-button>
    </template>
  </div>
</template>


<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      tableData: [],
      form: [],
      num: "",
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  mounted() {
    axios.get("http://localhost:8080/spider/tabspider1").then(res => {
      console.log(res.data);
      this.tableData = res.data;
    });
  },
  methods: {
    onSubmit() {
      var formData = qs.stringify(this.form);
      axios.post("http://localhost:8080/spider/spider1", formData);
      setInterval(() => {
        setTimeout(
          axios.get("http://localhost:8080/spider/getspider1").then(res => {
            console.log(res.data);
            this.num = res.data;
          }),
          300000
        );
      }, 3000);
    }
  }
};
</script>
