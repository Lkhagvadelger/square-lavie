export function castBigIntToNumber(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map((item) => castBigIntToNumber(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = castBigIntToNumber(obj[key]);
    }
    return newObj;
  }
  return obj;
}
