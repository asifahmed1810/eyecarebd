const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (body as any)?.error?.message ||
      (body as any)?.message ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return body as T;
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem("eyecare_token", token);
  } else {
    localStorage.removeItem("eyecare_token");
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem("eyecare_token");
}

export function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type Doctor = {
  _id: string;
  name: string;
  email?: string;
  specialty?: string;
  hospital?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  available?: string;
};

export async function apiRegister(input: {
  name: string;
  email: string;
  password: string;
  role?: "patient" | "doctor";
}) {
  return request<{ user: any }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function apiLogin(input: {
  email: string;
  password: string;
}) {
  return request<{ token: string; user: { role?: string } }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function apiMe() {
  return request<{ user: any }>("/api/me", {
    headers: authHeaders(),
  });
}

export async function apiDoctors() {
  return request<{ doctors: Doctor[] }>("/api/doctors");
}

export type Appointment = {
  _id: string;
  patientId: string;
  doctorId:
    | string
    | {
        _id: string;
        userId?: { _id: string; name?: string; email?: string };
        specialty?: string;
        hospital?: string;
        location?: string;
      };
  date: string;
  time: string;
  type: "consultation" | "followup" | "screening" | "emergency";
  reason?: string;
  location?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  contactPhone?: string;
  contactEmail?: string;
  createdAt?: string;
};

export async function apiCreateAppointment(input: {
  doctorId: string;
  date: string;
  time: string;
  type?: "consultation" | "followup" | "screening" | "emergency";
  reason?: string;
  contactPhone?: string;
  contactEmail?: string;
}) {
  return request<{ appointment: Appointment }>("/api/appointments", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
}

export async function apiMyAppointments() {
  return request<{ appointments: Appointment[] }>("/api/appointments/my-appointments", {
    headers: authHeaders(),
  });
}

export async function apiCancelAppointment(id: string) {
  return request<{ appointment: Appointment }>(`/api/appointments/${id}/cancel`, {
    method: "POST",
    headers: authHeaders(),
  });
}

