# Notes

docker build --shm-size 1G -t theednaffattack/sc-client:prod . && docker push theednaffattack/sc-client:prod

docker build -t theednaffattack/sc-client:production . && docker push theednaffattack/sc-client:production

docker build --shm-size 2G -t theednaffattack/sc-client:production . && docker push theednaffattack/sc-client:production

docker pull theednaffattack/sc-client:production

docker tag theednaffattack/sc-client:production dokku/sc:latest

```bash
dokku tags sc
```

```bash
dokku tags:deploy sc latest
```

docker pull theednaffattack/sc-client:production && docker tag theednaffattack/sc-client:production dokku/sc:latest && dokku tags sc && dokku tags:deploy sc latest
