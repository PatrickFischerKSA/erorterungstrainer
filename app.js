const btnLinear = document.getElementById("btnLinear");
const btnDialektisch = document.getElementById("btnDialektisch");
const panelLinear = document.getElementById("linear");
const panelDialektisch = document.getElementById("dialektisch");
const btnReset = document.getElementById("btnReset");
const btnPrint = document.getElementById("btnPrint");
const btnTxt = document.getElementById("btnTxt");
const btnDocx = document.getElementById("btnDocx");
const btnGenerate = document.getElementById("btnGenerate");
const generatorPanel = document.getElementById("generatorPanel");
const generatorStatus = document.getElementById("generatorStatus");
const generatedText = document.getElementById("generatedText");
const closeGenerator = document.getElementById("closeGenerator");
const copyGenerated = document.getElementById("copyGenerated");
const downloadGeneratedTxt = document.getElementById("downloadGeneratedTxt");
const downloadGeneratedDocx = document.getElementById("downloadGeneratedDocx");

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
const btnFree = document.getElementById("btnFree");
const btnPractice = document.getElementById("btnPractice");
const freeModeLabel = document.getElementById("freeModeLabel");
const freeModeSwitch = document.getElementById("freeModeSwitch");
const practice = document.getElementById("practice");
const practiceModeButtons = document.querySelectorAll(".practice-mode");
const challengeModeButtons = document.querySelectorAll(".challenge-mode");
const topicType = document.getElementById("topicType");
const topicNumber = document.getElementById("topicNumber");
const topicText = document.getElementById("topicText");
const topicTendency = document.getElementById("topicTendency");
const topicTendencyValue = document.getElementById("topicTendencyValue");
const topicHint = document.getElementById("topicHint");
const newTopic = document.getElementById("newTopic");
const restartTopic = document.getElementById("restartTopic");
const practiceProgressText = document.getElementById("practiceProgressText");
const practiceProgressCount = document.getElementById("practiceProgressCount");
const practiceProgressBar = document.getElementById("practiceProgressBar");
let strictness = "normal";
let workMode = "free";
let practiceMode = "linear";
let challengeMode = "topic";
let activeChallengeMode = "topic";
let activeExercise = null;
let practiceTopicCount = 0;
let lastTopicKey = "";
let lastTopicCategory = "";

