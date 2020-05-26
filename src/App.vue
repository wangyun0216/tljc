<template>
  <div id="app" :class="classA">
    <Topnav/>
    <router-view v-if="isRouterAlive"/>
    <Footers/>
  </div>
</template>

<script>
  import Topnav from "@/components/topnav"
  import Footers from "@/components/footers"
export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      classA: 'contbj',
      isRouterAlive:true
    }
  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  components:{
    Topnav,
    Footers
  },

}
</script>

<style>
*{  padding:0px;margin:0px auto;}
.fl{ float: left;}
.fr{ float: right;}
img,input,button{ border: 0px; outline: 0;}
ul li{ list-style: none;}
a,a:hover,a:link{ text-decoration: none;}

body{ font-family: 微软雅黑; font-size: 14px; background: url(./assets/image/nra_headbg.jpg) top repeat-x;}
.clear{  clear: both;}
.D_inline_block{
  display: inline-block;
}
.box_shadow{
  /*box-shadow: 0 0 20px #ddd;*/
}
.o_hidden{
  overflow: hidden;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.bg{ border: 1px solid #f00;}
.w1200{
  width: 1220px !important;
  margin: 0px auto; }
.mg15{margin-top: 20px;}
.contbj{
  overflow:hidden;
  background:url(./assets/image/nra_logobg.jpg) top center no-repeat;
  /*background-size:100%;*/
  margin: 0px auto;
  min-height: 900px;
}
.wyy{
  width:100%;
  background:-webkit-linear-gradient(#e1eefa,#fff);
  background:-o-linear-gradient(#e1eefa,#fff);
  background:-moz-linear-gradient(#e1eefa,#fff);
  background:linear-gradient(#e1eefa,#fff);
  float:left;
  display:inline-block;
  overflow:hidden;
  box-sizing:border-box;
  height:60px;
  position:relative;
  cursor:pointer;
  margin: 25px 0px 15px 0px;
}
.marquee,*[class^=marquee]{
  display:inline-block;
  white-space:nowrap;
  position:absolute;
  overflow: hidden;
}
.marquee{margin-left:25%;}
.marquee-content-items{
  display:inline-block;
  padding:5px;
  margin:0;
  height:60px;
  position:relative;
}
.marquee-content-items li{
  display:inline-block;
  height: 55px;
  overflow: hidden;
  line-height:55px;
  color:#b5a5a5;
  font-size: 16px;
}
.marquee-content-items li a{ color: #273758; font-size: 16px; font-weight: bold;}
.marquee-content-items li:after{content:"|";margin:0 1em}
.marquee-content-items li a:hover{ color: #f00;}
.focus{
  width:1220px;
  height:110px;
  overflow:hidden;
  position:relative;
}
.focus ul{
  height:110px;
  position:absolute;
}
.focus ul li{
  float:left;
  width:1220px;
  height:110px;
  overflow:hidden;
  position:relative;
  background:#000;
}
.focus ul li img{ width: 1220px;}
.focus ul li div{
  position:absolute;
  overflow:hidden;
}
.focus .btn{
  position:absolute;
  width:1290px;
  height:10px;
  padding:10px 10px;
  right:0;
  bottom:5px;
  text-align:center;
}
.focus .btn span{
  display:inline-block;
  _display:inline;
  _zoom:1;
  width:13px;
  height:13px;
  _font-size:0;
  margin-left:5px;
  cursor:pointer;
  background:#fff;
  border-radius:50%;
}
.focus .btn span.on{ background:#3582c4;}
.focus .preNext{
  width:26px;
  height:53px;
  position:absolute;
  top:35px;
  background:url(./assets/image/sprite.png) no-repeat 0 0;
  cursor:pointer;
  display:none;
}
.focus .pre{left:0;}
.focus .next{
  right:0;
  background-position:right top;
}

</style>
