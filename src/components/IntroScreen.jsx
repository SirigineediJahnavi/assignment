import React, { Component } from 'react';
import './IntroScreen.css';
import BackButton from './BackButton';

class IntroScreen extends Component {
  state = {
    displayText: "button0.png",
    buttonLabel: "start.png",
    step: 0,
    showInstructions: false,
    contentHistory: [],
  };

  handleButtonClick = () => {
    const steps = [
      { text: "heading1.png", button: "button1.png" },
      { text: "heading2.png", button: "button2.png" },
    ];

    this.setState(prevState => {
      const nextStep = prevState.step + 1;
      if (nextStep <= steps.length) {
        return {
          displayText: steps[nextStep - 1].text,
          buttonLabel: steps[nextStep - 1].button,
          step: nextStep,
          contentHistory: [...prevState.contentHistory, { text: prevState.displayText, button: prevState.buttonLabel }]
        };
      } else {
        this.props.onStart();
      }
    });
  };

  handleBackClick = () => {
    this.setState(prevState => {
      if (prevState.contentHistory.length > 0) {
        const previousContent = prevState.contentHistory.pop();
        return {
          displayText: previousContent.text,
          buttonLabel: previousContent.button,
          step: prevState.step - 1,
          contentHistory: prevState.contentHistory
        };
      } else {
        this.props.onBack();
      }
    });
  };

  render() {
    const { displayText, buttonLabel, step } = this.state;

    return (
      <div className="intro-screen">
        <div className='cloud-kiddo'>
          {step > 0 && <BackButton onBack={this.handleBackClick} />}
          <img src='cloud.png' alt='cloud' className='cloud' />
          <img src={displayText} alt='kiddo' className='kiddo' />
        </div>
        <img src={buttonLabel} onClick={this.handleButtonClick} alt='start' className='start' />
        <img src="monkey.png" alt="monkey" className="monkey" />
      </div>
    );
  }
}

export default IntroScreen;
