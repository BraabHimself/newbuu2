const _notes_state = "notes_state";
const _notes_id = "notes";

function validateNotesState(states) {
  return states.hasOwnProperty(_notes_state);
}

function getNotesTabState() {
  return { [_notes_state]: document.getElementById(_notes_id).value };
}

function loadNotesTabState(states) {
  document.getElementById(_notes_id).value = states[_notes_state];
}
