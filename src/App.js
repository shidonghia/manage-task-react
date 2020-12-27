import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Manipulation from './components/manipulation';
import TaskList from './components/taskList';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm: false,
            taskModify: null,
            filter: {
                name: '',
                status: -1,
            },
            keyword: '',
            sort: {
                by: 'name',
                value: 1
            }
        };
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('task')){
            var task = JSON.parse(localStorage.getItem('task'));
            this.setState({
                tasks: task
            })
        }
    }

    changeDisplay = () => {
        if(this.state.taskModify !== null && this.state.isDisplayForm){
            this.setState({
                isDisplayForm: true,
                taskModify: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskModify: null
            });
        } 
    }

/*    onGenerateData = () => {
        var task = [
            {
                id: this.generateKey(),
                name: 'ReactJS',
                status: true
            },
            {
                id: this.generateKey(),
                name: 'AngularJS',
                status: true
            },
            {
                id: this.generateKey(),
                name: 'Bootstrap',
                status: false
            }
        ];
        this.setState({
            tasks: task
        });
        localStorage.setItem('task', JSON.stringify(task));
    }*/

    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(Math.floor(Math.random()*3)+1 );
    }

    generateKey(){
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    closeForm = () => {
        this.setState({
            isDisplayForm: false,
            taskModify: null
        });
    }

    showForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        if(data.id !== ''){
            var index = this.findIndex(data.id);
            tasks[index] = data;
        } else {
            data.id = this.generateKey();
            tasks.push(data);
        }
        this.setState({
            tasks: tasks,
            taskModify: null
        })
        localStorage.setItem('task', JSON.stringify(tasks));
        this.closeForm();
    }

    onUpdateStatus = (id) => {
        var index = this.findIndex(id);
        if(index !== -1){
            var { tasks } = this.state;
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('task', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id == id){
                result = index;
            }
        })
        return result;
    }

    onDeleteItem = (id) => {
        var index = this.findIndex(id);
        if(index !== -1){
            var {tasks} = this.state;
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('task', JSON.stringify(tasks));
        }
        this.closeForm()
    }

    onModifyItem = (id) => {
        var index = this.findIndex(id);
        if(index !== -1){
            var {tasks} = this.state;
            this.setState({
                taskModify: tasks[index]
            })
            this.showForm();
        }
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword,
        })
    }

    onSort = (sort) => {
        this.setState({
            sort: sort,
        })
    }

    render() {
        var { tasks, isDisplayForm, taskModify, filter, keyword, sort } = this.state; // ~ var tasks = this.state.tasks;
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            tasks = tasks.filter((task)=>{
                if(filter.status === -1){
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false);
                }
            })
        }

        if(keyword){
            console.log(keyword);
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
            })
        }

        if(sort.by === 'name'){
            tasks.sort((a, b) => {
                var eleNameA = a.name.toLowerCase();
                var eleNameB = b.name.toLowerCase();
                if(eleNameA>eleNameB) return sort.value;
                else if(eleNameA<eleNameB) return -sort.value;
                // else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if(a.status<b.status) return sort.value;
                else if(a.status>b.status) return -sort.value;
                else return 0;
            })
        }
        var eleTaskForm = isDisplayForm ? <TaskForm 
                                            onCloseForm={this.closeForm} 
                                            onSubmit={this.onSubmit}
                                            task={taskModify}
                                        /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1> Manage Task </h1> <hr />
                </div>

                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                       {/*Form*/}
                        {eleTaskForm}
                    </div>

                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick = {this.changeDisplay}
                        >
                            <span className="fa fa-plus mr-5"></span> Add task
                        </button>&nbsp;
{/*                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.onGenerateData}
                        >
                            <span className="fa fa-plus mr-5"></span> Generate Task
                        </button>*/}

                        {/*Search - Sort*/}
                        <Manipulation 
                            onSearch={this.onSearch} 
                            onSort={this.onSort}
                        />

                        {/*List*/}
                        <TaskList 
                            tasks={tasks} 
                            onUpdateStatus={this.onUpdateStatus} 
                            onDeleteItem = {this.onDeleteItem}
                            onModifyItem = {this.onModifyItem}
                            onFilter = {this.onFilter}
                        />
                    </div>

                    

                    
                    {/*<div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            
                        </div>
                    </div>*/}
                </div>  
            </div>
        );
    }
}

export default App;
