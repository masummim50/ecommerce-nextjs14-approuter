export function isEmptyObject(obj: any) {
  // Check if the object has any own properties
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
