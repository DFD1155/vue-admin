<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="eduTeacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="eduTeacher.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="eduTeacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="eduTeacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="eduTeacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from "@/api/teacher";
export default {
  data() {
    return {
      eduTeacher: {},
      saveBtnDisabled: false, // 保存按钮是否禁用,
      id: this.$route.params.id + "",
    };
  },
  created() {
    this.init();
  },
  watch:{
    $route(to,from){
      this.init();
    }
  },
  methods: {
    init(){
      if (this.$route.params && this.$route.params.id) {
      teacher.getTeacherById(this.$route.params.id).then((response) => {
        this.eduTeacher = response.data.item;
      });
    } else {
      this.eduTeacher = {};
    }
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (this.$route.params && this.$route.params.id) {
        this.updateData();
      } else {
        this.saveData();
      }
    },

    // 保存
    saveData() {
      teacher.save(this.eduTeacher).then((response) => {
        console.log(this.eduTeacher);
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.$router.push({
          path: "/teacher/list",
        });
      });
    },

    updateData() {
      teacher.updateTeacherById(this.id, this.eduTeacher).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.$router.push({
          path: "/teacher/list",
        });
      });
    },
  },
};
</script>