# decisions

using ruby on rails for running locally.

using vercel serverless functions for deployment.

why not just deploy the ror? I've tried and I don't think vercel supports this.

have I tried other free hosting platform? no.

# structure

- `/ror` to run locally
- `/vercel` to deploy
- `/functions` to hold the controllers used by both the ror and vercel

# to run

to run locally, run `rails s` in the ror directolry (stands for ruby on rails)

(install using bundler, `bundle install`. from the directory with the `Gemfile`. its like npm install with `package.json`)

# adding endpoint

1. local: each file in `vercel/api` serve as individual endpoints

2. server: to add route in the local server, add to `config/routes.rb` and the function in `ror/app/controllers/application_controller.rb`

3. do the function inside `functions` folder.

**you must do all 3 to add an endpoint.**
