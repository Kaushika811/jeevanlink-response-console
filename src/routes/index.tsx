import { createFileRoute } from "@tanstack/react-router";
import { JeevanDashboard } from "@/components/jeevanlink/JeevanDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JeevanLink Emergency Operations" },
      { name: "description", content: "Responder command center for JeevanLink's offline emergency communication network." },
      { property: "og:title", content: "JeevanLink Emergency Operations" },
      { property: "og:description", content: "Operational awareness for an offline emergency response network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <JeevanDashboard />;
}
