<script lang="ts">
    import Login from "./Components/Login.svelte";
    import Shows from "./Components/Shows.svelte";
    import { betaseries_token } from "./stores";
    let token = localStorage.getItem("betaseries_token");
    betaseries_token.subscribe((value) => {
        token = value;
    });
</script>

<main>
    <h3>Beta Show Tracker</h3>
    {#if !token}
        <Login />
    {:else}
        <Shows />
    {/if}
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    main {
        padding: 1em;
        margin: 0 auto;
    }
</style>
