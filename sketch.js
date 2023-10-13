const density = "Ñ@#W$9876543210?!abc;:+=-,._                    ";         // Add Sapces to control the Threshold
// const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(64, 48);
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = ((video.width - i - 1) + j * video.width) * 4;      // Mirror Feed
      // const pixelIndex = (i + j * video.width) * 4;                           // Real Feed
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];

      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);

      if (c == " ")
        asciiImage += "&nbsp;" + "&nbsp;";
      else
        asciiImage += c + c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
