<template>
  <div>
    <div >
      <!--v-if="navlist==1"-->
      <div class="top">
        <div class="login_register w1200" style=" text-align:right; color:#fff;">
          <div class="fl" style="padding-top:15px;">
            <span id="welcome">欢迎您来到铁路机车车辆驾驶资格信息网站！</span>
            <span id="time">{{nowTime}}</span>
          </div>
          <div class="top-rt fr">
            <ul>
              <li><a href="#/guidelines">新手指引</a></li>
              <li><a href="https://tljc.rrdis.nra.gov.cn/#/account/register" target="_blank">个人注册</a></li>
              <li><a href="https://tljc.rrdis.nra.gov.cn/#/Tab2" target="_blank">个人登录</a></li>
              <!--<li><a href="https://tljc.nra.gov.cn/f/goUserQiYeRegister" target="_blank">企业注册</a></li>-->
              <li><a href="https://cmsservice.nra.gov.cn:8090/" target="_blank">企业登录</a></li>
              <li><a href="http://www.nra.gov.cn/CertInstall/CertInstall.zip" target="_blank">下载CA证书</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="ha-header-front w1200">
        <div class="menu_logo fl">
          <a href="/"><img src="../assets/image/logo_new.png"/></a>
        </div>
        <div class="search_box fr">
          <div class="search">
              <input type="text" id="keywords" v-model="keywords"  placeholder="请输入搜索内容" style="width: 180px;height: 100%;display: inline-block">
              <button class="iconSear fa fa-search" @click="routerTo()">搜索</button>
          </div>
        </div>
      </div>
      <nav class="nav1 navbar navbar-default w1200" style="background:#1F4A99;">
        <div class="collapse navbar-collapse" >
          <ul class="nav navbar-nav">
            <li class="dropdown_sy"><a href="/" style="line-height: 55px; padding: 0px !important;">首页</a></li>
            <li class="dropdown" v-for="(item,index) in configNav" :key="index">
              <span v-if="item && item.url.indexOf('list-')==0"><router-link :to="{path:'/message/'+item.url+'/1'+'?time='+timestamp}">{{item.name}}</router-link></span>
              <!--<span v-if="item && item.url.indexOf('list-')==-1"><router-link :to="{path:'/message11/'+item.url+'/1'}">{{ item.name }}</router-link></span>-->
              <!--<b class="caret"></b>-->
                <ul class="dropdown-menu" >
                <li v-for="nav in item.childList" >
                  <p v-if="item && nav.url.indexOf('list-')==0"><router-link :to="{path:'/message/'+nav.url+'/1'+'?time='+timestamp}">{{ nav.name }}</router-link></p>
                  <p v-if="item && nav.url.indexOf('list-')==-1 && nav.url.indexOf('http')==0"><a :href="nav.url">{{ nav.name }}</a></p>
                  <p v-if="item && nav.url.indexOf('list-')==-1 && nav.url.indexOf('http')==-1"><router-link :to="{path:'/message/'+nav.url}">{{ nav.name }}</router-link></p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <!--<div  v-if="navlist==2">-->
    <!--ndjdsasj-->
    <!--</div>-->
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    name: 'topnav',
    data() {
      $(function () {
        $(".dropdown").mouseover(function () {
          $(this).addClass("open");
        });
        $(".dropdown").mouseleave(function () {
          $(this).removeClass("open");
        })
      });
      return {
        keywords:'',
        configNav: ['','','','','','',''],
        timestamp:(new Date()).valueOf(),
      }
    },
    created(){
      var url = this.HOST + "/frontPath/topNav";
      this.$axios.get(url)
        .then(res => {
          this.configNav = res.data;
          var topurl = this.HOST + "/frontPath/getData?categoryId=1";
          this.$axios.get(topurl)
            .then(res2 => {
              for (var i = 0; i < this.configNav.length; i++) {
                this.configNav[i].url = (this.configNav[i].url).replace('/f/','');
                this.configNav[i].url = (this.configNav[i].url).replace('.html','');
                console.log(this.configNav[i].url);
                for (var j = 0; j < res2.data.length; j++) {
                  if (this.configNav[i].id == res2.data[j].parentId) {
                    res2.data[j].url = (res2.data[j].url).replace('.html','');
                      if(res2.data[j].url.indexOf('http')){
                        res2.data[j].url = (res2.data[j].url).replace('/f/','');
                      }
                      this.configNav[i].childList.push(res2.data[j]);
                  }
                }
              }
            })
            .catch(error => {
              console.log(error);
            })
        })
        .catch(error => {
          console.log(error);
        })
      this.nowTimes();
    },
    methods: {
      routerTo(){
        if (this.keywords.replace(/\s/g, '') != '') {
          this.$router.push({name: 'Search', params: {keywords:this.keywords,pageNo:1}});
        } else {
          alert("请输入搜索内容")
        }
      },
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
//        let aweek = new Array("日", "一", "二", "三", "四", "五", "六");
//        let week = new Date().getDay();
//        let str = "星期"+ aweek[week];
        this.nowTime = year + "年" + month + "月" + date +"日";
      },
      // 定时器函数
      nowTimes(){
        this.timeFormate(new Date());
        setInterval(this.nowTimes,30*1000);
      },
    },
    mounted(){
      this.nowTimes();
    }
}
</script>

