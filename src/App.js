import React, { Component } from 'react';
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


class News extends Component {

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

class Article extends Component {

  constructor(props) {
    super(props);
    this.state ={visible : false};
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
      <a href="#" className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
      <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="app">
        <h3>Новости</h3>
        <News data={my_news} />
      </div>
    );
  }
}

export default App;
