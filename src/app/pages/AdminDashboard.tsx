import { useEffect, useMemo, useState } from "react";
import { Trash2, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { authHeaders } from "../lib/api";

type Role = "patient" | "doctor" | "admin";
type UserRow = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function apiAdminListUsers(role?: Role) {
  const qs = role ? `?role=${encodeURIComponent(role)}` : "";
  const res = await fetch(`${API_BASE_URL}/api/admin/users${qs}`, {
    headers: { ...authHeaders() },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error?.message ?? "Failed to load users");
  return body as { users: UserRow[] };
}

async function apiAdminPatchUser(id: string, patch: Partial<Pick<UserRow, "name" | "email" | "role">>) {
  const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(patch),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error?.message ?? "Failed to update user");
  return body as { user: UserRow };
}

async function apiAdminDeleteUser(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error?.message ?? "Failed to delete user");
  return body as { ok: boolean };
}

export default function AdminDashboard() {
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<Role>("patient");

  const filteredRole = roleFilter === "all" ? undefined : roleFilter;

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiAdminListUsers(filteredRole);
      setRows(data.users ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter]);

  const editingRow = useMemo(() => rows.find((r) => r._id === editingId) ?? null, [rows, editingId]);

  const startEdit = (row: UserRow) => {
    setEditingId(row._id);
    setEditName(row.name);
    setEditEmail(row.email);
    setEditRole(row.role);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      setError(null);
      const result = await apiAdminPatchUser(editingId, { name: editName, email: editEmail, role: editRole });
      setRows((prev) => prev.map((r) => (r._id === editingId ? result.user : r)));
      setEditingId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this profile?")) return;
    try {
      setError(null);
      await apiAdminDeleteUser(id);
      setRows((prev) => prev.filter((r) => r._id !== id));
      if (editingId === id) setEditingId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/70">Manage user and doctor profiles (update / delete).</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as any)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="patient">Patients</SelectItem>
                <SelectItem value="doctor">Doctors</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={load}>
              Refresh
            </Button>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Card>
          <CardHeader>
            <CardTitle>Profiles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-white/70">Loading...</p>
            ) : rows.length === 0 ? (
              <p className="text-white/70">No profiles found.</p>
            ) : (
              <div className="space-y-2">
                {rows.map((row) => (
                  <div
                    key={row._id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="min-w-[240px]">
                      <div className="font-semibold text-white">{row.name}</div>
                      <div className="text-sm text-white/70">{row.email}</div>
                      <div className="text-xs text-white/60">{row.role}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => startEdit(row)}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" className="border-red-400/40 text-red-300 hover:bg-red-500/10" onClick={() => remove(row._id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {editingRow && (
          <Card>
            <CardHeader>
              <CardTitle>Edit profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-sm text-white/70">Name</div>
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-white/70">Email</div>
                <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-white/70">Role</div>
                <Select value={editRole} onValueChange={(v) => setEditRole(v as Role)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">patient</SelectItem>
                    <SelectItem value="doctor">doctor</SelectItem>
                    <SelectItem value="admin">admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3 flex flex-wrap gap-2">
                <Button onClick={saveEdit} style={{ backgroundColor: "#0052CC" }}>
                  Save
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

