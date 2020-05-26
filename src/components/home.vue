<template>
  <div>
    <!--滚动的新闻-->
    <div class="w1200">
      <div class="containeryy wyy" style=" border-bottom: 3px solid #2c6ec2;">
        <span style="display: block; float: left;padding: 9px 5px; background: #1971cb; position: relative; z-index: 999; color: #fff;">最<br>新</span>
        <div class="marquee">
          <ul class="marquee-content-items">
            <li v-for="(item,index) in newPaoMa">
              <router-link :to="{path:'/about/'+item.category.id+'/'+item.id}">{{ item.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <!--通知公告-->
    <div class="w1200" style="overflow: hidden; margin-top: 15px;">
      <div class="announcements box_shadow">
        <div class="bt-h2">
          <span>通知公告</span>
          <router-link :to="{path:'/message/80b46563f5dd43a5888edc0fcb65c3d4'+'/1'}">查看更多</router-link>
        </div>
        <ul class="tz-ul">
          <li v-for="(newtg,index) in newlist">
            <router-link :to="{path:'/about/'+newtg.category.id+'/'+newtg.id}">{{ newtg.title }}</router-link>
            <span>{{ newtg.createDate }}</span>
          </li>
        </ul>
      </div>
      <div class="registerbbox">
        <div class="bt-h3" style="border-bottom: 3px solid #2c6ec2;">
          <span>新手指引</span>
          <a href="#/guidelines"></a>
        </div>
        <div class="tl_p_10 box_shadow">
          <div class="reg-icon">
            <a href="https://tljc.rrdis.nra.gov.cn/#/account/register" target="_blank">
              <img src="../assets/image/zc-icon.png"/>
              <span class="span1">快速注册</span>
            </a>
          </div>
          <div class="reg-icon">
            <a href="https://tljc.rrdis.nra.gov.cn/#/Tab2" target="_blank">
              <img src="../assets/image/dl-icon.png"/>
              <span class="span2">立即登录</span>
              <span class="span3">(已有账号)</span>
            </a>
          </div>
        </div>
        <!--<div><a href="#/guidelines"><img style="padding-top: 10px; display: block" src="../assets/image/xszy-bj.jpg"/></a></div>-->
      </div>
    </div>
    <!--首页轮播图-->
    <div class="w1200" style="margin-top: 15px;">
      <div id="focus" class="focus">
        <ul>
          <li><a><img src="../assets/image/a1.jpg"/></a></li>
          <li><a><img src="../assets/image/a2.jpg"/></a></li>
          <li><a><img src="../assets/image/a3.jpg"/></a></li>
        </ul>
      </div>

    </div>
    <div class="clear"></div>
    <!--政策法规-->
    <div class="w1200" style="margin-top: 15px;">
      <div class="zcfg box_shadow fl">
        <div class="bt-h2">
          <span>政策法规</span>
          <router-link :to="{path:'/message/1c5b0a42ae824d419574c10dd4f5481d'+'/1'}">查看更多</router-link>
        </div>
        <div class="zcfg-icon fl">
          <ul>
            <li>
              <span>法律法规</span>
            </li>
            <li>
              <span>规章</span>
            </li>
            <li>
              <span>规范性文件</span>
            </li>
            <li>
              <span>管理制度</span>
            </li>
          </ul>
        </div>
        <section class="cpx fl">
          <template id="tab">
            <div class="tabbox">
              <ul class="tab-nav">
                <li v-for="(value, index) in newLanMu" :class="{active: index == num }" @mouseover="toggle(index)">
                  {{value.name}}
                </li>
              </ul>
            </div>
            <div class="content">
              <div class="box">
                <ul class="tz-ul1" v-for="(value,index) in tabContents" v-show="index == num">
                  <li v-for="(item,index) in value">
                    <router-link :to="{path:'/about/'+item.category.id+'/'+item.id}">
                      <div class="blog_title">{{item.title}}</div>
                      <span>{{item.createDate}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </section>
      </div>
      <div class="zxcx fr">
        <div class="bt-h2">
          <span>在线查询</span>
        </div>
        <ul class="zx-cx">
          <li><router-link :to="{path:'/message/drivcx'}"><img src="../assets/image/cx-img1.jpg"></router-link>
         </li>
          <li><a href=""><img src="../assets/image/cx-img2.jpg"></a></li>
        </ul>
      </div>
    </div>
    <div class="clear"></div>
    <Service></Service>
  </div>

</template>
<script>
  import Service from '@/pages/service'
  export default{
    name: 'home',
//    inject:['reload'],
    data(){
      return {
        num: 0,
        tabItem: "",
        tabContent: "",
        newLanMu: [],
        tabContents: [],
        newlist: [],
        newPaoMa: []
      }
    },
    methods: {
      //切换滑块
      toggle: function (index) {
        this.num = index;
      }
    },
      components: {
      Service
    },
    created(){
//      this.reload();
      var urlGongGao = this.HOST + "/frontPath/indexGongGao";
      this.$axios.get(urlGongGao)
        .then(res=>{
          this.newlist = res.data;
        })
        .catch(error=>{
          console.log(error);
        });

      var urlPaoMa = this.HOST + "/frontPath/indexPaoMa?categoryId=75cb5fdfb8ce472b9bf242e3c1d8247e";
      this.$axios.get(urlPaoMa)
        .then(res=>{
          this.newPaoMa = res.data;
          $(function () {
            createMarquee({});
          });//跑马灯
        })
        .catch(error=>{
          console.log(error);
        });
      var indexLanMu = this.HOST + "/frontPath/indexLanMu?parentId=1c5b0a42ae824d419574c10dd4f5481d";
      this.$axios.get(indexLanMu).then(res=>{
          this.newLanMu = res.data;
          if (this.newLanMu != undefined && this.newLanMu != null && this.newLanMu.length > 0) {
            var ids = new Array();
            for (var i = 0; i < this.newLanMu.length; i++) {
              ids.push(this.newLanMu[i].id);
            }
            console.log(ids);
            var indexQieHuan = this.HOST + "/frontPath/indexQieHuan";
            this.$axios.get(indexQieHuan, {
              params: {
                categoryIds: ids
              }
            }).then(res=>{
                this.tabContents = res.data;
              })
              .catch(error=>{
                console.log(error);
              });
          }
        })
        .catch(error=>{
          console.log(error);
        })
    }
  }
</script>
<style scoped>
  .bg{ border: 1px solid #f00;}
  .zxcx {
    width: 380px;
    background: #fff;
    height: 400px;
  }

  ul.zx-cx {
    width: 98%;
    margin-top: 20px;
    margin-left: 10px;
  }

  ul.zx-cx li {
    margin: 23px auto;
  }

  .bt-h2 {
    width: 100%;
    border-bottom: 4px solid #b8bfc9;
  }

  .bt-h2 span {
    height:45px;
    display: inline-block;
    padding: 0 10px;
    font-size: 22px;
    font-weight: bold;
    /*line-height:45px;*/
    background: url(../assets/image/nra_moredown.gif) no-repeat bottom; position: relative; bottom: -11px; padding-bottom: 50px;
    /*border-top-left-radius: 3px;*/
    /*border-top-right-radius: 3px;*/
    /*background: #0263b1;*/
    /*color: #fff;*/
    color: #253856;
    /*margin: 5px 0px 0px 0px;*/
  }
  .bt-h3 {
    width: 100%;
    border-bottom: 4px solid #b8bfc9; overflow: hidden;
  }

  .bt-h3 span {
    height:45px;
    display: inline-block;
    padding: 0 10px; float: left;
    font-size: 22px;
    font-weight: bold;
    /*line-height:45px;*/
    position: relative; bottom: -11px; padding-bottom: 50px;
    /*border-top-left-radius: 3px;*/
    /*border-top-right-radius: 3px;*/
    /*background: #0263b1;*/
    /*color: #fff;*/
    color: #253856;
    /*margin: 5px 0px 0px 0px;*/
  }
  .bt-h3 a {
    text-indent: -999em;
    background: url(../assets/image/nra_more.gif) no-repeat;
    width: 29px;
    height: 27px;
    float: right;
    margin-top: 14px;
    margin-right: 10px;
  }
  .bt-h2 a {
    text-indent: -999em;
    background: url(../assets/image/nra_more.gif) no-repeat;
    width: 29px;
    height: 27px;
    float: right;
    margin-top: 14px;
    margin-right: 10px;
  }

  .bt-h2 a:hover {
    color: #f00;
  }

  .reg-icon {
    float: left;
    width: 50%;
    margin-top: 20px;
  }

  .reg-icon img {
    width: 100px;
    height: 100px;
    margin: 0px auto;
    text-align: center;
  }

  .reg-icon span {
    display: block;
    font-size: 18px;
  }

  .reg-icon .span1 {
    font-size: 18px;
    color: #e7c183;
    margin: 10px auto;
  }

  .reg-icon .span2 {
    font-size: 18px;
    color: #8dc89a;
    margin: 10px auto;
  }

  .reg-icon .span3 {
    font-size: 14px;
    color: #b3b1b1;
  }

  .reg-icon a:hover {
    font-weight: bold
  }

  ul.tz-ul {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #fff;
    padding-left: 10px;
    padding-top: 11px;
  }

  ul.tz-ul li {
    width: 49%;
    height: 48px;
    font-size: 16px;
    float: left;
    line-height: 48px;
    overflow: hidden;border-bottom: 1px #F1F1F1 solid;
  }

  ul.tz-ul li a {
    display: block;
    width: 75%;
    height: 48px;
    background: url(../assets/image/square2.gif) left center no-repeat;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    float: left;
    padding-left: 12px;
    line-height: 48px;
    color: #333;
  }

  ul.tz-ul li a:hover {
    color: #3582c4;
    text-decoration: underline;
    background-image: url(../assets/image/square.png)
  }

  ul.tz-ul li span {
    width:80px; overflow: hidden;
    line-height: 48px;
    font-size: 14px;
    color: #999999;
    float: right;
    margin-right: 10px;
  }

  /*announcements*/
  .announcements {
    margin-right: 10px;
    width: 820px;
    float: left;
    background: #fff;
  }

  .announcements ul.dates {
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 10px;
    height: 215px;
  }

  .announcements ul.dates li {
    overflow: hidden;
    float: left;
    width: 440px;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    /*border-bottom: 1px solid #ddd;*/
  }

  .announcements ul.dates > li > .date_d {
    width: 100px;
    height: 94px;
    float: left;
    text-align: center;
  }

  .announcements ul.dates > li > .date_d > span {
    display: block;
    background: #99CC66;
    font-weight: bold;
    font-size: 20px;
    height: 82px;
    color: #fff;
    margin-top: 6px;
  }

  .announcements ul.dates > li > .date_d > span > strong {
    display: block;
    line-height: 55px;
    background: #3582c4;
    color: #fff;
    font-size: 30px;
  }

  .announcements ul.dates > li > .date_p {
    float: left;
    width: 340px;
    height: 94px;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .announcements ul.dates > li > .date_p > a {
    display: block;
    text-align: left;
  }

  .announcements ul.dates > li > .date_p > a > h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 45px;
    letter-spacing: 1px;
    color: #333;
  }

  .announcements ul.dates > li > .date_p > a > h3:hover {
    color: #ff0000;
  }

  .announcements ul.dates > li > .date_p > p {
    height: 38px;
    font-size: 14px;
    text-align: left;
    color: #9e9e9e;
    letter-spacing: 1px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
  }

  .registerbbox {
    width: 380px;
    height: 263px;
    background-color: #fff;
    text-align: center; float: right;
  }

  .registerbbox .register_btn {
    margin-top: 40px;
  }

  .registerbbox .register_btn button {
    margin: 20px 0;
    padding: 10px 110px;
    border: none;
    background: #f79131;
    font-size: 20px;
    border-radius: 2px;
  }

  .registerbbox .register_btn button a {
    color: #fff;
  }

  .registerbbox .register_p {
    margin-top: 10px;
  }

  .registerbbox .register_p span {
    font-size: 14px;
  }

  .registerbbox .register_p span a {
    color: red;
  }

  /*announcements*/
  .more {
    right: 10px;
    top: 10px;
  }

  .more a {
    font-size: 14px;
    color: #999;
  }

  .more a:hover {
    color: red;
  }

  .zcfg {
    width: 820px;
    margin-right: 10px;
    background: #fff;
    height: 430px;
    overflow: hidden;
  }
  .zcfg-icon{ margin-top: 10px;}

  .zcfg-icon ul li:nth-child(1){
    width: 193px; height: 75px;
    background: url(../assets/image/zcfg-icon1.jpg) no-repeat;
    border-radius: 3px;
  }
  .zcfg-icon ul li:nth-child(2){
    width: 193px; height: 75px;
    background: url(../assets/image/zcfg-icon2.jpg) no-repeat;
    border-radius: 3px;
  }
  .zcfg-icon ul li:nth-child(3){
    width: 193px; height: 75px;
    background: url(../assets/image/zcfg-icon3.jpg) no-repeat;
    border-radius: 3px;
  }
  .zcfg-icon ul li:nth-child(4){
    width: 193px; height: 75px;
    background: url(../assets/image/zcfg-icon4.jpg) no-repeat;
    border-radius: 3px;
  }

  .zcfg-icon ul li {
    margin: 8px 10px 14px 0px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  /*.zcfg-icon ul li i {*/
    /*display: block;*/
    /*font-size: 33px;*/
  /*}*/

  .zcfg-icon ul li span {
    display: block;
    font-size: 16px;
    float: right; line-height: 75px;
    padding-right: 18px; color: #1567BB;
  }

  .cpx {
    width: 600px;
  }

  .tabbox .tab-nav {
    height: 33px; margin-top: 10px;
  }
  .tabbox ul li {
    line-height: 33px;
    display: block;
    float: left;
    padding: 5px 0;
    text-decoration: none;
    color: #94A3B4;
    margin: 0 1px;
    font-size: 16px;
    font-family: "微软雅黑";
    border-radius: 2px 2px 0 0;
    -moz-opacity: 0.8;
    -khtml-opacity: 0.8;
    opacity: 0.9;
    width: 145px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;position: relative;bottom: 3px;
  }

  .tabbox ul li:hover {
    color: #fff;background: url(../assets/image/nra_tit_110.gif) bottom no-repeat;
  }

  .tabbox ul li.active {
    color: #fff;background: url(../assets/image/nra_tit_110.gif) bottom no-repeat;

  }

  ul.tz-ul1 {
    width: 100%;
    height: 310px;
    padding-left: 10px;
    overflow: hidden
  }

  ul.tz-ul1 li {
    width: 100%;
    height: 48px;overflow: hidden;
    font-size: 16px;
    float: left;
    margin-top: 3px; border-bottom: 1px #F1F1F1 solid;
  }

  ul.tz-ul1 li a {
    display: inline-block;
    background: url(../assets/image/square2.gif) left center no-repeat;
    color: #333;
    width: 99%;
  }

  ul.tz-ul1 li a .blog_title {
    float: left;
    width: 80%;
    height: 48px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 12px;
    line-height: 48px;
  }

  ul.tz-ul1 li a .blog_title:hover {
    text-decoration: underline;
  }

  ul.tz-ul1 li a:hover {
    color: #3582c4;
    background-image: url(../assets/image/square.png);
  }

  ul.tz-ul1 li span {
    font-size: 14px;
    line-height: 48px;
    height: 48px; overflow: hidden;width: 100px;
    color: #999999;
    float: right;
    margin-left: 10px; text-align: right;
  }


</style>
