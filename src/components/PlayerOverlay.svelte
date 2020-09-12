<script>
  import PlayerImage from "../components/PlayerImage.svelte";
  export let slots;

  function onDragEnter(event, i, j) {
    if (i !== 5 || j === 2) {
      event.preventDefault();
      slots[i][j] = { ...slots[i][j], hover: true };
    }
  }
  function onDragLeave(event, i, j) {
    if (i !== 5 || j === 2) {
      event.preventDefault();
      slots[i][j] = { ...slots[i][j], hover: false };
    }
  }
  function onDrop(event, i, j) {
    if (i !== 5 || j === 2) {
      event.preventDefault();
      const data = JSON.parse(event.dataTransfer.getData("players/data"));
      slots[i][j] = { player: data, hover: false };
    }
  }
  function getRowStyle(row, index) {
    const playerCount = row.filter((col) => col.player).length;
    if (playerCount === 5 || playerCount === 0) {
      return "";
    }

    if (playerCount === 1) {
      const playerIndex = row.findIndex((slot) => slot.player);

      if (playerIndex < 2) {
        return "row-start";
      } else if (playerIndex > 2) {
        return "row-end";
      }

      return "row-center";
    }
    if (playerCount === 2 || playerCount === 3) {
      if (row[4].player || row[0].player) {
        return "row-wide";
      }

      if (index === 4) {
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
    position: relative;
  }
  .name-box {
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    color: white;
    background-color: purple;
    padding: 4px;
    text-align: center;
  }
</style>

<div class="player-overlay">
  {#each slots as row, i}
    <div class="overlay-row {getRowStyle(row, i)}">
      {#each row as slot, j}
        {#if slot.player}
          <div
            draggable="true"
            on:dragenter={(e) => onDragEnter(e, i, j)}
            on:dragleave={(e) => onDragLeave(e, i, j)}
            class="overlay-player {slot.hover ? 'target' : ''}
              {!slot.player ? 'empty' : ''}
              {i === 5 && j !== 2 ? 'dead' : ''}
              {i === 5 && j === 2 ? 'goal' : ''}">
            <div class="player-image">
              <PlayerImage width="100%" size="40" player={slot.player} />
              <div class="name-box">{slot.player.web_name}</div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
