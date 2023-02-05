const _max_menhir_count = 3;
const _max_quest_count = 2;
const _max_guardian_count = 2;
const _max_removed_count = 15;
const _locations_state = "locations-state";
const _menhir_location_prefix = "menhir-location-";
const _menhir_dial_prefix = "menhir-dial-";
const _guardian_loc_1 = "guardian-location-1";
const _guardian_loc_2 = "guardian-location-2";
const _quest_location_prefix = "quest-location-";
const _quest_dial_prefix = "quest-dial-";
const _removed_old_prefix = "old-location-";
const _removed_new_prefix = "new-location-";

function validateLocationStates(states) {
  var valid = true;

  if (states.hasOwnProperty(_locations_state)) {
    var location_states = states[_locations_state];

    valid =
      valid &&
      location_states.hasOwnProperty(_menhir_location_prefix + "1") &&
      location_states.hasOwnProperty(_menhir_dial_prefix + "1");
    valid =
      valid &&
      location_states.hasOwnProperty(_menhir_location_prefix + "2") &&
      location_states.hasOwnProperty(_menhir_dial_prefix + "2");
    valid =
      valid &&
      location_states.hasOwnProperty(_menhir_location_prefix + "3") &&
      location_states.hasOwnProperty(_menhir_dial_prefix + "3");
    valid =
      valid &&
      location_states.hasOwnProperty(_quest_location_prefix + "1") &&
      location_states.hasOwnProperty(_quest_dial_prefix + "1");
    valid =
      valid &&
      location_states.hasOwnProperty(_quest_location_prefix + "2") &&
      location_states.hasOwnProperty(_quest_dial_prefix + "2");

    for (
      var locationIdx = 1;
      locationIdx <= _max_removed_count && valid;
      locationIdx++
    ) {
      valid =
        valid &&
        location_states.hasOwnProperty(_removed_old_prefix + locationIdx) &&
        location_states.hasOwnProperty(_removed_new_prefix + locationIdx);
    }
  }

  return valid;
}

function getLocationsTabState() {
  var locationsTabState = {};

  Object.assign(
    locationsTabState,
    getMenhirState(),
    getQuestState(),
    getGuardianState(),
    getRemovedState()
  );

  return { [_locations_state]: locationsTabState };
}

function loadLocationsTabState(states) {
  var locations_state = states[_locations_state];

  loadMenhirState(locations_state);
  loadQuestState(locations_state);
  loadGuardianState(locations_state);
  loadRemovedState(locations_state);
}

function getMenhirState() {
  return getStateByPrefix(
    _menhir_location_prefix,
    _menhir_dial_prefix,
    _max_menhir_count
  );
}

function loadMenhirState(states) {
  loadStateByPrefix(
    states,
    _menhir_location_prefix,
    _menhir_dial_prefix,
    _max_menhir_count
  );
}

function getQuestState() {
  return getStateByPrefix(
    _quest_location_prefix,
    _quest_dial_prefix,
    _max_quest_count
  );
}

function loadQuestState(states) {
  loadStateByPrefix(
    states,
    _quest_location_prefix,
    _quest_dial_prefix,
    _max_quest_count
  );
}

function getGuardianState() {
  return {
    [_guardian_loc_1]: document.getElementById(_guardian_loc_1).value,
    [_guardian_loc_2]: document.getElementById(_guardian_loc_2).value,
  };
}

function loadGuardianState(states) {
  document.getElementById(_guardian_loc_1).value = states[_guardian_loc_1];
  document.getElementById(_guardian_loc_2).value = states[_guardian_loc_2];
}

function getRemovedState() {
  return getStateByPrefix(
    _removed_old_prefix,
    _removed_new_prefix,
    _max_removed_count
  );
}

function loadRemovedState(states) {
  loadStateByPrefix(
    states,
    _removed_old_prefix,
    _removed_new_prefix,
    _max_removed_count
  );
}

function getStateByPrefix(input_prefix_1, input_prefix_2, max_count) {
  var state = {};

  for (var idx = 1; idx <= max_count; idx++) {
    var prefix_id_1 = input_prefix_1 + idx;
    var prefix_id_2 = input_prefix_2 + idx;

    state[prefix_id_1] = document.getElementById(prefix_id_1).value;
    state[prefix_id_2] = document.getElementById(prefix_id_2).value;
  }

  return state;
}

function loadStateByPrefix(states, input_prefix_1, input_prefix_2, max_count) {
  for (var idx = 1; idx <= max_count; idx++) {
    var prefix_id_1 = input_prefix_1 + idx;
    var prefix_id_2 = input_prefix_2 + idx;

    document.getElementById(prefix_id_1).value = states[prefix_id_1];
    document.getElementById(prefix_id_2).value = states[prefix_id_2];
  }
}
