export interface GridContent {
  bottomContent: string;
}

export interface Layout {
  gridRows: GridRows;
  gridColumns: GridColumns;
  gridContent: GridContent;
}

export interface GridRows {
  headerRow: string;
  contentRow: string;
  bottomContentRow: string;
  footerRow: string;
}

export interface GridColumns {
  sideNavCol: string;
  sidePanelCol: string;
  contentCol: string;
}

export function createLayout(layout: Partial<Layout>): Layout {
  return {
    gridRows: createGridRows(layout?.gridRows),
    gridColumns: createGridColumns(layout?.gridColumns),
    gridContent: {bottomContent: layout?.gridContent?.bottomContent}
  } as Layout
}

export function createGridRows(rows: Partial<GridRows>): GridRows {
  return {
    headerRow: rows?.headerRow ?? '2.5rem',
    contentRow: rows?.contentRow ?? '1fr',
    bottomContentRow: rows?.bottomContentRow ?? '0',
    footerRow: rows?.footerRow ?? '3.5rem'
  } as GridRows;
}

export function createGridColumns(columns: Partial<GridColumns>): GridColumns {
  return {
    sideNavCol: columns?.sideNavCol ?? '2rem',
    sidePanelCol: columns?.sidePanelCol ?? '15%',
    contentCol: columns?.contentCol ?? '1fr'
  } as GridColumns;
}
