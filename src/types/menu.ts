export type Menu = {
  id: number;
  icon : string,
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};


export interface MessageItem {
  id: string;
  message: string;
  fields: string;
  type?: string;
  address?: string;
}