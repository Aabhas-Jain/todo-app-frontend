import React, { Component } from 'react'
import TodoDataService from '../../api/todos/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos :[
                // {id:1, description:'Learn React', done:false, targetDate: new Date()},
                // {id:2, description:'Become an expert in react', done:false, targetDate: new Date()},
                // {id:3, description:'Visit USA', done:false, targetDate: new Date()}
            ],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }
 
    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log(response)
                this.setState({
                    todos : response.data
                })
            }
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        // console.log(id + " "+ username)
        TodoDataService.deleteTodo(username,id).
        then(
            response => {
                this.setState ({message : `Delete of todo ${id} Successful.`})
                this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id){
        // let username = AuthenticationService.getLoggedInUserName()
        // // console.log(id + " "+ username)
        // TodoDataService.deleteTodo(username,id).
        // then(
        //     response => {
        //         this.setState ({message : `Delete of todo ${id} Successful.`})
        //         this.refreshTodos()
        //     }
        // )
        console.log('update '+id)
        this.props.navigate(`/todos/${id}`)
    }

    addTodoClicked(){
        this.props.navigate(`/todos/-1`)
    }

    render(){
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed ?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.targetDate).format('DD-MM-YYYY')}</td>
                                            <td> <button className='btn btn-success' onClick={()=> this.updateTodoClicked(todo.id)}>Update</button> </td>
                                            <td> <button className='btn btn-warning' onClick={()=> this.deleteTodoClicked(todo.id)}>Delete</button> </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                            <button className='btn btn-success' onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ListTodosComponent