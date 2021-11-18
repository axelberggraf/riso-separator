let input;
let img;
let scale = 1;
let canvas;
let pixelValue;
let rperiod, gperiod, bperiod;
let pink,
  yellow,
  risoGreen,
  risoBlue,
  risoRed,
  risoBlack,
  fluoOrange,
  fluoGreen,
  lightGrey,
  medBlue,
  teal,
  aqua,
  purple,
  none;
let redInk, blueInk, greenInk;
let colors = [];
let colorNames = [];
let rIndex, gIndex, bIndex;
let effectAmount = 0.5;
let imageName = "image";
let functions = [];
let fIndex = 2;
let perspectiveEnabled = false;
var fileButton = document.getElementById("fileButton");
var dlButton = document.getElementById("dlBtn");
var dlButton2 = document.getElementById("dlBtn-comp");
let canvas2 = document.createElement("canvas");
let ctx2 = canvas2.getContext("2d");
var processButton = document.getElementById("processBtn");
let redOpacity = 1;
let blueOpacity = 1;
let greenOpacity = 1;

var url;

let images = [...document.getElementsByClassName("image")];

var pers = 1000;
var x, y, rX, rY;
var mobileDevice = false;
var cards;
let redImg, blueImg, greenImg;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // some code..
  mobileDevice = true;
}

function setup() {
  canvas = createCanvas(100, 100);
  canvas.id("mycanvas");

  imageMode(CENTER);

  pink = color(255, 72, 176);
  yellow = color(255, 232, 0);
  risoGreen = color(0, 169, 80);
  risoBlue = color(0, 120, 191);
  risoRed = color(255, 102, 94);
  risoBlack = color(5, 0, 5);
  fluoOrange = color(255, 116, 119);
  fluoGreen = color(68, 214, 44);
  lightGrey = color(136, 137, 138);
  medBlue = color(50, 85, 164);
  teal = color(0, 131, 138);
  aqua = color(94, 200, 229);
  purple = color(118, 91, 167);
  none = color(255, 255, 255);

  colors = [
    yellow,
    pink,
    risoGreen,
    risoBlue,
    risoRed,
    risoBlack,
    fluoOrange,
    fluoGreen,
    lightGrey,
    medBlue,
    teal,
    aqua,
    purple,
    none,
  ];

  colorNames = [
    "yellow",
    "pink",
    "green",
    "blue",
    "red",
    "black",
    "fluoOrange",
    "fluoGreen",
    "lightGrey",
    "medBlue",
    "teal",
    "aqua",
    "purple",
    "blank",
  ];

  redInk = risoBlue;
  greenInk = pink;
  blueInk = yellow;

  rIndex = 3;
  gIndex = 1;
  bIndex = 0;
  functions = [noCurve, sineCurve, invCurve, invSineCurve, sCurve2, threshold];
  // input.position(0, 0);
}

function draw() {}

function getColors() {
  var cs = document.getElementById("mycanvas");
  var dataUrl;

  // Remove existing images
  const currentImages = [...document.querySelectorAll(".delete")];
  currentImages.forEach((image) => {
    image.remove();
  });

  //get red pixels
  if (redInk != none) {
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);

    rperiod = Math.random() * 10 + 5;

    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i], rperiod, 255);
      pixels[i] = red(redInk);
      pixels[i + 1] = green(redInk);
      pixels[i + 2] = blue(redInk);
      pixels[i + 3] = pixelValue * 255 * redOpacity;
    }
    updatePixels();

    dataUrl = cs.toDataURL();

    var layer1 = document.getElementById("layer1");
    redImg = document.createElement("img");
    redImg.src = dataUrl;
    redImg.classList.add("delete");
    layer1.appendChild(redImg);
  } else {
    var layer1 = document.getElementById("layer1");
    layer1.style.backgroundImage = "url(#)";
  }

  // get green pixels

  if (greenInk != none) {
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);

    gperiod = Math.random() * 10 + 5;
    loadPixels();

    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i + 1], gperiod, 255);
      pixels[i] = red(greenInk);
      pixels[i + 1] = green(greenInk);
      pixels[i + 2] = blue(greenInk);
      pixels[i + 3] = pixelValue * 255 * greenOpacity;
    }
    updatePixels();

    dataUrl = cs.toDataURL();
    var layer2 = document.getElementById("layer2");
    // layer2.style.backgroundImage = "url(" + dataUrl + ")";
    greenImg = document.createElement("img");
    greenImg.src = dataUrl;
    greenImg.classList.add("delete");
    layer2.appendChild(greenImg);
  } else {
    var layer2 = document.getElementById("layer2");
    layer2.style.backgroundImage = "url(#)";
  }

  // get blue pixels
  if (blueInk != none) {
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);
    bperiod = Math.random() * 10 + 5;
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i + 2], bperiod, 255);
      pixels[i] = red(blueInk);
      pixels[i + 1] = green(blueInk);
      pixels[i + 2] = blue(blueInk);
      pixels[i + 3] = pixelValue * 255 * blueOpacity;
    }
    updatePixels();

    dataUrl = cs.toDataURL();
    var layer3 = document.getElementById("layer3");
    // layer3.style.backgroundImage = "url(" + dataUrl + ")";

    blueImg = document.createElement("img");
    blueImg.src = dataUrl;
    blueImg.classList.add("delete");
    layer3.appendChild(blueImg);
  } else {
    var layer3 = document.getElementById("layer3");
    layer3.style.backgroundImage = "url(#)";
  }

  document.getElementById("layer0").classList.add("border");
  document.getElementById("layer0").classList.add("white");
  document.getElementById("layer0").style.width =
    img.width * scale * pixelDensity() + 20 + "px";
  document.getElementById("layer0").style.height =
    img.height * scale * pixelDensity() + 20 + "px";

  dlButton.disabled = false;
  dlButton2.disabled = false;
  document.getElementById("perspectiveButton").disabled = false;

  // clear();
}

