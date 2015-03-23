# NOTE
Heroku tasks have a sign like `[H]` so you need some permission to use this task

```bash
  grunt
```
It will run `default` task

```bash
  grunt install
```
Installing whole `bower` files and merge them at once

```bash
  grunt reset
```
Clean paths of `bower` and install

```bash
  grunt build
```
Concat all files which are under `.bower`, `client` folders. After concatenation
 this task will merge them with generated js files.

```bash
  grunt default
```
If you already run `build` task before, you can run this task. Now default browser will open and
`grunt watch` will help you while developing.


```bash
  grunt prepare
```
Minify css and js files for production

```bash
  grunt dev
```
Run all task that you need to develop.

```bash
  grunt dev
```
Run all task that system need for production.

```bash
 grunt jshint
```
Every project has to obey lint rules and this task is a lint checker for whole js/json files

```bash
 grunt heroku:dev
```
[H]
Run `grunt dev` at Heroku

```bash
 grunt heroku:prod
```
[H]
Run `grunt prod` at Heroku

```bash
 grunt heroku:deploy
```
[H]
This task will deploy master branch to heroku

```bash
 grunt heroku:log
```
[H]
Showing realtime heroku logs