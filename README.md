# Discord-bot JS

Must have .env file within root directory of the project with following variables:
TOKEN
CLIENT_ID
GUILD_ID

> Where are
TOKEN is your discord bot token
CLIENT_ID is your bot id
GUILD_ID is your guild/server id

> Possible ways to run:
Using docker build and run
```
1. docker build -t discord-bot:v1.0 -f Dockerfile .
2. docker run -d --name discord-bot-con:v1.0  discord-bot:v1.0
```
Using docker compose
```
docker compose -f docker-compose.yaml up
```
Using docker stack deploy
```
docker stack deploy discord-bot-stack --compose-file docker-stack.yaml
