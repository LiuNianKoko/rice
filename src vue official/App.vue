<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
 
}
.clear{
  clear:both;
}
 .com{
        font-size: 18px;
        padding: 20px 0;
    }
    .clearfix{
        clear: both;
        position: relative;
        height: 100%;
        overflow: hidden;
    }
    .rows{
        margin: 0 -5px;
    }
.title{
        font-size: 36px;
        color: #1F1F1F;
    }
 .center{
        text-align: center;
    }
    .container{
        width: 1200px;
        position: relative;
        margin: 0 auto;
        height: 100%;
        clear: both;
    }
body{
        margin: 0;
        padding: 0;
        font-family: "Microsoft YaHei Light", Georgia, Times, "Times New Roman", serif;
    }
    ol,ul,li {
        list-style:none;
    }
    ul{
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }
    li{
        display: list-item;
        text-align: -webkit-match-parent;
    }
 img{
        border: none;
        margin: 0 auto;
    }
  p{
        margin: 0 !important;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    a{
        text-decoration: none !important;
    }
    a:hover{
        cursor: pointer;
    }
</style>
