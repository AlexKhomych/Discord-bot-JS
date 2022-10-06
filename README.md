# Discord-bot JS

Must have .env file within root directory of the project with following variables: TOKEN CLIENT_ID GUILD_ID

> Where are
- TOKEN is your discord bot token
- CLIENT_ID is your bot id
- GUILD_ID is your guild/server id

> Possible ways to run:
1. Using docker build and run
```
docker build -t discord-bot:v1.0 -f Dockerfile .
docker run -d --name discord-bot-con:v1.0  discord-bot:v1.0
```
2. Using docker compose
```
docker compose -f docker-compose.yaml up
```
3. Using docker stack deploy
```
docker stack deploy discord-bot-stack --compose-file docker-stack.yaml
