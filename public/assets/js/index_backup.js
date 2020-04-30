console.log("I exist!")

$( document ).ready(function() {
  console.log( "ready!" );

const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
const getNotes = function() {
  return $.ajax({
    url: "/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
const saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
const deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
const renderNoteList = function(notes) {
  $noteList.empty();

  const noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    console.log(note)

    var $li = $("<li class='list-group-item'>").data(note);
    console.log($li)
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// $(".save-note").on("click", function() {
//   let saveNoteTitle = $(".note-title").val().trim();
//   let saveNoteText = $(".note-textarea").val().trim();

//   // Using a RegEx Pattern to remove spaces
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   saveNoteTitle = saveNoteTitle.replace(/\s+/g, "").toLowerCase();
//   saveNoteText = saveNoteText.replace(/\s+/g, "").toLowerCase();

//   // QUESTION: What does $.get do? What are the parameters it is expecting?
//   $.get("/api/notes" + saveNoteText, function(data) {
//     console.log(data);
//     if (data) {
//       $(".note-title").text(data.title);
//       $(".note-textarea").text(data.text);
//     }
//     else {
//       $("#name").text("No note was not found.");
//     }
//   });
// });

document.addEventListener("DOMcontentLoaded", () => {
  document.getElementById("btn").addEventListener("click", saveNoteTitle),
  document.getElementById("btn").addEventListener("click", saveNoteText);
}
)

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();

//PARSE BEFORE INTEGRATING
$(".save-note").on("click", function() {
  let saveNoteTitle = $(".note-title").val().trim();
  let saveNoteText = $(".note-textarea").val().trim();
  console.log(saveNoteTitle, saveNoteText)

  // Using a RegEx Pattern to remove spaces
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  saveNoteTitle = saveNoteTitle.replace(/\s+/g, "").toLowerCase();
  saveNoteText = saveNoteText.replace(/\s+/g, "").toLowerCase();

  // document.addEventListener("DOMcontentLoaded"), () => {
  //   document.getElementById("btn").addEventListener("click", saveNoteTitle),
  //   document.getElementById("btn").addEventListener("click", saveNoteText);
  // },

    // QUESTION: What does $.get do? What are the parameters it is expecting?
    // $.get("/api/notes/" + saveNoteText, function(data) {
    //   console.log(data);
    //   if (data) {
    //     $(".note-title").text(data.title);
    //     $(".note-textarea").text(data.text);
    //   }
    //   else {
    //     $("#name").text("No note was not found.");
    //   }})
    let note = {"Title":saveNoteTitle,"Text":saveNoteText}

    $.post("/api/notes", note)
    .then(function(data) {
     console.log("saved");

     $.get("/readNotes/", function(data) {
      console.log(data);
    });

    });

    })

  });