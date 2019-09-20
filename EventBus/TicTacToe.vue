<template>      <!-- template 쓰면 HTML 구성할 때 div가 생성되지 않음. template 연속으로 사용불가-->
  <div>
    <table-component :table-data="tableData"/>
    <div>{{turn}}님의 턴입니다.</div>
    <div v-if="winner">{{winner}} 님의 승리입니다.</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent';
  import EventBus from './EventBus';

  export default{
    components:{
      TableComponent,
    },
    data(){
      return{
        tableData:[
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        winner:'',
      };
    },
    computed:{    // 계산하는 변수가 있다면 computed 사용해야 함. 계산한 값이 캐싱되어서 성능개선에 도움이 됨

    },
    methods:{
      onChangeData(){
        // this.tableData[1][0] = 'X'는 작동하지 않음
        this.$set(this.tableData[1], 0, 'X');   //Vue.set 과 동일
      },
      onClickTd(rowIndex, cellIndex){
        // console.log(rootData);          // 자식에서 최상위 컴포넌트 데이터 조작
        // console.log(this.$parent.$data);        // 자식에서 부모 컴포넌트 데이터 조작
        // *** Vue에서 배열이나 객체를 index를 이용해서 바꾸면 화면이 바뀌지 않는다. (데이터는 바뀜) ***
        // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

        this.$set(this.tableData[rowIndex], cellIndex, this.turn);

        let win = false;
        if(this.tableData[rowIndex][0] === this.turn &&
          this.tableData[rowIndex][1] === this.turn &&
          this.tableData[rowIndex][2] === this.turn ){
          win = true;
        }

        if(this.tableData[0][cellIndex] === this.turn &&
          this.tableData[1][cellIndex] === this.turn &&
          this.tableData[2][cellIndex] === this.turn){
          win = true;
        }

        if(this.tableData[0][0] === this.turn &&
          this.tableData[1][1] === this.turn &&
          this.tableData[2][2] === this.turn){
          win = true;
        }

        if(this.tableData[0][2] === this.turn &&
          this.tableData[1][1] === this.turn &&
          this.tableData[2][0] === this.turn){
          win = true;
        }

        if(win){  // 이긴 경우
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [['','',''],['','',''],['','','']]
        } else {    // 지거나 무승부
          let all = true; // all이 true 면 무승부
          this.tableData.forEach((row) => {   // 무승부 검사
            row.forEach((cell) => {
              if(!cell){
                all = false;
              }
            });
          });
          if(all){
            this.winner = '';
            this.turn = 'O';
            this.tableData = [['','',''],['','',''],['','','']]
          } else{
            this.turn = this.turn === 'O' ? 'X' : 'O';
          }
        }
      }
    },
    created() {
      EventBus.$on('clickTd', this.onClickTd);
    }
  };
</script>

<style>
  table{
    border-collapse:collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align:center;
  }
</style>
