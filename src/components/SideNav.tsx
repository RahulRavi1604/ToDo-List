import * as React from 'react';

import List from '../model/List';
import Store from '../model/Store';
import IListAttribute from './IListAttribute';
 import ListItem from './ListItem';
import Lists from './Lists';
import MyDay from './MyDay';
import ToDo from './ToDo';

class SideNav extends React.Component<{}, { activeLi: string, inputValue: string, isExpanded: boolean, store: List[], activeListIndex : number }> {

  private mainList: IListAttribute[] = [
    {
      active : false,
      className: "my-day-li" ,
      iconClassName: "fa fa-sun-o m-y-auto m-l-20",
      listName: "My Day",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    },
    {
      active : false,
      className: "important-li" ,// + (this.state.activeLi === "important" ? ' active' : ''),
      iconClassName: "fa fa-star-o m-y-auto  m-l-20",
      listName: "Important",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    },
    {
      active : false,
      className: "planned-li",//  + (this.state.activeLi === "planned" ? ' active' : ''),
      iconClassName: "fa fa-calendar m-y-auto  m-l-20",
      listName: "Planned",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    },
    {
      active : false,
      className: "tasks-li" ,// + (this.state.activeLi === "tasks" ? ' active' : ''),
      iconClassName: "fa fa-home sidenav-blue m-y-auto  m-l-20",
      listName: "Tasks",
      numberOfTasks: 0,
      numberOfTasksDivClassName: "m-y-auto m-r-10",
      paragraphClassName: "m-l-20",
    }
  ];
  constructor(props:any) {
    super(props);
    this.state = {
      activeLi: "my-day",
      activeListIndex : 0,
      inputValue: "",
      isExpanded: true,
      store: Store
    };
  }

  public addNewList = () => {
    const inputText = this.state.inputValue;
    if (inputText !== "") {
      this.setState({
        inputValue: "",
        store: this.state.store.concat([new List(
          this.state.store.length !== 0 ? this.state.store[this.state.store.length - 1].getId() + 1 : 0,
          inputText, 0, [], false)])
      });
    }
  };
  public handleInputChange = (element: React.FormEvent<HTMLInputElement>): void => {
    const inputText = element.currentTarget.value.trim() === null ? "" : element.currentTarget.value;
    this.setState({ inputValue: inputText });
  }
  public toggleCollapse = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };
  public handleOnClickList = (event : any) => {
    this.setState ( {
      activeListIndex : (event.target.id).split("list")[1] - 1 
    });
  }
  public render() {
    const { isExpanded } = this.state;
    return (
      <div className="page-content">
        <nav className={`sidebar ${isExpanded ? "" : "sidebar-collapse"}`}>
          <ul className="m-y-auto p-l-0 p-y-20">
            <li>
              <a href="#">
                <i className="fa fa-bars m-t-10 m-l-20 m-y-auto" onClick={this.toggleCollapse} />
              </a>
            </li>
            {this.mainList.map(ListItem)}
            <li>
              <ul className="lists">
                <Lists lists={this.state.store} handleOnClickList = {this.handleOnClickList} />
                <li className="add-list-li">
                  <i className="fa fa-plus sidenav-blue m-y-auto  m-l-20 add-list" onClick={this.addNewList} />
                  <p className="m-l-20 sidenav-blue">
                    <input type="text" maxLength={20} className="add-list-input" placeholder="New List"
                      value={this.state.inputValue} onChange={this.handleInputChange} />
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <MyDay />
        <ToDo tasks = {this.state.store[this.state.activeListIndex].getTasks()}/>
      </div>
    );
  }
}
export default SideNav;