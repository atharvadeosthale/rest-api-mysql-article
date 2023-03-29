const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM Users`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function update(id, programmingLanguage) {
  const result = await db.query(
    `UPDATE programming_languages 
    SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
    pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
    WHERE id=${id}`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "Programming language updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = "Error in deleting programming language";

  if (result.affectedRows) {
    message = "Programming language deleted successfully";
  }

  return { message };
}

async function create(user) {
  const result = await db.query(
    `INSERT INTO Users 
    (username, profilePic)
    VALUES 
    ("${user.name}", "${user.profilePic}")`
  );

  let message = "Error in creating new user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
