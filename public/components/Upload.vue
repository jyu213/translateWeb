<template>
  <div class="sm-wrapper">
    <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="articleUpload" ref="uploadForm">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="articleUpload.title"></el-input>
      </el-form-item>
      <el-form-item label="文章链接" prop="link">
        <el-input v-model="articleUpload.link"></el-input>
      </el-form-item>
      <el-form-item label="指派译者">
        <el-select v-model="articleUpload.author" placeholder="选择指派作者，默认为空" style="width: 100%;">
            <el-option v-bind:key="item.id" v-bind:label="item.name" v-bind:value="item.id" v-for="item in authorList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情">
        <el-input type="textarea" label-height="80px" v-model="articleUpload.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('uploadForm')">新建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      labelPosition: 'right',
      articleUpload: {
        title: '',
        link: '',
        author: '',
        description: ''
      },
      rules: {
        title: [{
          required: true, message: '请输入文章标题', trigger: 'blur'
        }],
        link: [{
          required: true, message: '请输入文章链接', trigger: 'blur'
        }]
      }
    }
  },
  computed: mapGetters({
    authorList: 'getAuthorList'
  }),
  created () {
    this.$store.dispatch('getAuthorList')
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.articleUpload

          params.status = this.articleUpload.author ? 'DOING' : 'ON'
          this.$store.dispatch('addArticle', params).then(() => {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            // this.$data = initDefaultData()
            Object.assign(this.$data, this.$options.data());
          }).catch((err) => {
            this.$message.error(`提交失败：${err}`)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .sm-wrapper{
    margin-top: 6%;
  }
</style>
