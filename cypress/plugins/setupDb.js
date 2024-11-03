const fs = require('fs');
const path = require('path');
const dbPath = path.resolve('./trello_app/public/data/data.json');

const empty = {
  boards: [],
  tasks: [],
  users: [],
  lists: [],
};

module.exports.setupDb = (data = empty) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  return data;
};
