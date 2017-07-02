<template>
  <div class="wrapper container">
    <ul class="list">
      <li class="list--item card" v-for="item in lists">
        <div class="card--ava ava"><img class="ava--img" :src="!item.ava" /></div>
        <div class="card--content">
          <h3 class="card--title">
            <a :href="!item.link" target="_blank">{{item.title}}</a>
          </h3>
          <p class="card--options options">
            <span class="options--span">{{item.author}}译</span>
              <span class="options--span">{{item.time}}</span>
              <span class="options--span">tag tag tag</span>
          </p>
          <div class="card--description">
            {{item.description}}
          </div>
        </div>
      </li>
    </ul>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list',
  computed: mapGetters({
    lists: 'getLists'
  }),
  created () {
    this.$store.dispatch('getLists')
  }
}
</script>

<style scoped>
  .list--item{
    padding: 2% 0;
    list-style-type: none;
  }
  .card{}
  .card--ava{
    float: left;
  }
  .ava--img{
    width: 40px; height: 40px;
    border-radius: 50%;
  }
  .card--content{
    padding-left: 60px;
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
  .pagination{
    margin: 3% 0;
    text-align: center;
  }
</style>
