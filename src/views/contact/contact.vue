<template >
  <div style="margin:20px">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="请选择">
        <el-select placeholder="请选择" v-model="form.slc">
          <el-option label="用户编号" value="cusNo"></el-option>
          <el-option label="客户编号" value="ctId"></el-option>
          <el-option label="客户名" value="ctName"></el-option>
          <el-option label="客户电话" value="ctPhone"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.no"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="serch">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" id="app" style="width: 100%; ">
      <el-table-column label="客户编号" prop="ctId">
        <template slot-scope="scope">{{ scope.row.ctId}}</template>
      </el-table-column>
      <el-table-column prop="ctName" label="客户名">
        <template slot-scope="scope">{{ scope.row.ctName}}</template>
      </el-table-column>
      <el-table-column prop="ctGender" label="性别">
        <template slot-scope="scope">{{ scope.row.ctGender}}</template>
      </el-table-column>
      <el-table-column prop="ctPhone" label="客户电话">
        <template slot-scope="scope">{{ scope.row.ctPhone}}</template>
      </el-table-column>
      <el-table-column prop="ctMemo" label="客户备注">
        <template slot-scope="scope">{{ scope.row.ctMemo}}</template>
      </el-table-column>
      <el-table-column prop="cusNo" label="用户编号">
        <template slot-scope="scope">{{ scope.row.cusNo}}</template>
      </el-table-column>
      <el-table-column prop="ctTitle" label="客户头衔">
        <template slot-scope="scope">{{ scope.row.ctTitle}}</template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改食品信息">
      <el-form :model="tableData">
        <el-form-item label="食品名称" label-width="100px">
          <el-input v-model="tableData.ctId" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click=" visible = false">取 消</el-button>
        <el-button type="primary" @click="updateFood">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
import qs from "qs";
import jquery from "jquery";

export default {
  data() {
    return {
      tableData: [],
      fuck: false,
      data: [],
      form: {
        no: "",
        slc: "",
        count: "",

        selectTable: []
      }
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/contact/getAllContact?", {
        params: {
          cusNo: "1"
          //ctId, ctName, ctGender, ctPhone, ctMemo, cusNo, ctTitle
        }
      })
      .then(res => {
        // console.log(res);
        // var obj = JSON.parse(res.data);
        //this.list = obj
        // console.log(res.data.data.ctId);
        // console.log("+++++++++++++++++++++++++++++++++");
        this.tableData = res.data.data;

        console.log(count(this.tableData));
      });
  },
  methods: {
    handleEdit(row) {
      this.getSelectItemData(row, "edit");
      document.getElementById(fuck).visible = true;
      this.fuck.visible = true;
      console.log(row);
      console.log(fuck);
    },
    async getSelectItemData(row, type) {},
    serch() {
      axios
        .get(
          "http://localhost:8080/contact/getAllContact?" +
            this.form.slc +
            "=" +
            this.form.no
        )
        .then(res => {
          this.tableData = res.data.data;
          /* self.list = [];
          for (var i in res.list) {
            self.list.push(res.list[i]);
          } */

          console.log("------------------------------" + this.tableData);
          // var obj = JSON.parse(res.data);
          //this.list = obj
          // console.log(res.data);
          // console.log(this.form.slc.value());
        });
    },
    handleDelete(row) {
      axios
        .post("http://localhost:8080/contact/delContact?ctId=" + scope.row + "")
        .then(alert(result));
    }
  }
};
</script>
