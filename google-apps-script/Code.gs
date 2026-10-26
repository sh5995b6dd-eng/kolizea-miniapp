/**
 * KOLIZEA GROUP — Google Apps Script API
 * Deploy as Web app: Execute as Me; access Anyone.
 * Do not store passwords or sensitive personal data in this spreadsheet.
 */
const SHEET_NAMES = { tasks: 'Задачи' };
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'tasks';
  if (action !== 'tasks') return json_({ ok: false, error: 'Unknown action' }, 400);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.tasks);
  if (!sheet) return json_({ ok: false, error: 'Не найдена вкладка «Задачи». Запусти setup() в редакторе Apps Script.' }, 500);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return json_({ ok: true, rows: [] });
  const headers = values.shift().map(h => String(h).trim().toLowerCase());
  const rows = values.filter(row => row.some(cell => cell !== '')).map(row => {
    const obj = {};
    headers.forEach((header, i) => { if (header) obj[header] = row[i]; });
    return {
      title: obj.title || obj['название'] || obj['задание'] || '',
      description: obj.description || obj['описание'] || '',
      reward: obj.reward || obj['оплата'] || obj['вознаграждение'] || '',
      status: obj.status || obj['статус'] || 'Новая'
    };
  });
  return json_({ ok: true, rows });
}
function doPost(e) {
  return json_({ ok: false, error: 'Запись через публичный API отключена. Добавляйте задания только в таблице.' }, 403);
}
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.tasks);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAMES.tasks);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['title', 'description', 'reward', 'status']);
    sheet.appendRow(['Пример задания', 'Замените это описание реальным заданием.', '350', 'Новая']);
  }
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 4);
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}