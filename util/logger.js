const loggerChannelEl = document.createElement('div');
const logData = [ ];

window.onerror = (event, source, lineno, colno, error) => {
  logError(error);
};

const oldConsoleError = console.error;
const oldConsoleWarn = console.warn;
const oldConsoleLog = console.log;
const oldConsoleInfo = console.info;
console.error = logError;
console.warn = logWarn;
console.info = logInfo;
console.log = log;

export function getLoggerChannel() {
  return loggerChannelEl;
}

export function logWarn(...message) {
  oldConsoleWarn(...message);
  addMessage(message, "warn");
}

export function logError(...message) {
  oldConsoleError(...message);
  addMessage(message, "error");
}

export function logInfo(...message) {
  oldConsoleInfo(...message);
  addMessage(message, "info");
}

export function log(...message) {
  oldConsoleLog(...message);
  addMessage(message, "log");
}

function addMessage(message, type) {
  logData.push({ message, type, timestamp: Date.now() });
  loggerChannelEl.dispatchEvent(new CustomEvent('log-update', { bubbles: true, composed: true, detail: { log: logData } }));
}

export function getLog() {
  return logData;
}

