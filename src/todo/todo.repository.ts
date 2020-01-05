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

    return task.save();
  }

  public removeTask(id: number, user: string) {
    // TODO: more pretty response
    return this.delete({ _id: id, user });
  }

  public updateTask(id: number, user: string, data: any) {
    // TODO:
  }

  public async toggleTask(id: number, user: string) {
    const task: TODO = await this.findOneOrFail({ user, _id: id });
    task.checked = !task.checked;

    // TODO: maybe typeorm do it itself?
    task.updatedAt = new Date();

    return task.save();
  }
}
