import type { MenuItem } from "./MenuItem";

export interface Category {
  id: number;
  name: string;
  menu_items: MenuItem[];
}
