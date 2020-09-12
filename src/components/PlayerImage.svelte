<script>
  export let size;
  export let player;
  export let width;
  const playersWithFallback = {};
</script>

<img
  {width}
  on:error={() => (playersWithFallback[player.id] = true)}
  src={`https://resources.premierleague.com/premierleague/photos/players/${size}x${size}/${playersWithFallback[player.id] ? 'Photo-Missing.png' : `p${player.code}.png`}`}
  alt={player.web_name} />
