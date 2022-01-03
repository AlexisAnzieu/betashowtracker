<script lang="ts">
    import { Button, Loading } from "attractions";
    import { CheckIcon } from "svelte-feather-icons";
    const token = localStorage.getItem("betaseries_token");

    const getShows = async () => {
        const res = await fetch(
            `https://api.betaseries.com/shows/member?key=7ecf3f5a33dd&access_token=${token}&status=current`,
            { method: "GET" }
        );

        const shows = await res.json();
        return shows.shows;
    };

    const checkShow = async (id: number) => {
        const res = await fetch(
            `https://api.betaseries.com/episodes/watched?key=7ecf3f5a33dd&access_token=${token}&id=${id}`,
            { method: "POST" }
        );

        await res.json();
        shows = getShows();
    };

    let shows = getShows();
</script>

{#await shows}
    <Loading />
{:then shows}
    {#each shows as show}
        <div style="margin: 5px;">
            <Button on:click={() => checkShow(show.user.next.id)}>
                <CheckIcon size="20" class="mr" />
                {show.title} - {show.user.next.code} - {show.user.next.date} - {show
                    .user.next.title}
            </Button>
        </div>
    {/each}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style>
</style>
