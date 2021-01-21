<template>
    <div>
        <div id="headtop">
            <div id="head">
                <div class="top_logo">
                    <router-link tag="a" to='/'>
                        <img src="@/assets/images/logo2.png" style="height:48px;" alt="">
                    </router-link>
                </div>
                 <div class="top_logo">
                     <img src="@/assets/images/logo_desc2.png" alt="">
                 </div>
                 <div id='head_right'>
                     <div id="head_right_bottom">
                         <router-link tag='a' to="/">返回首页</router-link>
                     </div>
                 </div>
            </div>
        </div>
        <div class="mid">
            <div id="middle">
                <!-- 中间左侧 -->
                <div id='middle_left'>
                    <div class="item_left">
                         <router-link to='/about/me' tag='a'  :class="aClick==1?'a2':''" @click.native="tapClick(1)">关于我们</router-link>
                         <router-link to='/about/company' tag='a' :class="aClick==2?'a2':''" @click.native="tapClick(2)" title="公司简介">公司简介</router-link>
                         <router-link to='/about/concat' tag='a' :class="aClick==3?'a2':''" @click.native="tapClick(3)" title="联系我们">联系我们</router-link>
                         <!-- <router-link to='/about/brand' tag='a' :class="aClick==4?'a2':''" @click.native="tapClick(4)" title="品牌故事">品牌故事</router-link> -->
                    </div>
                </div>
                <!-- 中间右侧 -->
                <div id="middle_right">
                    <router-view></router-view>
                </div>
                <div class="clear"></div>
            </div>
        </div>
       
        
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '@/components/footer/footer'
export default {
    created() {
       this.aClick=sessionStorage.getItem('aclick')
    },
    data() {
        return {
            aClick:''
        }
    },
    methods:{
        tapClick(type){
            this.aClick=type
        }
    },
    components:{
        Footer
    }
}
</script>
<style>
#headtop{
        width: 100%;
        overflow: hidden;
        height: 76px;
        background: #f1f2f6 url(../../assets/images/top_bg_new.png) repeat-x;
}
#head{
    width: 945px;
    margin: 0 auto;
}
.top_logo{
        float: left;
        display: inline;
        overflow: hidden;
        margin-top: 12px;
}
#head_right{
    float: right;
    padding-top: 20px;
}
#head_right_bottom{
    color: #fff;
    font-size: 18px;
    font-family: "微软雅黑";
}
#head_right_bottom a{
    margin-left: 40px;
    margin-top: 8px;
    width: 80px;
    display: inline;
    float: left;
    text-align: center;
    color: #fff;
}
.mid{
    background-color: #f1f2f6;
    padding-top: 10px;
    padding-bottom: 20px;
}
#middle{
    margin: 0 auto;
    width: 1000px;
}
#middle_left{
    width: 245px;
    float: left;
}
.item_left a{
    width: 245px;
    font-family: "微软雅黑";
    font-size: 18px;
    color: #333333;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #f1f2f6;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    background-color: #fff;
}
.item_left a:hover{
    background-color: #e4e4e4;
}
.item_left a.a2{
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #f1f2f6;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    background-color: #1e75bb;
    color: #fff;
}
#middle_right{
    width: 740px;
    float: right;
    background-color: #fff;
}
.right_title{
    padding: 20px 10px 0 20px;
    font-family: "微软雅黑";
    font-size: 24px;
    color: #2d6ba4;
}
.guangyu_body{
    font-size: 14px;
    color: #696969;
    line-height: 30px;
    overflow: hidden;
    padding: 10px 15px 20px 20px;
}
.guangyu_body li{
    border-bottom: 1px dotted #CCC;
}
.img-responsive{
    max-width: 100%;
    display: block;
    margin: 0 auto;
}
</style>
