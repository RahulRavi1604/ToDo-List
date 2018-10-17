
interface IListAttribute {
    active : boolean,
    className: string,
    iconClassName: string,
    paragraphClassName: string,
    numberOfTasksDivClassName: string,
    listName: string,
    numberOfTasks: number,
    listId?: string,
    onClickEventSuccessFunction?: (event : any) => void
  }
  export default IListAttribute;