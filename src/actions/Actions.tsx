// import dispatcher from '../dispatcher/dispatcher';

export const ACTION_TYPES = {
    ADD_LIST: 'addList',
    ADD_TASK: 'addTask',
};

export function addNewList(inputText : string) : {type : string, value : string} {
    return({
        type: ACTION_TYPES.ADD_LIST,
        value: inputText
    })
}
export function addNewTask(listId : number ,inputText : string) : {} {
    return({
        listId,
        type: ACTION_TYPES.ADD_TASK,
        value: inputText,
    })
}