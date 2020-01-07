import { EntityRepository, Repository, getRepository } from 'typeorm';
import { TODO } from './todo.entity';

@EntityRepository(TODO)
export class TodoRepository extends Repository<TODO> {
  public getList(user: string) {
    return this.find({ user });
  }

  public addTask(value: string, user: string) {
    const task = new TODO();
    task.value = value;
    task.user = user;

    // TODO: handle UNIQUE constraint failed
    return task.save();
  }

  public removeTask(id: number, user: string) {
    // TODO: more pretty response
    return this.delete({ _id: id, user });
  }

  public async updateTask(id: number, user: string, data: any) {
    const task: TODO = await this.findOneOrFail({ user, _id: id });
    this.merge(task, data);
    // TODO: handle UNIQUE constraint failed
    return task.save();
  }

  public async toggleTask(id: number, user: string) {
    const task: TODO = await this.findOneOrFail({ user, _id: id });
    task.checked = !task.checked;
    return task.save();
  }
}
