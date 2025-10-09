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

<<<<<<< HEAD
## KEY
# 1. Gerar chave privada RSA (2048 bits)
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# 2. Gerar chave pública a partir da privada
openssl rsa -pubout -in private_key.pem -out public_key.pem

# 3. Converter a chave privada para uma única linha Base64 (sem cabeçalhos)
openssl base64 -A -in private_key.pem -out private_key_base64.txt

# 4. Converter a chave pública para uma única linha Base64 (sem cabeçalhos)
openssl base64 -A -in public_key.pem -out public_key_base64.txt



Claro! Vamos analisar e ajustar o comando que você forneceu:

### Comando original:

```bash
openssl base64 -in private.key -out private.txt
```

### ✅ O que esse comando faz:

Esse comando utiliza o `openssl` para:

* **Ler** um arquivo chamado `private.key`.
* **Codificá-lo em base64**.
* **Salvar o resultado** no arquivo `private.txt`.

### 🔍 Análise:

* O comando está **correto**, e será executado com sucesso **desde que:**

  * O arquivo `private.key` exista.
  * O conteúdo de `private.key` esteja em formato binário ou PEM e você deseje convertê-lo para uma versão codificada em Base64 (por exemplo, para facilitar envio por e-mail, ou uso em sistemas que não aceitam binário).
  * Você esteja ciente de que **codificar uma chave privada em base64 não a criptografa**, apenas a transforma em texto legível. **⚠️ Isso não é seguro por si só.**

---

### 🔧 Possíveis ajustes (se necessário):

#### 1. **Se você quiser decodificar Base64 de volta:**

```bash
openssl base64 -d -in private.txt -out private.key
```

#### 2. **Para proteger a chave com senha (criptografar):**

Use um algoritmo de criptografia simétrica com senha:

```bash
openssl enc -aes-256-cbc -salt -in private.key -out private.enc
```

#### 3. **Para decodificar essa versão criptografada:**

```bash
openssl enc -d -aes-256-cbc -in private.enc -out private.key
```

#### 4. **Para verificar se a chave privada está válida:**

```bash
openssl rsa -check -in private.key
```

---

### ✅ Resumo:

Seu comando está certo **se seu objetivo for apenas converter o conteúdo de `private.key` para Base64**.
Mas se a intenção for segurança, considere usar criptografia real.

Se você quiser me dizer **qual o seu objetivo específico com esse comando**, posso sugerir a melhor prática para ele.

=======
# JWT para gerar o token

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl base64 -in private_key.pem -A > private_base64.txt

openssl rsa -pubout -in private_key.pem -out public_key.pem
openssl base64 -in public_key.pem -A > public_base64.txt
```
>>>>>>> 76c59092360c13693d66e096b815d5bc4273c6a9
