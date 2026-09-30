const KEY = "rossi-crm"

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { leads: [], bookings: [], newsletters: [] }
  } catch {
    return { leads: [], bookings: [], newsletters: [] }
  }
}

export function saveEntry(kind, entry) {
  const data = read()
  data[kind] = [{ ...entry, id: crypto.randomUUID(), at: new Date().toISOString() }, ...data[kind]]
  localStorage.setItem(KEY, JSON.stringify(data))
  return data
}

export function loadCrm() {
  return read()
}
