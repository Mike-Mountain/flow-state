export interface ListItem {
  label: string;
  value: string;
  isHidden?: boolean;
  canRemove?: boolean
  showIcon?: boolean;
  iconClass?: string;
}

export type ItemDirection = 'top' | 'left' | 'bottom' | 'right';
