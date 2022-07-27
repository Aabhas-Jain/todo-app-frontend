import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import First from './components/examples/First';
import Second from './components/examples/Second';
import Third from './components/examples/Third';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/ToDoApp';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter/> */}
        <TodoApp/>
      </div>
    );
  }
}

class LearningComponent extends Component{
  render() {
    return (
      <div className="LearningComponent">
        My Hello World
        <First/>
        <Second/>
        <Third/>
      </div>
    );
  }
}

export default App;