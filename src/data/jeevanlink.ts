export type IncidentPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type IncidentStatus = "ACTIVE" | "ACKNOWLEDGED" | "RESPONDING" | "RESOLVED";
export type IncidentType = "MEDICAL HELP" | "TRAPPED" | "FOOD / WATER" | "SHELTER";

export type Incident = {
  id: string;
  type: IncidentType;
  priority: IncidentPriority;
  latitude: number;
  longitude: number;
  time: string;
  sentAt: string;
  accuracy: number;
  locationFix: string;
  sourceDevice: string;
  status: IncidentStatus;
  network: "Offline / Nearby";
  mapPosition: { x: number; y: number };
};

export type ActivityItem = {
  id: string;
  time: string;
  title: string;
  detail?: string;
  tone: "critical" | "warning" | "neutral" | "success";
};

export const initialIncidents: Incident[] = [
  {
    id: "JL-20260913-0017",
    type: "MEDICAL HELP",
    priority: "CRITICAL",
    latitude: 13.1649232,
    longitude: 80.2992745,
    time: "10:11 PM",
    sentAt: "13 Sep 2026, 10:11 PM",
    accuracy: 46.8,
    locationFix: "10:11:00 PM",
    sourceDevice: "JL-042",
    status: "ACTIVE",
    network: "Offline / Nearby",
    mapPosition: { x: 33, y: 42 },
  },
  {
    id: "JL-20260913-0018",
    type: "TRAPPED",
    priority: "HIGH",
    latitude: 13.1650124,
    longitude: 80.299306,
    time: "10:14 PM",
    sentAt: "13 Sep 2026, 10:14 PM",
    accuracy: 31.2,
    locationFix: "10:13:48 PM",
    sourceDevice: "JL-057",
    status: "ACTIVE",
    network: "Offline / Nearby",
    mapPosition: { x: 67, y: 30 },
  },
  {
    id: "JL-20260913-0019",
    type: "FOOD / WATER",
    priority: "MEDIUM",
    latitude: 13.164716,
    longitude: 80.298921,
    time: "10:09 PM",
    sentAt: "13 Sep 2026, 10:09 PM",
    accuracy: 58.4,
    locationFix: "10:08:53 PM",
    sourceDevice: "JL-063",
    status: "RESPONDING",
    network: "Offline / Nearby",
    mapPosition: { x: 56, y: 67 },
  },
  {
    id: "JL-20260913-0020",
    type: "SHELTER",
    priority: "LOW",
    latitude: 13.165284,
    longitude: 80.299714,
    time: "9:58 PM",
    sentAt: "13 Sep 2026, 9:58 PM",
    accuracy: 72.1,
    locationFix: "9:57:44 PM",
    sourceDevice: "JL-081",
    status: "RESOLVED",
    network: "Offline / Nearby",
    mapPosition: { x: 77, y: 58 },
  },
];

export const initialActivity: ActivityItem[] = [
  { id: "a1", time: "10:14 PM", title: "New TRAPPED alert", detail: "JL-20260913-0018", tone: "warning" },
  { id: "a2", time: "10:11 PM", title: "MEDICAL alert received", detail: "JL-20260913-0017", tone: "critical" },
  { id: "a3", time: "10:08 PM", title: "Device JL-057 connected", tone: "success" },
  { id: "a4", time: "10:05 PM", title: "Offline network established", tone: "neutral" },
];

export const deviceNodes = [
  { id: "JL-042", label: "Responder A", x: 50, y: 13, online: true },
  { id: "JL-057", label: "Responder B", x: 18, y: 52, online: true },
  { id: "JL-063", label: "Responder C", x: 82, y: 52, online: true },
  { id: "JL-081", label: "Responder D", x: 50, y: 87, online: false },
];

export const incidentFilters = [
  "All",
  "Critical",
  "Medical",
  "Trapped",
  "Food / Water",
  "Shelter",
  "Active",
  "Responding",
  "Resolved",
] as const;

export type IncidentFilter = (typeof incidentFilters)[number];