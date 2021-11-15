function hideRed() {
  var checkbox = document.getElementById("redLayer");
  if (checkbox.checked != true) {
    redImg.classList.add("hidden");
  } else {
    redImg.classList.remove("hidden");
  }
}

function hideGreen() {
  var checkbox = document.getElementById("greenLayer");
  if (checkbox.checked != true) {
    greenImg.classList.add("hidden");
  } else {
    greenImg.classList.remove("hidden");
  }
}

function hideBlue() {
  var checkbox = document.getElementById("blueLayer");
  if (checkbox.checked != true) {
    blueImg.classList.add("hidden");
  } else {
    blueImg.classList.remove("hidden");
  }
}

function enablePerspective() {
  perspectiveEnabled = !perspectiveEnabled;
  document.getElementById("perspectiveButton").classList.toggle("pressed");
  document.getElementById("card").classList.toggle("perspective");
}

NiceSelect.bind(document.getElementById("treatment"), {
  searchable: false,
});

NiceSelect.bind(document.getElementById("red"), {
  searchable: false,
});

NiceSelect.bind(document.getElementById("green"), {
  searchable: false,
});

NiceSelect.bind(document.getElementById("blue"), {
  searchable: false,
});

function hideOpacity(e) {
  e.children[0].classList.toggle("drop-open");
  e.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle(
    "hidden"
  );
  e.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle(
    "hidden"
  );
}
