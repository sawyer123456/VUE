<template>
  <div style="margin:20px">
    <el-table :data="tableData" id="app" style="width: 100%">
      <el-table-column label="编号" prop="cusId">
        <template slot-scope="scope">{{ scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="cusNo" label="客户编号">
        <template slot-scope="scope">{{ scope.row.cusNo }}</template>
      </el-table-column>
      <el-table-column prop="cusName" label="用户名">
        <template slot-scope="scope">{{ scope.row.cusName}}</template>
      </el-table-column>
      <el-table-column prop="cusRegion" label="用户地区">
        <template slot-scope="scope">{{ scope.row.cusRegion}}</template>
      </el-table-column>
      <el-table-column prop="cusAddr" label="用户地址">
        <template slot-scope="scope">{{ scope.row.cusAddr}}</template>
      </el-table-column>
      <el-table-column prop="cusUrl" label="用户链接">
        <template slot-scope="scope">{{ scope.row.cusUrl}}</template>
      </el-table-column>
      <el-table-column prop="cusLevel" label="用户等级">
        <template slot-scope="scope">{{ scope.row.cusLevel}}</template>
      </el-table-column>
      <el-table-column prop="cusCredit" label="用户信用">
        <template slot-scope="scope">{{ scope.row.cusCredit}}</template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pagesize"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10
      // sizes: [10, 20, 30, 40]
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/customer/getAllCustomer", {
        params: {
          rows: this.pagesize,
          page: this.currentPage
        }
      })
      .then(res => {
        // console.log(res);
        // var obj = JSON.parse(res.data);
        //this.list = obj
        console.log("数据" + res.data);
        this.tableData = res.data.rows;
        console.log("行数" + this.pagesize);
        console.log("currentpage：" + this.currentPage);
        console.log("长度" + this.tableData.length);
      });
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      return this.pagesize;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      return this.currentPage;
    }
  }
};
</script>
