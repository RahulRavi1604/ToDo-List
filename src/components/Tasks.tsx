import * as React from 'react';

import Task from '../model/Task'

class Tasks extends React.Component<{ tasks: Task[], handleOnClickTask: (event : any) => void, toggleStatus : (event : any) => void
     , toggleImportant : (event : any) => void }, {}> {

    public render() {
        return this.props.tasks.map((task: Task) => (
            <li key={task.getId()} className={"task " + (task.isActive() ? " active" : " ")}
                   id={"task" + task.getId()} onClick={this.props.handleOnClickTask}>
                <i className={"status " + task.isCompleted ? "fa fa-circle-thin" : "fa fa-check-circle"} onClick = {this.props.toggleStatus}/>
                <div>{task.getName()}</div>
                <i className={"important " + task.isImportant ? "fa fa-star-o" : "fa fa-star"}  onClick = {this.props.toggleImportant}/>
            </li>
        )
        );
    }
}
export default Tasks;