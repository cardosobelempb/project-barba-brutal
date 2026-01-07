import { Events, waitFor } from '@repo/core';
import { AnswerCreatedEvent, answerFactory, InMemoryAnswerAttachmentRepository, InMemoryAnswerRepository, InMemoryQuestionAttachmentRepository, InMemoryQuestionRepository, questionFactory } from '@repo/forum';

import { SendNotificationUseCase } from '../../useCases';
import { OnAnswerCreated } from '../OnAnswerCreated';
import { InMemoryNotificationRepository } from './../../repositories/inMemoryRepository/InMemoryNotificationRepository';

describe('OnAnswerCreated subscriber', () => {
  // Dependências principais do teste
  let questionRepository: InMemoryQuestionRepository;
  let answerRepository: InMemoryAnswerRepository;
  let notificationRepository: InMemoryNotificationRepository;
  let sendNotification: SendNotificationUseCase;

  // Spy para validar efeito colateral
  let sendNotificationSpy: ReturnType<typeof vi.spyOn>;


  /**
   * Setup isolado e claro
   * Cada teste começa com um estado limpo
   */
  beforeEach(() => {
    const questionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    questionRepository = new InMemoryQuestionRepository(
      questionAttachmentRepository,
    );

    const answerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
    answerRepository = new InMemoryAnswerRepository(
      answerAttachmentRepository,
    );

    notificationRepository = new InMemoryNotificationRepository();

    sendNotification = new SendNotificationUseCase({
      notificationRepository,
    });

    // Espiona o método execute para validar se foi chamado
    sendNotificationSpy = vi.spyOn(sendNotification, 'execute');
    // console.log(sendNotificationSpy.getMockName());

    // Subscriber é instanciado para registrar o handler no Domain Event
    new OnAnswerCreated(questionRepository, sendNotification);
  });

  afterEach(() => {
    Events.clearAll();
  });


  /**
   * Teste de comportamento:
   * Quando uma resposta é criada,
   * então uma notificação deve ser enviada
   */
  it('should send a notification when an answer is created', async () => {
    // Arrange
    const question = questionFactory({});
    const answer = answerFactory({
      questionId: question.id,
    });

    await questionRepository.create(question);

    // Act
    await answerRepository.create(answer);

    Events.dispatchEvent(new AnswerCreatedEvent(answer));

    // Assert
    await waitFor(() => {
      expect(sendNotificationSpy).toHaveBeenCalledTimes(1);
      expect(sendNotificationSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          recipientId: question.authorId.toString(),
        }),
      );
    })

  });
});
