import { WatchedListAbstract } from "@repo/core";

import { AnswerAttachment } from "./AnswerAttachment";

export class AnswerAttachmentList extends WatchedListAbstract<AnswerAttachment> {
  protected getItemKey(item: AnswerAttachment): string {
    return item.id.getValue();
  }

  protected compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.id.equals(b.id);
  }
}
