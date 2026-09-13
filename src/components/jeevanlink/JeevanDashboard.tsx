import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Copy,
  Cross,
  Droplets,
  Filter,
  HeartPulse,
  LocateFixed,
  Map,
  MapPin,
  Menu,
  Minus,
  Network,
  Plus,
  Radio,
  Search,
  Settings,
  ShieldAlert,
  Siren,
  SlidersHorizontal,
  TentTree,
  TriangleAlert,
  UserRound,
  UsersRound,
  Waves,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  deviceNodes,
  incidentFilters,
  initialActivity,
  initialIncidents,
  type ActivityItem,
  type Incident,
  type IncidentFilter,
  type IncidentPriority,
  type IncidentStatus,
  type IncidentType,
} from "@/data/jeevanlink";
import { cn } from "@/lib/utils";

type View = "Overview" | "Incidents" | "Live Map" | "Network" | "Activity" | "Settings";

const navigation: { label: View; icon: typeof Activity }[] = [
  { label: "Overview", icon: CircleDot },
  { label: "Incidents", icon: Siren },
  { label: "Live Map", icon: Map },
  { label: "Network", icon: Network },
  { label: "Activity", icon: Activity },
  { label: "Settings", icon: Settings },
];

const typeIcon: Record<IncidentType, typeof Activity> = {
  "MEDICAL HELP": HeartPulse,
  TRAPPED: TriangleAlert,
  "FOOD / WATER": Droplets,
  SHELTER: TentTree,
};

const nextStatus: Partial<Record<IncidentStatus, IncidentStatus>> = {
  ACTIVE: "ACKNOWLEDGED",
  ACKNOWLEDGED: "RESPONDING",
  RESPONDING: "RESOLVED",
};

function priorityTone(priority: IncidentPriority) {
  return priority.toLowerCase();
}

