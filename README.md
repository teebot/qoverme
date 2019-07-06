# Install

`yarn` installs the dependencies for each workspace
`docker-compose up -d` creates a postgres instance
`yarn workspace server migrate` sets up the db to the latest schema
`yarn workspace server seed` adds seed data to the db

# Run

`yarn start` starts both server and client in dev mode
