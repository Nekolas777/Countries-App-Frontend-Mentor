import { ref, onUnmounted } from 'vue';

// Definimos una función genérica llamada debounce que toma dos parámetros:
// 1. fn: una función que puede recibir cualquier número de argumentos de cualquier tipo y devolver cualquier tipo de valor.
// 2. delay: un número que representa el tiempo de espera en milisegundos antes de ejecutar la función fn.
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  const timeoutID = ref<number | null>(null);

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutID.value !== null) {
      clearTimeout(timeoutID.value);
    }

    timeoutID.value = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };

  onUnmounted(() => {
    if (timeoutID.value !== null) {
      clearTimeout(timeoutID.value);
    }
  });

  return debouncedFn;
}