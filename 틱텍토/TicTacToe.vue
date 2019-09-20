<template>      <!-- template 쓰면 HTML 구성할 때 div가 생성되지 않음. template 연속으로 사용불가-->
  <div>
    <table-component :table-data="tableData"/>
    <div>{{turn}}님의 턴입니다.</div>
    <div v-if="winner">{{winner}} 님의 승리입니다.</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent';

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
      }
    },
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
