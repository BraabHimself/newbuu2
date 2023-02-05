const _id_to_header = {
  'locations': 'L<span>OCATIONS</span>',
  'notes': 'N<span>OTES</span>',
  'characters': 'C<span>HARACTERS</span>',
  'statuses': 'S<span>TATUSES</span>',
  'load-save': 'L<span>OAD</span>/S<span>AVE</span>',
};

function openPage(content_name, elmnt) {
  var content_divs, buttons;

  document.getElementById("content-header").innerHTML = _id_to_header[content_name];

  content_divs = document.getElementsByClassName("content-container");
  for (var i = 0; i < content_divs.length; i++) {
    content_divs[i].style.display = "none";
  }

  buttons = document.getElementsByClassName("side-nav-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "";
    buttons[i].style.borderBottom = "";
    buttons[i].style.borderTop = "";
    buttons[i].style.cursor = "pointer";
  }

  document.getElementById("content-" + content_name).style.display = "block";
  elmnt.style.backgroundColor = "rgb(139, 0, 0, .45)";
  elmnt.style.borderBottom = "1px solid rgb(139, 0, 0)";
  elmnt.style.borderTop = "1px solid rgb(139, 0, 0)";
  elmnt.style.cursor = "default";
}

function getSheetState() {
  var sheetStatus = {};

  Object.assign(
    sheetStatus,
    getLocationsTabState(),
    getNotesTabState(),
    getCharactersTabState(),
    getStatusesTabState()
  );

  return sheetStatus;
}

window.addEventListener("load", function () {
  document.getElementById("locations_side_nav_button").click();
  initCharacterTab();
});
