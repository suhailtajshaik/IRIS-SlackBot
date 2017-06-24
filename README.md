# technoroit-SlackBot

### How to run

#### local development :
```
$ yarn start
```

#### Running docker:

```
docker pull suhailtaj/slack-bot
docker run -d --name technoroit -p 3000:3000  suhailtaj/slack-bot
```

#### docker build local:
1. Make sure docker is started.
2. Run in terminal/command prompt 
```
$ yarn docker
```
3. Server should be running on port 3000