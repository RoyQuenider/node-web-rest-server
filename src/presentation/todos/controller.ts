import { Request, Response } from "express"
import { text } from "stream/consumers";


const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy eggs', completedAt: null },
  { id: 3, text: 'Buy bread', completedAt: new Date() },
  { id: 4, text: 'Buy beer', completedAt: new Date() },
]


// Usualmente en nuestros controladores se utilizaza la inyeccion de dependencia
export class TodosController {

  //* DI
  constructor() { }

  public getTodo = (req: Request, res: Response) => {
    res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'id argument must be a number' });
    const todo = todos.find(todo => todo.id === id);
    (todo) ?
      res.json(todo) :
      res.status(404).json({ error: `todo with id ${id} not found` });
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' })
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'id argument must be a number' });
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ error: `todo with id ${id} not found` });

    const { text, completedAt } = req.body;
    todo.text = text || todo.text;
    (completedAt === 'null') ?
      todo.completedAt = null :
      todo.completedAt = new Date(completedAt || todo.completedAt);

    res.json(todo);
  }

  public deleteTodo = (req: Request, res: Response) => {

    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'id argument must be a number' });
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return res.status(404).json({ error: `todo with id ${id} not found` });
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: `todo with id ${id} deleted` });
  }


}