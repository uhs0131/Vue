<template>      <!-- template 쓰면 HTML 구성할 때 div가 생성되지 않음. template 연속으로 사용불가-->
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
    <div v-show="result.length">              <!-- v-show는 데이터가 존재하지 않을 시 div가 hide로 숨겨짐 -->
      <div>평균 시간:{{average}}ms</div>
      <button @click="onReset">리셋</button>
    </div>
    <div v-if="result.length">                 <!-- v-if는 데이터가 존재하지 않을 시 div가 없어짐 -->
      <div>평균 시간:{{average}}ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>

  let startTime = 0;
  let endTime = 0;
  let timeout = null;

  export default{
  data(){
    return{
      state:'waiting',
      result:[],
      message:'클릭해서 시작하세요.',
    };
  },
  computed:{          // 계산하는 변수가 있다면 computed 사용해야 함. 계산한 값이 캐싱되어서 성능개선에 도움이 됨
    average(){
      return  this.result.reduce((a,c)=> a+c,0) / this.result.length || 0;
    }
  },
    methods:{
      onReset(){
        this.result = [];
      },
      onClickScreen(){
        if(this.state === 'waiting'){
          this.state = 'ready';
          this.message = '초록색이 되면 클릭하세요.';
          timeout = setTimeout(() => {
            this.state = 'now';
            this.message = '지금 클릭!';
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000); //  2~3초
        } else if(this.state === 'ready'){
          clearTimeout(timeout);
          this.state = 'now';
          this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
        } else {
          endTime = new Date();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요.';
          this.result.push(endTime-startTime);
        }
      }

    }
  };
</script>

<style scoped>
  #screen{
    width:300px;
    height:200px;
    text-align:center;
    user-select:none;
  }
  #screen.waiting{
    background-color:aqua;
  }
  #screen.ready{
    background-color:red;
    color:white;
  }
  #screen.now{
    background-color:greenyellow;
  }

</style>
