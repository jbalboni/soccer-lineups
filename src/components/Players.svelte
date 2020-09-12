<script>
  import PlayerImage from "../components/PlayerImage.svelte";
  import { activeDrag } from "../stores.js";
  export let players;

  function onDragPlayer(event, player) {
    event.dataTransfer.setData("players/data", JSON.stringify(player));
    activeDrag.set(true);
  }
  function onDragEnd() {
    activeDrag.set(false);
  }
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    margin: 0;
  }
  li > span {
    flex: 1;
    color: white;
    font-size: 1.5rem;
    padding-left: 8px;
  }
</style>

<ul>
  {#each players as player}
    <li
      draggable="true"
      on:dragstart={(e) => onDragPlayer(e, player)}
      on:dragend={onDragEnd}>
      <PlayerImage width="50px" size="40" {player} />
      <span>{player.web_name}</span>
    </li>
  {/each}
</ul>
