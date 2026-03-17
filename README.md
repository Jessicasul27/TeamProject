# Staycraft

# Important!

You should remove the `app.db` file from time to time, as the seeder will not try to re-seed on existing tables!

## Extensions for VS Code

![extensions](https://i.imgur.com/fLGEcO9.png)

## Run

```shell
# install npm dependencies (--force is required)
# note: you may also use Bun or other package managers to do this
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
- click on `app.db` in VS Code to see the contents of the database (needs SQLite Viewer extension)

Users for testing:
- Customer: `customer@staycraft.ie` `password`
- Landlord: `landlord@staycraft.ie` `password`
- Admin: `admin@staycraft.ie` `password`