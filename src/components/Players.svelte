<script>
  import { activeDrag } from "../stores.js";
  export let players;
  const playersWithFallback = {};

  function onDragPlayer(event, player) {
    event.dataTransfer.setData("players/data", JSON.stringify(player));
    activeDrag.set(true);
  }
  function onDragEnd() {
    activeDrag.set(false);
  }
</script>

<style>
  li {
    list-style: none;
  }
</style>

<ul>
  {#each players as player}
    <li
      draggable="true"
      on:dragstart={(e) => onDragPlayer(e, player)}
      on:dragend={onDragEnd}>
      <img
        on:error={() => (playersWithFallback[player.id] = true)}
        src={`https://resources.premierleague.com/premierleague/photos/players/40x40/${playersWithFallback[player.id] ? 'Photo-Missing.png' : `p${player.code}.png`}`}
        alt={player.web_name} />
      {player.web_name}
    </li>
  {/each}
</ul>
