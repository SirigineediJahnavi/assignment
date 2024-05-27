import React, { Component } from "react";
import "./IntroScreen.css";
import BackButton from "./BackButton";

class IntroScreen extends Component {
  state = {
    displayText: "welcomeKiddo.png",
    buttonLabel: "start.png",
    step: 0,
    showInstructions: false,
    contentHistory: [],
  };

  handleButtonClick = () => {
    const steps = [
      { text: "iLoveBananas.png", button: "button1.png" },
      { text: "image.png", button: "button2.png" },
    ];

    this.setState((prevState) => {
      const nextStep = prevState.step + 1;
      if (nextStep <= steps.length) {
        return {
          displayText: steps[nextStep - 1].text,
          buttonLabel: steps[nextStep - 1].button,
          step: nextStep,
          contentHistory: [
            ...prevState.contentHistory,
            { text: prevState.displayText, button: prevState.buttonLabel },
          ],
        };
      } else {
        this.props.onStart();
      }
    });
  };

  handleBackClick = () => {
    this.setState((prevState) => {
      if (prevState.contentHistory.length > 0) {
        const previousContent = prevState.contentHistory.pop();
        return {
          displayText: previousContent.text,
          buttonLabel: previousContent.button,
          step: prevState.step - 1,
          contentHistory: prevState.contentHistory,
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
        <div className="cloud-kiddo">
          {step > 0 && <BackButton onBack={this.handleBackClick} />}
          <img
            src={displayText}
            className="welcomeKiddo"
            alt="welcomeKiddo"
          />
        </div>
        <div className="div-two">
          <img src="monkey.png" alt="monkey" className="monkey" />
          <div className="start-div">
            <img
              src={buttonLabel}
              onClick={this.handleButtonClick}
              alt="start"
              className="start"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IntroScreen;