//treatment (re-mapping) functions

function sineCurve(x, period, normal) {
  return (sin((x / normal) * period * (effectAmount + 0.25) - PI / 2) + 1) / 2;
}

function noCurve(x, period, normal) {
  return x / normal;
}

function invCurve(x, period, normal) {
  return (255 - x) / normal;
}

function invSineCurve(x, period, normal) {
  return (
    1 - (sin((x / normal) * period * (effectAmount + 0.25) - PI / 2) + 1) / 2
  );
}

function threshold(x, period, normal) {
  let tempColor;
  if (x / normal <= effectAmount) {
    tempColor = 1;
  } else {
    tempColor = 0;
  }
  return tempColor;
}

function sCurve2(x, period, normal) {
  x = x / normal;
  var epsilon = 0.00001;
  var min_param_a = 0.0 + epsilon;
  var max_param_a = 1.0 - epsilon;
  var a = effectAmount;
  a = Math.min(max_param_a, Math.max(min_param_a, a));
  a = 1.0 - a; // for sensible results

  var y = 0;
  if (x <= 0.5) {
    y = Math.pow(2.0 * x, 1.0 / a) / 2.0;
  } else {
    y = 1.0 - Math.pow(2.0 * (1.0 - x), 1.0 / a) / 2.0;
  }
  return 1 - y;
}

//effect amount
const slider = document.getElementById("slider");

slider.oninput = function () {
  effectAmount = parseFloat(this.value, 10) / 100;
  console.log(effectAmount);
};

const redSlider = document.getElementById("redSlider");
redSlider.oninput = function () {
  redOpacity = parseFloat(this.value, 10) / 100;
};
const greenSlider = document.getElementById("greenSlider");
greenSlider.oninput = function () {
  greenOpacity = parseFloat(this.value, 10) / 100;
};

const blueSlider = document.getElementById("blueSlider");
blueSlider.oninput = function () {
  blueOpacity = parseFloat(this.value, 10) / 100;
};

//Change ink for red channel
function changeRed() {
  var val = parseInt(document.getElementById("red").value);
  redInk = colors[val];
  rIndex = val;

  document.querySelectorAll(
    ".nice-select.special-select.red"
  )[0].childNodes[1].style.color = colors[val];
  if (val == 5 || val == 13) {
    document.querySelectorAll(
      ".nice-select.special-select.red"
    )[0].childNodes[1].style.color = "white";
  }
}

//Change ink for green channel
function changeGreen() {
  var val = parseInt(document.getElementById("green").value);
  greenInk = colors[val];
  gIndex = val;

  document.querySelectorAll(
    ".nice-select.special-select.green"
  )[0].childNodes[1].style.color = colors[val];
  if (val == 5 || val == 13) {
    document.querySelectorAll(
      ".nice-select.special-select.green"
    )[0].childNodes[1].style.color = "white";
  }
}

//Change ink for blue channel
function changeBlue() {
  var val = parseInt(document.getElementById("blue").value);
  blueInk = colors[val];
  bIndex = val;

  document.querySelectorAll(
    ".nice-select.special-select.blue"
  )[0].childNodes[1].style.color = colors[val];
  if (val == 5 || val == 13) {
    document.querySelectorAll(
      ".nice-select.special-select.blue"
    )[0].childNodes[1].style.color = "white";
  }
}

