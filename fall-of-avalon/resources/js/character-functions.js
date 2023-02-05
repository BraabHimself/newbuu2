const _characters_state = "characters_state";
const _ailei = "ailei";
const _arev = "arev";
const _beor = "beor";
const _maggot = "maggot";
const _niahm = "niahm";
const _aggression = "aggression";
const _empathy = "empathy";
const _courage = "courage";
const _caution = "caution";
const _practicality = "practicality";
const _spirituality = "spirituality";
const _food = "food";
const _wealth = "wealth";
const _rep = "rep";
const _exp = "exp";
const _magic = "magic";
const _location = "location";
const _dial = "dial";
const _name = "name";
const _energy = "energy";
const _health = "health";
const _terror = "terror";
const _starting_location = 101;
const _starting_dial = 0;
const _starting_terror = 0;
const _attributes = [
  _aggression,
  _empathy,
  _courage,
  _caution,
  _practicality,
  _spirituality,
];
const _characters = [_ailei, _arev, _beor, _maggot, _niahm];
const _resources = [_food, _wealth, _rep, _exp, _magic];
const _max_character_count = 4;
const _characters_initial_states = {
  [_ailei]: {
    [_name]: _ailei,
    [_aggression]: 0,
    [_empathy]: 2,
    [_courage]: 1,
    [_caution]: 1,
    [_practicality]: 1,
    [_spirituality]: 0,
    [_food]: 3,
    [_wealth]: 0,
    [_rep]: 1,
    [_exp]: 0,
    [_magic]: 0,
    [_location]: _starting_location,
    [_dial]: _starting_dial,
    [_energy]: 7,
    [_health]: 7,
    [_terror]: _starting_terror,
  },
  [_arev]: {
    [_name]: _arev,
    [_aggression]: 1,
    [_empathy]: 1,
    [_courage]: 1,
    [_caution]: 1,
    [_practicality]: 1,
    [_spirituality]: 0,
    [_food]: 2,
    [_wealth]: 1,
    [_rep]: 0,
    [_exp]: 0,
    [_magic]: 1,
    [_location]: _starting_location,
    [_dial]: _starting_dial,
    [_energy]: 6,
    [_health]: 8,
    [_terror]: _starting_terror,
  },
  [_beor]: {
    [_name]: _beor,
    [_aggression]: 2,
    [_empathy]: 0,
    [_courage]: 1,
    [_caution]: 1,
    [_practicality]: 1,
    [_spirituality]: 0,
    [_food]: 3,
    [_wealth]: 1,
    [_rep]: 0,
    [_exp]: 0,
    [_magic]: 0,
    [_location]: _starting_location,
    [_dial]: _starting_dial,
    [_energy]: 6,
    [_health]: 9,
    [_terror]: _starting_terror,
  },
  [_maggot]: {
    [_name]: _maggot,
    [_aggression]: 1,
    [_empathy]: 0,
    [_courage]: 1,
    [_caution]: 1,
    [_practicality]: 0,
    [_spirituality]: 2,
    [_food]: 2,
    [_wealth]: 0,
    [_rep]: 0,
    [_exp]: 0,
    [_magic]: 2,
    [_location]: _starting_location,
    [_dial]: _starting_dial,
    [_energy]: 6,
    [_health]: 9,
    [_terror]: _starting_terror,
  },
  [_niahm]: {
    [_name]: _niahm,
    [_aggression]: 1,
    [_empathy]: 1,
    [_courage]: 1,
    [_caution]: 1,
    [_practicality]: 1,
    [_spirituality]: 1,
    [_food]: 1,
    [_wealth]: 1,
    [_rep]: 0,
    [_exp]: 0,
    [_magic]: 0,
    [_location]: _starting_location,
    [_dial]: _starting_dial,
    [_terror]: _starting_terror,
  },
};

var _character_states = {};

function validateCharacterStates(states) {
  var valid = false;

  if (states.hasOwnProperty(_characters_state)) {
    var character_states = states[_characters_state];

    valid =
      character_states.hasOwnProperty("character1") &&
      character_states.hasOwnProperty("character2") &&
      character_states.hasOwnProperty("character3") &&
      character_states.hasOwnProperty("character4");
  }

  return valid;
}

