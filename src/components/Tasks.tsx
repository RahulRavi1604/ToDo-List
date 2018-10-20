import * as React from 'react';

import Task from '../model/Task'

class Tasks extends React.Component<{
    tasks: Task[], handleOnClickTask: (event: any) => void, toggleStatus: (event: any) => void
    , toggleImportant: (event: any) => void
}, {}> {

    public render() {
        return this.props.tasks.map((task: Task) => (
            <li key={task.getName()} className={"task " + (task.isActive() ? " active" : " ")}
                id={"task" + task.getId()} onClick={this.props.handleOnClickTask}>
                <i className={"status " + (task.isCompleted() ? " fa fa-check-circle" : " fa fa-circle-thin")} onClick={this.props.toggleStatus} />
                <div id={"task" + task.getId()}>{task.getName()}
                    <span className={(task.getDueDate() ? " due-date" : " ")} />
                    <span className={(task.getReminderDate() ? " reminder" : " ")} />
                    <span className={(task.getRepeat() !== "" ? " repeat" : " ")} />
                    <span className={(task.isAddedToDay() ? " added-to-day" : " ")} />
                    <span className={(task.getNote().trim() !== "" ? " note" : " ")} />
                </div>
                <i className={"important " + (task.isImportant() ? " fa fa-star" : " fa fa-star-o")} onClick={this.props.toggleImportant} />
            </li>
        )
        );
    }
}
export default Tasks;