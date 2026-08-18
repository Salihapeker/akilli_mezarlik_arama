const normalize = (value = "") => {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ş", "s")
    .replaceAll("Ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("Ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("Ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("Ö", "o")
    .replaceAll("ç", "c")
    .replaceAll("Ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const prev = Array(n + 1).fill(0);
  const curr = Array(n + 1).fill(0);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

function similarity(a, b) {
  a = normalize(a); b = normalize(b);
  if (!a && !b) return 1;
  const maxLen = Math.max(a.length, b.length);
  return maxLen ? 1 - levenshtein(a, b) / maxLen : 0;
}

export function scoreRecord(record, q, surname = "") {
  const nameScore = similarity(q, record.name);
  const surnameScore = surname ? similarity(surname, record.surname) : 1;
  const fullQuery = normalize(`${q} ${surname}`);
  const fullName = normalize(`${record.name} ${record.surname}`);
  const fullScore = similarity(fullQuery, fullName);

  // İsim ağırlıklı; soyadı girilmişse soyadına da ağırlık ver.
  const score = surname
    ? (nameScore * 0.55 + surnameScore * 0.25 + fullScore * 0.20)
    : (nameScore * 0.75 + fullScore * 0.25);

  return Math.round(score * 100);
}

export function searchRecords(records, q, surname = "", limit = 10) {
  const query = normalize(q);
  if (!query) return [];

  return records
    .map(r => ({ ...r, matchScore: scoreRecord(r, query, surname) }))
    .filter(r => r.matchScore >= 45)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
