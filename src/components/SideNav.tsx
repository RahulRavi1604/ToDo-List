import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Actions from '../actions/Actions';
import List from '../model/List';
import Store from '../stores/TodoStore';
import IListAttribute from './IListAttribute';
import ListItem from './ListItem';
import Lists from './Lists';
import MyDay from './MyDay';
import ToDo from './ToDo';

class SideNav extends React.Component<{
  data: List[],addList: (inputText: string) => void, setActiveList: (listId: number) => void,}, {
    listInputValue: string,
    isSidenavExpanded: boolean, store: List[], activeListIndex: number
  }> {
  private mainList: IListAttribute[] = [
    {
      active: false,
      className: "my-day-li",
      iconClassName: "fa fa-sun-o m-y-auto m-l-20",
      listName: "My Day",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    },
    {
      active: false,
      className: "important-li",
      iconClassName: "fa fa-star-o m-y-auto  m-l-20",
      listName: "Important",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    },
    {
      active: false,
      className: "planned-li",
      iconClassName: "fa fa-calendar m-y-auto  m-l-20",
      listName: "Planned",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    },
    {
      active: false,
      className: "tasks-li",
      iconClassName: "fa fa-home sidenav-blue m-y-auto  m-l-20",
      listName: "Tasks",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    }
  ];
  constructor(props: any) {
    super(props);
    this.state = {
      activeListIndex: -1,
      isSidenavExpanded: true,
      listInputValue: "",
      store: this.props.data
    };
  }

  public addNewList = () => {
    const inputText = this.state.listInputValue;
    if (inputText !== "") {
      this.setState({ listInputValue: "" });
      this.props.addList(inputText);
    }
  };

  public deleteCurrentList = (): void => {
    Store.deleteList(this.state.activeListIndex);
    this.setState({
      activeListIndex: -1,
    });
  }
  public deleteCurrentTask = (taskId: number): void => {
    Store.deleteTask(this.state.activeListIndex, taskId)
  }
  public addToDay = (taskId: number): void => {
    this.setState({
      store: Store.toggleAddToDay(this.state.activeListIndex, taskId)
    });
  }
  public updateDueDate = (taskId: number, inputDate: Date): void => {
    this.setState({
      store: Store.updateDueDate(this.state.activeListIndex, taskId, inputDate)
    });
  }
  public updateReminder = (taskId: number, inputDate: Date): void => {
    this.setState({
      store: Store.updateReminder(this.state.activeListIndex, taskId, inputDate)
    });
  }
  public updateRepeat = (taskId: number, inputValue: string): void => {
    this.setState({
      store: Store.updateRepeat(this.state.activeListIndex, taskId, inputValue)
    });
  }
  public updateNote = (taskId: number, inputValue: string): void => {
    this.setState({
      store: Store.updateNote(this.state.activeListIndex, taskId, inputValue)
    });
  }
  public toggleTaskStatus = (taskId: number): void => {
    this.setState({
      store: Store.toggleTaskCompleted(this.state.activeListIndex, taskId)
    });
  }
  public toggleTaskImportant = (taskId: number): void => {
    this.setState({
      store: Store.toggleTaskImportant(this.state.activeListIndex, taskId)
    });
  }
  public handleInputChange = (element: React.FormEvent<HTMLInputElement>): void => {
    const inputText = element.currentTarget.value.trim() === null ? "" : element.currentTarget.value;
    this.setState({ listInputValue: inputText });
  }
  public toggleCollapse = () => {
    this.setState({ isSidenavExpanded: !this.state.isSidenavExpanded });
  };
  public getTargetListId = (event: any): string => {
    if (event.target.classList.contains("list")) {
      return (event.target.id).split("list")[1];
    } else {
      return (event.target.parentElement.id).split("list")[1];
    }
  }
  public handleOnClickList = (event: any) => {
    const listElementId = parseInt(this.getTargetListId(event), 10);
    this.props.setActiveList(listElementId);
    this.setState({
      activeListIndex: listElementId
    });
  }
  public renameList = (element: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      { store: Store.renameList(this.state.activeListIndex, element.currentTarget.value) }
    );
  }
  public renameTask = (taskInput: string, taskId: number) => {
    this.setState(
      { store: Store.renameTask(this.state.activeListIndex, taskId, taskInput) }
    );
  }
  public getListById = (listId: number): any => {
    let resultList;
    this.state.store.forEach((list) => {
      if (listId === list.getId()) {
        resultList = list;
      }
    });
    return resultList;
  }

  public render() {
    const { isSidenavExpanded, activeListIndex, listInputValue } = this.state;
    return (
      <div className="page-content">
        <nav className={`sidebar ${isSidenavExpanded ? "" : "sidebar-collapse"}`}>
          <ul className="m-y-auto p-l-0 p-y-20">
            <li>
              <a href="#">
                <i className="fa fa-bars m-t-10 m-l-20 m-y-auto" onClick={this.toggleCollapse} />
              </a>
            </li>
            {this.mainList.map(ListItem)}
            <li>
              <ul className="lists">
                <Lists lists={this.state.store} handleOnClickList={this.handleOnClickList} />
                <li className="add-list-li">
                  <i className="fa fa-plus sidenav-blue m-y-auto  m-l-20 add-list" onClick={this.addNewList} />
                  <p className="m-l-20 sidenav-blue">
                    <input type="text" maxLength={20} className="add-list-input" placeholder="New List"
                      value={listInputValue} onChange={this.handleInputChange} />
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <MyDay />
        <ToDo listName={activeListIndex !== -1 ? this.getListById(this.state.activeListIndex).getName() :
          "Select a List"} listId={activeListIndex}
          tasks={activeListIndex !== -1 ? this.getListById(activeListIndex).getTasks() : []}
          renameList={this.renameList}
          toggleTaskStatus={this.toggleTaskStatus} toggleTaskImportant={this.toggleTaskImportant}
          renameTask={this.renameTask} addToDay={this.addToDay} updateDueDate={this.updateDueDate}
          updateReminder={this.updateReminder} updateRepeat={this.updateRepeat} updateNote={this.updateNote}
          deleteCurrentList={this.deleteCurrentList} deleteCurrentTask={this.deleteCurrentTask} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<{}>, ownProps: any) => {
  console.log(ownProps);
  return {
    addList: (inputText: string) => dispatch(Actions.addNewList(inputText)),
    setActiveList: (listId: number) => dispatch(Actions.setActiveList(listId)),
  }
}
const mapStateToProps = (state: any) => {
  return {
    data: state.store
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);