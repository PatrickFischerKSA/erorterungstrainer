const btnLinear = document.getElementById("btnLinear");
const btnDialektisch = document.getElementById("btnDialektisch");
const panelLinear = document.getElementById("linear");
const panelDialektisch = document.getElementById("dialektisch");
const btnReset = document.getElementById("btnReset");
const btnPrint = document.getElementById("btnPrint");
const btnTxt = document.getElementById("btnTxt");
const btnDocx = document.getElementById("btnDocx");

const linearGrid = document.getElementById("linearGrid");
const dialektischGrid = document.getElementById("dialektischGrid");

const addLinear = document.getElementById("addLinear");
const removeLinear = document.getElementById("removeLinear");
const addContra = document.getElementById("addContra");
const removeContra = document.getElementById("removeContra");
const addPro = document.getElementById("addPro");
const removePro = document.getElementById("removePro");

const linearTemplate = document.getElementById("linearTemplate");
const contraTemplate = document.getElementById("contraTemplate");
const proTemplate = document.getElementById("proTemplate");

const tendenzJa = document.getElementById("tendenzJa");
const tendenzNein = document.getElementById("tendenzNein");
const tendenzValue = document.getElementById("tendenzValue");
const levelLocker = document.getElementById("levelLocker");
const levelNormal = document.getElementById("levelNormal");
const levelStreng = document.getElementById("levelStreng");
const levelHint = document.getElementById("levelHint");
let strictness = "normal";

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/ae/g, "ae")
    .replace(/oe/g, "oe")
    .replace(/ue/g, "ue")
    .replace(/a\u0308/g, "ae")
    .replace(/o\u0308/g, "oe")
    .replace(/u\u0308/g, "ue")
    .replace(/\u00e4/g, "ae")
    .replace(/\u00f6/g, "oe")
    .replace(/\u00fc/g, "ue")
    .replace(/\u00df/g, "ss");
}

function normalizeList(list) {
  return list.map((item) => normalizeText(item));
}

const linkWords = normalizeList([
  "deshalb",
  "daher",
  "somit",
  "folglich",
  "weil",
  "da",
  "dadurch",
  "deswegen",
  "damit",
  "das zeigt",
  "das belegt",
  "verdeutlicht",
  "zeigt, dass",
]);

const exampleWords = normalizeList([
  "zum beispiel",
  "z. b.",
  "zb",
  "etwa",
  "beispielsweise",
  "konkret",
  "im alltag",
]);

const transitionWords = normalizeList([
  "ausserdem",
  "zudem",
  "darueber hinaus",
  "hingegen",
  "dagegen",
  "trotzdem",
  "dennoch",
  "im gegensatz",
  "abschliessend",
]);

const nonsenseWords = normalizeList([
  "lol",
  "haha",
  "blabla",
  "irgendwas",
  "egal",
  "keine ahnung",
]);

const stopWords = new Set(normalizeList([
  "der",
  "die",
  "das",
  "und",
  "oder",
  "ein",
  "eine",
  "einer",
  "eines",
  "den",
  "dem",
  "des",
  "mit",
  "ohne",
  "fuer",
  "von",
  "im",
  "in",
  "am",
  "an",
  "auf",
  "zu",
  "ist",
  "sind",
  "war",
  "wird",
  "werden",
  "man",
  "ich",
  "du",
  "wir",
  "sie",
  "es",
  "nicht",
  "auch",
  "nur",
  "sehr",
  "dass",
  "wenn",
  "als",
  "bei",
]));

function setMode(mode) {
  const isLinear = mode === "linear";
  panelLinear.classList.toggle("is-visible", isLinear);
  panelDialektisch.classList.toggle("is-visible", !isLinear);
  btnLinear.classList.toggle("is-active", isLinear);
  btnDialektisch.classList.toggle("is-active", !isLinear);
}

btnLinear.addEventListener("click", () => setMode("linear"));
btnDialektisch.addEventListener("click", () => setMode("dialektisch"));

function setTendenz(value) {
  const isJa = value === "Bejahung";
  tendenzJa.classList.toggle("is-active", isJa);
  tendenzNein.classList.toggle("is-active", !isJa);
  tendenzValue.value = value;
}

tendenzJa.addEventListener("click", () => setTendenz("Bejahung"));
tendenzNein.addEventListener("click", () => setTendenz("Ablehnung"));

