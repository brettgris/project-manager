var Reflux = require('reflux');

var NotesActions = Reflux.createActions(['getNotes', 'addNote', 'deleteNote', 'updateNote']);

module.exports = NotesActions;