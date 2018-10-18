import * as React from 'react';

import List from '../model/List'
import ListItem from './ListItem';

class Lists extends React.Component<{ lists: List[], handleOnClickList : (event : any) => void}, {}> {

    public createList = (lists: List[]) => {
        return lists.map((list: List) => ListItem({
        className : `list ${list.isActive()? " active" : ""}`,
        iconClassName :"fa fa-list-ul sidenav-blue m-y-auto m-l-20",
        listId : " list" + list.getId() ,
        listName : list.getName() ,
        numberOfTasks : list.getNumberOfTasks(),
        numberOfTasksDivClassName : "m-y-auto m-r-10 sidenav-blue",
        onClickEventSuccessFunction : this.props.handleOnClickList,
        paragraphClassName : "m-l-20 sidenav-blue"
    }))
    }
    public render() {
        return (
            <div>
                {this.createList(this.props.lists)}
            </div>
        );
    }
}
export default Lists;