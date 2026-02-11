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

const linkWords = [
  "deshalb",
  "daher",
  "somit",
  "folglich",
  "weil",
  "da ",
  "dadurch",
  "das zeigt",
  "das belegt",
  "verdeutlicht",
  "zeigt, dass",
];

const exampleWords = [
  "zum beispiel",
  "z. b.",
  "zb",
  "etwa",
  "beispielsweise",
];

const transitionWords = [
  "außerdem",
  "zudem",
  "darüber hinaus",
  "hingegen",
  "dagegen",
  "trotzdem",
  "dennoch",
  "im gegensatz",
  "abschließend",
];

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
  downloadFile("erörterung.txt", blob);
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
  downloadFile("erörterung.docx", blob);
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
  if (labelEl?.tagName === "LABEL") return labelEl.textContent.trim().toLowerCase();
  const cardTitle = textarea.closest(".card")?.querySelector("h3")?.textContent?.trim().toLowerCase();
  return cardTitle || "text";
}

function hasAny(text, list) {
  return list.some((word) => text.includes(word));
}

function updateFeedback(textarea) {
  ensureFeedbackElement(textarea);
  const feedback = textarea.nextElementSibling;
  const value = textarea.value.trim();
  const lower = value.toLowerCase();
  const label = getLabel(textarea);

  feedback.classList.remove("ok", "warn", "bad");

  if (!value) {
    feedback.textContent = "Noch leer.";
    feedback.classList.add("bad");
    return;
  }

  if (label.includes("argument")) {
    const clear = value.length >= 60;
    feedback.textContent = clear
      ? "Logische Schluessigkeit und Klarheit des Arguments: gut.";
    feedback.classList.add(clear ? "ok" : "warn");
    if (!clear) {
      feedback.textContent = "Logische Schluessigkeit und Klarheit des Arguments: bitte praeziser und ausfuehrlicher formulieren.";
    }
    return;
  }

  if (label.includes("einleitung")) {
    const hasQuestion = value.includes("?");
    const hasW = /(wer|was|wann|wo|warum|wie|wieso|weshalb)\b/i.test(value);
    const hasContext = value.length >= 80 || hasAny(lower, ["hintergrund", "kontext", "aktuell", "heute", "in der gesellschaft"]);
    if (hasW && hasContext && hasQuestion) {
      feedback.textContent = "Einleitung: W-Fragen beantwortet, relevante Infos enthalten, Frage am Schluss gestellt.";
      feedback.classList.add("ok");
      return;
    }

    const missing = [];
    if (!hasW) missing.push("W-Fragen");
    if (!hasContext) missing.push("relevante Informationen");
    if (!hasQuestion) missing.push("explizite Frage am Schluss");
    feedback.textContent = `Einleitung verbessern: ${missing.join(", ")} fehlt.`;
    feedback.classList.add("warn");
    return;
  }

  if (label.includes("begruendung") || label.includes("einschraenkung") || label.includes("widerlegung")) {
    const linked = hasAny(lower, linkWords) || value.length >= 80;
    feedback.textContent = linked
      ? "Verknuepfung und Schluessigkeit der Erlaeuterung/Widerlegung: gut.";
    feedback.classList.add(linked ? "ok" : "warn");
    if (!linked) {
      feedback.textContent = "Verknuepfung und Schluessigkeit der Erlaeuterung/Widerlegung: zeige klar, wie es das Argument stuetzt oder entkraeftet.";
    }
    return;
  }

  if (label.includes("beispiel")) {
    const plausible = (hasAny(lower, exampleWords) || /\d/.test(value)) && hasAny(lower, linkWords);
    feedback.textContent = plausible
      ? "Plausibilitaet, Differenzierung und Verknuepfung des Beispiels: gut.";
    feedback.classList.add(plausible ? "ok" : "warn");
    if (!plausible) {
      feedback.textContent = "Plausibilitaet und Verknuepfung: nutze ein konkretes Beispiel und knuepfe es sichtbar ans Argument.";
    }
    return;
  }

  if (label.includes("ueberleitung")) {
    const ok = value.length >= 25 && hasAny(lower, transitionWords);
    feedback.textContent = ok
      ? "Ueberleitung klar verknuepft.";
    feedback.classList.add(ok ? "ok" : "warn");
    if (!ok) {
      feedback.textContent = "Ueberleitung: nutze ein Verknuepfungswort und benenne den Anschluss ans naechste Argument.";
    }
    return;
  }

  const solid = value.length >= 60;
  feedback.textContent = solid
    ? "Klar und nachvollziehbar formuliert."
    : "Formuliere klarer und fuehre weiter aus.";
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
