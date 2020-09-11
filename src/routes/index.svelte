<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch("data/teams.json");
    const data = await res.json();

    if (res.status === 200) {
      return { teams: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let teams;
</script>

<style>
  li {
    list-style: none;
  }

  .teams__card {
    margin: 16px;
    padding: 16px;
    background-color: purple;
    color: white;
    display: flex;
    text-decoration: none;
    align-items: center;
  }

  .teams__name {
    font-size: 2rem;
    margin-left: 16px;
  }
</style>

<svelte:head>
  <title>Premier League</title>
</svelte:head>

<ul>
  {#each teams as team}
    <li>
      <a href="/teams/{team.short_name}" class="teams__card">
        <div>
          <img
            alt="{team.name} badge"
            src="https://resources.premierleague.com/premierleague/badges/50/t{team.code}.png"
            srcset="https://resources.premierleague.com/premierleague/badges/50/t{team.code}@x2.png 2x" />
        </div>
        <span class="teams__name">{team.name}</span>
      </a>
    </li>
  {/each}
</ul>
