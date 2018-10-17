import * as React from 'react';

import Task from '../model/Task'

class Lists extends React.Component<{ tasks: Task[], handleOnClickTask: () => void }, {}> {

    public render() {
        return this.props.tasks.map((task: Task) => (
            <li key={task.getId()} className={"task " + (task.isActive() ? " active" : " ")} id={"task" + task.getId()}
             onClick={this.props.handleOnClickTask}>
                <i className={"status " + task.isCompleted ? "fa fa-check-circle" : "fa fa-circle-thin"} />
                <div className="task ">{task.getName()}</div>
                <i className={"important " + task.isImportant ? "fa fa-star-o" : "fa fa-star"} />
            </li>
        )
        );
    }
}
export default Lists;