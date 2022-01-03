<script lang="ts">
    import { Button, FormField, TextField } from "attractions";
    import md5 from "md5";
    import { betaseries_token } from "../stores";

    let login = "";
    let password = "";
    const sendLogin = async () => {
        const hashedPassword = md5(password);
        const res = await fetch(
            `https://api.betaseries.com/members/auth?login=${login}&client_id=7ecf3f5a33dd&password=${hashedPassword}`,
            { method: "POST" }
        );

        const json = await res.json();
        betaseries_token.set(json.token);
        localStorage.setItem("betaseries_token", json.token);
    };
</script>

<form on:submit|preventDefault={sendLogin}>
    <FormField name="Peudo" required>
        <TextField bind:value={login} />
    </FormField>
    <FormField name="Mot de passe" required>
        <TextField type="password" bind:value={password} />
    </FormField>
    <div style="margin-left: 350px;">
        <Button type="submit" filled>Se connecter</Button>
    </div>
</form>

<style>
</style>
