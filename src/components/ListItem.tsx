import * as React from 'react';
import List from '../model/List';

export default function ListItem(list: List) {
    const className = 'list list';
    return (
        <li key={list.getId()} className={className + list.getId() + (list.isActive() ? " active" : " ")}>
            <i className="fa fa-list-ul sidenav-blue m-y-auto m-l-20" /> <p className="m-l-20 sidenav-blue">
                {list.getName()}</p><div className="m-y-auto m-r-10 sidenav-blue">{list.getNumberOfTasks()}</div>
        </li>
    );
}