const practiceTopics = {
  linear: [
    { category: "Bildung", text: "Warum ist regelmässiges Lesen für Jugendliche wichtiger denn je?" },
    { category: "Bildung", text: "Was macht eine gute Lehrperson aus?" },
    { category: "Gesundheit", text: "Warum ist ausreichender Schlaf für Jugendliche wichtig?" },
    { category: "Gemeinschaft", text: "Welche Fähigkeiten vermittelt ein Klassenlager?" },
    { category: "Bildung", text: "Warum ist eine gute Schulbildung für die persönliche Zukunft bedeutsam?" },
    { category: "Beziehungen", text: "Was zeichnet eine verlässliche Freundschaft aus?" },
    { category: "Gesundheit", text: "Warum ist Bewegung ein wichtiger Ausgleich zum Schulalltag?" },
    { category: "Sprache", text: "Welche Vorteile hat das Erlernen einer weiteren Sprache?" },
    { category: "Alltag", text: "Warum ist ein verantwortungsvoller Umgang mit Geld wichtig?" },
    { category: "Arbeitswelt", text: "Was macht Teamarbeit erfolgreich?" },
    { category: "Gesellschaft", text: "Warum lohnt sich freiwilliges Engagement in der Gemeinde?" },
    { category: "Kreativität", text: "Welche Bedeutung hat Kreativität für das Lernen?" },
    { category: "Umwelt", text: "Warum ist der Schutz der biologischen Vielfalt wichtig?" },
    { category: "Umwelt", text: "Welche Vorteile bietet eine gut ausgebaute Veloinfrastruktur?" },
    { category: "Kultur", text: "Warum bereichern Museen das kulturelle Leben einer Region?" },
    { category: "Kultur", text: "Welche Bedeutung haben Geschichten für das Verständnis anderer Menschen?" },
    { category: "Medien", text: "Warum gehört Medienkompetenz zur modernen Allgemeinbildung?" },
    { category: "Technik", text: "Welche Fähigkeiten brauchen Menschen im Umgang mit künstlicher Intelligenz?" },
    { category: "Demokratie", text: "Warum ist politische Bildung für eine Demokratie unverzichtbar?" },
    { category: "Geschichte", text: "Warum ist die Auseinandersetzung mit Geschichte für die Gegenwart wichtig?" },
    { category: "Wissenschaft", text: "Was zeichnet glaubwürdige wissenschaftliche Informationen aus?" },
    { category: "Arbeitswelt", text: "Warum sind Praktika für die Berufswahl hilfreich?" },
    { category: "Persönlichkeit", text: "Welche Bedeutung hat der konstruktive Umgang mit Fehlern?" },
    { category: "Persönlichkeit", text: "Warum ist Selbstständigkeit eine wichtige Fähigkeit?" },
    { category: "Kommunikation", text: "Was macht ein überzeugendes Gespräch aus?" },
    { category: "Kommunikation", text: "Warum ist aktives Zuhören für das Zusammenleben wichtig?" },
    { category: "Gemeinschaft", text: "Welche Vorteile bieten Vereine für Jugendliche und Gemeinden?" },
    { category: "Ernährung", text: "Warum ist eine ausgewogene Ernährung für die Leistungsfähigkeit wichtig?" },
    { category: "Natur", text: "Welche positiven Wirkungen haben regelmässige Aufenthalte in der Natur?" },
    { category: "Reisen", text: "Warum erweitern Reisen und Austauschprogramme den persönlichen Horizont?" },
    { category: "Musik", text: "Welche Bedeutung hat gemeinsames Musizieren für junge Menschen?" },
    { category: "Sport", text: "Was können Jugendliche durch Mannschaftssport lernen?" },
    { category: "Alltag", text: "Warum erleichtert eine gute Zeitplanung den Schulalltag?" },
    { category: "Digitales", text: "Warum ist der Schutz persönlicher Daten im Internet wichtig?" },
    { category: "Wohnen", text: "Welche Bedeutung haben öffentliche Begegnungsorte für eine Gemeinde?" },
    { category: "Literatur", text: "Warum können literarische Texte helfen, gesellschaftliche Konflikte zu verstehen?" },
  ],
  dialektisch: [
    { category: "Schule", text: "Soll die private Handynutzung während des gesamten Schultags verboten werden?", tendency: "Ablehnung" },
    { category: "Schule", text: "Sollen Hausaufgaben an Gymnasien abgeschafft werden?", tendency: "Ablehnung" },
    { category: "Technik", text: "Soll künstliche Intelligenz im Unterricht grundsätzlich erlaubt sein?", tendency: "Bejahung" },
    { category: "Schule", text: "Soll der Unterricht erst um 9 Uhr beginnen?", tendency: "Bejahung" },
    { category: "Schule", text: "Sollen Schulnoten bis zum Ende der Sekundarstufe abgeschafft werden?", tendency: "Ablehnung" },
    { category: "Gesellschaft", text: "Soll für Jugendliche ein verpflichtendes soziales Jahr eingeführt werden?", tendency: "Bejahung" },
    { category: "Medien", text: "Sollen soziale Medien erst ab 16 Jahren zugänglich sein?", tendency: "Bejahung" },
    { category: "Schule", text: "Soll an Schulen eine einheitliche Kleidung vorgeschrieben werden?", tendency: "Ablehnung" },
    { category: "Mobilität", text: "Soll der öffentliche Verkehr für Jugendliche kostenlos sein?", tendency: "Bejahung" },
    { category: "Digitales", text: "Sollen gedruckte Schulbücher vollständig durch Tablets ersetzt werden?", tendency: "Ablehnung" },
    { category: "Ernährung", text: "Soll Fleisch in Schulmensen nur noch an einzelnen Tagen angeboten werden?", tendency: "Bejahung" },
    { category: "Sport", text: "Soll die Teilnahme an Schulsportwettkämpfen obligatorisch sein?", tendency: "Ablehnung" },
    { category: "Umwelt", text: "Sollen Kurzstreckenflüge innerhalb Europas verboten werden?", tendency: "Bejahung" },
    { category: "Umwelt", text: "Soll auf Einwegverpackungen eine deutlich höhere Abgabe erhoben werden?", tendency: "Bejahung" },
    { category: "Mobilität", text: "Sollen Innenstädte grundsätzlich autofrei werden?", tendency: "Bejahung" },
    { category: "Energie", text: "Soll der Bau neuer Kernkraftwerke wieder erlaubt werden?", tendency: "Ablehnung" },
    { category: "Politik", text: "Soll das Stimmrechtsalter auf 16 Jahre gesenkt werden?", tendency: "Bejahung" },
    { category: "Politik", text: "Soll in der Schweiz eine allgemeine Wahlpflicht eingeführt werden?", tendency: "Ablehnung" },
    { category: "Medien", text: "Sollen Influencer bezahlte Werbung noch deutlicher kennzeichnen müssen?", tendency: "Bejahung" },
    { category: "Medien", text: "Soll an Schulen ein verpflichtendes Fach Medienkunde eingeführt werden?", tendency: "Bejahung" },
    { category: "Kultur", text: "Soll der Eintritt in staatliche Museen für alle kostenlos sein?", tendency: "Bejahung" },
    { category: "Kultur", text: "Sollen öffentliche Gelder stärker zur Förderung von Computerspielen eingesetzt werden?", tendency: "Bejahung" },
    { category: "Arbeitswelt", text: "Soll die Vier-Tage-Woche zum neuen Standard werden?", tendency: "Bejahung" },
    { category: "Arbeitswelt", text: "Soll Homeoffice in geeigneten Berufen gesetzlich garantiert werden?", tendency: "Bejahung" },
    { category: "Gesundheit", text: "Soll der Verkauf von Energydrinks an unter 16-Jährige verboten werden?", tendency: "Bejahung" },
    { category: "Gesundheit", text: "Soll eine Zuckersteuer auf stark gesüsste Getränke eingeführt werden?", tendency: "Bejahung" },
    { category: "Sport", text: "Sollen besonders riskante Extremsportarten stärker reguliert werden?", tendency: "Bejahung" },
    { category: "Überwachung", text: "Soll Videoüberwachung auf öffentlichen Plätzen deutlich ausgeweitet werden?", tendency: "Ablehnung" },
    { category: "Digitales", text: "Soll die anonyme Nutzung sozialer Netzwerke verboten werden?", tendency: "Ablehnung" },
    { category: "Wissenschaft", text: "Sollen Tierversuche für medizinische Forschung grundsätzlich verboten werden?", tendency: "Ablehnung" },
    { category: "Stadt", text: "Sollen leer stehende Wohnungen höher besteuert werden?", tendency: "Bejahung" },
    { category: "Tourismus", text: "Sollen stark besuchte Ferienorte eine zusätzliche Tourismusabgabe erheben?", tendency: "Bejahung" },
    { category: "Konsum", text: "Soll Werbung für besonders klimaschädliche Produkte eingeschränkt werden?", tendency: "Bejahung" },
    { category: "Sprache", text: "Soll Englisch an Hochschulen häufiger als Unterrichtssprache eingesetzt werden?", tendency: "Ablehnung" },
    { category: "Bildung", text: "Soll jedes Gymnasium ein obligatorisches Austauschsemester anbieten?", tendency: "Ablehnung" },
    { category: "Alltag", text: "Sollen Geschäfte auch sonntags regulär geöffnet sein dürfen?", tendency: "Ablehnung" },
  ],
};

