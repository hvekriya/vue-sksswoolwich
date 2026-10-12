export const TV_WIDGET_TYPES = [
  "slideshow",
  "pinned",
  "announcements",
  "niyams",
  "countdown",
] as const;

export type TvWidgetType = (typeof TV_WIDGET_TYPES)[number];

export interface TvWidget {
  id: string;
  type: TvWidgetType;
  /** Percent of the 16:9 screen, 0–100. */
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  title?: string;
  subtitle?: string;
  /** ISO datetime the countdown reaches. */
  targetAt?: string;
  logoUrl?: string;
}

export const TV_WIDGET_CATALOG: Array<{
  type: TvWidgetType;
  label: string;
  blurb: string;
  singleton: boolean;
}> = [
  {
    type: "slideshow",
    label: "Main slideshow",
    blurb: "Rotating activity posters",
    singleton: true,
  },
  {
    type: "pinned",
    label: "Pinned posters",
    blurb: "Static notices under the slideshow",
    singleton: true,
  },
  {
    type: "announcements",
    label: "Announcements",
    blurb: "Scrolling mandir announcements",
    singleton: true,
  },
  {
    type: "niyams",
    label: "Niyams",
    blurb: "Live totals from Bhaktiras",
    singleton: true,
  },
  {
    type: "countdown",
    label: "Countdown",
    blurb: "Days until the event. The clock appears in the last 24 hours.",
    singleton: false,
  },
];

const SINGLETONS = new Set(
  TV_WIDGET_CATALOG.filter((item) => item.singleton).map((item) => item.type)
);

const MIN_SIZE = 12;

/** Shared column and row lines. Every panel edge sits on one of these. */
export const TV_GRID_MIN = 2;
export const TV_GRID_MAX = 6;

export interface TvGrid {
  columns: number;
  rows: number;
}

export const DEFAULT_TV_GRID: TvGrid = { columns: 3, rows: 3 };

export function normalizeGrid(columns: unknown, rows: unknown): TvGrid {
  return {
    columns: clamp(Math.round(num(columns, DEFAULT_TV_GRID.columns)), TV_GRID_MIN, TV_GRID_MAX),
    rows: clamp(Math.round(num(rows, DEFAULT_TV_GRID.rows)), TV_GRID_MIN, TV_GRID_MAX),
  };
}

export function gridFromSnapshot(val: unknown): TvGrid {
  const row = asRecord(val);
  if (!row) return { ...DEFAULT_TV_GRID };
  return normalizeGrid(row.columns, row.rows);
}

/** Map a free position onto whole cells of the shared grid. */
export function snapWidget(widget: TvWidget, grid: TvGrid = DEFAULT_TV_GRID): TvWidget {
  const { columns, rows } = normalizeGrid(grid.columns, grid.rows);
  const clamped = clampWidget(widget);
  const xCells = cellSpan(clamped.x, clamped.w, columns);
  const yCells = cellSpan(clamped.y, clamped.h, rows);
  return {
    ...clamped,
    x: (xCells.start / columns) * 100,
    y: (yCells.start / rows) * 100,
    w: (xCells.span / columns) * 100,
    h: (yCells.span / rows) * 100,
  };
}

export function snapWidgets(widgets: TvWidget[], grid: TvGrid = DEFAULT_TV_GRID): TvWidget[] {
  return widgets.map((widget) => snapWidget(widget, grid));
}

function cellSpan(startPct: number, sizePct: number, divisions: number) {
  const start = clamp(Math.round((startPct / 100) * divisions), 0, divisions - 1);
  const end = clamp(Math.round(((startPct + sizePct) / 100) * divisions), start + 1, divisions);
  return { start, span: end - start };
}

function coversCell(widget: TvWidget, col: number, row: number, grid: TvGrid) {
  const placed = snapWidget(widget, grid);
  const { columns, rows } = normalizeGrid(grid.columns, grid.rows);
  const colStart = Math.round((placed.x / 100) * columns);
  const rowStart = Math.round((placed.y / 100) * rows);
  const colEnd = colStart + Math.round((placed.w / 100) * columns);
  const rowEnd = rowStart + Math.round((placed.h / 100) * rows);
  return col >= colStart && col < colEnd && row >= rowStart && row < rowEnd;
}

export function defaultTvWidgets(): TvWidget[] {
  return [
    { id: "slideshow", type: "slideshow", x: 0, y: 0, w: 50, h: 50, z: 1 },
    { id: "pinned", type: "pinned", x: 0, y: 50, w: 50, h: 50, z: 1 },
    {
      id: "announcements",
      type: "announcements",
      x: 50,
      y: 0,
      w: 50,
      h: 100,
      z: 1,
    },
  ];
}

