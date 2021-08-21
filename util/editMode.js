const editModeChannelEl = document.createElement('div');
let isEditModeBool = false;

editModeChannelEl.addEventListener('editModeChange', (e) => {
  if (e.detail) {
    isEditModeBool = !!e.detail.isEditMode;
  }
});

export function getEditModeChannel() {
  return editModeChannelEl;
}

export function dispatchEditModeChange(isEditMode) {
  editModeChannelEl.dispatchEvent(new CustomEvent('editModeChange', {bubbles: true, composed: true, detail: { isEditMode }}));
}

export function isEditMode() {
  return isEditModeBool;
}
