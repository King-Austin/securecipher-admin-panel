// KeyManagement.tsx
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, RotateCcw, ClipboardCopy, History } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

/**
 * KeyManagement (localStorage-first UI + rotate endpoint)
 *
 * Behavior:
 * - Loads cached dashboardData from localStorage (fast startup)
 * - Renders middleware_keys and key_rotations (rotations newest-first)
 * - Clicking "Copy" copies cleaned public key and shows a toast
 * - Clicking "Rotate Key" calls GET /api/rotate-key/
 *   * If the rotate response contains updated middleware_keys / key_rotations -> merge into localStorage & refresh UI
 *   * Otherwise: fetch /api/admin/ to refresh and merge
 * - Uses sonner toasts (no alert/modal)
 *
 * Notes:
 * - Keys are displayed cleaned (PEM stripped to base64 single-line) and shortened for readability
 * - Rotation history shows timestamp (date + time) then the short description below it
 */

// ---------- Utilities ----------
const cleanPemToSingleLine = (pem?: string) =>
  (pem || "")
    .replace(/-----BEGIN PUBLIC KEY-----/gi, "")
    .replace(/-----END PUBLIC KEY-----/gi, "")
    .replace(/\s+/g, "")
    .trim();

const shorten = (s?: string, head = 36, tail = 20) => {
  if (!s) return "—";
  return s.length > head + tail ? `${s.slice(0, head)}…${s.slice(-tail)}` : s;
};

type MiddlewareKey = {
  id: string;
  label?: string;
  public_key_pem?: string;
  active?: boolean;
  version?: number;
  created_at?: string;
  rotated_at?: string | null;
};

type KeyRotation = {
  id: string;
  old_key?: string;
  new_key?: string;
  reason?: string;
  rotated_at?: string;
};

