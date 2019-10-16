export interface ITODO {
  _id: number;
  user: string;
  value: string;
  checked: boolean;
}

export class TodoModel {
  inc: number = 0;
  list: ITODO[] = [];

  getList(user: string) {
    return this.list.filter(el => el.user === user);
  }

  findTask(
    id: number,
    user: string,
    onlyIndex: boolean = false,
  ): ITODO | number {
    const taskIndex = this.list.findIndex(
      el => el.user === user && el._id === id,
    );
    if (taskIndex >= 0) return onlyIndex ? taskIndex : this.list[taskIndex];
    else throw new Error('not found');
  }

  addTask(body) {
    this.list.push({
      ...body,
      checked: false,
      _id: this.inc++,
    });

    return this.getList(body.user);
  }

  removeTask(id, user) {
    const taskIndex = this.findTask(id, user, true);
    this.list.splice(<number>taskIndex, 1);

    return this.getList(user);
  }

  updateTask(id, user, data) {
    const taskIndex = this.findTask(id, user, true);
    Object.assign(this.list[<number>taskIndex], data);

    return this.getList(user);
  }

  toggleTask(id, user) {
    const task = this.findTask(id, user, false);
    (<ITODO>task).checked = !(<ITODO>task).checked;

    return this.getList(user);
  }
}
