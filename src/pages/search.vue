<template>
  <div>
    <div class="w1200 mg15" style="min-height: 800px; background: #fff;">
      <div class="search-top">
        <span>关键字：{{keywords}}</span>
        <span>搜索结果：{{length}}条</span>
      </div>
      <ul class="slnewsconlist">
      <li v-for="(item,index) in page.list">
      <span>{{item.createDate}}</span>
      <router-link :to="{path:'/about/'+item.category.id+'/'+item.id}" v-html="item.title">{{item.title}}</router-link>
      </li>
      </ul>
      <div class="page-bar">
      <ul>
      <li v-if="cur>1">
      <router-link :to="{path:'/Search/'+keywords+'/'+(cur-1)}">上一页</router-link>
      </li>
      <li v-if="cur==1">
      <router-link :to="{path:'/Search/'+keywords+'/1'}">上一页</router-link>
      </li>
      <li v-for="index in indexs" :class="{ 'active': cur == index}" active-class="active">
      <router-link :to="{path:'/Search/'+keywords+'/'+index}">{{index}}</router-link>
      </li>
      <li v-if="cur!=all">
      <router-link :to="{path:'/Search/'+keywords+'/'+(cur+1)}">下一页</router-link>
      </li>
      <li v-if="cur == all">
      <router-link :to="{path:'/Search/'+keywords+'/'+all}">下一页</router-link>
      </li>
      <li><a>共<i>{{all}}</i>页</a></li>
      </ul>
      </div>
    </div>
    <Service></Service>
  </div>
</template>
<script>
  import Service from '@/pages/service'
  export default{
    name: 'search',
    data(){
      if (this.$route.params.keywords.replace(/\s/g, '') != '') {
        var pageNo=this.$route.params.pageNo;
        var search = this.HOST + "/frontPath/search?keywords=" + this.$route.params.keywords +'&pageNo='+pageNo;
        this.$axios.post(search).then(res => {
          this.keywords = res.data.keywords;
          this.page=res.data.page;
          this.length=this.page.list.length;
          this.btnClick(parseInt(pageNo));
          this.all=this.page.pages;
        }).catch(error => {
          console.log(error);
        })//捕获错误信息
      } else {
        alert("请输入搜索内容")
      }
      return {
        all: 0, //总页数
        cur: 1,//当前页码
        page: '',
        keywords: '',
        length:''
      }
    },
    components: {
      Service
    },
    watch: {
      '$route' (to, from) { //监听路由是否变化
        if (this.$route.params.keywords || this.$route.params.pageNo) {
            var pageNo=this.$route.params.pageNo;
            var search = this.HOST + "/frontPath/search?keywords=" + this.$route.params.keywords+'&pageNo='+pageNo;
            this.$axios.post(search).then(res => {
              this.keywords = res.data.keywords;
              this.page=res.data.page;
              this.length=this.page.list.length;
              this.btnClick(parseInt(pageNo));
              this.all=this.page.pages;
            }).catch(error => {
              console.log(error);
            })//捕获错误信息
        }
      }
    },
    computed: {
      indexs: function () {
        var left = 1;
        var right = this.all;
        var ar = [];
        if (this.all >= 5) {
          if (this.cur > 3 && this.cur < this.all - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.all
              left = this.all - 4
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
      }
    },
    methods: {
      btnClick: function (data) {//页码点击事件
        if (data != this.cur) {
          this.cur = data
        }
      }
    },
  }
</script>
<style scoped>
  .page-bar {
    padding-bottom: 50px;
    width: 1050px;
    margin: 0px auto;
    text-align: center;
  }
  .page-bar ul {
    margin: 0px auto;
    display: inline-block;
  }
  .page-bar ul li {
    list-style: none;
    float: left;
  }
  .page-bar li:first-child > a {
    margin-left: 0px
  }
  .page-bar a {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
  }
  .page-bar a:hover {
    background-color: #eee;
  }
  .page-bar a.banclick {
    cursor: not-allowed;
  }
  .page-bar li.active a {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
  .search-top {
    border-bottom: 2px solid #014a85;
    min-height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }
  .search-top span {
    display: block;
    float: left; margin-right: 20px;
    font-size: 16px;
    color: #014a85;
    font-weight: bold;
  }
  .slnewsconlist {
  padding: 10px 20px;
  font-size: 15px; width: 98%; margin-top: 20px;
  }
  .slnewsconlist li:nth-child(4n+4) {
  border-bottom: 1px solid #d7d7d7;
  }
  .slnewsconlist li {
  line-height: 40px;
  height: 40px;
  width: 100%;
  }
  .slnewsconlist li:hover {
  text-decoration: underline;
  }
  .slnewsconlist li a {
  display: block;
  width: 800px;
  float: left;
  height: 36px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: url(../assets/image/square.png) no-repeat left;
  padding-left: 15px;
  }
  .slnewsconlist li a:hover {
  background: url(../assets/image/square2.gif) no-repeat left;
  text-decoration: underline;
  color: #3582c4;
  }
  .slnewsconlist li span {
  color: #999;
  font-size: 14px;
  float: right;
  width: 100px;height: 30px; overflow: hidden;
  }

</style>
