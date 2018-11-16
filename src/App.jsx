import React from 'react';

import { DB_CONFIG } from './config';
import firebase from '@firebase/app';
import '@firebase/database'

const app = firebase.initializeApp(DB_CONFIG)

class App extends React.Component {
  state = {
    list : []
  }

  componentWillMount() {
    app.database().ref().child('list').on('value', snap => {
      this.setState({
        list: snap.val()
      })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
      app.database().ref().set({
        list: this.state.list.concat({
          name: this.input.value,
          isDone: false
        })
      })
    this.input.value = ''
  }

  removeItem = (index) => {
    this.state.list.splice(index, 1)
    app.database().ref().set({
      list: this.state.list
    });
  }

  toggleDone = (index) => {
    const task = this.state.list[index]
    task.isDone = !task.isDone
    app.database().ref().set({
      list: this.state.list
    });
  }

  render() {
    if ( this.state.list === null ) {
      this.setState({
        list: []
      })
    }
    if ( this.state.list != null ) {
      var toDoList = this.state.list.map((item, index) =>
        <li className="list-group-item" key={index}>
          <div className="custom-control custom-checkbox">
            <input onClick={() => this.toggleDone(index)} type="checkbox" className="custom-control-input" id={`checkBox-${index}`} defaultChecked={this.state.list[index].isDone ? 'cheked' : ''} />
            <label className={this.state.list[index].isDone ? 'done custom-control-label' : 'need custom-control-label'} htmlFor={`checkBox-${index}`}>{item.name}</label>
            <button onClick={() => this.removeItem(index)} type="button" className="close alert-secondary" data-dismiss="alert">&times;</button>
          </div>
        </li>
      )
    }

    return (
      <div className="contaner">
        <div className="card text-white bg-info mb-3">
          <div className="card-header">Список задач:</div>
          <ul className="list-group list-group-flush">
            { toDoList }
          </ul>
          <div className="card-body">
            <label className="col-form-label col-form-label-lg">Добавление задачи:</label>
            <div className="input-group-append">
              <input className="form-control form-control-lg" ref={(el) => this.input = el} type="text" placeholder="Введите задачу" id="inputLarge" />
              <button className="btn btn-secondary" onClick={this.handleSubmit} type='submit'>Добавить</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;