//Change treatment
function treatment() {
  var val = parseInt(document.getElementById("treatment").value);
  if (val == 2 || val == 0) {
    slider.disabled = true;
  } else {
    slider.disabled = false;
  }
  fIndex = val;
}

function process() {
  // set scale for image preview
  const baseWidth = (window.innerWidth * 3) / 4;
  let scaleW = baseWidth / img.width / pixelDensity();
  let scaleH = window.innerHeight / img.height / pixelDensity();
  scale = Math.min(scaleW, scaleH) * 0.85;

  canvas.size(img.width * scale, img.height * scale);
  getColors();
  document.getElementById("redLayer").checked = true;
  document.getElementById("greenLayer").checked = true;
  document.getElementById("blueLayer").checked = true;
}

//download function (downloads in original scale)
function downloadFiles() {
  scale = 1;
  canvas.size(img.width * scale, img.height * scale);

  //red
  image(img, width / 2, height / 2, img.width * scale, img.height * scale);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    pixelValue = functions[fIndex](pixels[i], rperiod, 255);
    pixels[i] = 255 - pixelValue * 255 * redOpacity;
    pixels[i + 1] = 255 - pixelValue * 255 * redOpacity;
    pixels[i + 2] = 255 - pixelValue * 255 * redOpacity;
    pixels[i + 3] = 255;
  }
  updatePixels();

  var cs = document.getElementById("mycanvas"),
    dataUrl = cs.toDataURL();
  saveCanvas(canvas, imageName + "_" + colorNames[rIndex], "jpg");

  // Slight delay to ensure all files downlaod
  setTimeout(() => {
    //green
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i + 1], gperiod, 255);
      pixels[i] = 255 - pixelValue * 255 * greenOpacity;
      pixels[i + 1] = 255 - pixelValue * 255 * greenOpacity;
      pixels[i + 2] = 255 - pixelValue * 255 * greenOpacity;
      pixels[i + 3] = 255;
    }
    updatePixels();

    let string = colorNames[gIndex];
    dataUrl = cs.toDataURL();
    saveCanvas(canvas, imageName + "_" + string, "jpg");

    // Slight delay to ensure all files downlaod
    setTimeout(() => {
      // blue
      image(img, width / 2, height / 2, img.width * scale, img.height * scale);

      loadPixels();
      for (let i = 0; i < pixels.length; i += 4) {
        pixelValue = functions[fIndex](pixels[i + 2], bperiod, 255);
        pixels[i] = 255 - pixelValue * 255 * blueOpacity;
        pixels[i + 1] = 255 - pixelValue * 255 * blueOpacity;
        pixels[i + 2] = 255 - pixelValue * 255 * blueOpacity;
        pixels[i + 3] = 255;
      }
      updatePixels();

      dataUrl = cs.toDataURL();
      saveCanvas(canvas, imageName + "_" + colorNames[bIndex], "jpg");
    }, 200);
  }, 200);
}

// Download composite image
function downloadComposite() {
  scale = 1;
  canvas.size(img.width * scale, img.height * scale);
  canvas2.width = img.width * scale;
  canvas2.height = img.height * scale;
  ctx2.fillStyle = "#FFFFFF";
  ctx2.fillRect(0, 0, canvas.width, canvas.height);
  var cs = document.getElementById("mycanvas");
  // Draw image to second canvas, update and multiply pixels on working canvas...
  //red
  if (redInk) {
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);

    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i], rperiod, 255);
      pixels[i] = red(redInk);
      pixels[i + 1] = green(redInk);
      pixels[i + 2] = blue(redInk);
      pixels[i + 3] = pixelValue * 255 * redOpacity;
    }
    updatePixels();
    ctx2.globalCompositeOperation = "multiply";

    ctx2.drawImage(cs, 0, 0, canvas2.width, canvas2.height);
  }

  // green

  if (greenInk) {
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);

    loadPixels();

    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i + 1], gperiod, 255);
      pixels[i] = red(greenInk);
      pixels[i + 1] = green(greenInk);
      pixels[i + 2] = blue(greenInk);
      pixels[i + 3] = pixelValue * 255 * greenOpacity;
    }
    updatePixels();
    ctx2.drawImage(cs, 0, 0, canvas2.width, canvas2.height);
  }

  // blue
  if (blueInk) {
    image(img, width / 2, height / 2, img.width * scale, img.height * scale);

    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      pixelValue = functions[fIndex](pixels[i + 2], bperiod, 255);
      pixels[i] = red(blueInk);
      pixels[i + 1] = green(blueInk);
      pixels[i + 2] = blue(blueInk);
      pixels[i + 3] = pixelValue * 255 * blueOpacity;
    }
    updatePixels();
    ctx2.drawImage(cs, 0, 0, canvas2.width, canvas2.height);
  }
  // updatePixels();
  var dataUrl = cs.toDataURL();
  saveCanvas(canvas2, imageName + "_composite", "jpg");
}

