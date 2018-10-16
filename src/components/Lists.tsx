import * as React from 'react';

import List from '../model/List'
import ListItem from './ListItem';

class Lists extends React.Component<{ lists: List[] }, {}> {

    public createList = (lists: List[]) => {
        return lists.map(ListItem);
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