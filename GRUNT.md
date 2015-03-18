# NOTE
If tasks is starting with `[A]` that means given task is alias task of another

Heroku tasks have a sign like `[H]` so you need some permission to use this task

```js
 grunt
```
It will run `default` task

```js
 grunt default
```
Just running `jshint` task. This task can be updated later.

```js
 grunt jshint
```
Every project has to obey lint rules and this task is a lint checker for whole js/json files

```js
 grunt deploy
```
[H][A]
Alias of `shell:deploy`

```js
 grunt shell:deploy
```
[H]
This task will deploy master branch to heroku

```js
 grunt shell:log
```
[H] Showing realtime heroku logs