// ---------- Component ----------
const KeyManagement = () => {
  const [keys, setKeys] = useState<MiddlewareKey[]>([]);
  const [rotations, setRotations] = useState<KeyRotation[]>([]);
  const [rotating, setRotating] = useState(false);

  // Read dashboardData from localStorage and populate state (safe)
  const refreshFromLocalStorage = useCallback(() => {
    const raw = localStorage.getItem("dashboardData");
    if (!raw) {
      setKeys([]);
      setRotations([]);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const mk: MiddlewareKey[] = parsed.middleware_keys || [];
      const kr: KeyRotation[] = parsed.key_rotations || [];

      // sort keys: active first, then by version desc (if version present)
      mk.sort((a, b) => {
        if (!!a.active === !!b.active) {
          const av = a.version ?? 0;
          const bv = b.version ?? 0;
          return bv - av;
        }
        return a.active ? -1 : 1;
      });

      // sort rotations newest first (by rotated_at descending)
      kr.sort((a, b) => {
        const at = a.rotated_at ? Date.parse(a.rotated_at) : 0;
        const bt = b.rotated_at ? Date.parse(b.rotated_at) : 0;
        return bt - at;
      });

      setKeys(mk);
      setRotations(kr);
    } catch (err) {
      console.error("Failed to parse dashboardData from localStorage:", err);
      setKeys([]);
      setRotations([]);
    }
  }, []);

  useEffect(() => {
    refreshFromLocalStorage();
  }, [refreshFromLocalStorage]);

  // Fetch fresh /api/admin/ and write into localStorage + state
  const fetchAndCacheAdmin = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/", {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Fetch admin failed: ${res.status} ${text}`);
      }
      const json = await res.json();
      // merge: preserve fields beyond keys/rotations
      const raw = localStorage.getItem("dashboardData");
      const existing = raw ? JSON.parse(raw) : {};
      const merged = { ...existing, ...json };
      localStorage.setItem("dashboardData", JSON.stringify(merged));
      refreshFromLocalStorage();
      return true;
    } catch (err) {
      console.error("fetchAndCacheAdmin error:", err);
      toast.error("Failed to refresh admin data from server.");
      return false;
    }
  }, [refreshFromLocalStorage]);

  // COPY
  const onCopy = async (pem?: string) => {
    try {
      const cleaned = cleanPemToSingleLine(pem);
      if (!cleaned) {
        toast.error("No key to copy");
        return;
      }
      await navigator.clipboard.writeText(cleaned);
      toast.success("Public key copied");
    } catch (err) {
      console.error("copy failed", err);
      toast.error("Copy failed");
    }
  };

  // ROTATE
  const onRotate = async () => {
    if (rotating) return;
    setRotating(true);

    try {
      const res = await fetch("http://localhost:8000/api/rotate-key/", {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("rotate failed", res.status, text);
        toast.error(`Rotate failed (${res.status})`);
        setRotating(false);
        return;
      }

      // Try parse JSON response
      let json: any = null;
      try {
        json = await res.json();
      } catch {
        json = null;
      }

      // If JSON contains updated keys/rotations, merge them into localStorage
      const hasKeys = json && (json.middleware_keys || json.middlewareKeys);
      const hasRotations = json && (json.key_rotations || json.keyRotations);

      if (hasKeys || hasRotations) {
        try {
          // normalize field names
          const newKeys = json.middleware_keys || json.middlewareKeys || [];
          const newRotations = json.key_rotations || json.keyRotations || [];

          // merge with existing dashboardData
          const raw = localStorage.getItem("dashboardData");
          const existing = raw ? JSON.parse(raw) : {};
          const merged = {
            ...existing,
            ...(newKeys.length ? { middleware_keys: newKeys } : {}),
            ...(newRotations.length ? { key_rotations: newRotations } : {}),
          };
          localStorage.setItem("dashboardData", JSON.stringify(merged));
          // Immediately refresh UI from localStorage
          refreshFromLocalStorage();
          toast.success("Key rotated — local cache updated");
          setRotating(false);
          return;
        } catch (err) {
          console.warn("failed to merge rotate response into localStorage", err);
          toast.error("Rotate succeeded but failed to update local cache");
          setRotating(false);
          return;
        }
      }

      // If the rotate endpoint returned no JSON or no keys, try fetching admin data
      const refreshed = await fetchAndCacheAdmin();
      if (refreshed) {
        toast.success("Rotation triggered — refreshed local cache");
      } else {
        toast("Rotation triggered — server did not return updated keys. Refresh manually.");
      }
    } catch (err) {
      console.error("rotate request error:", err);
      toast.error("Rotate request failed — see console");
    } finally {
      setRotating(false);
    }
  };

  // UI: minimal rotation history item
  const renderRotationItem = (r: KeyRotation) => {
    const ts = r.rotated_at ? (isNaN(Date.parse(r.rotated_at)) ? r.rotated_at : format(parseISO(r.rotated_at), "MMM dd, yyyy, HH:mm:ss")) : "—";
    const detail = `${r.old_key ?? "unknown"} → ${r.new_key ?? "unknown"}${r.reason ? ` (${r.reason})` : ""}`;
    return (
      <div key={r.id} className="py-3 border-b last:border-0">
        <div className="text-sm font-medium">{ts}</div>
        <div className="text-xs text-muted-foreground mt-1">{detail}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Key Management</h1>
        <p className="text-muted-foreground">
          Middleware public keys (elliptic curve: <strong>SECP384R1</strong>)
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Showing keys & rotation history from local cache (<code>localStorage.dashboardData</code>).
        </p>
      </div>

      {/* Keys */}
      <div className="grid gap-4">
        {keys.length === 0 ? (
          <Card>
            <CardContent>
              <p className="text-sm text-muted-foreground">No keys found in local cache.</p>
            </CardContent>
          </Card>
        ) : (
          keys.map((k) => {
            const cleaned = cleanPemToSingleLine(k.public_key_pem);
            return (
              <Card key={k.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Key className="h-5 w-5" />
                    <span className="flex-1">Version {k.version ?? "—"}</span>
                    {k.active ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">ACTIVE</span>
                    ) : (
                      <span className="bg-muted/20 text-muted-foreground text-xs px-2 py-1 rounded-full">inactive</span>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Public Key</label>
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <code className="text-xs bg-muted p-2 rounded break-all flex-1">{shorten(cleaned)}</code>
                      <div className="flex-shrink-0">
                        <Button size="sm" variant="outline" onClick={() => onCopy(k.public_key_pem)}>
                          <ClipboardCopy className="h-4 w-4" /> Copy
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">Created</div>
                      <div className="mt-1">{k.created_at ? format(parseISO(k.created_at), "MMM dd, yyyy, HH:mm:ss") : "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Rotated at</div>
                      <div className="mt-1">{k.rotated_at ? format(parseISO(k.rotated_at), "MMM dd, yyyy, HH:mm:ss") : "—"}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {k.active && (
                      <Button size="sm" onClick={onRotate} disabled={rotating}>
                        <RotateCcw className="h-4 w-4" />
                        <span>{rotating ? "Rotating…" : "Rotate Key"}</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Minimal Rotation History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Rotation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rotations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No rotation history in local cache.</p>
          ) : (
            <div className="space-y-2">{rotations.map(renderRotationItem)}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;
