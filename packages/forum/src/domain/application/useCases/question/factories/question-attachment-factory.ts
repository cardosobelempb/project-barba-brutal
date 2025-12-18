import { UUIDVO } from "@repo/core";

import { QuestionAttachment, QuestionAttachmentProps } from "../../../../enterprise";

export function questionAttachementFactory(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UUIDVO,
) {
  const question = QuestionAttachment.create(
    {
      questionId: UUIDVO.create(),
      attachmentId: UUIDVO.create(),
      ...override,
    },
    id,
  );

  return question;
}