const reconstructionExercises = {
  linear: [
    {
      category: "Medien",
      question: "Warum gehört Medienkompetenz zur modernen Allgemeinbildung?",
      keywords: [
        { label: "Medien", words: ["medien", "internet", "informationen"] },
        { label: "Kompetenz", words: ["kompetenz", "kritisch", "beurteilen"] },
        { label: "Bildung", words: ["bildung", "allgemeinbildung", "schule"] },
      ],
      clue: { group: "linear", index: 1, text: "Medienkompetenz hilft, falsche Informationen zu erkennen und die Glaubwürdigkeit digitaler Quellen kritisch zu beurteilen." },
    },
    {
      category: "Gesundheit",
      question: "Warum ist regelmässige Bewegung ein wichtiger Ausgleich zum Schulalltag?",
      keywords: [
        { label: "Bewegung", words: ["bewegung", "sport", "körperlich"] },
        { label: "Ausgleich", words: ["ausgleich", "stress", "entspannung"] },
        { label: "Schule", words: ["schule", "schulalltag", "lernen"] },
      ],
      clue: { group: "linear", index: 0, text: "Regelmässige Bewegung baut schulischen Stress ab und verbessert danach die Konzentrationsfähigkeit." },
    },
    {
      category: "Demokratie",
      question: "Warum ist politische Bildung für eine Demokratie unverzichtbar?",
      keywords: [
        { label: "Politik", words: ["politik", "politisch"] },
        { label: "Bildung", words: ["bildung", "wissen", "informiert"] },
        { label: "Demokratie", words: ["demokratie", "mitbestimmung", "wahl"] },
      ],
      clue: { group: "linear", index: 2, text: "Politisch gebildete Menschen können Manipulationsversuche besser erkennen und demokratische Entscheidungen informiert beurteilen." },
    },
    {
      category: "Sprache",
      question: "Welche Vorteile hat das Erlernen einer weiteren Sprache?",
      keywords: [
        { label: "Sprache", words: ["sprache", "fremdsprache", "sprach"] },
        { label: "Lernen", words: ["lernen", "erlernen", "kenntnis"] },
        { label: "Nutzen", words: ["vorteil", "nutzen", "bedeutung", "warum", "welche"] },
      ],
      clue: { group: "linear", index: 1, text: "Eine weitere Sprache ermöglicht direkte Begegnungen mit Menschen, deren Kultur und Denkweise sonst schwer zugänglich bleiben." },
    },
    {
      category: "Alltag",
      question: "Warum erleichtert eine gute Zeitplanung den Schulalltag?",
      keywords: [
        { label: "Zeitplanung", words: ["zeitplanung", "planung", "organisieren"] },
        { label: "Schule", words: ["schule", "schulalltag", "lernen"] },
        { label: "Erleichterung", words: ["erleichtert", "hilft", "vorteil", "warum"] },
      ],
      clue: { group: "linear", index: 0, text: "Ein realistischer Wochenplan verhindert, dass Prüfungen und Abgabetermine gleichzeitig zu unnötigem Stress führen." },
    },
    {
      category: "Digitales",
      question: "Warum ist der Schutz persönlicher Daten im Internet wichtig?",
      keywords: [
        { label: "Datenschutz", words: ["daten", "datenschutz", "persönlich"] },
        { label: "Internet", words: ["internet", "online", "digital"] },
        { label: "Bedeutung", words: ["wichtig", "schutz", "warum", "bedeutung"] },
      ],
      clue: { group: "linear", index: 2, text: "Wer persönliche Daten schützt, erschwert Identitätsdiebstahl und behält mehr Kontrolle über das eigene digitale Leben." },
    },
  ],
  dialektisch: [
    {
      category: "Schule",
      question: "Soll die private Handynutzung während des gesamten Schultags verboten werden?",
      tendency: "Ablehnung",
      keywords: [
        { label: "Handy", words: ["handy", "smartphone", "mobiltelefon"] },
        { label: "Schule", words: ["schule", "schultag", "unterricht"] },
        { label: "Verbot", words: ["verbot", "verboten", "verbieten"] },
      ],
      clue: { group: "contra", index: 1, text: "Ein vollständiges Verbot verhindert auch sinnvolle Nutzungen, etwa für Fahrpläne, Notfälle oder kurzfristige Absprachen mit den Eltern." },
    },
    {
      category: "Politik",
      question: "Soll das Stimmrechtsalter auf 16 Jahre gesenkt werden?",
      tendency: "Bejahung",
      keywords: [
        { label: "Stimmrecht", words: ["stimmrecht", "wahlrecht", "abstimmen"] },
        { label: "Alter 16", words: ["16", "sechzehn", "jugendliche"] },
        { label: "Senkung", words: ["senken", "gesenkt", "einführen", "soll"] },
      ],
      clue: { group: "pro", index: 2, text: "Politische Entscheidungen zu Bildung und Klima betreffen 16-Jährige besonders lange, weshalb sie an diesen Entscheidungen beteiligt werden sollten." },
    },
    {
      category: "Umwelt",
      question: "Sollen Kurzstreckenflüge innerhalb Europas verboten werden?",
      tendency: "Bejahung",
      keywords: [
        { label: "Flüge", words: ["flug", "flüge", "kurzstrecke", "kurzstreckenflüge"] },
        { label: "Europa", words: ["europa", "europäisch"] },
        { label: "Verbot", words: ["verbot", "verboten", "verbieten"] },
      ],
      clue: { group: "contra", index: 0, text: "Ein Flugverbot könnte Regionen mit schlechten Bahnverbindungen wirtschaftlich und touristisch benachteiligen." },
    },
    {
      category: "Gesundheit",
      question: "Soll der Verkauf von Energydrinks an unter 16-Jährige verboten werden?",
      tendency: "Bejahung",
      keywords: [
        { label: "Energydrinks", words: ["energydrink", "energydrinks", "koffein"] },
        { label: "Jugendliche", words: ["jugendliche", "16", "sechzehn", "minderjährig"] },
        { label: "Verkauf/Verbot", words: ["verkauf", "verkaufen", "verbot", "verboten"] },
      ],
      clue: { group: "pro", index: 1, text: "Eine Altersgrenze schützt jüngere Jugendliche vor sehr hohen Koffeinmengen, deren gesundheitliche Risiken sie leicht unterschätzen." },
    },
    {
      category: "Arbeitswelt",
      question: "Soll die Vier-Tage-Woche zum neuen Standard werden?",
      tendency: "Bejahung",
      keywords: [
        { label: "Vier-Tage-Woche", words: ["vier-tage", "viertage", "vier tage", "4-tage"] },
        { label: "Arbeit", words: ["arbeit", "arbeitswoche", "arbeitszeit"] },
        { label: "Einführung", words: ["standard", "einführen", "werden", "soll"] },
      ],
      clue: { group: "contra", index: 1, text: "In Spitälern, Gastronomie und Betreuung kann eine kürzere Arbeitswoche zusätzliche Personal- und Organisationskosten verursachen." },
    },
    {
      category: "Überwachung",
      question: "Soll Videoüberwachung auf öffentlichen Plätzen deutlich ausgeweitet werden?",
      tendency: "Ablehnung",
      keywords: [
        { label: "Videoüberwachung", words: ["videoüberwachung", "kameras", "überwachung"] },
        { label: "öffentlicher Raum", words: ["öffentlich", "plätze", "raum"] },
        { label: "Ausweitung", words: ["ausweiten", "ausgeweitet", "mehr", "soll"] },
      ],
      clue: { group: "contra", index: 2, text: "Eine flächendeckende Ausweitung erfasst auch unverdächtige Menschen und greift dauerhaft in ihre Privatsphäre ein." },
    },
  ],
};

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

