import pool from "../config/db.js";

const toTodo = (row) => ({ ...row, completed: Boolean(row.completed) });

const insert = async ({ title, description = null }) => {
  const [result] = await pool.execute(
    "INSERT into todolist (title, description) VALUES (?,?)",
    [title, description],
  );

  const [rows] = await pool.execute("SELECT * FROM todolist WHERE id = ?", [
    result.insertId,
  ]);
  return toTodo(rows[0]);
};

const findAll = async () => {
  const [rows] = await pool.execute("SELECT * FROM todolist ORDER BY id DESC");
  return rows.map(toTodo);
};

const findById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM todolist WHERE id = ?", [
    id,
  ]);
  return rows[0] ? toTodo(rows[0]) : null;
};

const update = async (id, { title, description, completed }) => {
  const [result] = await pool.execute(
    `UPDATE todolist
     SET title = COALESCE(?, title), 
         description = COALESCE(?,description), 
         completed = COALESCE(?, completed)
     WHERE id = ?`,
    [
      title ?? null,
      description ?? null,
      completed === undefined ? null : Number(completed),
      id,
    ],
  );
  if (result.affectedRows === 0) return null;
  return findById(id);
};

const remove = async (id) => {
  const [result] = await pool.execute("DELETE from todolist WHERE id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

export default { insert, findAll, findById, update, remove };
