import * as actions from '../../services/constants';
import { generateNBack, selectVariates, generateCombos } from './utils';

this.game = {
  difficulty: {
    initN: 2,
    interval: 1000
  },
  numVariates: 4,
  status: 'in',
  sequences: [{
    variates: {
      position: true,
      number: true,
      // audio: false,
      shape: true,
      color: true
    },
    nBack: 3,
    interval: 1000,
    combos: [{
      position: 6,
      number: 3,
      shape: 'square',
      color: 'red'
    }],
    comboPointer: 0
  }]
};


export function newGame() {
  return {
    type: actions.INIT_GAME
  };
}

export function setSettings(difficulty, numVariates) {
  return (dispatch, getState) => {
    let startingN, interval = null;
    switch(difficulty) {
      case 'easy':
        startingN = 1;
        interval = 3000;
        break;
      case 'medium':
        startingN = 3;
        interval = 2000;
        break;
      case 'hard':
        startingN = 7;
        interval = 1000;
        break;
      default:
    }

    dispatch({ 
      type: actions.SET_SETTINGS,
      payload: { 
        difficulty: { 
          startingN,
          interval
        },
        numVariates 
      }
    });
    dispatch(initSequence(getState));
    dispatch(nextCombo(getState));
  };
}

export function initSequence(getState) {

  const { 
    game: { 
      difficulty: { 
        startingN,
        interval 
      },
      sequences,
      numVariates 
    }
  } = getState();
  const score = sequences.length;

  const nBack = generateNBack(startingN, score);
  const variates = selectVariates(numVariates);
  const combos = generateCombos(nBack, variates);

  const newSequence = {
    variates,
    nBack,
    combos,
    comboPointer: -1,
    interval,
    inProgress: true,
    fatal: false
  };

  return { 
    type: actions.INIT_SEQUENCE,
    payload: newSequence
  };

}

export function nextCombo(getState) {
  
}