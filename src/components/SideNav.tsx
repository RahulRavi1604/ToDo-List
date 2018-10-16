import * as React from 'react';

import List from '../model/List';
import Store from '../model/Store';
import Lists from './Lists';
import MyDay from './MyDay';
import ToDo from './ToDo';

class SideNav extends React.Component<{}, { inputValue: string, isExpanded: boolean, store: List[] }> {

  constructor(props: React.ReactPropTypes) {
    super(props);
    this.state = {
      inputValue: "",
      isExpanded: true,
      store: Store
    };
    this.addNewList = this.addNewList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  public addNewList = () => {
    const inputText = this.state.inputValue;
    if (inputText !== "") {
      this.setState({
        inputValue : "" ,
        store: this.state.store.concat([new List(
          this.state.store.length !== 0 ? this.state.store[this.state.store.length - 1].getId() + 1 : 0 ,
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

  public render() {
    return (
      <div className="page-content">
        <nav className={"sidebar " + (this.state.isExpanded ? "" : "sidebar-collapse")}>
          <ul className="m-y-auto p-l-0 p-y-20">
            <li><a href="#"><i className="fa fa-bars m-t-10 m-l-20 m-y-auto" onClick={this.toggleCollapse} /></a></li>
            <a href="#">
              <li className="my-day-li active">
                <i className="fa fa-sun-o m-y-auto m-l-20" />
                <p className="m-l-20">My Day</p>
                <div className="m-y-auto m-r-10" />
              </li>
            </a>
            <a href="#">
              <li>
                <i className="fa fa-star-o m-y-auto  m-l-20" />
                <p className="m-l-20">Important</p>
                <div className="m-y-auto m-r-10" />
              </li>
            </a>
            <a href="#">
              <li>
                <i className="fa fa-calendar m-y-auto  m-l-20" />
                <p className="m-l-20">Planned</p>
                <div className="m-y-auto m-r-10" />
              </li>
            </a>
            <a href="#">
              <li className="list"><i className="fa fa-home sidenav-blue m-y-auto  m-l-20" />
                <p className="m-l-20">Tasks</p>
                <div className="m-y-auto m-r-10" />
              </li>
            </a>
            <li>
              <ul className="lists">
                <Lists lists={this.state.store} />
                <li className="add-list-li">
                  <i className="fa fa-plus sidenav-blue m-y-auto  m-l-20 add-list" onClick={this.addNewList} />
                  <p className="m-l-20 sidenav-blue">
                    <input type="text" maxLength={20} className="add-list-input" placeholder="New List" value={this.state.inputValue} onChange={this.handleInputChange} />
                  </p>
                  <div className=" m-r-10 m-y-auto" />
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <MyDay />
        <ToDo />
      </div>
    );
  }
}
export default SideNav;