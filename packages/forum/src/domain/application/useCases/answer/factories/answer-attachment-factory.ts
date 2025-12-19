import { UUIDVO } from "@repo/core";

import { AnswerAttachment, AnswerAttachmentProps } from "../../../../enterprise";

export function answerAttachementFactory(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UUIDVO,
) {
  const answer = AnswerAttachment.create(
    {
      answerId: UUIDVO.create(),
      attachmentId: UUIDVO.create(),
      ...override,
    },
    id,
  );

  return answer;
}
