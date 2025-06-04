export function checkLocalStorageAvailability(): boolean {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function initializeStorage(): void {
  if (typeof window === "undefined") return;
  
  if (!checkLocalStorageAvailability()) {
    console.error("Local storage is not available. Note data will not persist.");
    return;
  }

  const notesKey = "noteease-notes";
  if (!localStorage.getItem(notesKey)) {
    localStorage.setItem(notesKey, JSON.stringify([]));
  }
}
