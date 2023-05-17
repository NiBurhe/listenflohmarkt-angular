export function convertFromEn(text: string): string{
    let result = "";
    text.split('').forEach(char => { result += keyToEn(char)})
    return result
}

export function keyToEn(key: string) {
    if(key == 'Dead'){
        return ""
    }
    if (key == '§') {
      return '#';
    }
    if (key == 'ö') {
      return ';';
    }
    if (key == 'z') {
      return 'y';
    }
    if (key == 'Z') {
      return 'Y';
    }
    if (key == 'y') {
      return 'z';
    }
    if (key == 'Y') {
      return 'Z';
    }
    if (key == '?') {
      return '_';
    }
    if (key == '´') {
      return '=';
    }
    if (key == '-') {
      return '/';
    }
    if (key == '`') {
      return '+';
    }
    if (key == 'ß') {
      return '-';
    }
    if (key == 'È') {
      return '+E';
    }
    if (key == 'è') {
      return '+e';
    }
    if (key == 'Ì') {
      return '+I';
    }
    if (key == 'ì') {
      return '+i';
    }
    return key;
  }