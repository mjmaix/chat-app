import extList from 'ext-list';

export function getExt(filename: string) {
  const idx = filename.lastIndexOf('.');
  // handle cases like, .htaccess, filename
  return idx < 1 ? '' : filename.substr(idx + 1);
}

export function getMime(filename: string) {
  const ext = getExt(filename);
  const list: { [k: string]: string } = extList();

  return list[ext];
}
