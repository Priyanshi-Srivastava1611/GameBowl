import {createAction} from 'redux-actions'
import mapValues from 'lodash.mapvalues'
import updateFrames from '../../utilities/updateFrames'
import updateCumulativeScore from '../../utilities/updateCumulativeScore'
import isGameOver from '../../utilities/isGameOver'
import updateCurrentRoll from '../../utilities/updateCurrentRoll'

const types = {
  enterScore: 'Game/EnterScore',
  restart: 'Game/Restart',
}

export const actions = {
enterScore: (score) => ({ type: types.enterScore, payload: score }),
restart: () => ({ type: types.restart }),
}

const initialState = {
  frames: [],
  cumulativeScores: [],
  gameOver: false,
  pins: [],
  rolls: 0,
}

export default (state = initialState, action) => {
  console.log(action,"prr")
  switch (action.type) {
    case types.enterScore:
      const {
        frames,
        cumulativeScores,
        pins,
        rolls,
      } = state

      return {
        ...state,
        frames: updateFrames(rolls, action.payload, frames),
        cumulativeScores: updateCumulativeScore(rolls, frames, cumulativeScores, pins, action.payload),
        gameOver: isGameOver(rolls, action.payload, pins),
        pins: pins.concat(action.payload),
        rolls: updateCurrentRoll(rolls, action.payload),
      }
    case types.restart:
      return initialState
    default:
    return state
  }
}
