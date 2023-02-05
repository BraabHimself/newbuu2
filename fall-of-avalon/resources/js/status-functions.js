const _max_checkbox_count = 9;
const _statuses_state = "statuses_state";
const _all_statuses = [
  { name: "Allies of Avalon", count: 5 },
  { name: "Black Cauldron", count: 3 },
  { name: "Burning Mystery", count: 8 },
  { name: "Call from Beyond", count: 1 },
  { name: "Charred Knowledge", count: 1 },
  { name: "Cherished Belongings", count: 1 },
  { name: "Cold Pyre", count: 1 },
  { name: "Cosuil", count: 5 },
  { name: "Deal Breaker", count: 1 },
  { name: "Deep Secret", count: 1 },
  { name: "Diplomat", count: 3 },
  { name: "Diplomatic Mission", count: 6 },
  { name: "Disturbing Information", count: 3 },
  { name: "Dreams and Prophecies", count: 8 },
  { name: "End of the Road", count: 1 },
  { name: "Enemies of Avalon", count: 3 },
  { name: "Escalation", count: 3 },
  { name: "Fael's Legacy", count: 1 },
  {
    name: "Fall of Chivalry",
    count: 8,
    comment: "When you have any six parts of this status, go to BoS, Verse 525",
  },
  { name: "Farpoint Clues", count: 5 },
  {
    name: "Fate of the Expedition",
    count: 9,
    comment: "When you have parts 1-8 of this status, go to BoS, Verse 405",
  },
  { name: "Final Confrontations", count: 7 },
  { name: "Final Lesson", count: 5 },
  { name: "Fortunate Meetings", count: 5 },
  { name: "General Directions", count: 1 },
  { name: "Gerraint's Successor", count: 3 },
  { name: "Glen Ritual", count: 2 },
  { name: "Guest of Honor", count: 1 },
  { name: "Halfway Intrigue", count: 3 },
  { name: "Helping Hand", count: 6 },
  { name: "Helping the Knights", count: 4, hide_count: true },
  { name: "Hidden Treasures", count: 8 },
  { name: "Hunter's Mark", count: 1 },
  { name: "Lady's Task", count: 1 },
  { name: "Last Haven", count: 5 },
  { name: "Left Behind", count: 9 },
  { name: "Lost and Fallen", count: 7 },
  { name: "Maggot's Redemption", count: 1 },
  { name: "Matricide", count: 1 },
  { name: "Monastery Discovered", count: 1 },
  { name: "Moonring Mission", count: 1 },
  { name: "Morgaine's Task", count: 1 },
  { name: "Mourning Song", count: 2 },
  { name: "Mystery Solved", count: 1 },
  { name: "Pathfinder", count: 8 },
  { name: "Peace in Borough", count: 1 },
  { name: "People's Champion", count: 1 },
  { name: "Pillager", count: 5 },
  { name: "Reclamation", count: 1 },
  { name: "Remedy", count: 4 },
  { name: "Remnants", count: 5 },
  {
    name: "Restoring the Order",
    count: 8,
    comment: "When you have any six parts of this status, go to BoS, Verse 512",
  },
  { name: "Riddle of the Oldsteel", count: 1 },
  { name: "Saved by the Goddess", count: 1 },
  { name: "Scrounger", count: 1 },
  { name: "Secrets of the Forest", count: 4 },
  { name: "Shelter in the Storm", count: 1 },
  { name: "Shrine Secure", count: 1 },
  { name: "Something is Watching", count: 4, hide_count: true },
  { name: "Stonemason's Secret", count: 1 },
  { name: "Strange Encounters", count: 8 },
  { name: "Supplying the Revolt", count: 4, hide_count: true },
  { name: "Tangleroot Knowledge", count: 2 },
  { name: "Tracker", count: 1 },
  { name: "Traveling Menhir", count: 2 },
  { name: "Tuathan Exploration", count: 5 },
  { name: "Underfern", count: 5 },
  { name: "War for Avalon", count: 4 },
  { name: "Winds of Wyrdness", count: 1 },
];

function validateStatusStates(states) {
  var valid = true;

  if (states.hasOwnProperty(_statuses_state)) {
    var statuses = states[_statuses_state];

    for (
      var status_idx = 0;
      status_idx < _all_statuses.length && valid;
      status_idx++
    ) {
      var status_data = _all_statuses[status_idx];
      var status_id = generateIdFromStatusName(status_data.name);

      for (var cb_idx = 0; cb_idx < status_data.count && valid; cb_idx++) {
        valid = valid && statuses.hasOwnProperty(status_id + (cb_idx + 1));
      }
    }
  }

  return valid;
}

function getStatusesTabState() {
  var statuses = {};

  for (var status_idx = 0; status_idx < _all_statuses.length; status_idx++) {
    var status_data = _all_statuses[status_idx];
    var status_id = generateIdFromStatusName(status_data.name);

    for (var cb_idx = 0; cb_idx < status_data.count; cb_idx++) {
      var cb_id = status_id + (cb_idx + 1);

      statuses[cb_id] = isChecked(cb_id);
    }
  }

  return { [_statuses_state]: statuses };
}

function loadStatusesTabState(states) {
  var statuses_state = states[_statuses_state];

  for (var status_idx = 0; status_idx < _all_statuses.length; status_idx++) {
    var status_data = _all_statuses[status_idx];
    var status_id = generateIdFromStatusName(status_data.name);

    for (var cb_idx = 0; cb_idx < status_data.count; cb_idx++) {
      var cb_id = status_id + (cb_idx + 1);

      setChecked(cb_id, statuses_state[cb_id]);
    }
  }
}

function populateStatuses() {
  var statusesContainer = document.getElementById("statuses");

  for (var status_idx = 0; status_idx < _all_statuses.length; status_idx++) {
    var status_data = _all_statuses[status_idx];
    var status_id = generateIdFromStatusName(status_data.name);
    var html = '<div class="status-item" id="' + status_id + '">';

    html +=
      '<table class="status-table"><tr>' +
      generateStatusNameContent(status_data) +
      '<td class="status-checks">';

    for (var cb_idx = 0; cb_idx < status_data.count; cb_idx++) {
      var cb_id = status_id + (cb_idx + 1);
      var margin_class =
        cb_idx + 1 < status_data.count ? ' class="label-margin" ' : "";
      var should_show_numbers = shouldShowNumbers(
        status_data.count,
        status_data.hide_count
      );

      html += '<input type="checkbox" id="' + cb_id + '"></checkbox>';
      html +=
        '<label class="check-label" for="' +
        cb_id +
        '"' +
        margin_class +
        ">" +
        (should_show_numbers ? cb_idx + 1 : "") +
        "</label>";
    }

    html += "</td></tr></table>";

    html += "</div>";

    statusesContainer.innerHTML += html;
  }
}

function generateStatusNameContent(status_data) {
  var html = "";

  html +=
    '<td class="status-name"' +
    (status_data.comment ? 'title="' + status_data.comment + '"' : "") +
    ">";
  html += status_data.name + (status_data.comment ? "<sup>&quest;</sup>" : "");
  html += "</td>";

  return html;
}

function isChecked(element_id) {
  return document.getElementById(element_id).checked;
}

function setChecked(element_id, isChecked) {
  document.getElementById(element_id).checked = isChecked;
}

function generateIdFromStatusName(name) {
  return name.replaceAll(" ", "").replaceAll("'", "");
}

function shouldShowNumbers(count, hide_count) {
  return count > 1 && !hide_count;
}

window.addEventListener("load", function () {
  populateStatuses();
});