function getStrictnessConfig() {
  if (strictness === "locker") {
    return {
      nonsenseMinAlpha: 16,
      nonsenseMinUniqueRatio: 0.4,
      minArgumentChars: 55,
      minArgumentTokens: 6,
      minIntroChars: 85,
      minReasonChars: 65,
      minReasonOverlap: 1,
      minExampleChars: 55,
      minTransitionChars: 22,
      minGenericChars: 55,
      minGenericTokens: 6,
    };
  }

  if (strictness === "streng") {
    return {
      nonsenseMinAlpha: 28,
      nonsenseMinUniqueRatio: 0.52,
      minArgumentChars: 95,
      minArgumentTokens: 11,
      minIntroChars: 130,
      minReasonChars: 105,
      minReasonOverlap: 3,
      minExampleChars: 95,
      minTransitionChars: 42,
      minGenericChars: 95,
      minGenericTokens: 11,
    };
  }

  return {
    nonsenseMinAlpha: 20,
    nonsenseMinUniqueRatio: 0.45,
    minArgumentChars: 70,
    minArgumentTokens: 8,
    minIntroChars: 100,
    minReasonChars: 80,
    minReasonOverlap: 2,
    minExampleChars: 70,
    minTransitionChars: 30,
    minGenericChars: 70,
    minGenericTokens: 8,
  };
}

function setStrictness(level) {
  strictness = level;
  levelLocker.classList.toggle("is-active", level === "locker");
  levelNormal.classList.toggle("is-active", level === "normal");
  levelStreng.classList.toggle("is-active", level === "streng");
  levelHint.textContent = `Aktiv: ${level.charAt(0).toUpperCase()}${level.slice(1)}`;
  document.querySelectorAll("textarea").forEach((area) => updateFeedback(area));
}

levelLocker.addEventListener("click", () => setStrictness("locker"));
levelNormal.addEventListener("click", () => setStrictness("normal"));
levelStreng.addEventListener("click", () => setStrictness("streng"));

function renumber(selector, label) {
  document.querySelectorAll(selector).forEach((card, index) => {
    const title = card.querySelector("h3");
    if (title) title.textContent = `${label} ${index + 1}`;
  });
}

function insertBeforeLast(grid, element) {
  const cards = grid.querySelectorAll(".card");
  const last = cards[cards.length - 1];
  grid.insertBefore(element, last);
}

addLinear.addEventListener("click", () => {
  const clone = linearTemplate.content.cloneNode(true);
  insertBeforeLast(linearGrid, clone);
  renumber(".linear-arg", "Argument");
  bindFeedback();
});

removeLinear.addEventListener("click", () => {
  const args = linearGrid.querySelectorAll(".linear-arg");
  if (args.length <= 1) return;
  args[args.length - 1].remove();
  renumber(".linear-arg", "Argument");
});

addContra.addEventListener("click", () => {
  const clone = contraTemplate.content.cloneNode(true);
  const wende = document.getElementById("wendepunktCard");
  dialektischGrid.insertBefore(clone, wende);
  renumber(".contra-arg", "Contra");
  bindFeedback();
});

removeContra.addEventListener("click", () => {
  const args = dialektischGrid.querySelectorAll(".contra-arg");
  if (args.length <= 1) return;
  args[args.length - 1].remove();
  renumber(".contra-arg", "Contra");
});

addPro.addEventListener("click", () => {
  const clone = proTemplate.content.cloneNode(true);
  insertBeforeLast(dialektischGrid, clone);
  renumber(".pro-arg", "Pro");
  bindFeedback();
});

removePro.addEventListener("click", () => {
  const args = dialektischGrid.querySelectorAll(".pro-arg");
  if (args.length <= 1) return;
  args[args.length - 1].remove();
  renumber(".pro-arg", "Pro");
});

btnReset.addEventListener("click", () => {
  const activePanel = document.querySelector(".panel.is-visible");
  if (!activePanel) return;
  activePanel.querySelectorAll("textarea").forEach((area) => {
    area.value = "";
    updateFeedback(area);
  });
});

btnPrint.addEventListener("click", () => {
  window.print();
});

function buildExportText() {
  const sections = document.querySelectorAll(".panel.is-visible, .panel[aria-label='Fragestellung']");
  const lines = [];

  sections.forEach((section) => {
    const cards = section.querySelectorAll(".card");
    cards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent?.trim();
      if (title) {
        lines.push(title);
        lines.push("-");
      }

      const fields = card.querySelectorAll("textarea");
      fields.forEach((field) => {
        const labelEl = field.previousElementSibling;
        const label = labelEl?.tagName === "LABEL" ? labelEl.textContent.trim() : "Text";
        const value = field.value.trim();
        lines.push(`${label}: ${value || "(leer)"}`);
      });

      if (card.querySelector("#tendenzValue")) {
        lines.push(`Tendenz: ${tendenzValue.value}`);
      }

      lines.push("");
    });
  });

  return lines.join("\n");
}

