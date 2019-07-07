# Heroku Procfile
# the cd is important to run processes in a sub directory

web: sh -c 'cd ./server/ && node -r ts-node/register/transpile-only src/app.ts'
release: sh -c 'cd ./server/ && npx knex migrate:latest --knexfile knexfile.ts'