function setWorkMode(mode) {
  workMode = mode;
  const isPractice = mode === "practice";
  practice.hidden = !isPractice;
  btnFree.classList.toggle("is-active", !isPractice);
  btnPractice.classList.toggle("is-active", isPractice);
  freeModeLabel.hidden = isPractice;
  freeModeSwitch.hidden = isPractice;
  document.getElementById("frage").readOnly = isPractice;

  if (isPractice) {
    generatePracticeTopic();
    practice.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    activeExercise = null;
    activeChallengeMode = "topic";
    unlockExerciseFields();
    setEvaluationLock(false);
    topicTendency.hidden = true;
  }
}

function setPracticeMode(mode) {
  practiceMode = mode;
  practiceModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.practiceMode === mode);
  });
  generatePracticeTopic();
}

function setChallengeMode(mode) {
  challengeMode = mode;
  challengeModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.challengeMode === mode);
  });
  generatePracticeTopic();
}

function choosePracticeKind() {
  if (practiceMode !== "mixed") return practiceMode;
  return Math.random() < 0.5 ? "linear" : "dialektisch";
}

function chooseChallengeMode() {
  if (challengeMode !== "mixed") return challengeMode;
  const modes = ["topic", "guided", "reconstruct"];
  return modes[Math.floor(Math.random() * modes.length)];
}

function pickTopic(kind) {
  const pool = practiceTopics[kind];
  const variedCandidates = pool.filter((item) =>
    `${kind}:${item.text}` !== lastTopicKey && item.category !== lastTopicCategory
  );
  const candidates = variedCandidates.length
    ? variedCandidates
    : pool.filter((item) => `${kind}:${item.text}` !== lastTopicKey);
  return candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
}

function pickReconstructionExercise(kind) {
  const pool = reconstructionExercises[kind];
  const varied = pool.filter((item) =>
    `${kind}:${item.question}` !== lastTopicKey && item.category !== lastTopicCategory
  );
  const candidates = varied.length
    ? varied
    : pool.filter((item) => `${kind}:${item.question}` !== lastTopicKey);
  return candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
}

