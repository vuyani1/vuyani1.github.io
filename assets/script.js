const loading = document.getElementById("loading");
const frame = document.getElementById("frame");
const errorScreen = document.getElementById("error-screen");

async function loadPage() {
  try {
    const query = window.location.search || "";
    const targetUrl = `https://sc.tyvila.online/${query}`;

    const check = await fetch(targetUrl, { method: "HEAD" });
    if (!check.ok) throw new Error("File not found");

    frame.src = targetUrl;
    frame.onload = () => {
      loading.classList.add("hidden");
      frame.classList.remove("hidden");
    };
  } catch (err) {
    loading.classList.add("hidden");
    errorScreen.classList.remove("hidden");
  }
}

loadPage();
