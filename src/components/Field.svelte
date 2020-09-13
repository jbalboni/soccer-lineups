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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>

<div class="field">
  <svg viewBox="0 0 75 120" width="100%">
    <rect x="0" y="0" width="75" height="120" fill="green" />
    <circle cx="37" cy="12" r="12" fill="transparent" stroke="white" />
    <circle cx="37" cy="108" r="12" fill="transparent" stroke="white" />
    <line x1="0" y1="0" x2="0" y2="120" stroke="white" />
    <line x1="0" y1="0" x2="75" y2="0" stroke="white" />
    <line x1="0" y1="120" x2="75" y2="120" stroke="white" />
    <line x1="75" y1="0" x2="75" y2="120" stroke="white" />
    <line x1="0" y1="60" x2="75" y2="60" stroke="white" />
    <rect x="15" y="0" width="44" height="18" stroke="white" fill="green" />
    <rect x="31" y="0" width="12" height="6" stroke="white" fill="green" />
    <rect x="15" y="102" width="44" height="18" stroke="white" fill="green" />
    <rect x="31" y="114" width="12" height="6" stroke="white" fill="green" />
    <circle cx="36" cy="60" r="10" fill="transparent" stroke="white" />
  </svg>
  <PlayerOverlay hidden={$activeDrag} />
  <FieldSlots hidden={!$activeDrag} />
</div>
