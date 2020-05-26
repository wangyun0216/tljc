<template>
  <div>
    <div class="w1200 message box_shadow mg15" style="margin-top: 30px;">
      <div class="clear"></div>
      <div class="subnavl fl">
        <div style="background: #1870cc; height: 50px;">
          <span>{{category.name}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in leftnav" >
          <p v-if="item.url.indexOf('list-')==0" ><router-link active-class="active" :to="{path:'/message/'+item.url+'/1'}" :key="index" >{{item.name}}</router-link></p>
          <p v-if="item.url.indexOf('list-')==-1 && item.url.indexOf('http')==0"><a :href="item.url">{{ item.name }}</a></p>
          <p v-if="item.url.indexOf('list-')==-1 && item.url.indexOf('http')==-1"><router-link active-class="active" :to="{path:'/message111/'+item.url}" :key="index" >{{item.name}}</router-link></p>
          </li>
        </ul>
      </div>
      <div class="newscontain">
        <div class="list-wz" style=" float: left;"><span>您现在的位置：</span><a href="/"> 首页</a> > <a>{{category.name}}</a></div>
        <div class="clear"></div>
        <h2>{{category.name}}</h2>
        <ul class="slnewsconlist">
          <li v-for="(item,index) in messlist">
            <span>{{item.createDate}}</span>
            <router-link :to="{path:'/about/'+item.category.id+'/'+item.id}">{{item.title}}</router-link>
          </li>
        </ul>
        <div class="page-bar" v-show="page">
          <ul>
            <li v-if="cur>1">
              <router-link :to="{path:'/message/list-'+category.id+'/'+(cur-1)}">上一页</router-link>
            </li>
            <li v-if="cur==1">
              <router-link :to="{path:'/message/list-'+category.id+'/1'}">上一页</router-link>
            </li>
            <li v-for="index in indexs" :class="{ 'active': cur == index}" active-class="active">
              <router-link :to="{path:'/message/list-'+category.id+'/'+index}">{{index}}</router-link>
            </li>
            <li v-if="cur!=all">
              <router-link :to="{path:'/message/list-'+category.id+'/'+(cur+1)}">下一页</router-link>
            </li>
            <li v-if="cur == all">
              <router-link :to="{path:'/message/list-'+category.id+'/'+all}">下一页</router-link>
            </li>
            <li><a>共<i>{{all}}</i>页</a></li>
          </ul>
        </div>
      </div>
    </div>
    <Service></Service>
  </div>
</template>
<script>
  import Service from '@/pages/service'
  export default{
    name: 'message',
    data(){
      return {
        leftnav: [],
        category:'',
        messlist: [],
        all: 0, //总页数
        cur: 1,//当前页码
        page:''
      }
    },
    watch: {
      '$route' (to, from) { //监听路由是否变化
        if (this.$route.params.url || this.$route.params.pageNo) {// 判断条件1  判断传递值的变化
          //获取文章数据
          var categoryId = (this.$route.params.url).replace("list-","");
          var pageNo=this.$route.params.pageNo;
          var url = this.HOST + "/frontPath/list?categoryId=" + categoryId+'&pageNo='+pageNo;
          this.$axios.get(url).then(res=> {
            var state = res.data.state;
            if (state == "success") {
              this.leftnav= res.data.categoryList;
              this.category=res.data.category;
              for (var i = 0; i < this.leftnav.length; i++) {
                this.leftnav[i].url = (this.leftnav[i].url).replace('/f/', '');
                this.leftnav[i].url = (this.leftnav[i].url).replace('.html', '');
              }
              this.messlist=res.data.list;
              this.page=res.data.page;
              if(this.page!=undefined){
                this.btnClick(parseInt(pageNo));
                this.all=this.page.pages;
              }
            } else {
              alert('错误提示');
            }
          })//拿数据
            .catch(error => {
              console.log(error);
            })//捕获错误信息
        }
      }
    },
    components: {
      Service
    },
    created(){
      var categoryId = (this.$route.params.url).replace("list-","");
      var pageNo=this.$route.params.pageNo;
      var url = this.HOST + "/frontPath/list?categoryId=" + categoryId+'&pageNo='+pageNo;
      this.$axios.get(url).then(res=> {
      var state = res.data.state;
      if (state == "success") {
        this.leftnav= res.data.categoryList;
        this.category=res.data.category;
        for (var i = 0; i < this.leftnav.length; i++) {
          this.leftnav[i].url = (this.leftnav[i].url).replace('/f/', '');
          this.leftnav[i].url = (this.leftnav[i].url).replace('.html', '');
        }
        this.messlist=res.data.list;
        this.page=res.data.page;
        if(this.page!=undefined){
          this.btnClick(parseInt(pageNo));
          this.all=this.page.pages;
        }
      } else {
        alert('错误提示');
      }
      })//拿数据
        .catch(error => {
          console.log(error);
        })//捕获错误信息
  },
    computed: {
      indexs: function(){
        var left = 1;
        var right = this.all;
        var ar = [];
        if(this.all>= 5){
          if(this.cur > 3 && this.cur < this.all-2){
            left = this.cur - 2
            right = this.cur + 2
          }else{
            if(this.cur<=3){
              left = 1
              right = 5
            }else{
              right = this.all
              left = this.all -4
            }
          }
        }
        while (left <= right){
          ar.push(left)
          left ++
        }
        return ar
      }
    },
    methods: {
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
      }
    }
  }
