const settings = require("electron-settings");
const demoReader = require("./demoReader");

if (window) {
  window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
}

const demo_uploader = document.getElementById("demo_uploader");

demo_uploader.onchange = (e) => {
  const demo_path = e.target.files[0].path;

  demoReader({ demo_path }, playBackFrames);
};

function playBackFrames (demo_info) {
  const demo_canvas = document.getElementById("demo_canvas");
  console.log("playBackFrames", demo_info);

  const context = demo_canvas.getContext("2d");
  context.font = "12px Georgia";

  let current_tick = 0;
  const max_tick = demo_info.tick_events.length;
  setInterval(() => {
    context.clearRect(0, 0, 1000, 1000);

    const current_events = demo_info.tick_events[current_tick];

    current_events.players.map((player) => {
      if (player.team === 2) {
        context.fillStyle = "red";
      } else if (player.team === 3) {
        context.fillStyle = "blue";
      } else {
        return;
      }
      context.beginPath();
      context.ellipse((player.position.x / 10) + 500, (player.position.y / -10) + 500, 2, 2, 0, 0, 2 * Math.PI);
      context.fill();
    });

    const progress = current_tick / max_tick * 100.0;
    context.fillStyle = "#000000";
    context.fillText(`Tick: ${current_tick} / ${max_tick} : ${progress.toFixed(2)}%`, 0, 1000);

    current_tick++;
  }, 8);
}

console.log("k", demo_uploader);
