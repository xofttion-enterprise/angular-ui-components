export function like(value: string, pattern: string, force = false): boolean {
  if (pattern) {
    let filter = pattern.toLowerCase();
    let test = value.toLowerCase();

    if (force) {
      test = normalize(test);
      filter = normalize(filter);
    }

    return !!test.match(`^.*${filter}.*$`);
  }

  return !!value;
}

export function normalize(value: string): string {
  let result = value;

  result = result.replace('á', 'a');
  result = result.replace('Á', 'A');
  result = result.replace('é', 'e');
  result = result.replace('É', 'E');
  result = result.replace('í', 'i');
  result = result.replace('Í', 'I');
  result = result.replace('ó', 'o');
  result = result.replace('Ó', 'O');
  result = result.replace('ú', 'u');
  result = result.replace('Ú', 'U');

  return result;
}
