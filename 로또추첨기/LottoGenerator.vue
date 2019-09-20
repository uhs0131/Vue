<template>      <!-- template 쓰면 HTML 구성할 때 div가 생성되지 않음. template 연속으로 사용불가-->
  <div>
    <div>당첨숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" v-bind:number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한번 더</button>
  </div>
</template>

<script>
  import LottoBall from './LottoBall';

  function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0){
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];

  }

  const timeouts = [];
  export default{
    components:{
      'lotto-ball':LottoBall,   // LottoBall 로 줄일 수 있음 파스칼케이스에서 케밥케이스로 호환됨
    },
    data(){
      return{
        winNumbers:getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false,
      };
    },
    computed:{    // 계산하는 변수가 있다면 computed 사용해야 함. 계산한 값이 캐싱되어서 성능개선에 도움이 됨

    },
    methods:{
      onClickRedo() {
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        // this.showBalls();
      },

      showBalls(){
        console.log(this.winNumbers);
        for(let i=0; i<this.winNumbers.length-1; i++){
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, (i+1)*1000 );
        }

        setTimeout(()=>{
          timeouts[6] = this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000);
      }
    },
    mounted(){
      this.showBalls();
    },
    beforeDestroy(){
      timeouts.forEach((t) => {
        clearTimeout(t);
      });
    },
    watch:{
      bonus(val, oldVal){     // 감시하고 싶은 데이터
        console.log(val);
        console.log(oldVal);
        if(val===null){
          this.showBalls();
        }
      }
    },
  };
</script>

<style scoped>

</style>
