/** @jsx React.DOM */

var React = window.React = require('react/addons'),
    mountNode = document.getElementById("app");

var SkillInput =  React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {value: ''};
  },
  getValue: function () {
    return $('#skill' + this.props.key).value();
  },
  render: function () {
    var createItem = function (text, id) {
      return <option value={text} key={id}>{text}</option>;
    };
    return (
      <div>
      <input type="text"
        list={'techno' + this.props.key}
        valueLink={this.linkState('value')} />

      <datalist id={'techno' + this.props.key}>
        {this.props.list.map(createItem)}
      </datalist>
      </div>
    );
  }
});
var SkillChoice = React.createClass({
  getInitialState: function () {
    return {items: { languages: [] }, choices: [], winner: ''};
  },
  componentDidMount: function () {
    var self = this;
    $.get(this.props.source, function (result) {
      self.setState({ items: result });
    });
  },
  score: function (skill) {
    var arr = skill.split('');
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var score = 0;
    for (var i = 0; i < arr.length; i++) {
      var letter = arr[i];
      // If it's letter
      if (/[a-zA-Z]/.test(letter)) {
        // Position in alphabet is a key feature
        score += alphabet.indexOf(letter.toLowerCase()) + 1;
      } else if (/[0-9]/.test(letter)) {
        // This condition is obvious
        score += parseInt(letter);
      } else {
        // It's a supa dupa sign = better performance
        score += 30;
      }
    };
    score = score / arr.length;
    if (arr.length === 1) {
      // One letter ? Really ? This technology is not reliable.
      score += -1;
    }
    if (arr.length === 2) {
      // Two letters ? Almost a standard.
      score += +1;
    }
    if (arr.length > 2) {
      // Ok nice, we score that.
      score += arr.length % 4;
    }
    return score;
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var skill1 = this.refs.input1.state.value;
    var skill2 = this.refs.input2.state.value;
    if (!skill1 || !skill2) return;
    var score1 = this.score(skill1);
    var score2 = this.score(skill2);
    var winner;
    if (score1 === score2) {
      this.setState({ winner: 'You should use both' });
    } else {
      winner = score1 > score2 ? skill1 : skill2;
      this.setState({ winner: 'You should use ' + winner });
    }
  },
  render: function () {
    var createItem = function (text) {
      return <option value={text}>{text}</option>;
    };
    return (
        <form onSubmit={this.handleSubmit}>
          <SkillInput ref="input1" key="1" list={this.state.items.languages} />
          <p>or</p>
          <SkillInput ref="input2" key="2" list={this.state.items.languages} />
          <button>Compare</button>
          <p id="result">{this.state.winner}</p>
        </form>
    );
  }
});
var ShouldIUseApp = React.createClass({
  render: function () {
    return (
      <div>
        <p id="baseline">A simple answer to a complex question</p>
        <h1>Should I Use</h1>
        <SkillChoice source="data.json" />
      </div>
    );
  }
});


React.renderComponent(<ShouldIUseApp />, mountNode);
