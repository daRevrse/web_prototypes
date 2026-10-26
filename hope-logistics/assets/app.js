// Hope Logistics Services : maquette de travail.
(() => {
  const WHATSAPP = "22606415501";
  const root = document.documentElement;

  // Marqueurs « à fournir » : compteur et bascule d'affichage.
  const markers = document.querySelectorAll(".tbc, .tbc-block");
  document.querySelectorAll("[data-tbc-count]").forEach((el) => { el.textContent = markers.length; });

  const toggle = document.querySelector("[data-tbc-toggle]");
  const setTbc = (off) => {
    root.classList.toggle("tbc-off", off);
    if (toggle) {
      toggle.textContent = off ? "Afficher le surlignage" : "Masquer le surlignage";
      toggle.setAttribute("aria-pressed", String(off));
    }
  };
  let tbcOff = false;
  try { tbcOff = localStorage.getItem("hope-tbc-off") === "1"; } catch (e) {}
  setTbc(tbcOff);
  toggle?.addEventListener("click", () => {
    tbcOff = !tbcOff;
    setTbc(tbcOff);
    try { localStorage.setItem("hope-tbc-off", tbcOff ? "1" : "0"); } catch (e) {}
  });

  // Menu mobile.
  const header = document.querySelector(".site-header");
  const menuButton = header?.querySelector(".menu-toggle");
  const closeMenu = () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Ouvrir le menu");
  };
  menuButton?.addEventListener("click", () => {
    const open = !header.classList.contains("menu-open");
    header.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  header?.querySelectorAll(".main-nav a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header?.classList.contains("menu-open")) { closeMenu(); menuButton.focus(); }
  });
  matchMedia("(min-width: 1181px)").addEventListener("change", (e) => { if (e.matches && header) closeMenu(); });

  // Demande de devis : préparée ici, envoyée par la personne dans WhatsApp.
  const form = document.getElementById("quote-form");
  if (!form) return;
  const review = document.getElementById("quote-review");
  const select = form.elements.service;

  const chooseService = (name) => {
    if (!name) return;
    const option = [...select.options].find((o) => o.value === name);
    if (option) select.value = option.value;
  };
  chooseService(new URLSearchParams(location.search).get("service"));
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => chooseService(link.dataset.service));
  });

  const labels = {
    service: "Service", origin: "Départ", destination: "Destination", cargo: "Marchandise",
    name: "Nom", company: "Entreprise", details: "Précisions",
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = Object.fromEntries(new FormData(form));
    const lines = ["Bonjour Hope Logistics Services, je souhaite un devis."];
    const list = review.querySelector("dl");
    list.replaceChildren();
    for (const [key, label] of Object.entries(labels)) {
      const value = (data[key] || "").trim();
      if (!value) continue;
      lines.push(`${label} : ${value}`);
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      row.append(dt, dd);
      list.append(row);
    }
    review.querySelector("[data-send]").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    form.hidden = true;
    review.hidden = false;
    review.querySelector("h4").focus();
  });

  review.querySelector("[data-edit]").addEventListener("click", () => {
    review.hidden = true;
    form.hidden = false;
    select.focus();
  });
})();