function downloadFile(filename, blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

btnTxt.addEventListener("click", () => {
  const text = buildExportText();
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadFile("erorterung.txt", blob);
});

btnDocx.addEventListener("click", async () => {
  if (!window.docx) {
    alert("DOCX-Bibliothek konnte nicht geladen werden.");
    return;
  }
  const text = buildExportText();
  const paragraphs = text.split("\n").map((line) => new window.docx.Paragraph(line));
  const doc = new window.docx.Document({ sections: [{ properties: {}, children: paragraphs }] });
  const blob = await window.docx.Packer.toBlob(doc);
  downloadFile("erorterung.docx", blob);
});

function ensureFeedbackElement(textarea) {
  if (textarea.nextElementSibling?.classList?.contains("feedback")) return;
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.textContent = "Noch leer.";
  textarea.insertAdjacentElement("afterend", feedback);
}

function getLabel(textarea) {
  const labelEl = textarea.previousElementSibling;
  if (labelEl?.tagName === "LABEL") return normalizeText(labelEl.textContent.trim());
  const cardTitle = textarea.closest(".card")?.querySelector("h3")?.textContent?.trim();
  return normalizeText(cardTitle || "text");
}

function hasAny(text, list) {
  return list.some((word) => text.includes(word));
}

function tokenize(text) {
  const raw = normalizeText(text).split(/[^a-z0-9]+/g).filter(Boolean);
  return raw.filter((w) => w.length >= 4 && !stopWords.has(w));
}

function overlapCount(a, b) {
  const setB = new Set(b);
  let count = 0;
  a.forEach((token) => {
    if (setB.has(token)) count += 1;
  });
  return count;
}

function repeatedWordRatio(words) {
  if (!words.length) return 1;
  const unique = new Set(words);
  return unique.size / words.length;
}

function nonsenseReason(value) {
  const cfg = getStrictnessConfig();
  const normalized = normalizeText(value);
  const words = normalized.split(/\s+/).filter(Boolean);
  const alphaOnly = normalized.replace(/[^a-z]/g, "");

  if (alphaOnly.length < cfg.nonsenseMinAlpha) return "Zu wenig inhaltlicher Text.";
  if (/(.)\1{5,}/.test(normalized)) return "Viele wiederholte Zeichen ohne Inhalt.";
  if (hasAny(normalized, nonsenseWords)) return "Umgangssprache/Fuelltext statt Argumentation.";
  if (words.length >= 6 && repeatedWordRatio(words) < cfg.nonsenseMinUniqueRatio) {
    return "Zu viele Wiederholungen, kaum neue Information.";
  }

  return "";
}

function getCardContext(textarea) {
  const card = textarea.closest(".card");
  if (!card) return { argument: "", begruendung: "", beispiel: "", widerlegung: "" };
  const labels = card.querySelectorAll("label");
  const context = { argument: "", begruendung: "", beispiel: "", widerlegung: "" };

  labels.forEach((label) => {
    const key = normalizeText(label.textContent.trim());
    const field = label.nextElementSibling;
    if (!field || field.tagName !== "TEXTAREA") return;
    const val = field.value.trim();

    if (key.includes("argument")) context.argument = val;
    if (key.includes("begruendung") || key.includes("einschraenkung")) context.begruendung = val;
    if (key.includes("beispiel")) context.beispiel = val;
    if (key.includes("widerlegung")) context.widerlegung = val;
  });

  return context;
}

function updateFeedback(textarea) {
  const cfg = getStrictnessConfig();
  ensureFeedbackElement(textarea);
  const feedback = textarea.nextElementSibling;
  const value = textarea.value.trim();
  const lower = normalizeText(value);
  const label = getLabel(textarea);

  feedback.classList.remove("ok", "warn", "bad");

  if (!value) {
    feedback.textContent = "Noch leer.";
    feedback.classList.add("bad");
    return;
  }

  const nonsense = nonsenseReason(value);
  if (nonsense) {
    feedback.textContent = `Nicht bewertbar: ${nonsense}`;
    feedback.classList.add("bad");
    return;
  }

  const context = getCardContext(textarea);
  const argTokens = tokenize(context.argument);
  const begrTokens = tokenize(context.begruendung || context.widerlegung);
  const valTokens = tokenize(value);

  if (label.includes("argument")) {
    const clear = value.length >= cfg.minArgumentChars && valTokens.length >= cfg.minArgumentTokens;
    feedback.textContent = clear
      ? "Logische Schluessigkeit und Klarheit des Arguments: gut."
      : "Argument noch zu unpraezise. Formuliere einen klaren Standpunkt mit Begruendungskern.";
    feedback.classList.add(clear ? "ok" : "warn");
    return;
  }

  if (label.includes("einleitung")) {
    const hasQuestion = value.includes("?");
    const hasW = /(wer|was|wann|wo|warum|wie|wieso|weshalb)\b/i.test(value);
    const hasContext = value.length >= cfg.minIntroChars || hasAny(lower, ["hintergrund", "kontext", "aktuell", "gesellschaft", "debatte"]);
    const questionAtEnd = /\?\s*$/.test(value) || /\?\s*$/m.test(value.split(/[.!]/).slice(-1)[0] || "");

    if (hasW && hasContext && hasQuestion && questionAtEnd) {
      feedback.textContent = "Einleitung: W-Fragen, Kontext und explizite Leitfrage am Schluss sind vorhanden.";
      feedback.classList.add("ok");
      return;
    }

    const missing = [];
    if (!hasW) missing.push("W-Fragen");
    if (!hasContext) missing.push("relevante Informationen/Zusaetze");
    if (!(hasQuestion && questionAtEnd)) missing.push("explizite Frage am Schluss");
    feedback.textContent = `Einleitung verbessern: ${missing.join(", ")}.`;
    feedback.classList.add("warn");
    return;
  }

  if (label.includes("begruendung") || label.includes("einschraenkung") || label.includes("widerlegung")) {
    const linkedByWords = hasAny(lower, linkWords);
    const semanticLink = argTokens.length > 0 && overlapCount(valTokens, argTokens) >= cfg.minReasonOverlap;
    const clear = value.length >= cfg.minReasonChars && linkedByWords && semanticLink;

    feedback.textContent = clear
      ? "Verknuepfung und Schluessigkeit der Erlaeuterung/Widerlegung: gut."
      : "Begruendung/Widerlegung noch nicht schluessig mit dem Argument verknuepft.";
    feedback.classList.add(clear ? "ok" : "warn");
    return;
  }

  if (label.includes("beispiel")) {
    const concrete = hasAny(lower, exampleWords) || /\d/.test(value);
    const withArg = argTokens.length > 0 && overlapCount(valTokens, argTokens) >= 1;
    const withReason = begrTokens.length > 0 && overlapCount(valTokens, begrTokens) >= 1;
    const clear = value.length >= cfg.minExampleChars && concrete && withArg && withReason;

    feedback.textContent = clear
      ? "Plausibilitaet, Differenzierung und Verknuepfung des Beispiels: gut."
      : "Beispiel zu unplausibel oder nicht sauber mit Argument und Erlaeuterung verknuepft.";
    feedback.classList.add(clear ? "ok" : "warn");
    return;
  }

  if (label.includes("ueberleitung")) {
    const ok = value.length >= cfg.minTransitionChars && hasAny(lower, transitionWords);
    feedback.textContent = ok
      ? "Ueberleitung klar verknuepft."
      : "Ueberleitung: nutze Verknuepfungswoerter und nenne den Anschluss zum naechsten Punkt.";
    feedback.classList.add(ok ? "ok" : "warn");
    return;
  }

  const solid = value.length >= cfg.minGenericChars && valTokens.length >= cfg.minGenericTokens;
  feedback.textContent = solid
    ? "Klar und nachvollziehbar formuliert."
    : "Formuliere klarer und inhaltlich genauer.";
  feedback.classList.add(solid ? "ok" : "warn");
}

function bindFeedback() {
  document.querySelectorAll("textarea").forEach((area) => {
    ensureFeedbackElement(area);
    area.removeEventListener("input", handleInput);
    area.addEventListener("input", handleInput);
  });
}

function handleInput(event) {
  updateFeedback(event.target);
}

renumber(".linear-arg", "Argument");
renumber(".contra-arg", "Contra");
renumber(".pro-arg", "Pro");
bindFeedback();
setStrictness("normal");
