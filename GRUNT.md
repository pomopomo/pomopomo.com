# NOTE
If tasks is starting with `[A]` that means given task is alias task of another

Heroku tasks have a sign like `[H]` so you need some permission to use this task

# grunt
It will run `default` task

# grunt default
Just running `jshint` task. This task can be updated later.

# grunt jshint
Every project has to obey lint rules and this task is a lint checker for whole js/json files

# [H][A]grunt deploy
Alias of `shell:deploy`

# [H]grunt shell:deploy
This task will deploy master branch to heroku

# [H]grunt shell:log
Showing realtime heroku logs
