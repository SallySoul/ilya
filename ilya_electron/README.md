# ilya_electron

The electron frontend for ilya.
There was alot of configuration / boilerplate lifted from [https://github.com/electron-react-boilerplate/electron-react-boilerplate](electron-react-boilerplate).

## Developers

To run:
  * Clone the `ilya`repository.
  * Navigate to `ilya_electron`.
  * Use `yarn` or `npm` to install dependencies, run in development mode, and package code.
  
  ```
  $ yarn
  $ yarn develop
  ```
  
To update `ilya_node`, run these commands.
This process needs work. 

```
yarn upgrade ilya_node && yarn build
```

## `package.json`

This will prolly get out of date, but some of packages.json should get documented.

## Dependencies

### [rimraf](https://www.npmjs.com/package/rimraf)

This is a really lightweight dependency that gives you essentially `rm -rf` with globbing.
We use it for the `clean` gulp command, to remove the build directory.

### [chai](https://www.npmjs.com/package/chai)

Provides additional asserts for testing.

### [browser-sync](https://www.npmjs.com/package/browser-sync)

ERBP used this for the hot-reloading functionality. Will keep for now, though I think it has dubious use for us.

### [electron-mocha](https://www.npmjs.com/package/electron-mocha)

[Mocha](https://mochajs.org) is a testing framework for Node.js.
Built with async-code in mind.
electron-mocha gives some extra options for adding additional to tests (like being in renderer process.)

### [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

Babel compiles the javascript to different specifications.
Preset-env allows babel to target specific browsers and their limitations.

I need to learn more about babel.
