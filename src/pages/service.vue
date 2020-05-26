<template>
  <div>
    <ul class="but-rt">
      <li><div class="btn1" @click="btn1Click()">举报</div></li>
      <li><div class="btn2" @click="btn2Click()">投诉</div></li>
      <li><div class="btn3" @click="btn3Click()">反馈</div></li>
      <div v-for="(item,index) in contqq">
        <a target="_blank"  :href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+item.value+'&amp;site=qq&amp;menu=yes'">
          <li style="background:none; height: 75px;"><div class="btn4"><img border="0" src="../assets/image/qq.png"></div></li></a>
      </div>
    </ul>
    <div class="m-modal">
      <div class="m-modal-dialog">
        <div class="m-top">
          <h4 class="m-modal-title">请填写</h4>
          <span class="m-modal-close" @click="hideM1()">×</span>
        </div>
        <div class="m-middle">
          <form>
            <input class="inp-titl" type="text" id="mobile" name="mobile" placeholder="请输入联系方式" v-model="mobile">
            <input class="inp-titl" type="text" id="name" name="name" placeholder="请输入联系人" v-model="name">
            <input class="inp-titl" type="text" id="cardNo" name="cardNo" placeholder="请输入身份证" v-model="cardNo">
            <input class="inp-titl" type="text" id="company" name="company" placeholder="工作单位" v-model="company">
            <input class="inp-titl" type="text" id="email" name="email" placeholder="电子邮件" v-model="email">
            <div class="clear"></div>
            <textarea class="miaoshu" placeholder="请详细描述问题细节" id="description" name="description" v-model="description"></textarea>
          </form>

        </div>
        <div class="m-bottom">
          <button class="m-btn-sure" @click="saveUserQuestion">确定</button>
          <button class="m-btn-cancel" @click="hideM1()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'service',
    data(){
      return{
        mobile:'',
        name:'',
        cardNo:'',
        company:'',
        email:'',
        description:'',
        type:'-1',
        m1:new MyModal.modal(function() {}),
        contqq:[]
      }
    },
    created(){
      var indexQQ = this.HOST + "/frontPath/indexQQ";
      this.$axios.get(indexQQ)
        .then(res=>{
          this.contqq = res.data;
        })
        .catch(error=>{
          console.log(error);
        });
    },
    methods:{
      hideM1(){
        this.m1.hide();
      },
      clearInput(typ){
        this.type=typ;
        this.mobile="";
        this.name="";
        this.description="";
        this.cardNo="";
        this.company="";
        this.email="";
      },
      btn1Click(){
        this.clearInput("2");
        this.m1.show();
      },
      btn2Click(){
        this.clearInput("1");
        this.m1.show();
      },
      btn3Click(){
        this.clearInput("3");
        this.m1.show();
      },
      saveUserQuestion(){
        if(this.mobile=='' || this.mobile==null){
          alert('联系方式不能为空');
          return;
        }
        if(this.name=='' || this.name==null){
          alert('联系人不能为空');
          return;
        }
        if(this.description=='' || this.description==null){
          alert('问题描述不能为空');
          return;
        }

        this.$axios.post("https://tljc.nra.gov.cn/f/saveUserQuestion?name="+this.name+"&mobile="+this.mobile+"&description="+this.description+"&type="+this.type+
          "&cardNo="+this.cardNo+"&company="+this.company+"&email="+this.email)
          .then(res => {
            if (res.data.success== '0') {
              alert("提交成功");
              this.m1.hide();
            }else {
              alert("系统繁忙,请稍后重试");
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>
  .layui-layer-molv1{
    background: rgba(9, 3, 8, 0.51);
    color: white;
  }
  ul.but-rt{position: fixed;
    right:30px;
    bottom:150px; }
  ul.but-rt li{
    margin-bottom: 10px;
    background: #1F4A99;
    width: 45px;
    height:auto;
    border-radius: 3px;
    text-align: center;
    line-height: 45px; font-size: 14px; color: #fff; cursor: pointer; }

  ul.but-rt li:hover{ background: #4473c2; color: #fff; }

  .inp-titl{width: 450px; height: 40px; margin: 10px 0px 0px 30px; border:1px solid #e5e2e2; padding-left: 10px; }
  .miaoshu{ width: 450px;min-height: 150px; margin: 10px 0px 0px 30px; border:1px solid #e5e2e2; padding-left: 10px; resize: none; }

  .m-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    z-index: 1000;
    overflow: auto;
    background-color: rgba(0, 0, 0, .2);
  }

  .m-modal-dialog {
    font-family: "microsoft yahei", "宋体";
    position: relative;
    margin: 0 auto;
    top: 200px;
    width: 700px;
    background-color: #ffffff;  padding-bottom: 30px;

  }

  .m-top {
    background-color: #30A9DE;
  }

  .m-modal-title {
    margin: 0;
    color: #fff;
    padding: 10px 20px 10px 20px;
    font-size: 16px;
    letter-spacing: 2px;
  }

  .m-modal-close {
    position: absolute;
    right: 3px;
    top: 3px;
    display: inline-block;
    font-size: 35px;
    line-height: 20px;
    color: #555;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
  }

  .m-modal-close:hover {
    color: #555;
  }

  .m-middle {
    padding: 10px 20px 10px 20px; margin: 0px auto;
  }

  .m-bottom {
    padding: 0 6px 6px;
    overflow: hidden; width: 150px; margin: 0px auto;
  }

  .m-bottom button {
    font-family: "microsoft yahei", "宋体";
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px 15px;

    font-size: 14px;
    color: #333;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .m-bottom button:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }

  .m-bottom button:active {
    color: #333;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
  }

  .m-bottom .m-btn-sure {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }

  .m-bottom .m-btn-sure:hover {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
  }

  .m-bottom .m-btn-sure:active {
    color: #fff;
    background-color: #204d74;
    border-color: #122b40;
  }


</style>
