<template>
    <div>
        <div class="footer">
            <div class="ft-top">
                <div class="container clearfix">
                    <div class="support">
                        <div class="tit">全国服务支持</div>
                        <div class="number">0574-65983988</div>
                        <div class="com">7*24小时在线客服</div>
                    </div>
                    <div class="ft-nav">
                        <ul class="list" style="color: #fff;">
                            <li>
                                关于我们
                                <ul style="padding-left: 0">
                                    <li>
                                       公司简介
                                    </li>
                                    <li>
                                        联系我们
                                    </li>
                                    <li>
                                        <!-- <router-link tag='a' to="/about/brand">品牌故事</router-link> -->
                                    </li>
                                </ul>
                            </li>
                            <li>
                                友情链接
                                 <ul style="padding-left: 0">
                                    <li>
                                      <a href="https://m.kuaidi100.com/" target="_blank">快递查询</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="ewm-box">
                        <div class="t">北申良品客服二维码</div>
                        <div class="ewm">
                            <img src="@/assets/images/code.png" style="max-width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="ft-btm">
                <div class="container" style="font-size: 10px;">
                    <p>上海北申良品农业科技发展有限公司 </p>
                    <p>
                        备案许可号：
                        <a style="color: #FFF" href="" target="_blank">沪ICP备19036271号</a>
                        &nbsp;&nbsp;   技术支持：
                        <a style="color: #FFF" href="" target="_blank">上海企业在线</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }    
}
</script>
<style>
    .footer .ft-top{
        background: #2D2D2F;
        padding: 30px 0;
    }
    .footer .ft-btm{
        text-align: center;
        background: #515151;
        color: #FFF;
        padding: 10px 0;
        line-height: 26px;
    }
    .footer .ft-top .support{
        width: 330px;
        float: left;
        color: #FFF;
        padding-top: 15px;
        line-height: 28px;
    }
    .footer .ft-top .support .tit{
        font-size: 16px;
    }
    .footer .ft-top .support .number{
        font-size: 18px;
        color: #14ABF2;
    }
    .footer .ft-top .support .com{
        font-size: 10px;
        padding: 0;
    }
    .footer .ft-top .ft-nav{
        width: 650px;
        float: left;
    }
    .footer .ft-top .ft-nav .list{
        position: relative;
        height: 100%;
        overflow: hidden;
        clear: both;
    }
    .footer .ft-top .ft-nav .list > li{
        width: 33.333%;
        float: left;
        font-size: 16px;
    }
    .footer .ft-top .ft-nav .list > li a{
        color: #FFF;
    }
    
    .footer .ft-top .ft-nav .list > li > ul{
        font-size: 14px;
        padding-top: 15px;
        line-height: 26px;
    }
    .footer .ft-top .ewm-box{
        width: 200px;
        float: right;
        color: #FFF;
    }
    .footer .ft-top .ewm-box .t{
        font-size: 16px;
        padding-bottom: 10px;
    }

</style>

