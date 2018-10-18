import List from "./List"
import Task from './Task';

class Store {
  private store: List[] = [new List(0, "list1", 2,
    [new Task(0, "Task 11", false, "falalaa", new Date(), null, null, false, false, "")
      , new Task(1, "Task 12", false, "falalaa", new Date(), null, null, false, false, "")
    ],
    true),
  new List(1, "list2", 1,
    [new Task(0, "Task 2", false, "falalaa", new Date(), null, null, false, false, "")],
    false),
  new List(2, "list3", 0, [],
    false),
  new List(3, "list4", 1,
    [new Task(0, "Task 4", false, "falalaa", new Date(), null, null, false, false, "")],
    false),
  new List(4, "list5", 1,
    [new Task(0, "Task 5", false, "falalaa", new Date(), null, null, false, false, "")],
    false)
  ];

  public getStore(): List[] {
    return this.store;
  }
  public setStore(store: List[]): void {
    this.store = store;
  }

  public addNewList (listName : string) : List[] {
    this.store.push(new List(
      this.store.length !== 1 ? this.store[this.store.length - 1].getId() + 1 : 0 ,
      listName, 0, [], false));
      return this.store;
  }

  public incrementNumberOfTasks(listId : number) : List[] {
    this.store[listId].setNumberOfTasks(this.store[listId].getNumberOfTasks() + 1);
    return this.store;
  }
  public addNewTask (listId : number, taskName : string) : Task[] {
    this.store[listId].getTasks().push(new Task(0, taskName, false, "", new Date(), null, null, false, false, ""));
    return this.store[listId].getTasks();
  }
  public renameList(listIndex: number, newListName: string): List[] {
    this.store[listIndex].setName(newListName);
    return this.store;
  }
  public renameTask(listIndex: number, taskIndex: number, newTaskName: string) {
    this.store[listIndex].getTasks()[taskIndex].setName(newTaskName);
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

}
export default new Store();