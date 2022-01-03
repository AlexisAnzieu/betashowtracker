<script lang="ts">
    import { Button, Loading, Divider } from "attractions";
    import { CheckIcon } from "svelte-feather-icons";
    import ProgressBar from "@okrad/svelte-progressbar";

    import { tokenStore, showsStore } from "../stores";
    let token: string;
    tokenStore.subscribe((value) => {
        token = value;
    });

    const getShows = async () => {
        const res = await fetch(
            `https://api.betaseries.com/shows/member?key=7ecf3f5a33dd&access_token=${token}&status=current`,
            { method: "GET" }
        );
        const shows = await res.json();
        showsStore.set(shows.shows);
    };

    const checkShow = async (id: number) => {
        const res = await fetch(
            `https://api.betaseries.com/episodes/watched?key=7ecf3f5a33dd&access_token=${token}&id=${id}`,
            { method: "POST" }
        );

        await res.json();
        getShows();
    };

    let shows;
    showsStore.subscribe((value) => {
        shows = value;
    });
    getShows();
</script>

{#await shows}
    <Loading />
{:then shows}
    {#each shows as show}
        <div style="margin: 10px;display:flex">
            <div style="width: 180px;">
                <img
                    height="180px"
                    src={show.images.poster || "https://picsum.photos/768/188"}
                    alt=""
                />
            </div>
            <div style="width: 450px;">
                <h2>
                    {show.title}
                </h2>

                <div style="width: 450px;display:flex">
                    <div style="width: 100px;display:flex">
                        <Button
                            filled
                            round
                            style="margin:20px"
                            on:click={() => checkShow(show.user.next.id)}
                        >
                            <CheckIcon size="20" class="mr" />
                        </Button>
                    </div>
                    <div style="width: 400px;">
                        <h3>{show.user.next.code} - {show.user.next.title}</h3>
                    </div>
                </div>
            </div>
            <div style="width: 100px;margin-top:50px">
                <div style="width:100%;display:inline">
                    <ProgressBar
                        textSize={150}
                        style="radial"
                        width={100}
                        series={{
                            perc: Math.round(show.user.status),
                            color: "#3B8DD0",
                        }}
                    />
                </div>
            </div>
        </div>
        <Divider />
    {/each}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style>
</style>
