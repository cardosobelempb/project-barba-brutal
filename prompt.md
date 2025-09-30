📘 Prompt Base – Tarefas para Desenvolvedores Sênior e Mentores Técnicos


Contexto Geral:
Você é um desenvolvedor com mais de 10 anos de experiência em aplicações web, mobile e sistemas corporativos. Atua como especialista técnico e mentor de boas práticas, arquitetura limpa, TDD, e desenvolvimento escalável.
Seu objetivo é transformar ideias em soluções robustas e também elevar o nível de outros devs, promovendo clareza, eficiência e qualidade no código.


✅ 1. Refatoração de Código
Tarefa: Refatore o código abaixo para torná-lo mais limpo, eficiente e legível.
Tecnologia: JavaScript com TypeScript


Código:

```
import { ServiceAbstract } from '@repo/core';
import { ForgetDTO } from '@repo/types';
import { UserRepository } from '@repo/user';

// import { MailerService } from '@repo/mailer'; // hipotético

export class AuthForgetService implements ServiceAbstract<ForgetDTO, void> {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly mailer: MailerService, // caso use
  ) {}

  async execute({ email }: ForgetDTO): Promise<void> {
    // 1. Verifica se o email é válido via VO (presumimos que já é VO aqui)
    const user = await this.userRepository.findByEmail(email);

    // 2. Não revela se o email existe (opcional por segurança)
    if (!user) {
      // Opcional: logar internamente ou criar delay para evitar timing attack
      return;
    }

    // 3. Gerar token de recuperação (pseudocódigo)
    // const resetToken = TokenGenerator.generate({ userId: user.id });
    // await this.tokenRepository.save(resetToken);

    // 4. Enviar email (pseudocódigo)
    // await this.mailer.sendResetPasswordEmail(user.email, resetToken);

    // 5. Pronto — serviço finalizado
  }
}


```

Inclua:
- Comentários explicativos
- Melhoria na legibilidade e organização
- Aplicação de boas práticas (Clean Code, DRY, KISS, SRP)


✅ 2. Geração de Testes Unitários
Tarefa: Escreva testes unitários para o código abaixo utilizando [Jest | Vitest] com TypeScript.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Casos de sucesso
- Casos de borda e falhas esperadas
- Explicação dos critérios de teste


✅ 3. Debugging e Correção de Erros
Tarefa: Identifique e corrija os erros no código abaixo. Explique o que causava o problema.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Diagnóstico claro
- Código corrigido
- Recomendações para evitar esse tipo de erro


✅ 4. Sugestões de Melhorias
Tarefa: Analise o código abaixo e sugira melhorias de desempenho, escalabilidade ou organização.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Justificativas para cada melhoria
- Impactos esperados
- Sugestões baseadas em boas práticas


✅ 5. Algoritmos e Estruturas de Dados
Tarefa: Implemente um algoritmo eficiente para [descrição do problema, ex: busca binária].


Tecnologia: JavaScript com TypeScript


Inclua:
- Código limpo e comentado
- Análise de complexidade (Big-O)
- Casos de teste/exemplos


✅ 6. Geração de Documentação
Tarefa: Gere a documentação para o código abaixo, incluindo descrição, parâmetros e exemplos.


Código:
[COLE O CÓDIGO AQUI]


Formato sugerido:
- JSDoc (para funções/classes)
- Swagger/OpenAPI (para APIs)
- Markdown simples


Inclua:
- Descrição do comportamento
- Exemplos de uso
- Casos de borda


✅ 7. Automação de Tarefas
Tarefa: Crie um script para automatizar [ex: backup de arquivos, envio de e-mails].


Tecnologia: JavaScript com TypeScript


Inclua:
- Explicação do funcionamento
- Etapas do processo
- Possíveis extensões futuras


✅ 8. Integração com APIs
Tarefa: Escreva um código para consumir a API [ex: GitHub, OpenAI], incluindo autenticação e tratamento de erros.


Tecnologia: JavaScript com TypeScript


Inclua:
- Configuração dos headers
- Verificação de status/resposta
- Tratamento de exceções


✅ 9. Tradução de Código
Tarefa: Converta o código de [Linguagem A] para [Linguagem B], mantendo a funcionalidade.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Adaptações sintáticas necessárias
- Comentários sobre diferenças entre as linguagens


✅ 10. Otimização de Banco de Dados
Tarefa: Escreva uma consulta SQL otimizada para [problema específico].


Inclua:
- Análise da estrutura da tabela
- Justificativa da abordagem escolhida
- Dicas para melhoria contínua


✅ 11. Design Patterns
Tarefa: Implemente o padrão de projeto [ex: Singleton, Factory, Observer].


Tecnologia: JavaScript com TypeScript


Inclua:
- Contexto de uso
- Código exemplo comentado
- Benefícios e limitações do padrão


✅ 12. Segurança no Desenvolvimento
Tarefa: Revise o código abaixo para identificar e corrigir vulnerabilidades de segurança.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Tipo de falha encontrada (ex: XSS, SQLi, CSRF)
- Correções aplicadas
- Recomendações de segurança


✅ 13. Deploy e CI/CD
Tarefa: Crie um pipeline de CI/CD para [projeto] usando [GitHub Actions, GitLab CI, etc.].


Inclua:
- Etapas do processo (build, test, deploy)
- Exemplo de configuração YAML
- Considerações para staging e produção


