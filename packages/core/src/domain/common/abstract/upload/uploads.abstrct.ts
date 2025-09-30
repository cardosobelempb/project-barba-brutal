// core/contracts/Uploader.ts

export interface UploadsFile {
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url?: string;
}

export abstract class UploadsAbstract {
  abstract upload(req: Express.Request, folder?: string): Promise<UploadsFile[]>;
  abstract delete(filePath: string): Promise<void>;
}

