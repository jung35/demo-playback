const settings = require("electron-settings");
const demoReader = require("./utils/DemoReader");
const mapData = require("./utils/MapData");
const drawPlayer = require("./utils/DrawPlayer");

if (window) {
  window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
}

const demo_uploader = document.getElementById("demo_uploader");

demo_uploader.onchange = (e) => {
  const demo_path = e.target.files[0].path;

  demoReader({ demo_path }, playBackFrames);
};

function playBackFrames(demo_info) {
  const demo_canvas = document.getElementById("demo_canvas");

  const map_data = mapData[demo_info.map];
  const background = new Image();
  background.src = map_data.radar;

  console.log("playBackFrames", demo_info);

  const context = demo_canvas.getContext("2d");
  context.font = "12px Georgia";

  let current_tick = 0;
  const max_tick = demo_info.tick_events.length;

  const passTime = () => {
    context.clearRect(0, 0, demo_canvas.width, demo_canvas.height);
    context.drawImage(background, 0, 0);

    const current_events = demo_info.tick_events[current_tick];

    current_events.players.map((player) => {
      if (player.team === 2) {
        context.fillStyle = "red";
      } else if (player.team === 3) {
        context.fillStyle = "blue";
      } else {
        return;
      }

      if (player.health < 1 && player.life_state === 2) {
        context.fillStyle = "white";
      }

      drawPlayer({ context, player, map_data });
    });

    const progress = (current_tick / max_tick) * 100.0;
    context.fillStyle = "#ffffff";
    context.fillText(`Tick: ${current_tick} / ${max_tick} : ${progress.toFixed(2)}%`, 3, demo_canvas.height - 5);

    current_tick++;

    setTimeout(passTime, 10);
  };

  passTime();
}

const demo_canvas = document.getElementById("demo_canvas");
const map_data = mapData["de_cache"];

const context = demo_canvas.getContext("2d");

const background = new Image();
background.src = map_data.radar;

background.onload = () => {
  context.drawImage(background, 0, 0);

  context.fillStyle = "red";
  context.beginPath();
  context.ellipse(demo_canvas.width / 2 - 149, demo_canvas.height / 2 + 80, 5, 5, 0, 0, 2 * Math.PI);
  context.fill();
};