function getCharactersTabState() {
  var character_states = {};

  for (
    var characterIdx = 1;
    characterIdx <= _max_character_count;
    characterIdx++
  ) {
    var characterPrefix = "character" + characterIdx;

    character_states[characterPrefix] = getCharacterState(characterPrefix);
  }

  return { [_characters_state]: character_states };
}

function loadCharactersTabState(states) {
  var character_states = states[_characters_state];

  for (
    var characterIdx = 1;
    characterIdx <= _max_character_count;
    characterIdx++
  ) {
    var characterPrefix = "character" + characterIdx;
    var characterState = character_states[characterPrefix];

    setCharacterState(characterPrefix, characterState);
  }
}

function initCharacterTab() {
  for (
    var characterIdx = 1;
    characterIdx <= _max_character_count;
    characterIdx++
  ) {
    var characterPrefix = "character" + characterIdx;

    populateCharacterNames(characterPrefix);
    resetCharacterValues(characterPrefix);
  }
}

function resetCharacterValues(characterPrefix) {
  setCharacterAttributes(characterPrefix, 0, 0, 0, 0, 0, 0);
  setCharacterSurvival(characterPrefix, 0, 0, 0);
  setCharacterResources(characterPrefix, 0, 0, 0, 0, 0);
  setCharacterLocation(characterPrefix, 0);
  setCharacterDial(characterPrefix, 0);

  document.getElementById(characterPrefix + "-name").selectedIndex = 0;
}

function populateCharacterNames(characterPrefix) {
  var select = document.getElementById(characterPrefix + "-name");
  var options = [];
  var option = document.createElement("option");

  option.text = option.value = "";
  options.push(option.outerHTML);

  for (
    var characterNameIdx = 0;
    characterNameIdx < _characters.length;
    ++characterNameIdx
  ) {
    option.text = option.value =
      _characters[characterNameIdx].charAt(0).toUpperCase() +
      _characters[characterNameIdx].slice(1);
    options.push(option.outerHTML);
  }

  select.insertAdjacentHTML("beforeEnd", options.join("\n"));
}

function setCharacterState(characterPrefix, state) {
  setCharacterName(characterPrefix, state[_name]);
  setCharacterAttributes(
    characterPrefix,
    state[_aggression],
    state[_empathy],
    state[_courage],
    state[_caution],
    state[_practicality],
    state[_spirituality]
  );
  setCharacterSurvival(
    characterPrefix,
    state[_energy],
    state[_health],
    state[_terror]
  );
  setCharacterResources(
    characterPrefix,
    state[_food],
    state[_wealth],
    state[_rep],
    state[_exp],
    state[_magic]
  );
  setCharacterLocation(characterPrefix, state[_location]);
  setCharacterDial(characterPrefix, state[_dial]);
}

function setCharacterName(characterPrefix, name) {
  document.getElementById(characterPrefix + "-" + _name).selectedIndex =
    _characters.indexOf(name) + 1;
}

function setCharacterAttributes(
  characterPrefix,
  aggression,
  empathy,
  courage,
  caution,
  practicality,
  spirituality
) {
  document.getElementById(characterPrefix + "-" + _aggression).value =
    aggression;
  document.getElementById(characterPrefix + "-" + _empathy).value = empathy;
  document.getElementById(characterPrefix + "-" + _courage).value = courage;
  document.getElementById(characterPrefix + "-" + _caution).value = caution;
  document.getElementById(characterPrefix + "-" + _practicality).value =
    practicality;
  document.getElementById(characterPrefix + "-" + _spirituality).value =
    spirituality;
}

function setCharacterSurvival(characterPrefix, energy, health, terror) {
  document.getElementById(characterPrefix + "-" + _energy).value = energy;
  document.getElementById(characterPrefix + "-" + _health).value = health;
  document.getElementById(characterPrefix + "-" + _terror).value = terror;
}

