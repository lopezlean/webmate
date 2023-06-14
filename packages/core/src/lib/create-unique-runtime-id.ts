const IDs = new Set<string>();
export function createUniqueRuntimeID(prefix = ''): string {
  let id = '';
  do {
    id = `${prefix}${Math.random().toString(36).substring(2, 9)}`;
  } while (IDs.has(id));
  IDs.add(id);
  return id;
}
