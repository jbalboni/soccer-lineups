<script>
  import PlayerOverlay from "../components/PlayerOverlay.svelte";
  import FieldSlots from "../components/FieldSlots.svelte";
  import { activeDrag } from "../stores.js";
</script>

<style>
  .field {
    box-sizing: border-box;
    position: relative;
    margin: 0 auto;
    height: 100%;
    width: 63vh;
    /* height: 750px; */
    /* width: 469px; */
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
  <PlayerOverlay hidden={$activeDrag} />
  <FieldSlots hidden={!$activeDrag} />
</div>
