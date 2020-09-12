<script>
  import PlayerImage from "../components/PlayerImage.svelte";
  import { activeDrag, slots } from "../stores";
  export let hidden;

  const WIDE_LEFT = 0;
  const INNER_LEFT = 1;
  const CENTER = 2;
  const INNER_RIGHT = 3;
  const WIDE_RIGHT = 4;

  const BACK_LINE = 4;
  const GOAL_LINE = 5;

  function onDragEnter(event, i, j) {
    if (i !== GOAL_LINE || j === CENTER) {
      event.preventDefault();
      slots.updateSlot(i, j, { hover: true });
    }
  }
  function onDragLeave(event, i, j) {
    if (i !== GOAL_LINE || j === CENTER) {
      event.preventDefault();
      slots.updateSlot(i, j, { hover: false });
    }
  }
  function onDrop(event, i, j) {
    event.preventDefault();

    if (i !== GOAL_LINE || j === CENTER) {
      const data = JSON.parse(event.dataTransfer.getData("players/data"));
      slots.updateSlot(i, j, { player: data, hover: false });
    }

    if (event.dataTransfer.getData("players/position")) {
      const position = JSON.parse(
        event.dataTransfer.getData("players/position")
      );
      slots.updateSlot(position.i, position.j, { player: null, hover: false });
    }

    activeDrag.set(false);
  }
</script>

<style>
  .field-slots {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .field-slot-row {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .field-slot {
    margin: 8px;
    padding: 0;
    background-color: black;
    opacity: 25%;
    flex: 1;
  }
  .field-slot.target {
    opacity: 55%;
  }
  .field-slot.dead {
    background-color: transparent;
  }
  .player-image {
    position: relative;
  }
  .hidden {
    transform: translateY(-100%);
  }
</style>

<div class="field-slots {hidden ? 'hidden' : ''}">
  {#each $slots as row, i}
    <div class="field-slot-row">
      {#each row as slot, j}
        <div
          on:dragenter={(e) => onDragEnter(e, i, j)}
          on:dragleave={(e) => onDragLeave(e, i, j)}
          on:drop={(e) => onDrop(e, i, j)}
          ondragover="return false"
          class="field-slot {slot.hover ? 'target' : ''}
            {!slot.player ? 'empty' : ''}
            {i === GOAL_LINE && j !== CENTER ? 'dead' : ''}
            {i === GOAL_LINE && j === CENTER ? 'goal' : ''}">
          {#if slot.player}
            <div class="player-image">
              <PlayerImage width="100%" size="40" player={slot.player} />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>
