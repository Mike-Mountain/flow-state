export interface RowsLayout {
  topNav: string;
  mainContent: string;
  bottomPanel: string;
  footer: string;
}

export interface ColumnsLayout {
  sideNav: string;
  sidePanel: string;
  content: string;
}

export interface LayoutState {
  sidePanelWidth: number;
  contentPanelWidth: number;
  mainContentHeight: number;
  bottomPanelHeight: number;
  gridRows: RowsLayout;
  gridColumns: ColumnsLayout;
}

export function createInitialState(): LayoutState {
  return {
    sidePanelWidth: 15,
    contentPanelWidth: 85,
    mainContentHeight: 100,
    bottomPanelHeight: 0,
    gridRows: {
      topNav: '4rem',
      mainContent: '1fr',
      bottomPanel: '1fr',
      footer: '3.5rem'
    },
    gridColumns: {
      sideNav: '2rem',
      sidePanel: '15%',
      content: '1fr',
    }
  } as LayoutState
}

