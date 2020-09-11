<script>
  import { activeDrag } from "../stores.js";
  const playersWithFallback = {};

  const slots = new Array(6).fill(null).map(() =>
    new Array(5).fill({
      player: null,
      hover: false,
    })
  );
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
</script>

<style>
  .field {
    position: relative;
    margin: 0 auto;
    height: 750px;
    width: 469px;
    border: 3px solid white;
    background-color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .field__eighteen-yard {
    border: 3px solid white;
    width: 59%;
    height: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: flex-end;
  }
  .field__eighteen-yard.top {
    border-top: none;
  }
  .field__eighteen-yard.bottom {
    border-bottom: none;
    flex-direction: column-reverse;
  }
  .field__six-yard {
    border: 3px solid white;
    width: 27%;
    height: 33%;
  }
  .field__six-yard.top {
    border-top: none;
  }
  .field__six-yard.bottom {
    border-bottom: none;
  }
  .field__halfway-line {
    height: 3px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
    padding: 8px;
  }
  .field-slot.active {
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
</style>

<div class="field">
  <div class="field__eighteen-yard top">
    <div class="field__six-yard top" />
  </div>
  <div class="field__halfway-line">
    <div class="field__circle" />
  </div>
  <div class="field__eighteen-yard bottom">
    <div class="field__six-yard bottom" />
  </div>
  <div class="field-slots">
    {#each slots as row, i}
      <div class="field-slot-row">
        {#each row as slot, j}
          {#if j !== 2 || $activeDrag || slot.player}
            <div
              on:dragenter={(e) => onDragEnter(e, i, j)}
              on:dragleave={(e) => onDragLeave(e, i, j)}
              on:drop={(e) => onDrop(e, i, j)}
              ondragover="return false"
              class="field-slot {$activeDrag ? 'active' : ''}
                {slot.hover ? 'target' : ''}
                {!slot.player ? 'empty' : ''}
                {i === 5 && j !== 2 ? 'dead' : ''}
                {i === 5 && j === 2 ? 'goal' : ''}">
              {#if slot.player}
                <img
                  width="100%"
                  on:error={() => (playersWithFallback[slot.player.id] = true)}
                  src={`https://resources.premierleague.com/premierleague/photos/players/40x40/${playersWithFallback[slot.player.id] ? 'Photo-Missing.png' : `p${slot.player.code}.png`}`}
                  alt={slot.player.web_name} />
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
