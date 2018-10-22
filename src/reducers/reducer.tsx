import { AnyAction } from 'redux';
import * as Actions from '../actions/Actions'
import todoStore from '../stores/TodoStore';

const initialState = {
    todos: []
}

export default function todoApp(state: any, action: AnyAction) {
    if (typeof state === undefined) {
        return initialState
    }

    switch (action.type) {
        case Actions.ACTION_TYPES.ADD_LIST:
            return todoStore.addNewList(action.value);
        default:
            return state
    }
}

