const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL?.replace(/\/+$/, '')

async function request(path: string, init?: RequestInit): Promise<Response> {
  if (!backendBaseUrl) {
    throw new Error('VITE_BACKEND_BASE_URL ist nicht gesetzt.')
  }

  let response: Response
  try {
    response = await fetch(`${backendBaseUrl}${path}`, init)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Backend nicht erreichbar: ${error.message}`)
    }
    throw error
  }

  if (!response.ok) {
    const body = await response.text()
    let message = body || `Backend-Fehler (${response.status})`

    if (body) {
      try {
        const parsed: unknown = JSON.parse(body)
        if (typeof parsed === 'object' && parsed !== null && 'detail' in parsed) {
          const detail = parsed.detail
          if (typeof detail === 'string') message = detail
        }
      } catch {
        // Die Antwort ist kein JSON und wird als Text angezeigt.
      }
    }

    throw new Error(message)
  }

  return response
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await request(path)
  return (await response.json()) as T
}

export async function sendJson<T>(path: string, method: 'POST' | 'PUT', body: unknown): Promise<T> {
  const response = await request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return (await response.json()) as T
}

export async function deleteResource(path: string): Promise<void> {
  await request(path, { method: 'DELETE' })
}

export function apiErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unbekannter Fehler bei der Backend-Anfrage.'
}