export function widgetLabel(type: TvWidgetType) {
  return TV_WIDGET_CATALOG.find((item) => item.type === type)?.label ?? type;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function num(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function clampWidget(widget: TvWidget): TvWidget {
  const w = clamp(num(widget.w, 30), MIN_SIZE, 100);
  const h = clamp(num(widget.h, 30), MIN_SIZE, 100);
  return {
    ...widget,
    x: clamp(num(widget.x, 0), 0, 100 - w),
    y: clamp(num(widget.y, 0), 0, 100 - h),
    w,
    h,
    z: Math.max(1, Math.round(num(widget.z, 1))),
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function normalizeWidgets(raw: unknown): TvWidget[] {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object"
      ? Object.values(raw as Record<string, unknown>)
      : [];

  const seen = new Set<string>();
  const widgets: TvWidget[] = [];

  for (const item of list) {
    const row = asRecord(item);
    if (!row) continue;
    const type = row.type;
    if (typeof type !== "string" || !TV_WIDGET_TYPES.includes(type as TvWidgetType)) {
      continue;
    }
    const widgetType = type as TvWidgetType;
    if (SINGLETONS.has(widgetType)) {
      if (seen.has(widgetType)) continue;
      seen.add(widgetType);
    }
    const id =
      typeof row.id === "string" && row.id.trim()
        ? row.id.trim()
        : `${widgetType}-${widgets.length + 1}`;
    widgets.push(
      clampWidget({
        id,
        type: widgetType,
        x: num(row.x, 0),
        y: num(row.y, 0),
        w: num(row.w, 40),
        h: num(row.h, 40),
        z: num(row.z, widgets.length + 1),
        title: typeof row.title === "string" ? row.title : undefined,
        subtitle: typeof row.subtitle === "string" ? row.subtitle : undefined,
        targetAt: typeof row.targetAt === "string" ? row.targetAt : undefined,
        logoUrl: typeof row.logoUrl === "string" ? row.logoUrl : undefined,
      })
    );
  }

  return widgets;
}

/** Missing document keeps today's TV. An explicit empty list stays empty. */
export function boardFromSnapshot(val: unknown): TvWidget[] {
  const row = asRecord(val);
  if (!row || !("widgets" in row) || row.widgets == null) return defaultTvWidgets();
  return normalizeWidgets(row.widgets);
}

export function serializeWidgets(widgets: TvWidget[]) {
  const out: Record<string, Record<string, string | number>> = {};
  for (const widget of widgets) {
    const placed = clampWidget(widget);
    const row: Record<string, string | number> = {
      id: placed.id,
      type: placed.type,
      x: placed.x,
      y: placed.y,
      w: placed.w,
      h: placed.h,
      z: placed.z,
    };
    if (placed.title?.trim()) row.title = placed.title.trim();
    if (placed.subtitle?.trim()) row.subtitle = placed.subtitle.trim();
    if (placed.targetAt?.trim()) row.targetAt = placed.targetAt.trim();
    if (placed.logoUrl?.trim()) row.logoUrl = placed.logoUrl.trim();
    out[placed.id] = row;
  }
  return out;
}

export function createWidget(
  type: TvWidgetType,
  existing: TvWidget[],
  grid: TvGrid = DEFAULT_TV_GRID
): TvWidget {
  const placedGrid = normalizeGrid(grid.columns, grid.rows);
  const z = existing.reduce((max, widget) => Math.max(max, widget.z), 0) + 1;
  let col = 0;
  let row = 0;
  for (let r = 0; r < placedGrid.rows; r++) {
    for (let c = 0; c < placedGrid.columns; c++) {
      const taken = existing.some((widget) => coversCell(widget, c, r, placedGrid));
      if (!taken) {
        col = c;
        row = r;
        r = placedGrid.rows;
        break;
      }
    }
  }
  const base: TvWidget = {
    id: `${type}-${Date.now().toString(36)}`,
    type,
    x: (col / placedGrid.columns) * 100,
    y: (row / placedGrid.rows) * 100,
    w: (1 / placedGrid.columns) * 100,
    h: (1 / placedGrid.rows) * 100,
    z,
  };
  if (type === "countdown") {
    base.title = "Upcoming event";
    base.subtitle = "";
  }
  return snapWidget(base, placedGrid);
}
