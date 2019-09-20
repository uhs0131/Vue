<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  export default{
    props:{
      cellData:String,
      rowIndex:Number,
      cellIndex:Number,
    }
    , methods:{
      onClickTd(){
        if(this.cellData) return;
      
        const rootData = this.$root.$data;

        console.log(rootData);          // 자식에서 최상위 컴포넌트 데이터 조작
        //console.log(this.$parent.$data);        // 자식에서 부모 컴포넌트 데이터 조작
        // *** Vue에서 배열이나 객체를 index를 이용해서 바꾸면 화면이 바뀌지 않는다. (데이터는 바뀜) ***
        // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

        let win = false;
        if(rootData.tableData[this.rowIndex][0] === rootData.turn &&
          rootData.tableData[this.rowIndex][1] === rootData.turn &&
          rootData.tableData[this.rowIndex][2] === rootData.turn ){
          win = true;
        }

        if(rootData.tableData[0][this.cellIndex] === rootData.turn &&
          rootData.tableData[1][this.cellIndex] === rootData.turn &&
          rootData.tableData[2][this.cellIndex] === rootData.turn){
          win = true;
        }

        if(rootData.tableData[0][0] === rootData.turn &&
          rootData.tableData[1][1] === rootData.turn &&
          rootData.tableData[2][2] === rootData.turn){
          win = true;
        }

        if(rootData.tableData[0][2] === rootData.turn &&
          rootData.tableData[1][1] === rootData.turn &&
          rootData.tableData[2][0] === rootData.turn){
          win = true;
        }

        if(win){  // 이긴 경우
          rootData.winner = rootData.turn;
          rootData.turn = 'O';
          rootData.tableData = [['','',''],['','',''],['','','']]
        } else {    // 지거나 무승부
          let all = true; // all이 true 면 무승부
          rootData.tableData.forEach((row) => {   // 무승부 검사
            row.forEach((cell) => {
              if(!cell){
                all = false;
              }
            });
          });
          if(all){
            rootData.winner = '';
            rootData.turn = 'O';
            rootData.tableData = [['','',''],['','',''],['','','']]
          } else{
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
          }

        }
      }
    }
  };
</script>

<style>
</style>
