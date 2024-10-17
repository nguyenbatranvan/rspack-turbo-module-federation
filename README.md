# Config rsbuild

### config base

```ts
import {getRsBuildConfig} from "rsbuild-config/rsbuid-core";

```

- config: type RsbuildConfig
- opts: type IProps

```ts
interface IProps {
    enableCopy?: boolean;
    moduleFederation?: ModuleFederationPluginOptions;
}
```

### with remote app

```ts
export default defineConfig(
    getRsBuildConfig(
        {
            server: {
                port: 3001
            }
        },
        {
            moduleFederation: {
                dts: false,
                manifest: false,
                name: "appStore",
                exposes: {
                    "./store": "./src/store/index.ts"
                },
                filename: "remoteEntry.js"
            }
        }
    )
);
```

- config same module federation v2.0

### with host app

```ts
export default defineConfig(
    getRsBuildConfig(
        {
            server: {
                port: 3000
            }
        },
        {
            moduleFederation: {
                dts: false,
                manifest: false,
                name: "host"
            }
        }
    )
);

```

### File

- For each app there will be a file named `remote.json` located in the root directory. It will be a json array, will be
  the name of the apps in the `apps` folder
- Ex: The host app needs two remote apps named `remote` and `store`. In the folder `apps/host/remote.json` there will be
  the following values:

```json
[
  "store",
  "remote"
]

```

- Same with `apps/remote/remote.json` only remote named `store`.

```json
[
  "store"
]
```

- Also in the `public/assets/config.json` folder, this is where you will add all the remote paths:

```json
[
  {
    "name": "remote",
    "alias": "remote",
    "entry": "http://localhost:3002/remoteEntry.js"
  },
  {
    "name": "appStore",
    "alias": "appStore",
    "entry": "http://localhost:3001/remoteEntry.js"
  },
  ...
]
```

### Usage

```ts
const AppRemote = loadable(
    () => loadRemote<typeof import("remote/App")>("remote/App"),
    {
        fallback: <p>Loading...</p>,
        resolveComponent: (m) => m.default
    }
);

const {useBearStore} =
    await CustomLoadRemote<typeof import("appStore/store")>("appStore/store");

```

### Run

- dev

```
pnpm run ${action} ${name}
```

- action: `dev`, `build`, `preview`, `lint`...
- name: name app

### With project you can run:

- With host

```
pnpm run dev host
```

- With remote

```
pnpm run dev remote
```

- You can also do the same with `build`, `preview`
