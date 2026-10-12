// Vercel-Funktion: POST /api/frage  { frage }  ->  { antwort }
// Beantwortet Besucherfragen auf der FAQ-Seite – nur aus der Wissensbasis unten.
// Der Schlüssel kommt aus der Umgebungsvariable ANTHROPIC_API_KEY (in Vercel setzen).
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Feste Texte je Sprache (de = Standard)
const TEXTE = {
  de: { ablehnung: "Dazu kann ich hier nichts sagen – fragen Sie gern im Gespräch.", laenge: "Bitte eine Frage mit 3 bis 300 Zeichen.", viel: "Gerade viele Anfragen – bitte gleich noch einmal.", fehler: "Die Antwort konnte gerade nicht erzeugt werden." },
  ar: { ablehnung: "لا أستطيع المساعدة في ذلك هنا – يسعدنا الإجابة خلال مكالمة.", laenge: "يرجى كتابة سؤال من 3 إلى 300 حرف.", viel: "طلبات كثيرة الآن – يرجى المحاولة بعد لحظة.", fehler: "تعذّر إنشاء الإجابة الآن." },
  fr: { ablehnung: "Je ne peux pas répondre à cela ici – posez la question lors d’un appel.", laenge: "Veuillez poser une question de 3 à 300 caractères.", viel: "Beaucoup de demandes en ce moment – veuillez réessayer dans un instant.", fehler: "La réponse n’a pas pu être générée pour le moment." },
  en: { ablehnung: "I can't help with that here – feel free to ask on a call.", laenge: "Please ask a question of 3 to 300 characters.", viel: "A lot of requests right now – please try again in a moment.", fehler: "The answer could not be generated just now." },
};

