export interface NavLink {
  type: 'link' | 'group';
  to?: string;
  label: string;
  icon?: string;
  children?: NavLink[];
}