function unlockExerciseFields() {
  document.querySelectorAll("#linear textarea, #dialektisch textarea").forEach((area) => {
    area.readOnly = false;
    area.removeAttribute("data-given");
  });
  document.querySelectorAll(".arg.has-given").forEach((card) => card.classList.remove("has-given"));
}

function setEvaluationLock(locked) {
  [levelLocker, levelNormal, levelStreng].forEach((button) => {
    button.disabled = locked;
  });
  levelHint.textContent = locked ? "Aktiv: Streng · für Rekonstruktion gesperrt" : `Aktiv: ${strictness.charAt(0).toUpperCase()}${strictness.slice(1)}`;
}

function clearWritingFields() {
  unlockExerciseFields();
  document.querySelectorAll("#linear textarea, #dialektisch textarea").forEach((area) => {
    area.value = "";
    const card = area.closest(".arg");
    card?.classList.remove("is-accepted");
    card?.querySelector(".accepted-preview")?.remove();
    updateFeedback(area);
  });
  document.querySelectorAll(".check-result").forEach((result) => {
    result.className = "check-result";
    result.textContent = "Noch nicht übernommen.";
  });
}

function applyGivenArgument(kind, clue) {
  const selector = clue.group === "linear"
    ? ".linear-arg"
    : clue.group === "contra" ? ".contra-arg" : ".pro-arg";
  const scope = kind === "linear" ? panelLinear : panelDialektisch;
  const cards = scope.querySelectorAll(selector);
  const card = cards[clue.index];
  const field = card?.querySelector("textarea");
  if (!field) return;

  field.value = clue.text;
  field.readOnly = true;
  field.dataset.given = "true";
  card.classList.add("has-given");
  updateFeedback(field);
}

function resetPracticeResponse() {
  const kind = panelLinear.classList.contains("is-visible") ? "linear" : "dialektisch";
  const questionField = document.getElementById("frage");
  clearWritingFields();

  if (activeExercise) {
    questionField.value = activeChallengeMode === "reconstruct" ? "" : activeExercise.question;
    questionField.readOnly = activeChallengeMode !== "reconstruct";
    applyGivenArgument(kind, activeExercise.clue);
  } else {
    questionField.readOnly = true;
  }

  updateFeedback(questionField);
  updatePracticeProgress();
}

function generatePracticeTopic() {
  if (workMode !== "practice") return;
  const kind = choosePracticeKind();
  activeChallengeMode = chooseChallengeMode();
  const topic = activeChallengeMode === "topic"
    ? pickTopic(kind)
    : pickReconstructionExercise(kind);
  activeExercise = activeChallengeMode === "topic" ? null : topic;
  const question = topic.question || topic.text;
  practiceTopicCount += 1;
  lastTopicKey = `${kind}:${question}`;
  lastTopicCategory = topic.category;

  setMode(kind);
  clearWritingFields();
  const questionField = document.getElementById("frage");
  questionField.value = activeChallengeMode === "reconstruct" ? "" : question;
  questionField.readOnly = activeChallengeMode !== "reconstruct";

  if (activeChallengeMode !== "topic") {
    applyGivenArgument(kind, topic.clue);
  }

  if (activeChallengeMode === "reconstruct") {
    setStrictness("streng");
    setEvaluationLock(true);
  } else {
    setEvaluationLock(false);
  }
  updateFeedback(questionField);

  const variantLabel = activeChallengeMode === "guided"
    ? " · Mit Vorgabe"
    : activeChallengeMode === "reconstruct" ? " · Rekonstruktion" : "";
  topicType.textContent = `${kind === "linear" ? "Linear" : "Dialektisch"}${variantLabel}`;
  topicType.classList.toggle("is-dialectic", kind === "dialektisch");
  topicNumber.textContent = `Thema ${practiceTopicCount} · ${topic.category}`;
  topicText.textContent = activeChallengeMode === "reconstruct"
    ? `Ausgangsargument: „${topic.clue.text}“`
    : question;
  topicTendency.hidden = kind !== "dialektisch";

  if (kind === "dialektisch") {
    topicTendencyValue.textContent = topic.tendency;
    setTendenz(topic.tendency);
    const orderHint = topic.tendency === "Bejahung"
      ? "Beginne mit den stärkeren Gegenargumenten. Nach dem Wendepunkt steigerst du die Argumente für die Bejahung bis zum zentralen Argument."
      : "Beginne mit den stärkeren Argumenten der Gegenposition. Nach dem Wendepunkt steigerst du die Argumente für die Ablehnung bis zum zentralen Argument.";
    topicHint.textContent = orderHint;
  } else {
    topicHint.textContent = "Der Sachverhalt ist unstrittig: Begründe ihn mit wichtigen, wichtigeren und zuletzt dem zentralen Argument. Stütze jeden Punkt mit einem konkreten Beispiel.";
  }

  if (activeChallengeMode === "guided") {
    topicHint.textContent = `Ein Argument ist bereits an seiner eindeutigen Position eingesetzt. ${topicHint.textContent}`;
  }
  if (activeChallengeMode === "reconstruct") {
    topicHint.textContent = `Leite zuerst die einzige passende Fragestellung aus dem vorgegebenen Argument ab. Die Prüfung verlangt alle zentralen Themenbegriffe. ${topicHint.textContent}`;
  }

  updatePracticeProgress();
}

