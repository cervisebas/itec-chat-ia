import { MessageItem } from '@renderer/interfaces/MessageItem';

export const TestMessages: MessageItem[] = [
  { type: 'user', content: 'Hola, ¿podés ayudarme con algo?' },
  { type: 'ia', content: '¡Por supuesto! ¿Con qué necesitas ayuda?' },
  { type: 'user', content: 'Estoy aprendiendo React y tengo algunas dudas.' },
  {
    type: 'ia',
    content:
      'Perfecto, React es una gran herramienta para crear interfaces dinámicas.',
  },
  { type: 'user', content: '¿Qué es exactamente un componente en React?' },
  {
    type: 'ia',
    content:
      'Un componente es una función o clase que devuelve elementos de la interfaz de usuario. Es como un bloque reutilizable.',
  },
  { type: 'user', content: '¿Y cómo paso datos entre componentes?' },
  {
    type: 'ia',
    content:
      'Podés pasar datos mediante *props*, que son como parámetros que recibe el componente hijo.',
  },
  {
    type: 'user',
    content: '¿Y si quiero compartir datos entre muchos componentes?',
  },
  {
    type: 'ia',
    content:
      'En ese caso, lo ideal es usar el contexto de React o alguna librería de estado global como Redux o Zustand.',
  },
  { type: 'user', content: '¿Qué diferencia hay entre useState y useEffect?' },
  {
    type: 'ia',
    content:
      'useState sirve para manejar el estado dentro del componente. useEffect se usa para ejecutar efectos secundarios cuando algo cambia.',
  },
  {
    type: 'user',
    content: 'Entiendo. ¿Podés darme un ejemplo sencillo de ambos?',
  },
  { type: 'ia', content: 'Claro, te armo un ejemplo...', generating: true },
  {
    type: 'ia',
    content:
      '```tsx\nfunction Ejemplo() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = `Clicks: ${count}`;\n  }, [count]);\n  return <button onClick={() => setCount(count + 1)}>Sumar</button>;\n}\n```',
  },
  { type: 'user', content: 'Perfecto, eso me queda clarísimo 👌' },
  {
    type: 'ia',
    content:
      'Me alegra escuchar eso 😄 ¿Querés que te explique algo más sobre hooks?',
  },
  { type: 'user', content: 'Sí, contame un poco sobre useMemo y useCallback.' },
  {
    type: 'ia',
    content:
      'Ambos sirven para optimizar el rendimiento. useMemo memoriza valores calculados, y useCallback memoriza funciones.',
  },
  {
    type: 'ia',
    content: 'Un segundo, te preparo un ejemplo de eso...',
    generating: true,
  },
];
