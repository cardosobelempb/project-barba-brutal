# start

# dependencias

```bash
npm i jsonwebtoken
npm i @types/jsonwebtoken -D
```

#database

```bash
npm i prisma -D
npm i prisma/client
npx prisma init
```

#jwt

```bash
npm i @nestjs/jwt
npm i @nestjs/jwt@9.0.0
```

# JWT para gerar o token

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl base64 -in private_key.pem -A > private_base64.txt

openssl rsa -pubout -in private_key.pem -out public_key.pem
openssl base64 -in public_key.pem -A > public_base64.txt
```