function StatusPill({ status }: { status: IncidentStatus }) {
  return (
    <span className={cn("status-pill", `status-${status.toLowerCase()}`)}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

function PriorityPill({ priority }: { priority: IncidentPriority }) {
  return <span className={cn("priority-pill", `priority-${priorityTone(priority)}`)}>{priority}</span>;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="brand-mark" aria-hidden="true">
        <MapPin className="size-5" strokeWidth={2.3} />
        <Waves className="brand-wave size-3.5" strokeWidth={2.4} />
      </div>
      {!compact && (
        <div>
          <div className="font-display text-[1.05rem] font-semibold leading-none text-foreground">JeevanLink</div>
          <div className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Emergency Operations</div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ view, setView, mobile = false }: { view: View; setView: (view: View) => void; mobile?: boolean }) {
  return (
    <nav aria-label="Command center navigation" className={cn("sidebar-nav", mobile && "sidebar-nav-mobile")}>
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = view === item.label;
        return (
          <Button
            key={item.label}
            variant="ghost"
            className={cn("nav-button", active && "nav-button-active")}
            onClick={() => setView(item.label)}
          >
            <Icon className="size-[1.1rem]" strokeWidth={active ? 2.2 : 1.7} />
            <span>{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}

function AppSidebar({ view, setView }: { view: View; setView: (view: View) => void }) {
  return (
    <aside className="command-sidebar">
      <div className="sidebar-brand"><BrandMark /></div>
      <Sidebar view={view} setView={setView} />
      <div className="sidebar-footer">
        <div className="flex items-center gap-2 text-xs font-semibold text-success">
          <span className="live-dot" /> Mesh active
        </div>
        <p className="mt-2 text-[0.68rem] leading-relaxed text-muted-foreground">Local relay operating independently of internet.</p>
      </div>
    </aside>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  const [clock, setClock] = useState("10:18:32 PM");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const start = new Date("2026-09-13T22:18:32").getTime();
    const mountedAt = Date.now();
    const update = () => setClock(new Date(start + Date.now() - mountedAt).toLocaleTimeString("en-US"));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="command-header">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" className="mobile-menu" onClick={onMenu} aria-label="Open navigation">
          <Menu />
        </Button>
        <div className="mobile-brand"><BrandMark compact /></div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Radio className="size-3.5 text-primary" />
            <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-primary">Live Response Center</p>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">Offline Emergency Response Network</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="network-badge"><span className="live-dot" /> OFFLINE NETWORK</div>
        <div className="hidden text-right lg:block">
          <p className="text-xs font-semibold text-foreground">13 Sep 2026</p>
          <p className="mt-0.5 font-mono text-[0.68rem] text-muted-foreground">{clock}</p>
        </div>
        <div className="relative">
          <Button variant="outline" size="icon" className="header-icon" onClick={() => setNotificationsOpen((v) => !v)} aria-label="Notifications">
            <Bell />
            <span className="notification-ping" />
          </Button>
          {notificationsOpen && (
            <div className="notification-panel">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">Notifications</span>
                <span className="text-[0.65rem] text-primary">2 new</span>
              </div>
              <div className="p-2">
                <div className="notification-item"><span className="signal-dot signal-critical" /><div><p>Critical medical alert</p><span>JL-20260913-0017 · 7m ago</span></div></div>
                <div className="notification-item"><span className="signal-dot signal-warning" /><div><p>New trapped alert</p><span>JL-20260913-0018 · 4m ago</span></div></div>
              </div>
            </div>
          )}
        </div>
        <div className="responder-avatar"><UserRound className="size-4" /><span className="hidden xl:inline">R. Kumar</span></div>
      </div>
    </header>
  );
}

function MetricPanels({ incidents }: { incidents: Incident[] }) {
  const unresolved = incidents.filter((incident) => incident.status !== "RESOLVED");
  const metrics = [
    { label: "Active alerts", value: unresolved.length, detail: "Requires attention", icon: Siren, primary: true },
    { label: "Critical", value: unresolved.filter((i) => i.priority === "CRITICAL").length, detail: "Immediate danger", icon: ShieldAlert, tone: "critical" },
    { label: "Medical", value: unresolved.filter((i) => i.type === "MEDICAL HELP").length, detail: "Health response", icon: HeartPulse },
    { label: "Trapped", value: unresolved.filter((i) => i.type === "TRAPPED").length, detail: "Urgent assist", icon: TriangleAlert, tone: "warning" },
    { label: "Nearby devices", value: 4, detail: "3 connected", icon: UsersRound, tone: "success" },
  ];
  return (
    <section className="metric-grid" aria-label="Live overview">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.label} className={cn("metric-panel", metric.primary && "metric-primary")}>
            <div className={cn("metric-icon", metric.tone && `metric-${metric.tone}`)}><Icon /></div>
            <div className="min-w-0">
              <p className="metric-label">{metric.label}</p>
              <div className="mt-1 flex items-end gap-2">
                <strong className="metric-value">{metric.value}</strong>
                <span className="mb-1.5 truncate text-[0.65rem] text-muted-foreground">{metric.detail}</span>
              </div>
            </div>
            {metric.primary && <span className="metric-pulse" />}
          </article>
        );
      })}
    </section>
  );
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function IncidentMap({ incidents, selectedId, onSelect, expanded = false }: { incidents: Incident[]; selectedId?: string; onSelect: (incident: Incident) => void; expanded?: boolean }) {
  const [zoom, setZoom] = useState(1);
  const [showResolved, setShowResolved] = useState(true);
  const visible = showResolved ? incidents : incidents.filter((i) => i.status !== "RESOLVED");
  return (
    <section className={cn("panel map-panel", expanded && "map-panel-expanded")}>
      <SectionHeading
        title="Live Incident Map"
        subtitle="Nearby emergency activity · simulated positions"
        action={<span className="data-badge">Prototype data</span>}
      />
      <div className="map-canvas">
        <div className="map-grid" />
        <div className="road road-a" /><div className="road road-b" /><div className="road road-c" /><div className="road road-d" />
        <div className="waterway" />
        <span className="map-label map-label-a">Ennore High Rd</span>
        <span className="map-label map-label-b">Manali Expressway</span>
        <span className="map-district">NORTH CHENNAI</span>
        <div className="map-scale">250 m</div>
        <div className="map-controls">
          <Tooltip><TooltipTrigger asChild><Button variant="map" size="icon" onClick={() => setZoom((z) => Math.min(z + 0.08, 1.25))} aria-label="Zoom in"><Plus /></Button></TooltipTrigger><TooltipContent side="left">Zoom in</TooltipContent></Tooltip>
          <Tooltip><TooltipTrigger asChild><Button variant="map" size="icon" onClick={() => setZoom((z) => Math.max(z - 0.08, 0.85))} aria-label="Zoom out"><Minus /></Button></TooltipTrigger><TooltipContent side="left">Zoom out</TooltipContent></Tooltip>
          <Tooltip><TooltipTrigger asChild><Button variant="map" size="icon" onClick={() => setZoom(1)} aria-label="Locate response center"><LocateFixed /></Button></TooltipTrigger><TooltipContent side="left">Recenter</TooltipContent></Tooltip>
          <Tooltip><TooltipTrigger asChild><Button variant={showResolved ? "mapActive" : "map"} size="icon" onClick={() => setShowResolved((v) => !v)} aria-label="Toggle resolved incidents"><Filter /></Button></TooltipTrigger><TooltipContent side="left">Resolved incidents</TooltipContent></Tooltip>
        </div>
        <div className="map-content" style={{ transform: `scale(${zoom})` }}>
          {visible.map((incident) => {
            const Icon = typeIcon[incident.type];
            return (
              <Button
                key={incident.id}
                variant="mapMarker"
                className={cn("map-marker", `marker-${priorityTone(incident.priority)}`, selectedId === incident.id && "map-marker-selected")}
                style={{ left: `${incident.mapPosition.x}%`, top: `${incident.mapPosition.y}%` }}
                onClick={() => onSelect(incident)}
                aria-label={`Open ${incident.id}, ${incident.type}`}
              >
                <span className="marker-ring" /><Icon /><span className="marker-label"><strong>{incident.type}</strong>{incident.id.slice(-4)}</span>
              </Button>
            );
          })}
        </div>
        <div className="map-legend">
          {(["MEDICAL HELP", "TRAPPED", "FOOD / WATER", "SHELTER"] as IncidentType[]).map((type) => {
            const Icon = typeIcon[type];
            return <span key={type}><Icon />{type.replace(" HELP", "").replace(" / ", "/")}</span>;
          })}
        </div>
      </div>
    </section>
  );
}

function matchesFilter(incident: Incident, filter: IncidentFilter) {
  if (filter === "All") return true;
  if (filter === "Critical") return incident.priority === "CRITICAL";
  if (filter === "Medical") return incident.type === "MEDICAL HELP";
  if (filter === "Trapped") return incident.type === "TRAPPED";
  if (filter === "Food / Water") return incident.type === "FOOD / WATER";
  if (filter === "Shelter") return incident.type === "SHELTER";
  return incident.status === filter.toUpperCase();
}

function IncidentRegistry({ incidents, onSelect, compact = false }: { incidents: Incident[]; onSelect: (incident: Incident) => void; compact?: boolean }) {
  const [filter, setFilter] = useState<IncidentFilter>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return incidents.filter((incident) => matchesFilter(incident, filter) && (!needle || `${incident.id} ${incident.sourceDevice} ${incident.latitude} ${incident.longitude} ${incident.type}`.toLowerCase().includes(needle)));
  }, [filter, incidents, query]);

  return (
    <section className="panel incidents-panel">
      <SectionHeading title="Active Incidents" subtitle={`${filtered.length} of ${incidents.length} alerts shown`} action={<div className="live-label"><span className="live-dot" /> Monitoring</div>} />
      <div className="incident-tools">
        <div className="filter-scroll" role="group" aria-label="Filter incidents">
          {incidentFilters.map((item) => <Button key={item} variant={filter === item ? "filterActive" : "filter"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}
        </div>
        <div className="search-box"><Search /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search alert ID, location or device" aria-label="Search incidents" /></div>
      </div>
      <div className="incident-table-wrap">
        <table className="incident-table">
          <thead><tr><th>Alert ID</th><th>Emergency</th><th>Priority</th><th>Location</th><th>Time</th><th>Status</th><th>Source</th><th><span className="sr-only">Open</span></th></tr></thead>
          <tbody>
            {filtered.map((incident) => {
              const Icon = typeIcon[incident.type];
              return (
                <tr key={incident.id} onClick={() => onSelect(incident)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelect(incident); }}>
                  <td><span className="alert-id">{incident.id}</span></td>
                  <td><span className="incident-type"><span className={cn("type-icon", `type-${priorityTone(incident.priority)}`)}><Icon /></span>{incident.type}</span></td>
                  <td><PriorityPill priority={incident.priority} /></td>
                  <td><span className="coordinates">{incident.latitude.toFixed(7)}, {incident.longitude.toFixed(7)}</span></td>
                  <td className="table-muted">{incident.time}</td>
                  <td><StatusPill status={incident.status} /></td>
                  <td className="table-muted">{incident.sourceDevice}</td>
                  <td><ChevronRight className="size-4 text-muted-foreground" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-state"><Search /><p>No alerts match these filters.</p></div>}
      </div>
      {compact && <div className="table-footnote">Select any alert to open the response panel.</div>}
    </section>
  );
}

function NetworkHealth({ expanded = false }: { expanded?: boolean }) {
  const stats = [{ label: "Nearby", value: "4" }, { label: "Connected", value: "3" }, { label: "Offline", value: "1" }];
  return (
    <section className={cn("panel network-panel", expanded && "network-expanded")}>
      <SectionHeading title="Network Health" subtitle="Device-to-device relay status" action={<span className="status-pill status-active"><span className="status-dot" /> ACTIVE</span>} />
      <div className="network-stats">{stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      <div className="mesh-visual" aria-label="Four nearby devices connected in an offline mesh">
        <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 13L18 52L50 87L82 52L50 13M18 52H82" /></svg>
        {deviceNodes.map((node) => <div key={node.id} className={cn("mesh-node", !node.online && "mesh-node-offline")} style={{ left: `${node.x}%`, top: `${node.y}%` }}><span /><strong>{node.id}</strong><small>{node.online ? "Connected" : "Offline"}</small></div>)}
        <div className="mesh-center"><Radio /><span>LOCAL MESH</span></div>
      </div>
      <div className="network-details">
        <div><span>Network mode</span><strong>OFFLINE</strong></div>
        <div><span>Communication</span><strong className="text-success">ACTIVE</strong></div>
      </div>
      <p className="network-note"><Network /> Relay communication remains operational without internet access.</p>
    </section>
  );
}

function ActivityTimeline({ items, expanded = false }: { items: ActivityItem[]; expanded?: boolean }) {
  return (
    <section className={cn("panel activity-panel", expanded && "activity-expanded")}>
      <SectionHeading title="Response Activity" subtitle="Latest network and responder events" action={<Activity className="size-4 text-primary" />} />
      <div className="timeline">
        {items.map((item, index) => (
          <div className="timeline-item" key={item.id}>
            <div className="timeline-axis"><span className={cn("signal-dot", `signal-${item.tone}`)} />{index < items.length - 1 && <i />}</div>
            <div className="timeline-copy"><time>{item.time}</time><p>{item.title}</p>{item.detail && <span>{item.detail}</span>}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return <div className="detail-field"><span>{label}</span><div><strong className="font-mono">{value}</strong><Button variant="ghost" size="icon" onClick={copy} aria-label={`Copy ${label}`}>{copied ? <Check className="text-success" /> : <Copy />}</Button></div></div>;
}

function IncidentDrawer({ incident, open, onOpenChange, onStatusChange }: { incident?: Incident; open: boolean; onOpenChange: (open: boolean) => void; onStatusChange: (status: IncidentStatus) => void }) {
  if (!incident) return null;
  const Icon = typeIcon[incident.type];
  const next = nextStatus[incident.status];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="incident-drawer">
        <SheetHeader className="drawer-header">
          <div className="flex items-center gap-3"><div className={cn("drawer-alert-icon", `type-${priorityTone(incident.priority)}`)}><Icon /></div><div><p className="drawer-eyebrow">Emergency Alert</p><SheetTitle>{incident.type}</SheetTitle></div></div>
          <SheetDescription className="sr-only">Full incident details and response controls for {incident.id}</SheetDescription>
        </SheetHeader>
        <div className="drawer-scroll">
          <div className="drawer-summary">
            <div><span>Priority</span><PriorityPill priority={incident.priority} /></div>
            <div><span>Response status</span><StatusPill status={incident.status} /></div>
          </div>
          <div className="detail-group"><p className="detail-group-title">Alert identity</p><CopyField label="Alert ID" value={incident.id} /><div className="detail-field"><span>Sent at</span><strong>{incident.sentAt}</strong></div></div>
          <div className="detail-group"><p className="detail-group-title">Location signal</p><CopyField label="Latitude" value={incident.latitude.toFixed(7)} /><CopyField label="Longitude" value={incident.longitude.toFixed(7)} /><div className="detail-field"><span>Location accuracy</span><strong>{incident.accuracy} m</strong></div><div className="detail-field"><span>Location fix</span><strong>{incident.locationFix}</strong></div></div>
          <div className="detail-group"><p className="detail-group-title">Network source</p><div className="detail-field"><span>Source device</span><strong>{incident.sourceDevice}</strong></div><div className="detail-field"><span>Network status</span><strong className="flex items-center gap-2 text-success"><Radio className="size-3.5" />{incident.network}</strong></div></div>
          <div className="drawer-mini-map"><div className="map-grid" /><MapPin /><span>{incident.latitude.toFixed(5)}, {incident.longitude.toFixed(5)}</span></div>
        </div>
        <div className="drawer-actions">
          {next ? <Button variant={next === "RESOLVED" ? "success" : next === "RESPONDING" ? "warning" : "command"} size="lg" className="w-full" onClick={() => onStatusChange(next)}>{next === "ACKNOWLEDGED" && <CheckCircle2 />}{next === "RESPONDING" && <Radio />}{next === "RESOLVED" && <Check />} {next === "ACKNOWLEDGED" ? "Acknowledge" : next === "RESPONDING" ? "Mark Responding" : "Resolve Incident"}</Button> : <div className="resolved-confirmation"><CheckCircle2 /> Incident resolved</div>}
          <p>Changes are local to this prototype session.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SettingsView() {
  const [markerPulse, setMarkerPulse] = useState(true);
  const [audio, setAudio] = useState(false);
  return <section className="panel settings-panel"><SectionHeading title="Operations Settings" subtitle="Prototype display and alert preferences" /><div className="settings-row"><div><strong>Emergency marker pulse</strong><span>Animate unresolved map markers</span></div><Button variant={markerPulse ? "filterActive" : "filter"} onClick={() => setMarkerPulse((v) => !v)}>{markerPulse ? "Enabled" : "Disabled"}</Button></div><div className="settings-row"><div><strong>Audible alert preview</strong><span>Demo-only incoming alert sound</span></div><Button variant={audio ? "filterActive" : "filter"} onClick={() => setAudio((v) => !v)}>{audio ? "Enabled" : "Muted"}</Button></div><div className="settings-row"><div><strong>Map data source</strong><span>No live GPS provider configured</span></div><span className="data-badge">Simulated</span></div></section>;
}

export function JeevanDashboard() {
  const [view, setView] = useState<View>("Overview");
  const [incidents, setIncidents] = useState(initialIncidents);
  const [activity, setActivity] = useState(initialActivity);
  const [selectedId, setSelectedId] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const selected = incidents.find((incident) => incident.id === selectedId);

  const selectIncident = (incident: Incident) => { setSelectedId(incident.id); setDrawerOpen(true); };
  const updateStatus = (status: IncidentStatus) => {
    if (!selectedId) return;
    setIncidents((current) => current.map((incident) => incident.id === selectedId ? { ...incident, status } : incident));
    const selectedIncident = incidents.find((incident) => incident.id === selectedId);
    setActivity((current) => [{ id: `${selectedId}-${status}-${Date.now()}`, time: "Now", title: `${status === "RESOLVED" ? "Incident resolved" : `Status changed to ${status}`}`, detail: selectedIncident?.id, tone: status === "RESOLVED" ? "success" : status === "RESPONDING" ? "warning" : "neutral" }, ...current].slice(0, 7));
  };
  const chooseView = (next: View) => { setView(next); setMobileNavOpen(false); };

  return (
    <TooltipProvider delayDuration={250}>
      <div className="command-shell">
        <AppSidebar view={view} setView={chooseView} />
        <div className="command-main">
          <Header onMenu={() => setMobileNavOpen(true)} />
          <main className="dashboard-content">
            <div className="page-intro"><div><p className="eyebrow">JeevanLink Command / {view}</p><h1>{view === "Overview" ? "Operational Overview" : view}</h1><p>{view === "Overview" ? "Immediate awareness across the local emergency mesh." : `Focused ${view.toLowerCase()} operations for the local response network.`}</p></div><div className="ops-chip"><span>OPS-01</span><strong>North Chennai Zone</strong></div></div>
            {view === "Overview" && <><MetricPanels incidents={incidents} /><div className="overview-grid"><IncidentMap incidents={incidents} selectedId={selectedId} onSelect={selectIncident} /><div className="side-stack"><NetworkHealth /><ActivityTimeline items={activity.slice(0, 4)} /></div></div><IncidentRegistry incidents={incidents} onSelect={selectIncident} compact /></>}
            {view === "Incidents" && <><MetricPanels incidents={incidents} /><IncidentRegistry incidents={incidents} onSelect={selectIncident} /></>}
            {view === "Live Map" && <IncidentMap incidents={incidents} selectedId={selectedId} onSelect={selectIncident} expanded />}
            {view === "Network" && <NetworkHealth expanded />}
            {view === "Activity" && <ActivityTimeline items={activity} expanded />}
            {view === "Settings" && <SettingsView />}
          </main>
        </div>
        {mobileNavOpen && <div className="mobile-nav-overlay"><div className="mobile-nav-sheet"><div className="flex items-center justify-between border-b border-border p-5"><BrandMark /><Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"><X /></Button></div><Sidebar view={view} setView={chooseView} mobile /></div><Button variant="overlay" className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" /></div>}
        <IncidentDrawer incident={selected} open={drawerOpen} onOpenChange={setDrawerOpen} onStatusChange={updateStatus} />
      </div>
    </TooltipProvider>
  );
}