function setCharacterResources(characterPrefix, food, wealth, rep, exp, magic) {
  document.getElementById(characterPrefix + "-" + _food).value = food;
  document.getElementById(characterPrefix + "-" + _wealth).value = wealth;
  document.getElementById(characterPrefix + "-" + _rep).value = rep;
  document.getElementById(characterPrefix + "-" + _exp).value = exp;
  document.getElementById(characterPrefix + "-" + _magic).value = magic;
}

function setCharacterLocation(characterPrefix, location) {
  document.getElementById(characterPrefix + "-" + _location).value = location;
}

function setCharacterDial(characterPrefix, dial) {
  document.getElementById(characterPrefix + "-" + _dial).value = dial;
}

function getCharacterState(characterPrefix) {
  var characterState = {};

  var name = getCharacterName(characterPrefix);

  if (name != "") {
    Object.assign(
      characterState,
      getCharacterAttributes(characterPrefix),
      getCharacterResources(characterPrefix),
      getCharacterLocation(characterPrefix),
      getCharacterDial(characterPrefix),
      getCharacterSurvival(characterPrefix)
    );

    characterState[_name] = name;
  }

  return characterState;
}

function getCharacterName(characterPrefix) {
  var selectedIndex = document.getElementById(
    characterPrefix + "-" + _name
  ).selectedIndex;

  return selectedIndex < 1 || selectedIndex > 5
    ? ""
    : _characters[selectedIndex - 1];
}

function getCharacterAttributes(characterPrefix) {
  var attributes = {};

  attributes[_aggression] = document.getElementById(
    characterPrefix + "-" + _aggression
  ).value;
  attributes[_empathy] = document.getElementById(
    characterPrefix + "-" + _empathy
  ).value;
  attributes[_courage] = document.getElementById(
    characterPrefix + "-" + _courage
  ).value;
  attributes[_caution] = document.getElementById(
    characterPrefix + "-" + _caution
  ).value;
  attributes[_practicality] = document.getElementById(
    characterPrefix + "-" + _practicality
  ).value;
  attributes[_spirituality] = document.getElementById(
    characterPrefix + "-" + _spirituality
  ).value;

  return attributes;
}

function getCharacterResources(characterPrefix) {
  var resources = {};

  resources[_food] = document.getElementById(
    characterPrefix + "-" + _food
  ).value;
  resources[_wealth] = document.getElementById(
    characterPrefix + "-" + _wealth
  ).value;
  resources[_rep] = document.getElementById(characterPrefix + "-" + _rep).value;
  resources[_exp] = document.getElementById(characterPrefix + "-" + _exp).value;
  resources[_magic] = document.getElementById(
    characterPrefix + "-" + _magic
  ).value;

  return resources;
}

function getCharacterSurvival(characterPrefix) {
  var survival = {};

  survival[_energy] = document.getElementById(
    characterPrefix + "-" + _energy
  ).value;
  survival[_health] = document.getElementById(
    characterPrefix + "-" + _health
  ).value;
  survival[_terror] = document.getElementById(
    characterPrefix + "-" + _terror
  ).value;

  return survival;
}

function getCharacterLocation(characterPrefix) {
  return {
    [_location]: document.getElementById(characterPrefix + "-" + _location)
      .value,
  };
}

function getCharacterDial(characterPrefix) {
  return {
    [_dial]: document.getElementById(characterPrefix + "-" + _dial).value,
  };
}

function changeCharacterConfirm(characterPrefix) {
  var proceed = false;

  if (_character_states[characterPrefix]) {
    proceed = confirm(
      "Are you sure you want to change characters? All entered values will be overwritten."
    );

    if (!proceed) {
      document.getElementById(characterPrefix + "-name").selectedIndex =
        _characters.indexOf(
          Object.keys(_character_states[characterPrefix])[0]
        ) + 1;
    }
  }

  return proceed;
}

function selectCharacter(dropdown, characterIdx) {
  var characterPrefix = dropdown.id.slice(0, dropdown.id.indexOf("-"));

  if (_character_states[characterPrefix]) {
    if (!changeCharacterConfirm(characterPrefix)) {
      return;
    }
  }

  if (characterIdx == 0) {
    resetCharacterValues(characterPrefix);
    removeCharacterState(characterPrefix);

    return;
  }

  if (characterIdx < 5) {
    setCharacterInitialState(characterPrefix, _characters[characterIdx - 1]);
  } else {
    doNiahmModal(characterPrefix);
  }
}

