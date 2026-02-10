export function safeGet<T>(value: T | undefined | null): T | null {
  return value ?? null;
}