function updatePracticeProgress() {
  if (workMode !== "practice") return;
  const activeWritingPanel = panelLinear.classList.contains("is-visible") ? panelLinear : panelDialektisch;
  const writingFields = [...activeWritingPanel.querySelectorAll("textarea")];
  const fields = activeChallengeMode === "reconstruct"
    ? [document.getElementById("frage"), ...writingFields]
    : writingFields;
  const filled = fields.filter((field) => field.value.trim()).length;
  const good = fields.filter((field) => field.nextElementSibling?.classList.contains("ok")).length;
  const total = fields.length;
  const percent = total ? Math.round((good / total) * 100) : 0;

  practiceProgressCount.textContent = `${good} / ${total} Bausteine stimmig`;
  practiceProgressBar.style.width = `${percent}%`;

  if (activeChallengeMode === "reconstruct" && !document.getElementById("frage").value.trim()) {
    practiceProgressText.textContent = "Rekonstruiere zuerst die Fragestellung";
  } else if (!filled) practiceProgressText.textContent = "Beginne mit der Einleitung";
  else if (good === total) practiceProgressText.textContent = "Challenge geschafft!";
  else if (percent >= 60) practiceProgressText.textContent = "Auf der Zielgeraden";
  else practiceProgressText.textContent = "Weiterarbeiten – die Hinweise helfen dir";
}

btnFree.addEventListener("click", () => setWorkMode("free"));
btnPractice.addEventListener("click", () => setWorkMode("practice"));
practiceModeButtons.forEach((button) => {
  button.addEventListener("click", () => setPracticeMode(button.dataset.practiceMode));
});
challengeModeButtons.forEach((button) => {
  button.addEventListener("click", () => setChallengeMode(button.dataset.challengeMode));
});
newTopic.addEventListener("click", generatePracticeTopic);
restartTopic.addEventListener("click", () => {
  resetPracticeResponse();
});

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
      minArgumentChars: 32,
      minArgumentTokens: 4,
      minIntroChars: 85,
      minReasonChars: 42,
      minReasonOverlap: 1,
      minExampleChars: 38,
      minTransitionChars: 16,
      minGenericChars: 55,
      minGenericTokens: 6,
    };
  }

  if (strictness === "streng") {
    return {
      nonsenseMinAlpha: 28,
      nonsenseMinUniqueRatio: 0.52,
      minArgumentChars: 65,
      minArgumentTokens: 8,
      minIntroChars: 130,
      minReasonChars: 80,
      minReasonOverlap: 3,
      minExampleChars: 70,
      minTransitionChars: 30,
      minGenericChars: 95,
      minGenericTokens: 11,
    };
  }

  return {
    nonsenseMinAlpha: 20,
    nonsenseMinUniqueRatio: 0.45,
    minArgumentChars: 45,
    minArgumentTokens: 5,
    minIntroChars: 100,
    minReasonChars: 55,
    minReasonOverlap: 2,
    minExampleChars: 50,
    minTransitionChars: 20,
    minGenericChars: 70,
    minGenericTokens: 8,
  };
}

