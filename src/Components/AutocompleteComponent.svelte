<script lang="ts">
    import { Button } from "attractions";
    import { PlusIcon } from "svelte-feather-icons";

    import Autocomplete from "attractions/autocomplete/autocomplete.svelte";

    import { showsStore, tokenStore } from "../stores";
    let token: string;
    tokenStore.subscribe((value) => {
        token = value;
    });

    let selection = [];
    async function* getOptions(text) {
        const res = await fetch(
            `https://api.betaseries.com/shows/search?key=7ecf3f5a33dd&access_token=${token}&title=${text}`,
            { method: "GET" }
        );
        const result = await res.json();
        const selectedShows = result.shows
            .filter((show) => !show.user.next.id)
            .map((show) => ({
                name: show.title,
                details: show.description,
                id: show.id,
            }));
        yield selectedShows;
    }

    const addToList = async (ids: number[]) => {
        const joinedIds = ids.join(",");
        const res = await fetch(
            `https://api.betaseries.com/shows/show?key=7ecf3f5a33dd&access_token=${token}&id=${joinedIds}`,
            { method: "POST" }
        );
        const result = await res.json();
        const fetchedShows = result.shows ? result.shows : [result.show];
        showsStore.update((shows) =>
            [...shows, ...fetchedShows].sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        );
        selection = [];
    };
</script>

<main style="display: flex;">
    <div style="width: 500px;">
        <Autocomplete
            minSearchLength={2}
            placeholder="Rechercher une série"
            {getOptions}
            {selection}
        />
    </div>
    <div style="width: 200px%;margin-left:40px">
        <Button
            filled
            on:click={() => addToList(selection.map((show) => show.id))}
        >
            <PlusIcon size="20" class="mr" />
            Ajouter à ma liste
        </Button>
    </div>
</main>

<style>
</style>
