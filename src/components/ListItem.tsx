import * as React from 'react';

import IListAttribute from './IListAttribute';

export default function ListItem(attribute : IListAttribute) {
    return (
        <li key={attribute.listName} className={attribute.className + attribute.active ?" ":" active"}
         id={attribute.listId}
              onClick={attribute.onClickEventSuccessFunction}>
            <i className={attribute.iconClassName} />
            <p className={attribute.paragraphClassName}>
                {attribute.listName}
            </p>
            <div className={attribute.numberOfTasksDivClassName}>
                {attribute.numberOfTasks}
            </div>
        </li>
    );
}