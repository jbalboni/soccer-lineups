<script context="module">
  export async function preload({ params, query }) {
    const playerRes = await this.fetch("data/players.json");
    const playerData = await playerRes.json();

    const res = await this.fetch("data/teams.json");
    const teams = await res.json();

    if (res.status === 200 && playerRes.status === 200) {
      const team = teams.find((team) => team.short_name === params.short_code);
      return {
        team,
        players: playerData.filter((player) => player.team_code === team.code),
      };
    } else {
      this.error(res.status, teams.message);
    }
  }
</script>

<script>
  import Players from "../../components/Players.svelte";
  import Field from "../../components/Field.svelte";

  export let players;
  export let team;
</script>

<style>
  .container {
    display: flex;
  }
  .field {
    flex: 1;
  }
  .players {
    height: 400px;
    overflow: scroll;
  }
</style>

<svelte:head>
  <title>{team.name}</title>
</svelte:head>

<div class="container">
  <div class="players">
    <Players {players} />
  </div>
  <div class="field">
    <Field />
  </div>
</div>
