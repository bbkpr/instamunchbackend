export type DateTimeStamps = {
  createdAt: Date;
  updatedAt: Date;
}

export type WithDateTimeStamps<T> = Omit<T, keyof TimeStampFields> & DateTimeStamps;

export type StringTimeStamps = {
  createdAt: string;
  updatedAt: string;
}

export type WithStringTimeStamps<T> = Omit<T, keyof TimeStampFields> & StringTimeStamps;

export type TimeStampFields = {
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type WithTimeStamps<T> = Omit<T, keyof TimeStampFields> & TimeStampFields;

/**
 * Type guard to determine whether a value satisfies `string | Date`
 * @param value
 */
export function isTimeStamp(value: unknown): value is string | Date {
  return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
}

/**
 * If no error is thrown, assert that the object satisfies `TimeStampFields`
 * @param obj
 */
export function assertTimeStamped<T extends Partial<TimeStampFields>>(
  obj: unknown
): asserts obj is WithTimeStamps<T> {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Input must be an object');
  }

  const model = obj as Record<string, unknown>;

  if (!('createdAt' in model) || !isTimeStamp(model.createdAt)) {
    throw new Error('createdAt must be a valid Date or date string');
  }

  if (!('updatedAt' in model) || !isTimeStamp(model.updatedAt)) {
    throw new Error('updatedAt must be a valid Date or date string');
  }
}

export function timestampToISOString(value: string | Date) {
  if(value instanceof Date) {
    return value.toISOString();
  }
  return value;
}