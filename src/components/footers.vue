<template>
  <div>
    <div class="footers">
      <div class="w1200">
        <div class="footerleft">
          <span>客服邮箱：wzyjx@nra.gov.cn    邮编：100891</span>
          <span>地址：北京市复兴路6号院 Copyright © 国家铁路局　京ICP备13051833　</span>
        </div>
        <div class="footerright">
          <a href="http://bszs.conac.cn/sitename?method=show&id=0D3C857C112E74FBE053012819ACB398" target="_blank">&nbsp;</a>
          <a href="javascript:;" target="_blank">&nbsp</a>
          <a href="https://mail.nra.gov.cn/" target="_blank">内部邮箱</a>
          <a href="http://weibo.com/u/5066332523" target="_blank">政务微博</a>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
  export  default{
      name:"footers",
      data(){
          return{

          }
      },

  }
</script>

<style scoped>

.footers{ width: 100%; background: #fff; margin-top: 50px; height: 110px;}
.footerleft {
  display: inline-block;
  padding-left: 2em;
  height: 90px;
  margin-top: 10px; padding-top: 10px;}
.footerleft span{ display: block; margin-top: 10px;}
.footerright{
  margin-top: 20px;
  padding-right: 20px;
  height: 70px;
  display: inline-block;
  float: right;
  background: transparent;
}
.footerright > a:nth-child(1) {
  width: 70px;
  background: url("../assets/image/dzjg.jpg") no-repeat;
  background-size: 70%;
}
.footerright > a:nth-child(2) {
  width: 130px;
  background: url("../assets/image/jiucuo.png") no-repeat;
}
.footerright > a:nth-child(3) {
  padding-left: 65px;
  background: url("../assets/image/03.gif") no-repeat;;
}
.footerright > a:nth-child(4) {
  padding-left: 65px;
  background: url("../assets/image/wb9.jpg") no-repeat;
}
.footerright > a {
  margin-left: 10px;
  color: #333;
  float: left;
  height: 70px;
  line-height: 70px;
}

</style>
