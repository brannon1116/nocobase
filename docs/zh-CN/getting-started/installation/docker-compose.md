# Docker å®è£ (ð æ¨è)

## 0. åå³æ¡ä»¶

â¡â¡ è¯·ç¡®ä¿ä½ å·²ç»å®è£äº [Docker](https://docs.docker.com/get-docker/)

## 1. å° NocoBase ä¸è½½å°æ¬å°

ä½¿ç¨ Git ä¸è½½ï¼æç´æ¥[ä¸è½½ Zip å](https://gitee.com/nocobase/nocobase/repository/archive/main.zip)ï¼å¹¶è§£åå° nocobase ç®å½ä¸ï¼

```bash
git clone https://gitee.com/nocobase/nocobase.git nocobase
```

## 2. éæ©æ°æ®åºï¼ä»»éå¶ä¸ï¼

å°ç®å½åæ¢å°ç¬¬ä¸æ­¥ä¸è½½çæä»¶å¤¹éï¼æ ¹æ®å®éæåµè°æ´ï¼ã

```bash
# MacOS, Linux...
cd /your/path/nocobase
# Windows
cd C:\your\path\nocobase
```

ä¸åæ°æ®åºç docker éç½®æäºè®¸å·®å¼ï¼è¯·éæ©åæ¢å°å¯¹åºçç®å½ä¸ã

### SQLite

```bash
cd docker/app-sqlite
```

### MySQL

```bash
cd docker/app-mysql
```

### PostgreSQL

```bash
cd docker/app-postgres
```

## 3. éç½® docker-compose.ymlï¼éå¿é¡»ï¼

<Alert>

éå¼åäººåï¼è·³è¿è¿ä¸æ­¥ãå¦æä½ æå¾å¼åï¼ä¹å¯ä»¥è¿ä¸æ­¥äºè§£æä¹éç½® `docker-compose.yml`ã

</Alert>

ç®å½ç»æï¼ä¸ docker ç¸å³ï¼

```bash
âââ nocobase
  âââ docker
    âââ app-sqlite
      âââ storage
      âââ docker-compose.yml
    âââ app-mysql
      âââ storage
      âââ docker-compose.yml
    âââ app-postgres
      âââ storage
      âââ docker-compose.yml
```

`docker-compose.yml` çéç½®è¯´æï¼

SQLite åªæ app æå¡ï¼PostgreSQL å MySQL ä¼æå¯¹åºç postgres æ mysql æå¡ï¼å¯ä»¥ä½¿ç¨ä¾å­çæ°æ®åºæå¡ï¼æèèªå·±éç½®ã

```yml
services:
  app:
  postgres:
  mysql:
```

app ç«¯å£ï¼ä¾å­ä¸º 13000 ç«¯å£ï¼è®¿é®å°åä¸º `http://your-ip:13000/`

```yml
services:
  app:
    ports:
      - "13000:80"
```

NocoBase çæ¬ï¼[ç¹æ­¤æ¥çææ°çæ¬](https://hub.docker.com/r/nocobase/nocobase/tags)ï¼ï¼åçº§æ¶ï¼éè¦ä¿®æ¹ä¸ºææ°çæ¬ã

```yml
services:
  app:
    image: nocobase/nocobase:0.7.0-alpha.78
```

ç¯å¢åé

```yml
services:
  app:
    image: nocobase/nocobase:0.7.0-alpha.78
    environment:
      - DB_DIALECT=postgres
      - DB_HOST=postgres
      - DB_DATABASE=nocobase
      - DB_USER=nocobase
      - DB_PASSWORD=nocobase
      - LOCAL_STORAGE_BASE_URL=http://localhost:13000/storage/uploads
```

- `DB_*` ä¸ºæ°æ®åºç¸å³ï¼å¦æä¸æ¯ä¾å­é»è®¤çæ°æ®åºæå¡ï¼è¯·æ ¹æ®å®éæåµä¿®æ¹ï¼
- `LOCAL_STORAGE_BASE_URL` ä¸ºæ¬å°å­å¨çæ ¹ URLï¼å¦æä¸æ¯æ¬å°å®è£ï¼éè¦æ¹ä¸ºå¯¹åºç ip æååã

## 4. å®è£å¹¶å¯å¨ NocoBase

å®è£è¿ç¨å¯è½éè¦ç­å¾å åé

```bash
# å¨åå°è¿è¡
$ docker-compose up -d
# æ¥ç app è¿ç¨çæåµ
$ docker-compose logs app

app-sqlite-app-1  | nginx started
app-sqlite-app-1  | yarn run v1.22.15
app-sqlite-app-1  | $ cross-env DOTENV_CONFIG_PATH=.env node -r dotenv/config packages/app/server/lib/index.js install -s
app-sqlite-app-1  | Done in 2.72s.
app-sqlite-app-1  | yarn run v1.22.15
app-sqlite-app-1  | $ pm2-runtime start --node-args="-r dotenv/config" packages/app/server/lib/index.js -- start
app-sqlite-app-1  | 2022-04-28T15:45:38: PM2 log: Launching in no daemon mode
app-sqlite-app-1  | 2022-04-28T15:45:38: PM2 log: App [index:0] starting in -fork mode-
app-sqlite-app-1  | 2022-04-28T15:45:38: PM2 log: App [index:0] online
app-sqlite-app-1  | ð NocoBase server running at: http://localhost:13000/
```

## 5. ç»å½ NocoBase

ä½¿ç¨æµè§å¨æå¼ http://localhost:13000/ åå§åè´¦å·åå¯ç æ¯ `admin@nocobase.com` å `admin123`ã
