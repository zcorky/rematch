export interface Action {
  type: string
}

export function rematch<S, A extends Action>(mappings: Record<string, (state: S, action: A) => S>) {

  return function(state: S, action: A): S {
    const mapping = mappings[action.type];
    if (!mapping) return state;

    return mapping(state, action);
  }
}

export default rematch;