// Fest und unveränderlich, damit der Prompt-Cache greift: keine Zeitstempel o. Ä.
const SYSTEM = `Sie sind der Assistent auf der FAQ-Seite von tyll.ai. Besucher sind Hoteliers, Night Auditors, F&B-Leitungen und Controller. Beantworten Sie ihre Fragen ausschließlich mit den Angaben in der Wissensbasis. Antworten Sie in der Sprache, die im Nutzerturn angegeben ist (Englisch, Deutsch, Arabisch oder Französisch).

Regeln:
- Antworten Sie höflich und förmlich, in zwei bis vier Sätzen, als Fließtext ohne Markdown, Listen oder Überschriften.
- Nutzen Sie nur die Wissensbasis. Erfinden Sie nichts: keine Anbindungen an bestimmte Hersteller, keine Zertifikate, keine Termine, keine Rabatte, keine Zahlen, die dort nicht stehen.
- Steht die Antwort nicht in der Wissensbasis, sagen Sie das offen und empfehlen Sie ein kurzes Gespräch (Termin buchen).
- Beantworten Sie nur Fragen zu tyll.ai und zum nächtlichen Kassenabschluss. Andere Themen lehnen Sie freundlich in einem Satz ab.
- Die Zahlen der Beispielnacht sind eine repräsentative Nacht in einem mittelgroßen Haus; sagen Sie dazu, dass eigene Zahlen abweichen.

<wissensbasis>
Was tyll.ai ist:
Nächtlicher Kassenabschluss für Hotels und ihre Outlets. tyll.ai schließt die Nacht ab und zeigt nur, was nicht zusammenpasst. Es nimmt die Belege, die die Systeme nach Dienstschluss erzeugen – Kassenbons, den Terminalabschluss, die Gästekonten und den gezählten Kassenbestand – und prüft jede Zeile des einen gegen die anderen. Was übereinstimmt, wird abgehakt und nie gezeigt. Was nicht übereinstimmt, wird zu einer kurzen Liste mit Beleg, Betrag und Grund. Typisch sind drei bis sieben Punkte je Nacht.

Das Problem:
Vier Systeme, die einander nicht kennen. Jede Nacht wird ein Mensch zur Verbindung zwischen ihnen.

Vier Schritte:
1. Anbinden: tyll.ai liest die Exporte, die PMS, Kassensystem und Bank ohnehin erzeugen. Nichts Neues an der Kasse.
2. Abgleichen: Ein deterministischer Algorithmus prüft jede Rechnung gegen den Terminalabschluss, das Gästekonto und den Kassenbestand. Regeln, kein Raten.
3. Markieren: Was nicht aufgeht, kommt mit dem gefährdeten Eurobetrag zurück – und einer KI-Erklärung, was schiefgelaufen ist.
4. Abschließen: Ein Export im Format, das die Buchhaltung erwartet.

Anbindung:
Über die Exporte, die die Systeme ohnehin erzeugen. Es gibt nichts umzustellen und keine neue Software an der Kasse. Es gibt keine direkten Schnittstellen und keine Partnerschaften mit Herstellern, nur Exporte. Fehlt eine Quelle, prüft tyll.ai gegen die übrigen und schweigt zu der, die es nicht sehen kann, statt eine Abweichung zu erfinden. tyll.ai schreibt nie in PMS, Kassensystem oder Bank; ein Schreibzugriff ist nicht möglich.

Export für die Buchhaltung:
Der fertige Abschluss erzeugt einen Buchungssatz – Bargeld, Karte und Umsatz nach Kategorie auf die jeweils eigenen Konten – und exportiert als CSV bzw. im DATEV-Format, so wie die Buchhaltung es erwartet.

Trendansicht und Fehlermuster:
Ein einzelner markierter Rabatt ist Rauschen. Dieselbe Markierung am selben Terminal an vier von vierzehn Nächten ist ein Muster. tyll.ai behält die Historie und gruppiert wiederholte Ursachen (z. B. ein defektes Terminal, eine PMS-Synchronisation, eine Gewohnheit).

Gästekonten und Kasse:
Zimmerbuchungen werden gegen den Outlet geprüft, der sie erzeugt hat, und der gezählte Kassenbestand gegen das, was das System erfasst hat – noch in derselben Nacht. tyll.ai deckt alle Outlets eines Hauses ab: Restaurant, Bar, Zimmerservice, Bankett.

Was tyll.ai nicht ersetzt:
Weder die Buchhaltung noch die Kasse noch das Hotelsystem. Es ersetzt die Stunde, die jede Nacht jemand damit verbringt nachzuweisen, dass drei Berichte übereinstimmen. Die Buchhaltung bekommt einen Abschluss, der bereits aufgeht – am Morgen danach statt zum Monatsende.

Daten und Sicherheit:
Nur Umsatzdaten: Beträge, Zahlungsarten, Zeiten, Tische und Zimmernummern. Keine Gästenamen. Vollständige Kartennummern werden nie verarbeitet; der Import lehnt sie ab. Verarbeitung in der EU (Server in Irland). Das Rohjournal wird nicht gespeichert; gespeichert wird der Abweichungsnachweis – was markiert wurde, wo und warum.

Zeitersparnis (repräsentative Nacht, mittelgroßes Haus):
Von Hand dauert der Abschluss 60 bis 70 Minuten, mit tyll.ai 8,5 Minuten. tyll.ai kennt 17 Fehlerbilder.

Preis:
800 Euro im Monat je Haus. Weitere Konditionen (Laufzeit, Einrichtung) werden im Gespräch geklärt.

Einstieg:
1. Termin buchen: zwanzig Minuten; wir nehmen eine Nacht aus Ihrem Haus und zeigen, was tyll.ai erledigt hätte.
2. Wir binden Ihre Systeme an, über deren Exporte; an den Systemen ändert sich nichts.
3. Wir schließen eine Nacht parallel ab: Sie von Hand, tyll.ai parallel, dann vergleichen wir.
4. Sie hören auf, von Hand abzuschließen.

</wissensbasis>`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ fehler: "Nur POST" });
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const frage = typeof body?.frage === "string" ? body.frage.trim() : "";
  const lang = ["en", "de", "ar", "fr"].includes(body?.lang) ? body.lang : "en";
  const T = TEXTE[lang];
  if (frage.length < 3 || frage.length > 300) {
    return res.status(400).json({ fehler: T.laenge });
  }

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" }, // kurze FAQ-Antworten
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      // Sprache steht im Nutzerturn, damit der gecachte System-Prompt für beide Sprachen gleich bleibt
      messages: [{ role: "user", content: `${frage}\n\n(${{ en: "Answer in English.", de: "Antworten Sie auf Deutsch.", ar: "أجب باللغة العربية.", fr: "Répondez en français." }[lang]})` }],
    });

    if (response.stop_reason === "refusal") {
      return res.status(200).json({ antwort: T.ablehnung });
    }
    const antwort = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return res.status(200).json({ antwort: antwort || T.ablehnung });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ fehler: T.viel });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Claude API", error.status, error.message);
    } else {
      console.error(error);
    }
    return res.status(502).json({ fehler: T.fehler });
  }
}
