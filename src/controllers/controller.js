import todoService from "../services/service.js";

const create = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const todo = await todoService.getTodo(req.params.id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await todoService.removeTodo(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, getOne, update, remove };
