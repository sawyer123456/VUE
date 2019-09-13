<!-- <template>
  <div class="hello">
    <form @submit.prevent="submit">
      <div>
        姓名：
        <input type="text" v-model="user.name">
      </div>
      <div>
        爱好
        <input type="text" v-model="user.hobby">
      </div>
      <div>
        生日
        <input type="text" v-model="user.birth">
      </div>
      <div>
        备注
        <input type="text" v-model="user.memo">
      </div>

      <div>
        性別：
        <label>
          <input type="radio" value="男" v-model="user.gender"> 男
        </label>

        <label>
          <input type="radio" value="女" v-model="user.gender"> 女
        </label>
      </div>

      <input type="submit" value="提交" @click="ss()">
    </form>
  </div>
</template>
 -->
 <template>
  <div class="app-container" style="width:500px; margin-left:200px; margin-top:50px;">
    <el-form ref="form" :model="form" id="form" label-width="180px">
      <el-form-item label="客户Id">
        <el-input v-model="form.cusId" minlength="3"/>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-input v-model="form.cusNo"/>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.cusName"/>
      </el-form-item>
      <el-form-item label="客户地区">
        <el-input v-model="form.cusRegion"/>
      </el-form-item>
      <el-form-item label="客户地址">
        <el-input v-model="form.cusAddr"/>
      </el-form-item>
      <el-form-item label="客户等级">
        <el-input v-model="form.cusLevel"/>
      </el-form-item>
      <el-form-item label="客户链接">
        <el-input v-model="form.cusUrl"/>
      </el-form-item>
      <el-form-item label="客户等级">
        <el-input v-model="form.cusCredit"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      form: {}
      //form 是v-model 的前缀
    };
  },
  methods: {
    onSubmit() {
      var formData = qs.stringify(this.form); // 这里才是你的表单数据
      alert(formData);
      axios
        .post("http://localhost:8080/customer/addCustomer", formData)
        .then(function(result) {
          console.log(result);
          alert("添加成功");
        });
    }
  }
};
</script>


<!-- <template>
  <div class="app-container">
    <el-form ref="form" :model="form" id="form" label-width="120px">
      <el-form-item label="客户名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="注册日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="是否合格">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="私人经营" name="type"/>
          <el-checkbox label="合资经营" name="type"/>
          <el-checkbox label="国有企业" name="type"/>
          <el-checkbox label="混合经营" name="type"/>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" name="text"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>

    <form>
      <input type="text" value v-model="name" placeholder="请输入用户名">
      <input type="text" value v-model="age" placeholder="请输入年龄">
      <input type="file" @change="getFile($event)">
      <button @click="ss">提交</button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      registerUrl: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {
    ss() {
      event.preventDefault();

      let formData = new FormData();

      //下面是表单绑定的data 数据
      formData.append("name", this.name);
      formData.append("age", this.age);
      formData.append("file", this.file);
      var s = $.each(formData, function() {
        formData[this.$message] = this.value;
      });
      var v = JSON.stringify(s);
      alert(v);
      alert(this.value);
      //vue-resource
      this.$http.post("/api", formData).then(
        res => {
          // success callback
        },
        err => {
          // error callback
        }
      );
    },

    register: function() {
      axios
        .post(this.registerUrl, this.form)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSubmit() {
      this.$message("submit!");
    }
  }
};

/* import $ from "jquery";
var x = {
  form: {
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: ""
  }
};
var s = $.each(x, function() {
  x[this.$message] = this.value;
});
var d = JSON.stringify(s);
alert(d);
console.log(d);

export default {
  data() {
    return x;
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      alert("信息" + x);
    }
  }
}; */
//不可以传值
</script>


<style scoped>
.line {
  text-align: center;
}
</style>

 -->
