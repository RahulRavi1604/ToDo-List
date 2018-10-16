import * as React from 'react';

class TopNav extends React.Component {
  public render() {
    return (
    <nav className="topnav p-y-5 p-x-10">
      <ul className="m-y-auto p-l-0">
        <li className="topnav-left m-t-10">
          <a href="#">
            <p>TO-DO</p>
          </a>
        </li>
        <li className="topnav-center m-y-5 m-x-10">
          <button className="search-icon">
            <i className="fa fa-search fa-flip-horizontal"/>
          </button>
          <input className="search-input" placeholder="Search" />
        </li>
      </ul>
    </nav>
    );
  }
}

export default TopNav;