<style scoped>
  .nav {
    width: 100%; height: 55px;
  }
  .nav li {
    width: 14%;
    text-align: center;
  }
  .navbar-default .navbar-nav>li>a{ color:#fff;}
  .nav li a {
    font-size: 16px;
    color: #fff;
  }
  .nav li span{ line-height: 55px;}
  .nav li:hover {
    background: #fff;color: #2196F3;
  }
  .nav li a:hover {
    color: #2196F3;
  }
  .navbar {
    border-radius: 0px !important;
    border: none; margin-top: 15px; margin-bottom: 0px !important;
  }
  .dropdown{
    line-height: 54px;
    background: url(../assets/image/nra_headline.gif) right 22px no-repeat;
  }
  .dropdown:nth-child(6){
    background:none;
  }
  .dropdown_sy{
    line-height: 54px;
    background: url(../assets/image/nra_headline.gif) right 22px no-repeat;
  }
  .dropdown-menu {
    min-width: 240px; position: absolute; top: 40px;
    border: none;
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }
  .dropdown-menu:hover {
    transform: translate(0, 5px);
    -webkit-transform: translate(0, 5px);
    -moz-transform: translate(0, 5px);
    -o-transform: translate(0, 5px);
    -ms-transform: translate(0, 5px);
  }
  .dropdown-menu li:hover {
    background: #fff;
  }
  .dropdown-menu li {
    color: #00539f;
    text-align: center;
    display: block;
    width: 100%;
  }
  .dropdown-menu li p{
    margin:0px 30px; line-height: 30px !important;
  }
  .dropdown-menu li a {
    font-size: 16px;
    color: #00539f;
    display: block;
    float: left;
    text-align: left;
    margin: 10px 0px;
    width: 100%;
  }
  .dropdown-menu li a:hover {
    font-weight: bold;
  }
  .navbar-collapse {
    padding-left: 0px;
  }
  .navbar-default .navbar-nav .open a {
    background: #fff; color: #00539f;
  }
  .navbar-default .navbar-nav .open a:hover {
    background: #fff;
  }
  .navbar-default .navbar-nav > li > a:focus, .navbar-default .navbar-nav > li > a:after {
    color: #333;
    background: #fff;
  }
  .top {
    width: 100%;
    height: auto;
    overflow: hidden;
    /*background: #1F4A99;*/
  }
  .login_register {
    width: 100%;
    height: 45px;
  }
  .top-rt ul li {
    float: left;
    line-height: 45px;
    margin-left: 15px;
  }
  .top-rt ul li a {
    color: #fff;
    font-size: 16px;
  }
  .ha-header-front {
    clear: both;
    height: 100px;
    overflow: hidden;
    margin-top: 10px;
  }
  .ha-header-front .menu_logo {
    width: 600px;
    height: 99px;
    z-index: 1;
    margin: 5px 0px;

  }
  .ha-header-front .menu_logo img {
    height:68px;
    float: left;
  }
  #welcome {
    background: url(../assets/image/home.png) no-repeat left;
    text-indent: 50px;
    padding-left: 30px;
    font-size: 14px;
  }
  .top span {
    margin: 0 4px;
  }
  .search {
    background: white;
    padding: 0px 0px 0px 15px;
    /*border-radius: 5px;*/
    border: 1px solid #1971cb;
    display: inline-block;
    margin-top: 17px;
  }
  .search input {
    width: 190px;
    height: 35px;
    border: none;
    font-size: 14px; background: #fff;
  }
  .search  button {
    height: 35px;
    padding: .5em 1em;
    border: none;
    color: #fff;
    /*background: -webkit-gradient(linear, left top, left bottom, color-stop(18%, #f6c83c), color-stop(87%, #edac30));*/
    background-color: #1971cb;
    margin-right: -1px;
  }

</style>