function setStrictness(level) {
  if (workMode === "practice" && activeChallengeMode === "reconstruct" && level !== "streng") return;
  strictness = level;
  levelLocker.classList.toggle("is-active", level === "locker");
  levelNormal.classList.toggle("is-active", level === "normal");
  levelStreng.classList.toggle("is-active", level === "streng");
  levelHint.textContent = `Aktiv: ${level.charAt(0).toUpperCase()}${level.slice(1)}`;
  document.querySelectorAll("textarea:not(#generatedText)").forEach((area) => updateFeedback(area));
  updatePracticeProgress();
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
  generatorPanel.hidden = true;
  generatedText.value = "";
  generatorStatus.textContent = "";

  if (workMode === "practice") {
    resetPracticeResponse();
    return;
  }

  const activeWritingPanel = panelLinear.classList.contains("is-visible") ? panelLinear : panelDialektisch;
  document.querySelectorAll("[aria-label='Fragestellung'] textarea").forEach((area) => {
    area.value = "";
    updateFeedback(area);
  });
  activeWritingPanel.querySelectorAll("textarea").forEach((area) => {
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

function completeSentence(value) {
  const text = value.trim().replace(/\s+/g, " ");
  if (!text) return "";
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

function cardValues(card) {
  const values = {};
  card.querySelectorAll("textarea").forEach((field) => {
    const label = field.previousElementSibling?.tagName === "LABEL"
      ? normalizeText(field.previousElementSibling.textContent.trim())
      : "text";
    const value = completeSentence(field.value);
    if (label.includes("argument")) values.argument = value;
    else if (label.includes("begruendung")) values.begruendung = value;
    else if (label.includes("beispiel")) values.beispiel = value;
    else if (label.includes("widerlegung")) values.widerlegung = value;
    else if (label.includes("ueberleitung")) values.ueberleitung = value;
    else values.text = value;
  });
  return values;
}

function validateDisposition() {
  const activePanel = panelLinear.classList.contains("is-visible") ? panelLinear : panelDialektisch;
  const question = document.getElementById("frage");
  const fields = [...activePanel.querySelectorAll("textarea")];
  const empty = fields.filter((field) => !field.value.trim());
  const notReady = fields.filter((field) => !field.nextElementSibling?.classList.contains("ok"));
  const uncheckedCards = [...activePanel.querySelectorAll(".arg")]
    .filter((card) => !card.classList.contains("is-accepted"));
  const messages = [];

  if (!question.value.trim()) messages.push("die Fragestellung fehlt");
  if (empty.length) messages.push(`${empty.length} Textfeld${empty.length === 1 ? " ist" : "er sind"} leer`);
  if (notReady.length) messages.push(`${notReady.length} Baustein${notReady.length === 1 ? " braucht" : "e brauchen"} noch eine Überarbeitung`);
  if (uncheckedCards.length) messages.push(`${uncheckedCards.length} Argument${uncheckedCards.length === 1 ? " wurde" : "e wurden"} noch nicht geprüft und übernommen`);

  return { valid: messages.length === 0, messages, activePanel };
}

function buildLinearEssay(panel) {
  const cards = [...panel.querySelectorAll(".card")];
  const introduction = completeSentence(cards[0].querySelector("textarea").value);
  const conclusion = completeSentence(cards[cards.length - 1].querySelector("textarea").value);
  const argumentCards = [...panel.querySelectorAll(".linear-arg")];
  const openings = [
    "Zunächst ist ein wichtiger Gesichtspunkt zu betrachten:",
    "Noch stärker fällt ein weiterer Aspekt ins Gewicht:",
    "Am überzeugendsten ist schliesslich das zentrale Argument:",
  ];

  const body = argumentCards.map((card, index) => {
    const values = cardValues(card);
    const opening = openings[index] || "Darüber hinaus ist zu beachten:";
    return [
      `${opening} ${values.argument}`,
      values.begruendung,
      `Ein konkretes Beispiel verdeutlicht dies: ${values.beispiel}`,
      values.ueberleitung,
    ].filter(Boolean).join(" ");
  });

  return [introduction, ...body, conclusion];
}

function buildDialecticalEssay(panel) {
  const cards = [...panel.querySelectorAll(".card")];
  const introduction = completeSentence(cards[0].querySelector("textarea").value);
  const conclusion = completeSentence(cards[cards.length - 1].querySelector("textarea").value);
  const contraCards = [...panel.querySelectorAll(".contra-arg")];
  const proCards = [...panel.querySelectorAll(".pro-arg")];
  const wendepunkt = completeSentence(panel.querySelector("#wendepunktCard textarea").value);

  const contra = contraCards.map((card, index) => {
    const values = cardValues(card);
    const opening = index === 0
      ? "Zunächst ist die Gegenposition zu berücksichtigen:"
      : index === contraCards.length - 1
        ? "Als stärkstes Argument der Gegenposition wird angeführt:"
        : "Ein weiterer Einwand lautet:";
    return [
      `${opening} ${values.argument}`,
      `Zur Begründung wird geltend gemacht: ${values.begruendung}`,
      `Dem lässt sich jedoch entgegenhalten: ${values.widerlegung}`,
      values.ueberleitung,
    ].filter(Boolean).join(" ");
  });

  const pro = proCards.map((card, index) => {
    const values = cardValues(card);
    const opening = index === 0
      ? "Für die eigene Position spricht zunächst:"
      : index === proCards.length - 1
        ? "Entscheidend ist schliesslich das stärkste Argument:"
        : "Zusätzlich spricht dafür:";
    return [
      `${opening} ${values.argument}`,
      values.begruendung,
      `Dies zeigt sich beispielsweise daran: ${values.beispiel}`,
      values.ueberleitung,
    ].filter(Boolean).join(" ");
  });

  return [introduction, ...contra, wendepunkt, ...pro, conclusion];
}

function generateEssay() {
  const validation = validateDisposition();
  generatorPanel.hidden = false;

  if (!validation.valid) {
    generatedText.value = "";
    generatorStatus.className = "generator-status is-warning";
    generatorStatus.textContent = `Noch kein Text erzeugt: ${validation.messages.join("; ")}.`;
    generatorPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const question = document.getElementById("frage").value.trim();
  const paragraphs = panelLinear.classList.contains("is-visible")
    ? buildLinearEssay(validation.activePanel)
    : buildDialecticalEssay(validation.activePanel);
  generatedText.value = `${question}\n\n${paragraphs.filter(Boolean).join("\n\n")}`;
  generatorStatus.className = "generator-status is-success";
  generatorStatus.textContent = "Der lokale Entwurf wurde aus allen geprüften Bausteinen zusammengesetzt und kann direkt überarbeitet werden.";
  generatorPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

btnGenerate.addEventListener("click", generateEssay);
closeGenerator.addEventListener("click", () => {
  generatorPanel.hidden = true;
});
copyGenerated.addEventListener("click", async () => {
  if (!generatedText.value.trim()) return;
  try {
    await navigator.clipboard.writeText(generatedText.value);
    generatorStatus.className = "generator-status is-success";
    generatorStatus.textContent = "Der Aufsatzentwurf wurde in die Zwischenablage kopiert.";
  } catch {
    generatorStatus.className = "generator-status is-warning";
    generatorStatus.textContent = "Kopieren wurde vom Browser blockiert. Markiere den Entwurf und kopiere ihn manuell.";
  }
});
downloadGeneratedTxt.addEventListener("click", () => {
  if (!generatedText.value.trim()) return;
  downloadFile("aufsatzentwurf.txt", new Blob([generatedText.value], { type: "text/plain;charset=utf-8" }));
});
downloadGeneratedDocx.addEventListener("click", async () => {
  if (!generatedText.value.trim()) return;
  if (!window.docx) {
    generatorStatus.className = "generator-status is-warning";
    generatorStatus.textContent = "Die DOCX-Bibliothek konnte nicht geladen werden.";
    return;
  }
  const paragraphs = generatedText.value.split("\n").map((line) => new window.docx.Paragraph(line));
  const doc = new window.docx.Document({ sections: [{ properties: {}, children: paragraphs }] });
  downloadFile("aufsatzentwurf.docx", await window.docx.Packer.toBlob(doc));
});

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

  if (textarea.id === "frage" && workMode === "practice" && activeChallengeMode === "reconstruct" && activeExercise) {
    if (!value) {
      feedback.textContent = "Noch leer: Rekonstruiere die eindeutige Fragestellung aus dem Ausgangsargument.";
      feedback.classList.add("bad");
      return;
    }

    const matchedGroups = activeExercise.keywords.filter((group) =>
      group.words.some((word) => lower.includes(normalizeText(word)))
    );
    const hasQuestionForm = /\?\s*$/.test(value);
    const isDetailedEnough = value.length >= 35;
    const exactEnough = matchedGroups.length === activeExercise.keywords.length && hasQuestionForm && isDetailedEnough;

    if (exactEnough) {
      feedback.textContent = "Eindeutige Fragestellung erkannt: Frageform und alle zentralen Themenaspekte stimmen.";
      feedback.classList.add("ok");
      return;
    }

    const missing = activeExercise.keywords
      .filter((group) => !matchedGroups.includes(group))
      .map((group) => group.label);
    const hints = [];
    if (missing.length) hints.push(`noch nicht eindeutig: ${missing.join(", ")}`);
    if (!hasQuestionForm) hints.push("Fragezeichen am Schluss fehlt");
    if (!isDetailedEnough) hints.push("Fragestellung ist zu knapp");
    feedback.textContent = `Rekonstruktion nicht akzeptiert – ${hints.join("; ")}.`;
    feedback.classList.add("warn");
    return;
  }

  if (textarea.dataset.given === "true") {
    feedback.textContent = "Vorgegebener Argumentbaustein: Themenbezug und Position sind festgelegt.";
    feedback.classList.add("ok");
    return;
  }

  if (textarea.id === "frage" && textarea.readOnly) {
    feedback.textContent = "Aufsatzthema automatisch vorgegeben.";
    feedback.classList.add("ok");
    return;
  }

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
    const hasW = /(wer|was|wann|wo|warum|wie|wieso|weshalb|welcher|welche|welches)\b/i.test(value);
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
  document.querySelectorAll("textarea:not(#generatedText)").forEach((area) => {
    ensureFeedbackElement(area);
    area.removeEventListener("input", handleInput);
    area.addEventListener("input", handleInput);
  });
  bindArgumentChecks();
}

function handleInput(event) {
  const card = event.target.closest(".arg");
  if (card?.classList.contains("is-accepted")) {
    card.classList.remove("is-accepted");
    card.querySelector(".accepted-preview")?.remove();
    const result = card.querySelector(".check-result");
    if (result) {
      result.className = "check-result";
      result.textContent = "Geändert – bitte erneut prüfen.";
    }
  }
  updateFeedback(event.target);
  updatePracticeProgress();
}

function bindArgumentChecks() {
  document.querySelectorAll(".arg").forEach((card) => {
    if (card.querySelector(".check-argument")) return;

    const actions = document.createElement("div");
    actions.className = "argument-actions";
    actions.innerHTML = `
      <button class="primary check-argument" type="button">Prüfen &amp; übernehmen</button>
      <div class="check-result" role="status" aria-live="polite">Noch nicht übernommen.</div>
    `;
    card.append(actions);
    actions.querySelector("button").addEventListener("click", () => checkAndAccept(card));
  });
}

function checkAndAccept(card) {
  const fields = [...card.querySelectorAll("textarea")];
  fields.forEach(updateFeedback);
  const problems = fields.filter((field) => !field.nextElementSibling?.classList.contains("ok"));
  const result = card.querySelector(".check-result");

  if (problems.length) {
    card.classList.remove("is-accepted");
    card.querySelector(".accepted-preview")?.remove();
    result.className = "check-result is-warning";
    result.textContent = `Noch nicht eingefügt: ${problems.length} Baustein${problems.length === 1 ? "" : "e"} verbessern. Beachte die Hinweise direkt bei den Feldern.`;
    problems[0].focus();
    updatePracticeProgress();
    return;
  }

  card.classList.add("is-accepted");
  card.querySelector(".accepted-preview")?.remove();
  const preview = document.createElement("div");
  preview.className = "accepted-preview";
  const previewTitle = document.createElement("strong");
  previewTitle.textContent = "In die Disposition eingefügt";
  const previewText = document.createElement("span");
  previewText.textContent = fields[0].value.trim();
  preview.append(previewTitle, previewText);
  card.append(preview);
  result.className = "check-result is-success";
  result.textContent = "Stimmig: Argument, Begründung, Beleg und Überleitung passen zusammen.";
  updatePracticeProgress();
}

renumber(".linear-arg", "Argument");
renumber(".contra-arg", "Contra");
renumber(".pro-arg", "Pro");
bindFeedback();
setStrictness("normal");
