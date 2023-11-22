import React, {Component} from 'react'

import './Controls.css'

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreValue: 0
    };
  }

  handleSubmit=()=>{
    this.handleClick(this.state.scoreValue);
  }
  handleClick = pins => {
    const {
      lastRoll,
    } = this.props
    if(this.state.scoreValue<=10 && !this.disableButton(Number(pins))){
      this.props.enterScore(Number(pins))
    }
    else{
      if(this.state.scoreValue>10){
        alert("You can not enter a value greater than 10");
      }
      else{
        alert(`Please enter a number less than or equal to ${10-lastRoll}`)
      }
      
    }
    
  }

  disableButton = number => {
    const {
      gameOver,
      lastRoll,
      rolls,
    } = this.props

    if (gameOver) return true
    if (rolls % 2 === 0 || rolls === 0) return false
    if (rolls === 19 && lastRoll === 10) return false
    return lastRoll + number > 10
  }

  render () {

    return (
      <div className='Container'>
        <div>
          <input placeholder='Enter your score' value={this.scoreValue} onChange={(e)=>this.setState({scoreValue: e.target.value})}/>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        {this.props.rolls > 0 &&
          <button className={'Restart'} disabled={this.disableButton(Number(this.state.scoreValue))} onClick={this.props.restart}>Restart</button>
        }
      </div>
    )
  }
}
