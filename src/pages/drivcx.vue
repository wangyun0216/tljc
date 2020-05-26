<template>
  <div>
    <div class="w1200 mg15" style=" background: #fff;">
      <div class="container">
        <div class="max_w1300 min-hei500">
          <div class="driv-cx-title">驾驶资格查询</div>
          <div class="drivcx-list">
            <input type="text" value="" placeholder="请输入姓名" v-model="realName" />
            <input type="text" value="" placeholder="请输入身份证号" v-model="cardNo" />
            <input type="button" value="查询"  @click="selectDrivingList()"/>
          </div>
          <div id="contentDriving">
            <div class="jiashizheng" v-if="drivcx[0].realName!=''">
              <div class="jiashizhengmes">
                <div class="nratitle">
                  <div class="wy-h1">NRA</div>
                  <span class="tielu">国家铁路局</span>
                  <span class="yingwen">National Railway Administration</span>
                </div>
                <div class="clear"></div>
                <div class="mingtou">
                  <div class="wy-h1">中华人民共和国铁路机车车辆驾驶证</div>
                </div>
                <div class="zheng_mes">
                  <span>姓名</span>
                  <div class="xingming">
                    {{drivcx[0].realName}}
                  </div>
                  <span>性别</span>
                  <div class="xingbie" v-if="drivcx[0].sex == 0 ">
                    男
                  </div>
                  <div class="xingbie" v-if="drivcx[0].sex == 1 ">
                    女
                  </div>
                  <span>出生日期</span>
                  <div class="nian">
                    {{drivcx[0].birthday.substring(0, 4)}}
                  </div>
                  <span>年</span>
                  <div class="yue">
                    {{drivcx[0].birthday.substring(5, 7)}}
                  </div>
                  <span>月</span>
                  <div class="ri">
                    {{drivcx[0].birthday.substring(8, 10)}}
                  </div>
                  <span>日</span>
                </div>
                <div class="shenfenhaoma">
                  <span>公民身份号码</span>
                  <div class="haoma">
                    {{drivcx[0].cardNo}}
                  </div>
                </div>
                <div class="suozaidanwei">
                  <span>所在单位</span>
                  <div class="danwei">
                    {{drivcx[0].company}}
                  </div>
                </div>
                <div class="mes_s">
                  <div class="mes_s1">
                    <div class="photomes">
                      <img  :src="imageSrc" class="photo" />
                    </div>
                  </div>
                  <div class="mes_s2">
                    <div class="zhunjiames">
                      <span>准驾机型:</span>
                      <div class="jixing">
                        {{drivcx[0].rcdisDrivingTypeName1}}
                      </div>
                    </div>
                    <div class="chucilingzheng">
                      <span>初次领证:</span>
                      <div class="qishi_k" v-if="drivcx[0].firstDate == null || drivcx[0].firstDate == undefined || drivcx[0].firstDate == ''">

                      </div>
                      <div class="qishi_k" v-else>
                        {{drivcx[0].firstDate}}
                      </div>
                    </div>
                    <div class="youxiaoqishi">
                      <span>有效期始:</span>
                      <div class="qishi_k">
                        {{drivcx[0].validityStart}}
                      </div>
                    </div>
                    <div class="youxiaojiezhi">
                      <span>有效截止:</span>
                      <div class="jiezhi_k" v-if="drivcx[0].validityEnd == null || drivcx[0].validityEnd == undefined || drivcx[0].validityEnd == ''">

                      </div>
                      <div class="jiezhi_k" v-else>
                        {{drivcx[0].validityEnd}}
                      </div>
                    </div>
                  </div>
                  <div class="mes_s3">
                    <div class="gaizhang">
                      <img src="../../src/assets/image/01.png" class="zhang_p" />
                    </div>
                  </div>
                </div>
                <div class="chapter">
                  <img src="../../src/assets/image/gaizhang.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        drivcx:[
          {realName: ''}
        ],
        imageSrc:'',
        realName: '',
        cardNo: '',
      }
    },
    methods:{
      selectDrivingList(){
        if (this.realName.replace(/\s/g, '') != ''&& this.cardNo.replace(/\s/g, '') != '') {
          this.$router.push({name: 'Drivcx', params: {realName:this.realName,cardNo:this.cardNo,}});
          this.$axios.post("https://tljc.nra.gov.cn/f/printRcdisUserBaseDrivingLicenceList1?realName="+this.realName+"&cardNo="+this.cardNo)
           .then(res => {
             if (res.data == ''|| res.data == null) {
               $("#contentDriving").html("暂无驾驶驾驶资格");
             }else {
               this.drivcx=res.data;
               this.imageSrc='https://tljc.rrdis.nra.gov.cn/api/download?fileName='+new Buffer(res.data[0].cardNo).toString('base64') + 'abcd';
//               https://tljc.rrdis.nra.gov.cn/api/download?fileName=
             }
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          alert("请输入姓名和身份证号")
        }
      },
    }
  }

</script>

<style scoped>
 .min-hei500{ min-height: 500px;}
.driv-cx-title{ font-size: 30px; color: #000000; border-bottom: 3px solid #2572bf;}
.drivcx-list{ margin: 30px 10px;}
.drivcx-list input[type="text"]{
  border: 1px solid #3483c5;
  padding: 10px 30px; border-radius: 4px;
}
.drivcx-list input[type="button"]{
  background: #3483c5;
  color: #fff;
  padding: 10px 35px;
  border-radius: 10px;
}
  .IdQueryBox{
    margin: 0 auto 20px;
    width: 1300px;
    overflow: hidden;
    padding-bottom: 30px;
    -webkit-box-shadow: 0px 9px 100px #ddd;
    -moz-box-shadow: 0px 9px 100px #ddd;
    box-shadow: 0px 9px 100px #ddd;
  }
  .IdQueryBox .navSecondary{
    margin-top: 40px;
  }

  .IdQueryBox .menu > div:first-child {
    margin: 20px;
    line-height: 50px;
    border-bottom: 3px solid #2672BE;
  }

  .IdQueryBox .menu > div >h2{
    color: #333;
    font-size: 30px;
    letter-spacing: 2px;
  }
  .IdQueryBox .menu > .lisat_xz{
    background-color: #fff;
    text-align: center;
    height: 53px;
    font-size: 1.5em;
    margin: 0 20px 10px;
    box-shadow: 0 0 10px #ddd;
  }

  .IdQueryBox .menu >.lisat_xz>ul {

  }
  .IdQueryBox .menu >.lisat_xz> ul > li:first-child{
    background: none;
  }
  .IdQueryBox .menu >.lisat_xz> ul > li {
    float: left;
    transition: background-color 0.1s linear;
    text-align: center;
    line-height: 50px;
    position: relative;
    color: #BEBEBE;
    padding: 0 3.9%;
    background: url("../../src/assets/image/leftright_thread.gif")left center no-repeat;
  }

  .IdQueryBox .menu >.lisat_xz> ul > li >a{
    text-decoration: none;
    color: #263959;
    display: block;
    border-bottom: 5px solid #0062ac;
  }
  .IdQueryBox .menu >.lisat_xz> ul > li.cur >a{
    display: block;
    color: #E00700;
    border-bottom: 5px solid #E00700;
  }
  .IdQueryBox .menu >.lisat_xz> ul > li >a:hover{
    display: block;
    color: #E00700;
    border-bottom: 5px solid #E00700;
    -webkit-transition: none ;
    -moz-transition: none ;
    -ms-transition: none ;
    -o-transition: none ;
    transition: none ;
  }

  .IdQueryBox .menu >.lisat_xz> ul > li:hover .triangle_xz{
    width: 0;
    height: 0;
    border-width:5px 10px 0;
    border-style: solid;
    border-color: #E00700 transparent transparent;
    margin: 0 auto;

  }

  .IdQueryheadings{
    margin: 0 20px 0;
  }
  .IdQueryheadings > div{
    display: inline-block;

  }
  .IdQueryheadings >div > h3{
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    background-color: #efa61c;
    padding: 10px 35px;
    color: #fff;
    border-radius: 2px;
  }
  /*.IdQueryheadings >div>.tri{*/
  /*width: 0;*/
  /*height: 0;*/
  /*border-width: 8px 23px 0;*/
  /*border-style: solid;*/
  /*border-color: #186fcc transparent transparent;*/
  /*margin: 0 auto;*/
  /*}*/

  .IdQueryInput{
    margin: 0 20px 0;
    padding: 2em 6em 1em;
    background: #efa61c;
  }
  .IdQueryInput input:nth-child(1),.IdQueryInput input:nth-child(2),.IdQueryInput input:nth-child(3){
    padding: 8px;
    border-radius: 5px;
    width: 200px;
    margin-right: 30px;
    border: 1px solid transparent;
    box-shadow: 1px 1px 1px #999;
    background: white;
  }
  .IdQueryInput input:nth-child(1):focus,.IdQueryInput input:nth-child(2):focus{
    box-shadow: 1px 2px 4px #666;
  }
  .IdQueryInput input:nth-child(3):hover{
    background: #2672be;
    color: white;
  }

  .IdQueryShow{
    margin: 0 20px;
    background: #eee;
  }
  .IdQueryShow > div{
    margin: 0 auto;
    padding:30px 24px;
    overflow: hidden;
    width: 945px;
  }
  .jiashizheng {
    width: 450px;
    height: 282px;
    border: 1px solid #4d4d4d;
    border-radius: 10px;
    background-image: url(../../src/assets/image/02.png);
    float: left;
    margin: 10px 10px;
  }

  .jiashizhengmes {
    width: 410px;
    height: 260px;
    /*padding: 10px 20px;*/
    position: relative;
  }

  .jiashizhengmes > .huanmeskuang {
    width: 970px;
    height: 94px;
    margin: 10px 0 0 10px;
    border-left: 1px solid #9db7e8;
    border-bottom: 1px solid #9db7e8;
  }

  .nratitle {
    height: 34px;
    position: relative;
    margin: 5px 0px;
  }

  .nratitle .wy-h1 {
    width: 80px;
    line-height: 34px;
    font-size: 32px;
    color: #e50633;
    font-style: italic;
    font-weight: 600;
    float: left;
  }

  .nratitle .bu {
    position: absolute;
    right: 0;
    top: 0;
    color: #a30629;
    font-size: 20px;
    font-weight: bold;
    width: 22px;
    height: 22px;
    line-height: 22px;
    border: 2px solid #a30629;
    border-radius: 5px;
    text-align: center
  }

  .tielu {
    height: 16px;
    width: 230px;
    float: left;
    font-weight: bold;
    color: #000000;
    display: block;
  }

  .yingwen {
    color: #e50633;
    font-style: italic;
    font-size: 10px;
    font-weight: 600;
    font-family: "arial";
    display: block;
    float: left;
  }

  .mingtou > .wy-h1 {
    height: 32px;
    line-height: 32px;
    font-size: 22px;
    letter-spacing: 2.5px;
    font-family: "宋体";
    font-weight: bold;
  }

  .zheng_mes {
    height: 24px;
    line-height: 24px;
  }

  .zheng_mes > span {
    font-family: "宋体";
    color: #000000;
    margin-right: 3px;
    font-size: 13px;
    float: left;
  }

  .xingming {
    width: 60px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    float: left;
    height: 20px;
  }

  .xingbie {
    width: 50px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 20px;
    float: left;
  }

  .nian {
    width: 60px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 20px;
    float: left;
  }

  .yue {
    width: 35px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 20px;
    float: left;
  }

  .ri {
    width: 35px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 20px;
    float: left;
  }

  .shenfenhaoma {
    height: 24px;
    line-height: 24px;
  }

  .shenfenhaoma > span {
    color: #000000;
    font-family: "宋体";
    margin-right: 3px;
    font-size: 12px;
    float: left;
  }

  .haoma {
    width: 330px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 13px;
    height: 20px;
    float: left;
  }

  .suozaidanwei {
    height: 24px;
    line-height: 24px;
  }

  .suozaidanwei > span {
    color: #000000;
    font-family: "宋体";
    margin-right: 3px;
    font-size: 13px;
    letter-spacing: 5px;
    float: left;
  }

  .danwei {
    width: 330px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 13px;
    height: 20px;
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .mes_s {
    height: 122px;
  }

  .mes_s1 {
    width: 90px;
    height: 122px;
    float: left;
  }

  .photomes {
    height: 117px;
    padding-top: 5px;
  }

  .photo {
    width: 90px;
    height: 117px;
  }

  .mes_s2 {
    width: 200px;
    height: 122px;
    float: left;
  }

  .zhunjiames {
    height: 40px;
    padding-top: 5px;
    padding-left: 10px;
    line-height: 40px;
  }

  .zhunjiames > span {
    line-height: 40px;
    font-family: "宋体";
    color: #000000;
    margin-right: 3px;
    font-size: 13px;
    float: left;
  }

  .jixing {
    width: 40px;
    height: 25px;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    border: 1px solid #000000;
    float: left;
    margin-right: 10px;
    margin-top: 6px;
    line-height: 25px;
  }

  .chucilingzheng {
    height: 25.7px;
    line-height: 25.7px;
    float: left;
  }

  .youxiaoqishi {
    height: 25.7px;
    line-height: 25.7px;
    float: left;
  }

  .youxiaojiezhi {
    height: 25.7px;
    line-height: 25.7px;
    float: left;
  }

  .chucilingzheng > span {
    padding-left: 10px;
    color: #000000;
    font-family: "宋体";
    font-size: 13px;
    float: left;
    margin-right: 3px;
  }

  .youxiaoqishi > span {
    padding-left: 10px;
    color: #000000;
    font-family: "宋体";
    font-size: 13px;
    float: left;
    margin-right: 3px;
  }

  .youxiaojiezhi > span {
    padding-left: 10px;
    color: #000000;
    font-family: "宋体";
    font-size: 13px;
    float: left;
    margin-right: 3px;
  }

  .chuci_k {
    width: 110px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 21px;
    float: left;
  }

  .qishi_k {
    width: 110px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 21px;
    float: left;
  }

  .jiezhi_k {
    width: 110px;
    border-bottom: 1px solid #000000;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    height: 21px;
    float: left;
  }

  .mes_s3 {
    width: 120px;
    height: 122px;
    float: left;
  }

  .gaizhang {
    width: 80px;
    height: 80px;
    border: 2px solid #a90018;
    margin: 32px 0 0 36px;
  }

  .zhang_p {
    padding: 1px;
  }

  .chicunjieshao {
    height: 20px;
    margin-top: 5px;
  }

  .chicunjieshao > h1 {
    font-family: "宋体";
  }

  .chapter {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 80px;
    bottom: -13px;
  }

  .chapter > img {
    width: 100%;
    height: 100%
  }

</style>
