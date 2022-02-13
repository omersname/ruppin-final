import CONTENT from './content.json';

export const lang = (key: keyof typeof CONTENT, attr?: Record<string, string>) => {
  let output = CONTENT[key];
  if (attr) {
    const keys = Object.keys(attr);
    for (const key of keys) {
      output = output.replace(`{${key}}`, attr[key]);
    }
  }
  return output;
};
