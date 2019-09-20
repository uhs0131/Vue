<template>
  <div>          <!-- template 쓰면 HTML 구성할 때 div가 생성되지 않음. template 연속으로 사용불가-->
    <div id="computer" :style="computedStyleObject"></div>
    <!-- v-bind:class와 v-bind:style 은 객체형을 지원한다.-->
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{result}}</div>
    <div>현재 {{score}}점</div>
  </div>

</template>

<script>
  const rspCoords = {
    바위 : '0',
    가위 : '-125px',
    보: '-250px',
  };

  const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1,
  }
  let interval = null;

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
      return v[1] === imgCoord;
    })[0];
  };


export default{
  data(){
    return{
      imgCoord:rspCoords.바위,
      result:'',
      score:0,
    };
  },
  computed:{          // 계산하는 변수가 있다면 computed 사용해야 함. 계산한 값이 캐싱되어서 성능개선에 도움이 됨
    computedStyleObject(){
      return{
        background:`url(C:\Users/TY/Desktop/Study/Vue/RockScissorPaper/images.png) ${this.imgCoord} 0`
      };
    }
  },
  methods:{
    changeHand(){
      interval = setInterval(() =>{
        if(this.imgCoord === rspCoords.바위){
          this.imgCoord = rspCoords.가위;
        } else if(this.imgCoord === rspCoords.가위){
          this.imgCoord = rspCoords.보;
        } else if(this.imgCoord === rspCoords.보){
          this.imgCoord = rspCoords.바위;
        }
      }, 100);
    },
    onClickButton(choice){
      clearInterval(interval);

      console.log(choice);
      console.log(scores[choice]);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;
      if(diff===0){
        this.result = '비겼습니다.';
      } else if([-1, 2].includes(diff)){
        this.result = '이겼습니다.';
        this.score += 1;
      } else {
        this.result = '졌습니다.';
        this.score -= 1;
      }

      setTimeout(() => {
        this.changeHand();
      }, 1000);

    },
  },
  beforeCreate(){
    console.log('beforeCreated');
  },
  created(){
    console.log('created');
  },
  beforeMount(){
    console.log('beforeMounted');
  },
  mounted(){
    console.log('mounted');

    this.changeHand();
  },
  beforeUpdate(){
    console.log('beforeUpdate');
  },
  updated(){
    console.log('updated');
  },
  beforeDestroy(){
    console.log('beforeDestroy');
      clearInterval(interval);
  }
  ,
  destroyed(){
    console.log('destroyed');
  }
};
</script>

<style scoped>
  #computer{
    width:125px;
    height:125px;
    background-position:0 0;
  }
</style>
