import { ComponentDOM } from './dom';

const prefixClass = 'theme-xofttion';

export function setThemeDOM(
  dom: ComponentDOM,
  theme: string,
  currentTheme?: string
): string {
  if (currentTheme) {
    dom.removeClass(currentTheme);
  }

  const newTheme = `${prefixClass}--${theme}`;
  dom.addClass(newTheme);

  return newTheme;
}
