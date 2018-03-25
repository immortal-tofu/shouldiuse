import React, { Component } from 'react';
import SkillInput from '../../components/SkillInput';
import score from '../../utils/score';
import { introductions, technologies } from '../../constants';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      intro: '',
      choice: null,
    };
  }

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSubmit = () => {
    const { first, second } = this.state;
    if (!first || !second) return null;
    let intro = introductions[Math.floor(Math.random() * introductions.length)];
    let choice = score(first) > score(second) ? first : second;
    if (first === second) {
      intro = "Haha that's funny ! Look, I'm funny too. Pick:";
      choice = technologies[Math.floor(Math.random() * technologies.length)];
    }
    this.setState({ intro, choice });
  };

  renderResult() {
    const { intro, choice } = this.state;
    if (!choice) return null;
    return (
      <div className="App__result">
        <p className="App__resultIntro">{intro}</p>
        <p className="App__resultChoice">{choice}</p>
      </div>
    );
  }

  render() {
    const { first, second } = this.state;
    const onChangeFirst = evt => this.onChange('first', evt.target.value);
    const onChangeSecond = evt => this.onChange('second', evt.target.value);

    return (
      <div className="App">
        <a href="https://github.com/birdy-/shouldiuse">
          <img
            className="App__forkMe"
            src="https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"
          />
        </a>
        <p className="App__baseline">Choosing a technology was a difficult decision. No longer.</p>
        <h1 className="App__title">
          Should I use<span>.io</span>
        </h1>
        <div className="App__choices">
          <SkillInput placeholder="This" value={first} onChange={onChangeFirst} />
          <SkillInput placeholder="or ..." value={second} onChange={onChangeSecond} />
        </div>
        <button className="App__submit" onClick={this.onSubmit}>
          Pick one !
        </button>
        {this.renderResult()}
        <div className="App__mentions">
          If you used this piece of technology for your project, tell me.{' '}
          <a href="http://twitter.com/cledanjou">@cledanjou</a>
        </div>
      </div>
    );
  }
}

export default App;
