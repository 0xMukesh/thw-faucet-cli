# thw-faucet-cli

🌈 A command-line tool to quickly get testnet tokens right from your terminal with metamask authentication!

Built as a demo project from my blog post

<!-- toc -->
* [thw-faucet-cli](#thw-faucet-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

- [Usage](#usage)
- [Commands](#commands)

# Usage

<!-- usage -->
```sh-session
$ npm install -g thw-faucet-cli
$ faucet-cli COMMAND
running command...
$ faucet-cli (--version)
thw-faucet-cli/0.0.0 win32-x64 node-v16.13.0
$ faucet-cli --help [COMMAND]
USAGE
  $ faucet-cli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`faucet-cli help [COMMAND]`](#faucet-cli-help-command)
* [`faucet-cli login`](#faucet-cli-login)
* [`faucet-cli plugins`](#faucet-cli-plugins)
* [`faucet-cli plugins:install PLUGIN...`](#faucet-cli-pluginsinstall-plugin)
* [`faucet-cli plugins:inspect PLUGIN...`](#faucet-cli-pluginsinspect-plugin)
* [`faucet-cli plugins:install PLUGIN...`](#faucet-cli-pluginsinstall-plugin-1)
* [`faucet-cli plugins:link PLUGIN`](#faucet-cli-pluginslink-plugin)
* [`faucet-cli plugins:uninstall PLUGIN...`](#faucet-cli-pluginsuninstall-plugin)
* [`faucet-cli plugins:uninstall PLUGIN...`](#faucet-cli-pluginsuninstall-plugin-1)
* [`faucet-cli plugins:uninstall PLUGIN...`](#faucet-cli-pluginsuninstall-plugin-2)
* [`faucet-cli plugins update`](#faucet-cli-plugins-update)
* [`faucet-cli request`](#faucet-cli-request)

## `faucet-cli help [COMMAND]`

Display help for faucet-cli.

```
USAGE
  $ faucet-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for faucet-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `faucet-cli login`

🦁 Connect your Metamask wallet to the faucet CLI

```
USAGE
  $ faucet-cli login

DESCRIPTION
  🦁 Connect your Metamask wallet to the faucet CLI

EXAMPLES
  $ faucet-cli login
```

_See code: [dist/commands/login.ts](https://github.com/Kira272921/thw-faucet-cli/blob/v0.0.0/dist/commands/login.ts)_

## `faucet-cli plugins`

List installed plugins.

```
USAGE
  $ faucet-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ faucet-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `faucet-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ faucet-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ faucet-cli plugins add

EXAMPLES
  $ faucet-cli plugins:install myplugin 

  $ faucet-cli plugins:install https://github.com/someuser/someplugin

  $ faucet-cli plugins:install someuser/someplugin
```

## `faucet-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ faucet-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ faucet-cli plugins:inspect myplugin
```

## `faucet-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ faucet-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ faucet-cli plugins add

EXAMPLES
  $ faucet-cli plugins:install myplugin 

  $ faucet-cli plugins:install https://github.com/someuser/someplugin

  $ faucet-cli plugins:install someuser/someplugin
```

## `faucet-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ faucet-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ faucet-cli plugins:link myplugin
```

## `faucet-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ faucet-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ faucet-cli plugins unlink
  $ faucet-cli plugins remove
```

## `faucet-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ faucet-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ faucet-cli plugins unlink
  $ faucet-cli plugins remove
```

## `faucet-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ faucet-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ faucet-cli plugins unlink
  $ faucet-cli plugins remove
```

## `faucet-cli plugins update`

Update installed plugins.

```
USAGE
  $ faucet-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `faucet-cli request`

🚰 Request for testnet tokens

```
USAGE
  $ faucet-cli request

DESCRIPTION
  🚰 Request for testnet tokens
```

_See code: [dist/commands/request.ts](https://github.com/Kira272921/thw-faucet-cli/blob/v0.0.0/dist/commands/request.ts)_
<!-- commandsstop -->

- [`faucet-cli help [COMMAND]`](#faucet-cli-help-command)
- [`faucet-cli login`](#faucet-cli-login)
- [`faucet-cli request`](#faucet-cli-request)

## `faucet-cli help [COMMAND]`

Display help for faucet-cli.

```
USAGE
  $ faucet-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for faucet-cli.
```

## `faucet-cli login`

🦁 Connect your Metamask wallet to the faucet CLI

```
USAGE
  $ faucet-cli login

DESCRIPTION
  🦁 Connect your Metamask wallet to the faucet CLI

EXAMPLES
  $ faucet-cli login
```

## `faucet-cli request`

🚰 Request for testnet tokens

```
USAGE
  $ faucet-cli request

DESCRIPTION
  🚰 Request for testnet tokens
```
