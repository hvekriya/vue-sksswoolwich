/**
 * Submit form data to Netlify Forms via AJAX.
 * Requires matching hidden form in public/form-detection.html for Netlify to detect at build.
 */
export function useNetlifyForm() {
  const submit = async (
    formName: string,
    data: Record<string, string | string[] | undefined>
  ): Promise<{ ok: boolean; error?: string }> => {
    const payload: Record<string, string> = {
      "form-name": formName,
      ...Object.fromEntries(
        Object.entries(data).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(", ") : String(v ?? "")
        ])
      )
    };

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString()
      });

      if (!res.ok) {
        return { ok: false, error: `HTTP ${res.status}` };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  };

  return { submit };
}
