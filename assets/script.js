import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fzdtusalfwrixafnzhfa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6ZHR1c2FsZndyaXhhZm56aGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDMzNTEsImV4cCI6MjA3NTQxOTM1MX0.fqZuBwpoUR4IBK0Mk3-Cry8uDlpbgqIrTck33NSBAM8";
const supabase = createClient(supabaseUrl, supabaseKey);

const page = document.getElementById("page");
const loading = document.getElementById("loading");

async function loadFile() {
  const params = new URLSearchParams(window.location.search);
  const fileName = params.get("file") || "index.html";

  loading.textContent = "Fetching content...";
  const { data, error } = await supabase
    .from("admin_files")
    .select("content, filetype, filename")
    .eq("filename", fileName)
    .single();

  if (error || !data) {
    page.innerHTML = `<div class="error">Error: File not found (${fileName})</div>`;
    loading.style.display = "none";
    return;
  }

  loading.style.display = "none";
  const type = data.filetype;

  if (type === "html") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.content, "text/html");
    document.title = doc.querySelector("title")?.innerText || "TyVila Online";
    const desc = doc.querySelector('meta[name="description"]');
    if (desc) document.querySelector('meta[name="description"]').setAttribute("content", desc.content);
    const favicon = doc.querySelector('link[rel~="icon"]');
    if (favicon) document.getElementById("favicon").href = favicon.href;
    page.innerHTML = doc.body.innerHTML;
  } else if (type === "js") {
    const script = document.createElement("script");
    script.textContent = data.content;
    document.body.appendChild(script);
  } else if (type === "css") {
    const style = document.createElement("style");
    style.textContent = data.content;
    document.head.appendChild(style);
  } else {
    page.innerHTML = `<pre>${data.content}</pre>`;
  }
}

loadFile();
