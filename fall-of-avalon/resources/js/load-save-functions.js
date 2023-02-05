const _save_prefix = "tg-save-";
const _last_used = "tg-last-used";
const _saved_sheets_list_id = "saved-sheets-list";
var available_saves = {};
var last_used_save = "";

function loadSheetStateByKey(key) {
  var save_state = localStorage.getItem(key);

  if (save_state) {
    last_used_save = key;
    loadSheetState(JSON.parse(save_state));
  }
}

function loadSheetState(states) {
  loadLocationsTabState(states);
  loadNotesTabState(states);
  loadCharactersTabState(states);
  loadStatusesTabState(states);
}

function saveSheetState(key) {
  localStorage.setItem(_save_prefix + key, JSON.stringify(getSheetState()));
}

function autoLoadSave() {
  loadSheetStateByKey(localStorage.getItem(_last_used));
}

function populateSaves() {
  var savedSheetsList = document.getElementById(_saved_sheets_list_id);
  var save_keys = getSaveKeys();
  available_saves = {};
  var html = "";

  if (save_keys.length > 0) {
    for (var saveIdx = 0; saveIdx < save_keys.length; saveIdx++) {
      var key = save_keys[saveIdx];
      var name = key.slice(_save_prefix.length);

      available_saves[saveIdx] = key;
      html += "<option>" + name + "</option>";
    }
  }

  savedSheetsList.innerHTML = html;
}

function getSaveKeys() {
  var saves = [];

  for (var key in localStorage) {
    if (key.startsWith(_save_prefix)) {
      saves.push(key);
    }
  }

  return saves;
}

function loadFromFile(file) {
  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    var states = parseFileResult(reader.result);

    if (validateParsedStates(states)) {
      loadSheetState(states);
    }
  };

  reader.onerror = function () {
    alert(
      "The following error occurred while reading the file: " + reader.error
    );
  };
}

function parseFileResult(content) {
  return JSON.parse(content);
}

function validateParsedStates(states) {
  return (
    validateCharacterStates(states) &&
    validateLocationStates(states) &&
    validateNotesState(states) &&
    validateStatusStates(states)
  );
}

function saveToFile() {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(getSheetState(), null, 2)], { type: "text/plain" })
  );
  a.setAttribute("download", _save_prefix + "data.txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function loadSelectedSave() {
  var selectedSave = getSelectedSave();

  if (
    selectedSave.startsWith(_save_prefix) &&
    confirm(
      "Are you sure you want to load the following saved sheet? Anything not saved will be lost. \n\n" +
        selectedSave.slice(_save_prefix.length)
    )
  ) {
    loadSheetStateByKey(selectedSave);
  }
}

function deleteSelectedSave() {
  var selectedSave = getSelectedSave();

  if (
    selectedSave.startsWith(_save_prefix) &&
    confirm(
      "Are you sure you want to delete the following saved sheet?\n\n" +
        selectedSave.slice(_save_prefix.length)
    )
  ) {
    localStorage.removeItem(selectedSave);
    populateSaves();
  }
}

function getSelectedSave() {
  var selectedSave =
    available_saves[document.getElementById("saved-sheets-list").selectedIndex];

  if (Object.keys(available_saves).length > 0 && selectedSave) {
    return available_saves[
      document.getElementById("saved-sheets-list").selectedIndex
    ];
  } else {
    return "";
  }
}

function saveToLocalStorage() {
  var saveNameInput = document.getElementById("local-save-name");
  var saveName = saveNameInput.value.trim();

  if(saveName === "") {
    alert("Saved sheet name cannot be blank.");
    saveNameInput.focus();
  }
  else {
    var testKey = _save_prefix + saveName;
    var continueSave = true;

    if(localStorage[testKey]) {
      continueSave = confirm("A save with that name already exists. Do you want to overwrite it?");
    }

    if(continueSave) {
      saveSheetState(saveName);
      populateSaves();
    }
  }
}

window.addEventListener("load", function () {
  populateSaves();
  autoLoadSave();

  document
    .getElementById("save-to-file-button")
    .addEventListener("click", function () {
      saveToFile();
    });
  document
    .getElementById("load-from-file")
    .addEventListener("change", function () {
      loadFromFile(this.files[0]);
    });
  document
    .getElementById("load-selected-save")
    .addEventListener("click", function () {
      loadSelectedSave();
    });
  document
    .getElementById("delete-selected-save")
    .addEventListener("click", function () {
      deleteSelectedSave();
    });
  document
    .getElementById("local-save-name-button")
    .addEventListener("click", function () {
      saveToLocalStorage();
    });
});
