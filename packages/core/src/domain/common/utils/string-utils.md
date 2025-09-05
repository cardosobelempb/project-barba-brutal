🔧 Métodos:
isBlank -	Verifica se a string está vazia, nula ou contém apenas espaços.

isNotBlank -	Retorna o inverso de isBlank.

capitalize -	Capitaliza a primeira letra e transforma o restante em minúsculas.

removeAccents -	Remove acentos de uma string.

toSlug -	Gera um slug limpo de uma string (minúsculas, hífens, sem acentos/caracteres especiais).

truncate -	Limita a string a um tamanho máximo, adicionando "..." se exceder.

countOccurrences -	Conta quantas vezes uma substring aparece em uma string.

reverse -	Inverte a string.

isValidEmail -	Valida e-mails simples via regex.

isValidURL -	Valida se uma string é uma URL válida usando URL.

isValidCPF -	Valida um CPF com os algoritmos de verificação adequados.

isValidCNPJ -	Valida um CNPJ com os dígitos verificadores.

toCamelCase -	Converte string para camelCase.

toSnakeCase -	Converte para snake_case.

toKebabCase -	Converte para kebab-case.

generateRandomString -	Gera uma string aleatória com letras e números.

getInitials -	Retorna as iniciais de um nome completo.

# Exemplos rápidos:

```
console.log(StringUtils.isValidEmail("test@domain.com")); // true
console.log(StringUtils.isValidCPF("123.456.789-09"));    // false ou true, se for válido
console.log(StringUtils.toSnakeCase("myVariableName"));   // my_variable_name
console.log(StringUtils.generateRandomString(8));         // Ex: "A8kG9LmP"

```
