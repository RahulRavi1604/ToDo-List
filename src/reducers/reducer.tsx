import { AnyAction } from 'redux';
import * as Actions from '../actions/Actions'
import List from '../model/List';
import Task from '../model/Task';

const initialState: any = {
    store  : [new List(0, "list1", 2,
        [new Task(0, "Task 11", false, "", new Date(), false, false, "")
            , new Task(1, "Task 12", false, "", new Date(), false, false, "")
        ],
        false)
    ]}

export default function todoApp(state: any = initialState, action: AnyAction) {
    if (typeof state === undefined) {
        return initialState
    }
    switch (action.type) {
        case Actions.ACTION_TYPES.ADD_LIST:
            return {
                ...state, store: initialState.store.push(new List(
                    initialState.store.length === 0 ? 0 : initialState.store[initialState.store.length - 1].getId() + 1,
                    action.value, 0, [], false))
            }
        case Actions.ACTION_TYPES.SET_ACTIVE_LIST:
            return {
                ...state, store: initialState.store.forEach((list : List) => {
                    if (list.getId() === action.listId) {
                        list.setActive(true);
                    } else {
                        list.setActive(false);
                    }
                })
            }
        default:
            return state
    }
}