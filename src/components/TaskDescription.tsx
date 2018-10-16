import * as React from 'react';

class TaskDescription extends React.Component {
  public render() {
    return (
      <div className="task-description">
        <div className="card task-details">
          <i className="fa fa-circle-thin task-status"/>
          <textarea className="task-text"/>
          <i className="fa fa-star-o task-important"/>
        </div>
        <div className="card add-to-day">
          <button>
            <i className="fa fa-sun-o"/>
            <p className="m-l-20 add-to-day-button">Add to My Day</p>
          </button>
        </div>
        <div className="card settings">
          <div className="add-reminder-date">
            <i className="fa fa-clock-o"/>
            <p className="m-l-20">Remind Me</p>
            <input type="date" id="reminder-date-picker" className="reminder-date-picker" />
          </div>
          <div className="add-due-date">
            <i className="fa fa-calendar"/>
            <p className="m-l-20">Add due date</p>
            <input type="date" id="due-date-picker" className="due-date-picker" />
          </div>
          <div className="add-repeat">
            <i className="fa fa-repeat"/>
            <p className="m-l-20">Repeat</p>
            <select className="repeat-selection"><option value="">None</option><option value="Daily">Daily</option><option value="Every Week">Every Week</option><option value="Every Month">Every Month</option><option value="Every Year">Every Year</option></select>
          </div>
        </div>
        <div className="letter-count">150 characters remaining</div>
        <textarea className="note-card" placeholder="Add a note" maxLength={150}/>
        <div className="bottom-settings">
          <button className="toggle-slider"><i className="fa fa-arrow-right"/>
          </button>
          <p/>
          <button className="delete-task"><i className="fa fa-trash-o"/>
          </button>
        </div>
      </div>
    );
  }
}

export default TaskDescription;
