<script lang="ts">
    import { Button, FormField, TextField } from "attractions";
    import * as md5 from "md5";

    let login = "";
    let password = "";
    const sendLogin = async () => {
        console.log({ login, password });

        const hashedPassword = md5(password);
        const res = await fetch(
            `https://api.betaseries.com/members/auth?login=${login}&client_id=7ecf3f5a33dd&password=${hashedPassword}`,
            { method: "POST" }
        );

        const json = await res.json();
        const result: any = JSON.stringify(json);

        // chrome.storage.local.set(
        //     { betaseries_chrome: result.token },
        //     function () {
        //         console.log("Value is set to " + result.token);
        //     }
        // );
    };
</script>

<form on:submit|preventDefault={sendLogin}>
    <FormField
        name="Compte utilisateur"
        help="Write this and not that."
        required
    >
        <TextField bind:value={login} />
    </FormField>
    <FormField name="Mot de passe" required>
        <TextField type="password" bind:value={password} />
    </FormField>

    <Button type="submit" filled>Se connecter</Button>
</form>

<style>
</style>
