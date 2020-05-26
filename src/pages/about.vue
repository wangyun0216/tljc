<template>
  <div>
    <div class="w1200 message box_shadow mg15" style="margin-top: 30px;">
      <div class="clear"></div>
      <div class="subnavl fl">
        <div style="background: #1870cc; height: 50px;">
          <span>{{category.name}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in leftnav">
            <p v-if="item.url.indexOf('list-')==0" ><router-link active-class="active" :to="{path:'/message/'+item.url+'/1'}" :key="index" >{{item.name}}</router-link></p>
            <p v-if="item.url.indexOf('list-')==-1 && item.url.indexOf('http')==0"><a :href="item.url">{{ item.name }}</a></p>
            <p v-if="item.url.indexOf('list-')==-1 && item.url.indexOf('http')==-1"><router-link active-class="active" :to="{path:'/message111/'+item.url}" :key="index" >{{item.name}}</router-link></p>
          </li>
        </ul>
      </div>
      <div class="newscontain">
        <div class="list-wz" style=" float: left;"><span>您现在的位置：</span><a href="/"> 首页</a> > <a href="#">通知公告</a> > <a href="#">{{category.name}}</a></div>
        <div class="clear"></div>
        <div class="about">
          <div class="zz-bt">
            <div class="about-bt">{{article.title}}</div>
            <div class="about-time"><span>发布时间：{{article.createDate}}</span> <span>来源：{{article.articleData.copyfrom}}</span></div>
          </div>
          <div class="about-nn" v-html="article.articleData.content">
            {{article.articleData.content}}
          </div>
        </div>
      </div>
    </div>
    <Service></Service>
  </div>
</template>
<script>
  import Service from '@/pages/service'
  export default{
    name:'about',
    data(){
      return{
        article:{articleData:''},
        category:'',
        leftnav:[],
      }
    },
    components:{
      Service
    },
    created(){
      var url=this.HOST + "/frontPath/view?categoryId="+this.$route.params.categoryId+"&contentId="+this.$route.params.contentId;
      this.$axios.get(url)
        .then(res=> {
          var state=res.data.state;
          if(state == "success"){
             this.leftnav= res.data.categoryList;
             this.article=res.data.article;
             this.category=res.data.category;
            for (var i = 0; i < this.leftnav.length; i++) {
              this.leftnav[i].url = (this.leftnav[i].url).replace('/f/', '');
              this.leftnav[i].url = (this.leftnav[i].url).replace('.html', '');
//            console.log(this.leftnav[i].url);
            }
          }else{
              alert('错误提示');
          }
        })//拿数据
        .catch(error => {
          console.log(error);
        })//捕获错误信息
    }

  }
</script>

<style scoped>

  .message{  min-height: 800px; overflow: hidden;}

  .list{ background: #fff; margin-top: 10px; box-shadow: 1px 0px 12px #c1c0c0; }

  .list-wz {
    font-size: 14px;
    line-height: 48px;
    padding-left: 19px;
    color: #666;
    border-bottom: 2px solid #1870cc;
    width: 100%;
  }
  .list-wz span{background: url(../assets/image/position.png) no-repeat left center; float: left; display: block; padding-left: 18px;}

  .list-wz a:hover{ color: #3582c4; }

  .subnavl{ width:210px;background:#ecebeb;}

  .subnavl span {
    font-size: 22px;
    color: #666;
    height:50px; line-height:50px;
    margin:0px auto;
    display: block;
    text-indent: 32px;
    color: #fff;

  }
  .subnavl ul{ margin-top:20px;}

  .subnavl ul li{ line-height: 60px; font-size: 16px; text-align: left; text-indent: 28px; color: #666; border-left: 3px solid #ecebeb;}

  .subnavl ul li:hover { border-left: 3px solid #3582c4; background: #fff; color: #3582c4; font-size: 16px;}

  .subnavl ul li p a.active{  border-left: 3px solid #3582c4; background: #fff; color: #3582c4; font-size: 16px; font-weight: bold;}

  .newscontain {float: left;background: #fff;width: 1010px;  min-height: 800px;}
  .newscontain h2 {text-indent: 20px;font-size: 24px; color: #333333; border-left: 3px solid #3582c4; margin: 15px 20px;}
  .slnewsconlist {
    padding: 10px 20px;
    font-size: 15px;
  }
  .zz-bt{
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    padding-top: 15px; padding-bottom: 15px;
  }
  .about-bt{ font-size: 24px; line-height: 46px; padding-bottom: 5px;}
  .about-time{ line-height: 20px;}
  .about-time span{ margin:5px 20px; font-size: 14px; color: #999; }
  .about-nn{
    width: 90%;
    margin: 0px;
    margin: 30px 30px;
     font-size: 16px;
    line-height: 40px;
    padding-bottom: 150px;
    }

    .about-nn p img{ width: 100%;}

</style>
