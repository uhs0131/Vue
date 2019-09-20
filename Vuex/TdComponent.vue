<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  import {mapState} from 'vuex';
  import {CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER} from './store';

  export default{
    props:{
      rowIndex:Number,
      cellIndex:Number,
    } ,
    computed:{
      ...mapState:state => state.tableData,
      turn:state => state.turn,
      cellData(state){
        return state.tableData[this.rowIndex][this.cellIndex];
      },


      // cellData(){
      //  return this.$store.state.tableData[this.rowIndex][this.cellIndex];
      //} ,
      //tableData(){                  // store 에 있는 데이터 연동
      //  return this.$store.state.tableData;
      //},
      //turn(){
      //  return this.$store.state.turn;
      //},
    } ,
    methods:{
      onClickTd(){
        if(this.cellData) return;

        const rootData = this.$root.$data;

        // console.log(rootData);          // 자식에서 최상위 컴포넌트 데이터 조작
        // console.log(this.$parent.$data);        // 자식에서 부모 컴포넌트 데이터 조작
        // *** Vue에서 배열이나 객체를 index를 이용해서 바꾸면 화면이 바뀌지 않는다. (데이터는 바뀜) ***
        // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;


        this.$store.commit(CLICK_CELL, {row:this.rowIndex, cell:this.cellIndex});

        let win = false;
        if(this.tableData[this.rowIndex][0] === this.turn &&
          this.tableData[this.rowIndex][1] === this.turn &&
          this.tableData[this.rowIndex][2] === this.turn ){
          win = true;
        }

        if(this.tableData[0][this.cellIndex] === this.turn &&
          this.tableData[1][this.cellIndex] === this.turn &&
          this.tableData[2][this.cellIndex] === this.turn){
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
          this.$store.commit(SET_WINNER, this.turn);
          this.$store.commit(RESET_GAME);
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
            this.$store.commit(NO_WINNER);
            this.$store.commit(RESET_GAME);
          } else{
            this.$store.commit(CHANGE_TURN);
          }

        }
      }
    }
  };
</script>

<style>
</style>
