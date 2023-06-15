import { FileInterface } from './file.interface.js';
import { MemoryFileInterface } from './memory-file.interface.js';
import { PageInterface } from './page.interface.js';

/**
 *
 * BuildResultInterface is the result of a build.
 * @param success true if the build was successful
 * @param error the error if the build was not successful
 * @param content the content of the build
 * @param styles the styles of the build
 * @param memoryFiles the memory files of the build
 * @param files the files of the build
 *
 */
export interface BuildResultInterface {
  success: boolean;
  error?: unknown;
  page?: PageInterface;
  content?: string;
  styles?: string;
  memoryFiles?: MemoryFileInterface[];
  files?: FileInterface[];
}
