<template>
  <div class="ball" :style="styleObject">{{number}}</div>
</template>

<script>
  export default{
    name:'LottoBall',
    props:{          // 부모component 에서 자식 component로 값을 넘길 수 있다. 변경불가능.
      number:Number,
    },
    data(){
      return{};
    },
    computed:{
      styleObject(){
        let background;
        if(this.number < 10){
          background = "red";
        } else if(this.number < 20){
          background ="orange"
        } else if(this.number < 30){
          background = "yellow";
        } else if(this.number < 40){
          background = "blue";
        } else{
          background = "green";
        }

        return {background, };
      }
    },
  }
</script>

<style>
  .ball{
    display:inline-block;
    border:1px solid black;
    border-redius:20px;
    width:40px;
    height:40px;
    line-height:40px;
    font-size:20px;
    text-align:center;
    margin-right:20px;
  }
</style>