</script>

<style scoped>
  .message {
    min-height: 800px;
    overflow: hidden;
  }
  .list {
    background: #fff;
    margin-top: 10px;
    box-shadow: 1px 0px 12px #c1c0c0;
  }
  .list-wz {
    font-size: 14px;
    line-height: 48px;
    padding-left: 19px;
    color: #666;
    border-bottom: 2px solid #1870cc;
    width: 100%;
  }
  .list-wz span {
    background: url(../assets/image/position.png) no-repeat left center;
    float: left;
    display: block;
    padding-left: 18px;
  }
  .list-wz a:hover {
    color: #3582c4;
  }
  .subnavl {
    width: 210px;
    background: #ecebeb;
  }
  .subnavl span {
    font-size: 22px;
    color: #666;
    height: 50px;
    line-height: 50px;
    margin: 0px auto;
    display: block;
    text-indent: 32px;
    color: #fff;
  }
  .subnavl ul {
    margin-top: 20px;
  }
  .subnavl ul li {
    line-height: 60px;
    font-size: 16px;
    text-align: left;
    text-indent: 28px;
    color: #666;
    border-left: 3px solid #ecebeb;
  }
  .subnavl ul li:hover {
    border-left: 3px solid #3582c4;
    background: #fff;
    color: #3582c4;
    font-size: 16px;
  }
  .subnavl ul li p a.active {
    display: block;
    border-left: 3px solid #3582c4;
    background: #fff;
    color: #3582c4;
    font-size: 16px;
    font-weight: bold;
  }
  .newscontain {
    float: left;
    background: #fff;
    width: 1010px;
    min-height: 800px;
  }
  .newscontain h2 {
    text-indent: 20px;
    font-size: 24px;
    color: #333333;
    border-left: 3px solid #3582c4;
    margin: 15px 20px;
  }
  .slnewsconlist {
    padding: 10px 20px;
    font-size: 15px;
  }
  .slnewsconlist li:nth-child(4n+4) {
    border-bottom: 1px solid #d7d7d7;
  }
  .slnewsconlist li {
    line-height: 40px;
    height: 40px;
    width: 1000px;
  }
  .slnewsconlist li:hover {
    text-decoration: underline;
    width: 1000px;
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
    background: url(../assets/image/square2.gif) no-repeat left;
    padding-left: 15px;
  }
  .slnewsconlist li a:hover {
    background: url(../assets/image/square.png) no-repeat left;
    text-decoration: underline;
    color: #3582c4;
  }
  .slnewsconlist li span {
    color: #999;
    font-size: 14px;
    float: right;
    width: 100px;height: 30px; overflow: hidden;
  }
  .page-bar{
    padding-bottom: 50px; width: 1050px; margin: 0px auto; text-align: center;
  }
  .page-bar ul{ margin: 0px auto;display: inline-block;}
  .page-bar ul li{
    list-style: none; float: left;
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a{
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
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar a.banclick{
    cursor:not-allowed;
  }
  .page-bar li.active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }

</style>
