import List from "./List"
import Task from './Task';

class Store {
  private store: List[] = [new List(0, "list1", 2,
    [new Task(0, "Task 11", false, "", new Date(), undefined, undefined, false, false, "")
      , new Task(1, "Task 12", false, "", new Date(), undefined, undefined, false, false, "")
    ],
    false),
  new List(1, "list2", 1,
    [new Task(0, "Task 2", false, "", new Date(), undefined, undefined, false, false, "")],
    false),
  new List(2, "list3", 0, [], false),
  new List(3, "list4", 1,
    [new Task(0, "Task 4", false, "", new Date(), undefined, undefined, false, false, "")],
    false),
  new List(4, "list5", 1,
    [new Task(0, "Task 5", false, "", new Date(), undefined, undefined, false, false, "")],
    false)
  ];

  public getStore(): List[] {
    return this.store;
  }
  public setStore(store: List[]): void {
    this.store = store;
  }

  public addNewList(listName: string): List[] {
    this.store.push(new List(
      this.store.length === 0 ? 0 :  this.store[this.store.length - 1].getId() + 1 ,
      listName, 0, [], false));
    return this.store;
  }

  public incrementNumberOfTasks(listId: number): List[] {
    this.getListById(listId).setNumberOfTasks(this.getListById(listId).getNumberOfTasks() + 1);
    return this.store;
  }
  public addNewTask(listId: number, taskName: string): Task[] {
    this.getListById(listId).getTasks().push(new Task(this.getListById(listId).getTasks().length === 0 ?
     0 :  this.getListById(listId).getTasks()[this.getListById(listId).getTasks().length -1].getId() + 1
      , taskName, false, "", new Date(), undefined, undefined, false, false, ""));
    return this.getListById(listId).getTasks();
  }
  public renameList(listIndex: number, newListName: string): List[] {
    this.getListById(listIndex).setName(newListName);
    return this.store;
  }
  public renameTask(listId: number, taskId: number, newTaskName: string) {
    this.getTaskById(listId, taskId).setName(newTaskName);
    return this.store;
  }
  public getActiveListIndex() {
    let id = null;
    this.store.forEach(list => {
      if (list.isActive()) {
        id = list.getId();
      }
    });
    return id;
  }
  public setActiveList(listIndex: number) {
    this.store.forEach(list => {
      if (list.getId() === listIndex) {
        list.setActive(true);
      } else {
        list.setActive(false);
      }
    });
  }
  public setActiveTask(taskIndex: number) {
    this.store.forEach(list => {
      list.getTasks().forEach(task => {
        if (task.getId() === taskIndex) {
          task.setActive(true);
        } else {
          task.setActive(false);
        }
      });
    });
  }
  public toggleTaskCompleted(activeListIndex: number, taskId: number) {
    this.store[activeListIndex].getTasks()[taskId].setCompleted(
      !this.store[activeListIndex].getTasks()[taskId].isCompleted()
    );
    return this.store;
  }
  public toggleTaskImportant(activeListIndex: number, taskId: number) {
    this.store[activeListIndex].getTasks()[taskId].setImportant(
      !this.store[activeListIndex].getTasks()[taskId].isImportant()
    );
    return this.store;
  }
  public toggleAddToDay(activeListIndex: number, taskId: number) {
    this.store[activeListIndex].getTasks()[taskId].setAddedToDay(
      !this.store[activeListIndex].getTasks()[taskId].isAddedToDay()
    );
    return this.store;
  }
  public updateDueDate = (listId: number, taskId: number, inputDate: Date): List[] => {
    this.getTaskById(listId,taskId).setDueDate(inputDate);
    return this.store;
  }
  public updateReminder = (listId: number, taskId: number, inputDate: Date): List[] => {
    this.getTaskById(listId,taskId).setReminderDate(inputDate);
    return this.store;
  }
  public updateRepeat = (listId: number, taskId: number, inputValue: string): List[] => {
    this.getTaskById(listId,taskId).setRepeat(inputValue);
    return this.store;
  }
  public updateNote = (listId: number, taskId: number, inputValue: string): List[] => {
    this.getTaskById(listId,taskId).setNote(inputValue);
    return this.store;
  }
  public deleteList = (listId : number) : List[] => {
    this.store.splice(listId, 1);
    return this.store;
  }
  public deleteTask = (listId : number, taskId : number) : List[] => {
    this.getListById(listId).getTasks().splice(taskId, 1);
    return this.store;
  }
  public getListById = (listId : number) : any => {
    let resultList; 
    this.store.forEach((list) => {
       if (listId === list.getId()) {
          resultList = list;
       }
    });
    return resultList;
  }
  public getTaskById = (listId : number, taskId : number) : any => {
    let resultTask; 
      this.getListById(listId).getTasks().forEach((task : Task) => {
       if (taskId === task.getId()) {
          resultTask = task;
       }
      });
    return resultTask;
  }
}
export default new Store();