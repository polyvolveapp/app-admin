export function arraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length)
    return false
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false
  }

  return true
}
