import React, { Component } from 'react';
import TaskItem from './taskItem';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name]: value
        });
    }
    
    render() {
        var {tasks} = this.props; // ~ var tasks = this.props.tasks;
        var { filterName, filterStatus } = this.state;
        var eleTasks = tasks.map((task, index) => {
            return <TaskItem 
                key={task.id} 
                index={index} 
                task={task} 
                onUpdateStatus = {this.props.onUpdateStatus}
                onDeleteItem = {this.props.onDeleteItem}
                onModifyItem = {this.props.onModifyItem}
            />
        })
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">No</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                name="filterName" 
                                className="form-control" 
                                value={filterName}
                                onChange={this.onChange}
                            />
                        </td>

                        <td>
                            <select 
                                name="filterStatus" 
                                className="form-control"
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value={-1}>All</option>
                                <option value={0}>Hide</option>
                                <option value={1}>Active</option>
                            </select>
                        </td>

                        <td></td>
                    </tr>

                    {eleTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;
