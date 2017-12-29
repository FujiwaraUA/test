import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'eventemitter3';
// import logo from './logo.svg';
import './App.css';

var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

window.ee = new EventEmitter();


class News extends Component {
  constructor(props) {
    super(props);
    this.state ={counter : 0};
  }

  render() {
    var data = this.props.data;
    var newsTemplate;
    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
          <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }


    return (
      <div className="news">
      {newsTemplate}
      <strong className= {'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
}


class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true};
    }

    componentDidMount() {
      ReactDOM.findDOMNode(this.refs.author).focus();
    }

    onBtnClickHandler = (e) => {
      e.preventDefault();

      var textEl = ReactDOM.findDOMNode(this.refs.text);

      var author = ReactDOM.findDOMNode(this.refs.author).value;
      var text = textEl.value;

      var item = [{
        author: author,
        text: text,
        bigText: '...'
      }];

      window.ee.emit('News.add', item);

      textEl.value = '';
      this.setState({textIsEmpty: true});
    }

    onCheckRuleClick = (e) => {
      this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    }

    onFieldChange = (fieldName, e) => {
      var next = {};
      if (e.target.value.trim().length > 0) {
        next[fieldName] = false;
        this.setState(next);
      } else {
        next[fieldName] = true;
        this.setState(next);
    }
  }

    render() {
      const {agreeNotChecked,authorIsEmpty,textIsEmpty} = this.state;

      return (
        <form className='add cf'>
        <input
        type='text'
        className='add__author'
        onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
        placeholder='Ваше имя'
        ref='author'
        />
        <textarea
        className='add__text'
        onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
        placeholder='Текст новости'
        ref='text'
        ></textarea>
        <label className='add__checkrule'>
        <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        <button
        className='add__btn'
        onClick={this.onBtnClickHandler}
        ref='alert_button'
        disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
        >
        Добавить новость
        </button>
        </form>
      );
    }
  }

  class Article extends Component {

    state ={visible : false};

    readmoreClick = () => {
      this.setState({visible: true})
    }

    render() {
      var author = this.props.data.author,
      text = this.props.data.text,
      bigText = this.props.data.bigText,
      visible = this.state.visible;


      return (
        <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        <a href="#" onClick={this.readmoreClick}  className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
        <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
        </div>
      );
    }
  }


  class App extends Component {

    state ={news : my_news};

    componentDidMount() {
      var self = this;
      window.ee.addListener('News.add', function(item) {
        var nextNews = item.concat(self.state.news);
        self.setState({news: nextNews});
      });
    }

    componentWillUnmount() {
      window.ee.removeListener('News.add')
    }

    render() {
      return (
        <div className="app">
        <Add />
        <h3>Новости</h3>
        <News  data={this.state.news} />
        </div>
      );
    }
  }

  export default App;
