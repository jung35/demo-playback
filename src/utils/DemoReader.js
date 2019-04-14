const fs = require("fs");
const demofile = require("demofile");

module.exports = function({ demo_path }, cb) {
  fs.readFile(demo_path, (err, buffer) => {
    const match_status = { started: false, count: 0 };
    const demo_info = { map: null, tick_events: [] };

    const demoFile = new demofile.DemoFile();

    demoFile.on("start", () => {
      console.log(`[${process.pid}] start buffer`);

      demo_info.map = demoFile.header.mapName;
    });

    demoFile.gameEvents.on("round_start", () => {
      if (++match_status.count === 3) {
        console.log(`[${process.pid}] match start`);
        match_status.started = true;
      }
    });

    demoFile.gameEvents.on("round_end", () => {
      match_status.count = 0;
    });

    demoFile.on("end", () => {
      cb(demo_info);
    });

    demoFile.on("net_Tick", (e) => {
      if (!match_status.started) {
        return;
      }

      const current_tick = { tick: e.tick, players: [] };

      demoFile.entities.players.map((player) => {
        if (player.isHltv || player.isFakePlayer) {
          return;
        }

        current_tick.players.push({
          position: player.position,
          team: parseInt(player.teamNumber),
          health: player.health,
          life_state: player.lifeState,
          angle: player.eyeAngles && player.eyeAngles.yaw
        });
      });

      demo_info.tick_events.push(current_tick);
    });

    demoFile.parse(buffer);
  });
};
