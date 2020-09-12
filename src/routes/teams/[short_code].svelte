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
        players: playerData
          .filter((player) => player.team_code === team.code)
          .sort((a, b) => {
            if (a.web_name < b.web_name) {
              return -1;
            } else if (a.web_name === b.web_name) {
              return 0;
            }

            return 1;
          }),
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
    height: 100%;
    max-width: 1400px;
  }
  .field-section {
    flex: 1;
    padding: 8px 0;
  }
  .players-section {
    flex: 1;
    max-width: 300px;
    overflow: scroll;
    background-color: #333;
  }
</style>

<svelte:head>
  <title>{team.name}</title>
</svelte:head>

<div class="container">
  <div class="field-section">
    <Field />
  </div>
  <div class="players-section">
    <Players {players} />
  </div>
</div>
