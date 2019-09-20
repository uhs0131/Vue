import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);      // this.$store 사용 가능

export const SET_WINNER = 'SET_WINNER';   // export 해서 다른파일에서 모듈로 사용할 수 있게 만든다.
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
  state:{       // vue의 data
    tableData:[
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    turn:'O',
    winner:'',
  },
  getters:{     // vue의 computed
    turnMessage(){
        return this.turn + '님이 승리하셨습니다.';
    }
  } ,
  mutations:{   // state를 수정할 때 사용함. 동기적
    [SET_WINNER](state, winner){          // SET_WINNER(state, winner){로 써도 됨
        state.winner = winner;
    },
    [CLICK_CELL](state, {row, cell}) {
        Vue.set(state.tableData[row], cell, state.turn);
    },
    [CHANGE_TURN](state){
        state.turn = state.turn === 'O' ? 'X' : 'O';
    } ,
    [RESET_GAME](state){
        state.turn = 'O';
        state.tableData = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
    } ,
    [NO_WINNER](state){
        state.winner = '';
    }
  },
  actions:{     // 비동기를 사용할 때, 또는 여러 뮤테이션을 번갈아 실행할 때

  },
});
