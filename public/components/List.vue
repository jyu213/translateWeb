<template>
  <div class="wrapper clearfix">
    <div class="sider">
      <!-- <router-link to="upload"><el-button class="sider--button" type="primary">推荐文章</el-button></router-link> -->
    </div>
    <div class="main">
      <ul class="list">
        <li class="list--item card" v-for="item in lists">
          <div class="card--ava ava">
            <span class="ava--img">{{ item.author ? item.author.slice(0,1) : 'LU'}}</span>
          </div>
          <div class="card--content">
            <h3 class="card--title">
              <a :href="item.link" target="_blank">{{item.title}}</a>
            </h3>
            <p class="card--options options">
              <span class="options--span">{{item.author ? `${item.author}译` : ''}}</span>
                <span class="options--span">{{item.time}}</span>
                <!-- <span class="options--span">tag tag tag</span> -->
            </p>
            <div class="card--description">
              {{item.description}}
            </div>
            <div v-if="username !== ''" class="card--button">
              <el-button v-if="!item.author" type="primary" width="80" @click="onClaim(item.id)">认领</el-button>
              <el-button v-if="item.author === username" type="primary" :plain="true" width="80">已认领</el-button>
            </div>
          </div>
        </li>
      </ul>

      <!--
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list',
  computed: mapGetters({
    lists: 'getLists',
    username: 'username'
  }),
  created () {
    console.log(this.$store, 'list store')
    this.$store.dispatch('getLists')
  },
  methods: {
    onClaim (id) {
      console.log(id)
      if (!this.username) {
        this.$router.push('login')
      } else {
        const params = {}
        this.$store.dispatch('update', params).then(() => {
          // revert button?
        }).catch((err) => {
          this.$message.error(`${err}`)
        })
      }
    }
  }
}
</script>

<style scoped>
  .list{
    min-height: 300px;
  }
  .list--item{
    padding: 2% 0;
    list-style-type: none;
  }
  .card{}
  .card--ava{
    float: left;
  }
  .ava--img{
    display: block;
    width: 40px; height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    background: #58B7FF;
    border-radius: 50%;
  }
  .card--content{
    position: relative;
    padding-left: 60px;
    padding-right: 100px;
  }
  .card--title{
    margin-bottom: 5px;
    font-size: 1.6rem;
    font-weight: bold;
  }
  .card--options{
    margin-bottom: 10px;
    color: #999;
  }
  .options--span{
    margin-right: 5px;
    font-size: 1.4rem;
  }
  .card--description{
    color: #666;
    font-size: 1.6rem;
  }
  .card--button{
    position: absolute;
    top: 4px;
    right: 0;
    width: 80px;
  }
  .card--button button{
    width: 100%;
  }
  .pagination{
    margin: 3% 0;
    text-align: center;
  }
  .sider{
    padding-top: 2%;
  }
  .sider--button{
    width: 100%;
  }
</style>
