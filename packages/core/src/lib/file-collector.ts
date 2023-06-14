import { FileInterface } from '../interfaces/file.interface';

export class FileCollector {
  private _filesNames = new Set<string>();
  private _files: FileInterface[] = [];

  public addFiles(_files: FileInterface[]): void {
    for (const file of _files) {
      this.addFile(file);
    }
  }

  public addFile(file: FileInterface): void {
    if (this._filesNames.has(file.path)) {
      return;
    }
    this._filesNames.add(file.path);
    this._files.push(file);
  }
  public removeFile(file: FileInterface): void {
    if (!this._filesNames.has(file.path)) {
      return;
    }
    this._filesNames.delete(file.path);
    this._files = this._files.filter((f) => f.path !== file.path);
  }

  public getFiles(): FileInterface[] {
    return this._files;
  }
}
