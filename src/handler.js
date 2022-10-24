const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((n) => n.id === id).length > 0;

  // If note added succesfully
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note added succesfully',
      data: {
        noteId: id,
      },
    });

    console.log(notes);
    response.code(201);
    return response;
  }

  // If fail
  const response = h.response({
    status: 'fail',
    message: 'Failed to add note',
  });

  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  // If success
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // If fail
  const response = h.response({
    status: 'fail',
    message: 'Note not found',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = { 
      ...notes[index],
      // Spread operator is used to retain the value of previous note which don't need to be updated
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Note updated succesfully',
    });
    
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to update note, id not found.',
  });

  response.code(404);
  return response;
};

module.exports = { 
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, 
};
