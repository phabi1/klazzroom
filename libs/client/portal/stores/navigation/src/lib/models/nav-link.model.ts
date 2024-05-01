export interface INavLink {
    type: 'item' | 'group' | 'folder';
    title: string | Record<string, string>;
    to: string;
    children?: INavLink[];
  }