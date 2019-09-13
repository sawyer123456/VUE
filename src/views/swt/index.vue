 <template>
  <div class="app-container" style="width:500px; margin-left:200px; margin-top:50px;">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="联系人编号">
        <el-input v-model="form.ctId" minlength="3"/>
      </el-form-item>
      <el-form-item label="联系人名">
        <el-input v-model="form.ctName"/>
      </el-form-item>
      <el-form-item label="联系人性别">
        <el-input v-model="form.ctGender"/>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="form.ctPhone"/>
      </el-form-item>
      <el-form-item label="联系人备注">
        <el-input v-model="form.ctMemo"/>
      </el-form-item>
      <el-form-item label="联系人头衔">
        <el-input v-model="form.ctTitle"/>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-select v-model="form.cusNo" placeholder>
          <el-option v-for="item in index" :key="item" :label="item.cusNo" :value="item.cusNo"></el-option>
        </el-select>
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
      form: {},
      drop: "",
      index: []

      //form 是v-model 的前缀
    };
  },
  mounted() {
    // 取客户名
    axios.get("http://localhost:8080/customer/getCustomerNo").then(res => {
      this.index = res.data;
      console.log(this.drop);
    });
  },
  methods: {
    // 提交
    onSubmit() {
      var formData = qs.stringify(this.form);
      alert(formData);
      axios.post("http://localhost:8080/contact//addContact", formData);
      alert("提交成功！");
    },
    onCancel() {}
  }
};
</script>







<!-- <script>
import { mapGetters } from 'vuex'

export default {
  name: 'swt',
  computed: {
    ...mapGetters([
      'swt'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style> -->
