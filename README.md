# js-svelte-rewrite

## Extensions for VS Code

![extensions](https://i.imgur.com/DCwVVlD.png)

## Run

```shell
# install npm dependencies
npm i --force

# run the app; go to http://localhost:5173 on your browser to see it
npm run dev
```

## Check

- everything in `src/routes`
- everything in `src/lib/server/db/entities`

## Notes

- entities inside `server/db/entities` are like models in `TeamProject.Models`
- `routes/+page.server.ts` is like `Index.cshtml.cs`, `routes/+page.svelte` is like `Index.html`
- `routes/+layout.svelte` is like `shared/_Layout.cshtml`
- you can use `js` extension instead of `ts` if you don't want to touch TypeScript right now, we'll be doing it next year
- click on `app.db` in VS Code to see the contents of the database (needs SQLite Viewer extension)

Currently, the website isn't fully working yet but you can goof around with it.
Test user - email: `hello@world.com`, password: `password`
