import { onValue, ref as dbRef, set } from "firebase/database";
import {
  boardFromSnapshot,
  DEFAULT_TV_GRID,
  gridFromSnapshot,
  serializeWidgets,
  type TvGrid,
  type TvWidget,
} from "~/lib/tv-board";

export function useTvBoard() {
  const widgets = ref<TvWidget[]>(boardFromSnapshot(null));
  const grid = ref<TvGrid>({ ...DEFAULT_TV_GRID });
  const ready = ref(false);
  const error = ref<string | null>(null);

  let stop: (() => void) | null = null;

  if (import.meta.client) {
    const db = useDatabase();
    if (db) {
      stop = onValue(
        dbRef(db, "tv-board"),
        (snap) => {
          const val = snap.val();
          widgets.value = boardFromSnapshot(val);
          grid.value = gridFromSnapshot(val);
          ready.value = true;
          error.value = null;
        },
        (err) => {
          error.value = err.message || "Could not load the TV layout";
          ready.value = true;
        }
      );
    } else {
      ready.value = true;
    }
  }

  onUnmounted(() => {
    stop?.();
  });

  async function saveBoard(next: TvWidget[], nextGrid: TvGrid = grid.value) {
    const db = useDatabase();
    if (!db) throw new Error("Database is not ready");
    await set(dbRef(db, "tv-board"), {
      widgets: serializeWidgets(next),
      columns: nextGrid.columns,
      rows: nextGrid.rows,
      updatedAt: Date.now(),
    });
  }

  return { widgets, grid, ready, error, saveBoard };
}
