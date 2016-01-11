import {Ensurer, Guard} from './Guard';

export function ensure<T>( fn?: Ensurer<T> ): Guard<T> {
  return new Guard<T>(fn);
}