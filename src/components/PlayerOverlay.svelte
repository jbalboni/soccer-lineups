<script>
  import PlayerImage from "../components/PlayerImage.svelte";
  import { activeDrag } from "../stores.js";
  import { slots, rowsWithPlayers, rowHasPlayers } from "../stores";
  export let hidden;

  const WIDE_LEFT = 0;
  const INNER_LEFT = 1;
  const CENTER = 2;
  const INNER_RIGHT = 3;
  const WIDE_RIGHT = 4;

  const BACK_LINE = 4;
  const GOAL_LINE = 5;

  function onDragPlayer(event, player, i, j) {
    event.dataTransfer.setData("players/data", JSON.stringify(player));
    event.dataTransfer.setData("players/position", JSON.stringify({ i, j }));
    setTimeout(() => {
      activeDrag.set(true);
    }, 10);
  }
  function onDragEnd() {
    activeDrag.set(false);
  }
  function getRowStyle(row, index) {
    const playerCount = row.filter((col) => col.player).length;
    if (playerCount === 5 || playerCount === 0) {
      return "";
    }

    if (playerCount === 1) {
      const playerIndex = row.findIndex((slot) => slot.player);

      if (playerIndex < CENTER) {
        return "row-start";
      } else if (playerIndex > CENTER) {
        return "row-end";
      }

      return "row-center";
    }
    if (playerCount === 2 || playerCount === 3) {
      if (
        playerCount === 2 &&
        row[WIDE_RIGHT].player &&
        row[INNER_RIGHT].player
      ) {
        return "row-end";
      }

      if (
        playerCount === 2 &&
        row[WIDE_LEFT].player &&
        row[INNER_LEFT].player
      ) {
        return "row-start";
      }

      if (row[WIDE_RIGHT].player || row[WIDE_LEFT].player) {
        return "row-wide";
      }

      if (index === BACK_LINE) {
        return "row-narrow-back";
      }

      return "row-narrow";
    }
  }
</script>

<style>
  .player-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .overlay-row {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .overlay-row.row-center {
    justify-content: center;
  }
  .overlay-row.row-start {
    justify-content: flex-start;
    margin-left: 5vh;
  }
  .overlay-row.row-end {
    justify-content: flex-end;
    margin-right: 5vh;
  }
  .overlay-row.row-wide {
    justify-content: space-between;
  }
  .overlay-row.row-narrow {
    justify-content: space-around;
  }
  .overlay-row.row-narrow-back {
    justify-content: space-around;
    margin: auto 5vh;
  }
  .player-image {
    width: 9vh;
    height: 9vh;
    position: relative;
    margin: 8px;
  }
  .name-box {
    position: absolute;
    bottom: -25px;
    left: 0;
    background-color: purple;
    width: 100%;
    box-sizing: border-box;
  }
  .name-box > text {
    fill: white;
    text-align: center;
  }
  .hidden {
    transform: translateY(-100%);
  }
</style>

<div class="player-overlay {hidden ? 'hidden' : ''}">
  {#each $slots as row, i}
    {#if rowsWithPlayers($slots) < 5 || rowHasPlayers(row)}
      <div class="overlay-row {getRowStyle(row, i)}">
        {#each row as slot, j}
          {#if slot.player}
            <div
              draggable="true"
              on:dragstart={(e) => onDragPlayer(e, slot.player, i, j)}
              on:dragend={onDragEnd}
              class="overlay-player {slot.hover ? 'target' : ''}
                {!slot.player ? 'empty' : ''}
                {i === GOAL_LINE && j !== CENTER ? 'dead' : ''}
                {i === GOAL_LINE && j === CENTER ? 'goal' : ''}">
              <div class="player-image">
                <PlayerImage width="100%" size="40" player={slot.player} />
                <svg viewBox="0 0 100 35" width="100%" class="name-box">
                  <text x="50%" y="23" text-anchor="middle">
                    {slot.player.web_name}
                  </text>
                </svg>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  {/each}
</div>
