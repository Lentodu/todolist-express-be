import todoModel from "../models/model.js";

const createError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const createTodo = async ({ title, description }) => {
  if (!title || !title.trim()) {
    throw createError("Title wajib diisi!", 400);
  }

  return todoModel.insert({ title: title.trim(), description });
};

const getTodos = async () => {
  return todoModel.findAll();
};

const getTodo = async (id) => {
  const todo = await todoModel.findById(id);

  if (!todo) throw createError("Todo tidak ditemukan!", 404);
  return todo;
};

const updateTodo = async (id, data) => {
  const todo = await todoModel.update(id, data);

  if (todo === null) throw createError("Todo tidak ditemukan!", 404);
  return todo;
};

const removeTodo = async (id) => {
  const removed = await todoModel.remove(id);

  if (!removed) throw createError("Todo tidak ditemukan!", 404);
};

export default { createTodo, getTodos, getTodo, updateTodo, removeTodo };
