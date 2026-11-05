const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatDemoTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}

export function formatDemoDateTime(iso: string) {
  return dateTimeFormatter.format(new Date(iso));
}

export function formatDemoDayLabel(iso: string) {
  return dayFormatter.format(new Date(iso));
}

export function demoDayKey(iso: string) {
  return dayKeyFormatter.format(new Date(iso));
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
