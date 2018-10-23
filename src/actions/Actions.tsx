export const ACTION_TYPES = {
    ADD_LIST: 'addList',
    ADD_TASK: 'addTask',
    SET_ACTIVE_LIST: 'setActiveList',
};

export const addNewList = (inputText: string) => ({
    type: ACTION_TYPES.ADD_LIST,
    value: inputText
})
export const addNewTask = (listId: number, inputText: string) => (
    {
        listId,
        type: ACTION_TYPES.ADD_TASK,
        value: inputText,
    })
export const setActiveList = (listId: number) => (
    {
        listId,
        type: ACTION_TYPES.SET_ACTIVE_LIST,
    })