function setCharacterInitialState(characterPrefix, characterName) {
  setCharacterInitialStateWithArchetype(
    characterPrefix,
    characterName,
    characterName
  );
}

function setCharacterInitialStateWithArchetype(
  characterPrefix,
  characterName,
  characterArchetype
) {
  var selectedCharacterInitialStats = JSON.parse(
    JSON.stringify(_characters_initial_states[characterName])
  );

  if (characterArchetype != characterName) {
    selectedCharacterInitialStats[_health] =
      _characters_initial_states[characterArchetype][_health];
    selectedCharacterInitialStats[_energy] =
      _characters_initial_states[characterArchetype][_energy];
  }

  setCharacterAttributes(
    characterPrefix,
    selectedCharacterInitialStats[_aggression],
    selectedCharacterInitialStats[_empathy],
    selectedCharacterInitialStats[_courage],
    selectedCharacterInitialStats[_caution],
    selectedCharacterInitialStats[_practicality],
    selectedCharacterInitialStats[_spirituality]
  );

  setCharacterSurvival(
    characterPrefix,
    selectedCharacterInitialStats[_energy],
    selectedCharacterInitialStats[_health],
    selectedCharacterInitialStats[_terror]
  );

  setCharacterResources(
    characterPrefix,
    selectedCharacterInitialStats[_food],
    selectedCharacterInitialStats[_wealth],
    selectedCharacterInitialStats[_rep],
    selectedCharacterInitialStats[_exp],
    selectedCharacterInitialStats[_magic]
  );

  setCharacterLocation(characterPrefix, _starting_location);
  setCharacterDial(characterPrefix, 0);
}

function saveCharacterState(characterPrefix, characterState) {
  _character_states[characterPrefix] = characterState;
}

function removeCharacterState(characterPrefix) {
  delete _character_states[characterPrefix];
}

function characterSelected(dropdown) {
  var selectedIndex = dropdown.selectedIndex;

  if (selectedIndex >= 0 && selectedIndex <= _characters.length) {
    selectCharacter(dropdown, selectedIndex);
  }
}

// Modal

var niahmModal;
var niahmModalX;
var niahmModalClose;
var radioGreen;
var radioBlue;
var radioBrown;
var radioGray;

function doNiahmModal(characterPrefix) {
  niahmModal.characterPrefix = characterPrefix;
  niahmModal.showModal();
}

function handleNiahmModalResponse(characterPrefix, returnValue) {
  if (returnValue === "") {
    resetCharacterValues(characterPrefix);
  } else {
    setCharacterInitialStateWithArchetype(characterPrefix, _niahm, returnValue);
  }
}

window.addEventListener("load", function () {
  niahmModal = document.getElementById("niahm-modal");
  niahmModalX = document.getElementById("niam-modal-x");
  niahmModalClose = document.getElementById("niam-modal-close");
  radioGreen = document.getElementById("archetype-green");
  radioBlue = document.getElementById("archetype-blue");
  radioBrown = document.getElementById("archetype-brown");
  radioGray = document.getElementById("archetype-gray");

  niahmModal.addEventListener("close", () => {
    handleNiahmModalResponse(
      niahmModal.characterPrefix,
      niahmModal.returnValue
    );
    niahmModal.characterPrefix = "";
    radioGreen.checked = true;
    niahmModal.returnValue = _ailei;
  });
  niahmModalX.addEventListener("click", () => {
    niahmModal.returnValue = "";
    niahmModal.close();
  });
  niahmModalClose.addEventListener("click", () => {
    niahmModal.returnValue = "";
    niahmModal.close();
  });
  radioGreen.addEventListener("click", () => {
    niahmModal.returnValue = _ailei;
  });
  radioBlue.addEventListener("click", () => {
    niahmModal.returnValue = _beor;
  });
  radioBrown.addEventListener("click", () => {
    niahmModal.returnValue = _maggot;
  });
  radioGray.addEventListener("click", () => {
    niahmModal.returnValue = _arev;
  });
});
