import { Entity, UUIDVO } from "@repo/core";

export interface AttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get tille() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(props: AttachmentProps, id?: UUIDVO) {
    const attachment = new Attachment(props, id);
    return attachment;
  }
}
