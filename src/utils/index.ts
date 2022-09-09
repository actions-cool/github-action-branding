const getIcon = (e: MouseEvent, text: string, title: string, fn?: () => void) => {
  const el = document.getElementById('copy-text') as HTMLTextAreaElement;
  el.value = text;
  el.select();
  document.execCommand('copy');
  fn?.();
  const message = document.createElement('div');
  message.innerHTML = title || 'Copy successfully';
  message.setAttribute(
    'style',
    `position:fixed; top:${ 
      e.y + 26 
      }px;left:${ 
      e.x - 36 
      }px;opacity:0;transition:all 0.3s;background: #eee; color: #000; height:0px;overflow:hidden; padding:4px 12px;border-radius: 2px;`,
  );
  document.body.append(message);
  setTimeout(() => {
    message.style.height = '20px';
    message.style.opacity = '1';
  });

  setTimeout(() => {
    setTimeout(() => {
      document.body.removeChild(message);
    }, 500);
    message.style.height = '0px';
    message.style.opacity = '0';
  }, 1200);
};

const filterIconList = [
  'chrome',
  'codepen',
  'codesandbox',
  'coffee',
  'columns',
  'divide-circle',
  'divide-square',
  'divide',
  'dribbble',
  'figma',
  'framer',
  'frown',
  'github',
  'gitlab',
  'hexagon',
  'instagram',
  'key',
  'linkedin',
  'meh',
  'mouse-pointer',
  'pen-tool',
  'slack',
  'smile',
  'table',
  'tool',
  'trello',
  'twitch',
  'twitter',
  'x-octagon',
  'youtube',
];

const filterIcons = (icons: Record<string, any>) => {
  for (const icon in icons) {
    if (filterIconList.includes(icon)) {
      delete icons[icon];
    }
  }
  return icons;
};

export { getIcon, filterIcons };