//listen for upload by user
fileButton.addEventListener("change", function (e) {
  file = e.target.files[0];
  document.getElementById("digimg").src = URL.createObjectURL(
    event.target.files[0]
  );
  if (event.target.files[0].name.split(".").slice(0, -1).join(".")) {
    imageName = event.target.files[0].name.split(".").slice(0, -1).join(".");
  }
  // img = loadImage()
  // document.getElementById("digimg").classList.add("border");
});

//call this function when image has loaded fully
function imgLoaded() {
  document.getElementById("labelForFile").classList.add("uploaded");
  img = loadImage(document.getElementById("digimg").src, function () {
    processButton.disabled = false;
  });
}

// jQuery 3d effect
(function ($) {
  if (!mobileDevice) {
    var card = $(".card");
    card.on("mousemove", function (e) {
      if (perspectiveEnabled) {
        x = e.clientX - $(this).offset().left + $(window).scrollLeft();
        y = e.clientY - $(this).offset().top + $(window).scrollTop();

        rY = mapnumbers(x, 0, $(this).width(), -40, 40);

        rX = mapnumbers(y, 0, $(this).height(), -40, 40);

        rX > 40 ? (rX = 40) : (rX = rX);
        rX < -40 ? (rX = -40) : (rX = rX);
        rY > 40 ? (rY = 40) : (rY = rY);
        rY < -40 ? (rY = -40) : (rY = rY);

        $(this)
          .children(".image")
          .css(
            "transform",
            "perspective(" +
              pers +
              "px)" +
              " " +
              "rotateY(" +
              rY +
              "deg)" +
              " " +
              "rotateX(" +
              -rX +
              "deg)"
          );
      }
    });

    card.on("mouseenter", function () {
      if (perspectiveEnabled) {
        $(this)
          .children(".image")
          .css({
            transition: "transform " + 0.0 + "s" + " linear",
          });

        images.forEach((item, i) => {
          if (i != 0) {
            item.classList.remove("blending");
          }
        });
      }
    });

    card.on("mouseleave", function () {
      if (perspectiveEnabled) {
        $(this)
          .children(".image")
          .css({
            transition: "transform " + 0.5 + "s" + " linear",
          });

        images.forEach((item, i) => {
          if (i != 0) {
            item.classList.add("blending");
          }
        });

        $(this).children().css("transform", "none");
      }
    });

    function mapnumbers(x, in_min, in_max, out_min, out_max) {
      return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
  }
})(jQuery);

// change perspective
// document.addEventListener(
//   "wheel",
//   function (event) {
//     console.log()
//     if (document.querySelectorAll(":hover")[3]) {
//       if (
//         document.querySelectorAll(":hover")[3].classList.contains("card") &&
//         perspectiveEnabled
//       ) {
//         event.preventDefault();
//
//         var currCard = document.querySelectorAll(":hover")[3];
//
//         pers += event.deltaY * 2;
//
//         if (pers < 300) {
//           pers = 300;
//         } else if (pers > 2000) {
//           pers = 2000;
//         }
//
//         $(currCard)
//           .children(".image")
//           .css(
//             "transform",
//             "perspective(" +
//               pers +
//               "px)" +
//               " " +
//               "rotateY(" +
//               rY +
//               "deg)" +
//               " " +
//               "rotateX(" +
//               -rX +
//               "deg)"
//           );
//       }
//     }
//   },
//   { passive: false }
// );

document.addEventListener(
  "wheel",
  function (event) {
    if (document.querySelectorAll(":hover")[4]) {
      if (
        document.querySelectorAll(":hover")[4].classList.contains("card") &&
        perspectiveEnabled
      ) {
        event.preventDefault();

        var currCard = document.querySelectorAll(":hover")[4];

        pers += event.deltaY * 2;

        if (pers < 300) {
          pers = 300;
        } else if (pers > 2000) {
          pers = 2000;
        }

        $(currCard)
          .children(".image")
          .css(
            "transform",
            "perspective(" +
              pers +
              "px)" +
              " " +
              "rotateY(" +
              rY +
              "deg)" +
              " " +
              "rotateX(" +
              -rX +
              "deg)"
          );
      }
    }
  },
  { passive: false }
);
