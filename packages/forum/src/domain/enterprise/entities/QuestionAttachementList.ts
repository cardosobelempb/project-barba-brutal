import { WatchedListAbstract } from "@repo/core";

import { QuestionAttachment } from "./QuestionAttachment";

export class QuestionAttachmentList extends WatchedListAbstract<QuestionAttachment> {
  protected getItemKey(item: QuestionAttachment): string {
    return item.id.getValue();
  }

  protected compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.id.equals(b.id);
  }
}
