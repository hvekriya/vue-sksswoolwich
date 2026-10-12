import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  type Firestore,
} from "firebase/firestore";

export interface NiyamRow {
  id: string;
  title: string;
  detail: string;
  unit: string;
  target: number;
  order: number;
  active: boolean;
  icon: string;
  approvedTotal: number;
  participants: number;
}

/**
 * Public client config already shipped in the Bhaktiras site bundle.
 * Niyam challenges and totals are world-readable; entries stay private.
 */
const bhaktirasConfig = {
  apiKey: "AIzaSyAcbgpxFGy5U4ZMaUR-6oSMChG2Zu2fRbU",
  authDomain: "skssw-bhaktiras.firebaseapp.com",
  projectId: "skssw-bhaktiras",
  appId: "1:365204369219:web:7eeea824bba694c577c9f6",
};

const APP_NAME = "bhaktiras-niyams";

function bhaktirasFirestore(): Firestore {
  const existing = getApps().find((app) => app.name === APP_NAME);
  const app: FirebaseApp = existing ?? initializeApp(bhaktirasConfig, APP_NAME);
  return getFirestore(app);
}

function num(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function formatNiyamCount(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("en-GB");
}

export function formatNiyamTarget(value: number) {
  const rounded = Math.max(0, Math.round(value));
  if (rounded >= 100000 && rounded % 100000 === 0) {
    return `${(rounded / 100000).toLocaleString("en-GB")} Lakh`;
  }
  return rounded.toLocaleString("en-GB");
}

export function useBhaktirasNiyams() {
  const rows = ref<NiyamRow[]>([]);
  const pending = ref(true);
  const error = ref<string | null>(null);

  let stopChallenges: (() => void) | null = null;
  let stopStats: (() => void) | null = null;

  const challenges = new Map<string, Omit<NiyamRow, "approvedTotal" | "participants">>();
  const stats = new Map<string, { approvedTotal: number; participants: number }>();

  function publish() {
    rows.value = [...challenges.values()]
      .filter((row) => row.active && row.title)
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
      .map((row) => ({
        ...row,
        approvedTotal: stats.get(row.id)?.approvedTotal ?? 0,
        participants: stats.get(row.id)?.participants ?? 0,
      }));
  }

  if (import.meta.client) {
    try {
      const db = bhaktirasFirestore();
      stopChallenges = onSnapshot(
        collection(db, "niyamChallenges"),
        (snap) => {
          challenges.clear();
          snap.forEach((doc) => {
            const data = doc.data();
            challenges.set(doc.id, {
              id: doc.id,
              title: String(data.title || ""),
              detail: String(data.detail || ""),
              unit: String(data.unit || "entries"),
              target: Math.max(0, num(data.target)),
              order: num(data.order),
              active: data.active !== false,
              icon: String(data.icon || ""),
            });
          });
          pending.value = false;
          error.value = null;
          publish();
        },
        (err) => {
          pending.value = false;
          error.value = err.message || "Could not load niyams";
        }
      );
      stopStats = onSnapshot(
        collection(db, "niyamChallengeStats"),
        (snap) => {
          stats.clear();
          snap.forEach((doc) => {
            const data = doc.data();
            stats.set(doc.id, {
              approvedTotal: num(data.approvedTotal),
              participants: num(data.participants),
            });
          });
          publish();
        },
        () => {
          /* Totals are optional if rules ever hide stats; names still show. */
        }
      );
    } catch (err) {
      pending.value = false;
      error.value = err instanceof Error ? err.message : "Could not load niyams";
    }
  }

  onUnmounted(() => {
    stopChallenges?.();
    stopStats?.();
  });

  return { rows, pending, error };
}
