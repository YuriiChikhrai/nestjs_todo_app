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

  public removeTask(id: number, user: string) {}

  public updateTask(id: number, user: string, data: any) {}

  public toggleTask(id: number, user: string) {}
}
