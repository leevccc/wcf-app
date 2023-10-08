/* 判断是否为空字符串包括 null, undefined, '', ' ' */
export function isEmptyString(value: string | undefined): boolean {
  return typeof value !== 'string' || value.trim() === '';
}

/* 判断变量是否为 YYYY-MM-DD 格式的字符串 */
export function isDateFormat(input: any): boolean {
  if (typeof input !== 'string') return false; // 如果不是字符串，直接返回 false

  // 使用正则表达式匹配 YYYY-MM-DD 格式
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // 返回匹配结果
  return regex.test(input);
}
