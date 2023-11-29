export interface NavLink {
    type: 'item' | 'group' | 'folder';
    title: string;
    to?: string;
    children?: NavLink[];
    icon?: string;
    badge?: {
        text: string;
        color: string;
    };
}