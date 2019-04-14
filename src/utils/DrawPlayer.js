const player_radius = 5;

module.exports = function({ context, player, map_data }) {
  const position = player.position;

  const posX = map_data.offsetX(position.x);
  const posY = map_data.offsetY(position.y);

  context.beginPath();
  context.ellipse(posX, posY, player_radius, player_radius, 0, 0, 2 * Math.PI);
  context.fill();

  if (!player.angle) {
    return;
  }

  context.fillStyle = "white";

  const angleX = player_radius * Math.cos((player.angle * Math.PI) / 180);
  const angleY = player_radius * Math.sin((player.angle * Math.PI) / -180);

  context.beginPath();
  context.ellipse(posX + angleX, posY + angleY, 2, 2, 0, 0, 2 * Math.PI);
  context.fill();
};