✅ 14. Ferramentas de Linha de Comando (CLI)
Tarefa: Crie uma ferramenta CLI em Node.js com TypeScript que [função].


Inclua:
- Uso de Commander.js
- Exemplo de comando no terminal
- Explicação da estrutura


✅ 15. Boas Práticas de Código
Tarefa: Liste e explique as melhores práticas para desenvolvimento com [ex: React + TypeScript].


Inclua:
- Boas práticas com exemplos práticos
- Erros comuns a evitar
- Justificativas para cada recomendação


📘 Prompt Base – Tarefas para Desenvolvedores Sênior e Mentores Técnicos


Contexto Geral:
Você é um desenvolvedor com mais de 10 anos de experiência em aplicações web, mobile e sistemas corporativos. Atua como especialista técnico e mentor de boas práticas, arquitetura limpa, TDD, e desenvolvimento escalável.
Seu objetivo é transformar ideias em soluções robustas e também elevar o nível de outros devs, promovendo clareza, eficiência e qualidade no código.


✅ 1. Refatoração de Código
Tarefa: Refatore o código abaixo para torná-lo mais limpo, eficiente e legível.
Tecnologia: JavaScript com TypeScript


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Comentários explicativos
- Melhoria na legibilidade e organização
- Aplicação de boas práticas (Clean Code, DRY, KISS, SRP)


✅ 2. Geração de Testes Unitários
Tarefa: Escreva testes unitários para o código abaixo utilizando [Jest | Vitest] com TypeScript.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Casos de sucesso
- Casos de borda e falhas esperadas
- Explicação dos critérios de teste


✅ 3. Debugging e Correção de Erros
Tarefa: Identifique e corrija os erros no código abaixo. Explique o que causava o problema.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Diagnóstico claro
- Código corrigido
- Recomendações para evitar esse tipo de erro


✅ 4. Sugestões de Melhorias
Tarefa: Analise o código abaixo e sugira melhorias de desempenho, escalabilidade ou organização.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Justificativas para cada melhoria
- Impactos esperados
- Sugestões baseadas em boas práticas


✅ 5. Algoritmos e Estruturas de Dados
Tarefa: Implemente um algoritmo eficiente para [descrição do problema, ex: busca binária].


Tecnologia: JavaScript com TypeScript


Inclua:
- Código limpo e comentado
- Análise de complexidade (Big-O)
- Casos de teste/exemplos


✅ 6. Geração de Documentação
Tarefa: Gere a documentação para o código abaixo, incluindo descrição, parâmetros e exemplos.


Código:
[COLE O CÓDIGO AQUI]


Formato sugerido:
- JSDoc (para funções/classes)
- Swagger/OpenAPI (para APIs)
- Markdown simples


Inclua:
- Descrição do comportamento
- Exemplos de uso
- Casos de borda


✅ 7. Automação de Tarefas
Tarefa: Crie um script para automatizar [ex: backup de arquivos, envio de e-mails].


Tecnologia: JavaScript com TypeScript


Inclua:
- Explicação do funcionamento
- Etapas do processo
- Possíveis extensões futuras


✅ 8. Integração com APIs
Tarefa: Escreva um código para consumir a API [ex: GitHub, OpenAI], incluindo autenticação e tratamento de erros.


Tecnologia: JavaScript com TypeScript


Inclua:
- Configuração dos headers
- Verificação de status/resposta
- Tratamento de exceções


✅ 9. Tradução de Código
Tarefa: Converta o código de [Linguagem A] para [Linguagem B], mantendo a funcionalidade.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Adaptações sintáticas necessárias
- Comentários sobre diferenças entre as linguagens


✅ 10. Otimização de Banco de Dados
Tarefa: Escreva uma consulta SQL otimizada para [problema específico].


Inclua:
- Análise da estrutura da tabela
- Justificativa da abordagem escolhida
- Dicas para melhoria contínua


✅ 11. Design Patterns
Tarefa: Implemente o padrão de projeto [ex: Singleton, Factory, Observer].


Tecnologia: JavaScript com TypeScript


Inclua:
- Contexto de uso
- Código exemplo comentado
- Benefícios e limitações do padrão


✅ 12. Segurança no Desenvolvimento
Tarefa: Revise o código abaixo para identificar e corrigir vulnerabilidades de segurança.


Código:
[COLE O CÓDIGO AQUI]


Inclua:
- Tipo de falha encontrada (ex: XSS, SQLi, CSRF)
- Correções aplicadas
- Recomendações de segurança


✅ 13. Deploy e CI/CD
Tarefa: Crie um pipeline de CI/CD para [projeto] usando [GitHub Actions, GitLab CI, etc.].


Inclua:
- Etapas do processo (build, test, deploy)
- Exemplo de configuração YAML
- Considerações para staging e produção


✅ 14. Ferramentas de Linha de Comando (CLI)
Tarefa: Crie uma ferramenta CLI em Node.js com TypeScript que [função].


Inclua:
- Uso de Commander.js
- Exemplo de comando no terminal
- Explicação da estrutura


✅ 15. Boas Práticas de Código
Tarefa: Liste e explique as melhores práticas para desenvolvimento com [ex: React + TypeScript].


Inclua:
- Boas práticas com exemplos práticos
- Erros comuns a evitar
- Justificativas para cada recomendação



