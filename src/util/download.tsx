export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export function filenameFromContentDisposition(
  header?: string | undefined,
  fallback = "export.csv"
) {
  console.log(header);
  if (!header) return fallback;
  // e.g. attachment; filename="LiveQuote_2025-09-01_to_2025-09-15.csv"
  const match = /filename\*=UTF-8''([^;]+)|filename="?([^\";]+)"?/i.exec(
    header
  );
  try {
    const name = decodeURIComponent(match?.[1] ?? match?.[2] ?? "");
    return name || fallback;
  } catch {
    return fallback;
  }
}

export function openDownloadGET(baseUrl: string, params: Record<string, any>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach((item) => qs.append(k, String(item)));
    else qs.append(k, String(v));
  });

  const url = `${baseUrl}?${qs.toString()}`;

  // Must be called from a direct user gesture to avoid popup blockers.
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
