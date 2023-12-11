import { GridsterItem } from "angular-gridster2";

export interface Widget extends GridsterItem {
    type: string;
    blank?: boolean;
}