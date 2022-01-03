<script lang="ts">
    import Login from "./Components/Login.svelte";
    import Shows from "./Components/Shows.svelte";
    const token = localStorage.getItem("betaseries_token");
</script>

<main>
    <h3>Betaseries</h3>
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
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4rem;
        font-weight: 100;
        line-height: 1.1;
        margin: 2rem auto;
        max-width: 14rem;
    }
</style>
