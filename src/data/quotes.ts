import * as test from 'node:test'

export interface Quote {
  text: string
  author: string
}

export const quotes: Quote[] = [
  {
    text: 'Es ist nicht genug zu wissen, man muss auch anwenden; es ist nicht genug zu wollen, man muss auch tun.',
    author: 'Johann Wolfgang von Goethe',
  },
  { text: 'Eine Reise von tausend Meilen beginnt mit dem ersten Schritt.', author: 'Laozi' },
  {
    text: 'Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.',
    author: 'Seneca',
  },
  { text: 'Kleine Schritte zählen auch. Vor allem, wenn du sie jeden Tag machst.', author: 'Test' },
  { text: 'Du musst nicht perfekt sein. Du musst nur heute wieder anfangen.', author: 'Test' },
  { text: 'Eine Flamme wächst nicht an einem Tag, aber jeden Tag ein bisschen.', author: 'Test' },
  { text: 'Heute ist ein guter Tag, um den ersten Haken zu setzen.', author: 'Test' },
  {
    text: 'Ein verpasster Tag ist kein Ende, nur eine Pause vor dem nächsten Funken.',
    author: 'Test',
  },
  { text: 'Erst das Wichtigste, dann der Rest. Der Rest wartet gern.', author: 'Test' },
  { text: 'Mach heute etwas, auf das dein Ich von morgen stolz sein kann.', author: 'Test' },
]
