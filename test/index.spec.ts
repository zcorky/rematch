import { expect } from 'chai';

import rematch from '../src';

describe('classnames', () => {
  it('rematch reducer primitive', () => {
    type State = number;
    interface Action { type: string };

    const reducer = rematch<State, Action>({
      '+': (state) => state + 1,
      '-': (state) => state - 1,
    });

    expect(reducer(1, { type: '+' })).to.equal(2);
    expect(reducer(1, { type: '-' })).to.equal(0);
    expect(reducer(1, { type: 'x' })).to.equal(1);
    expect(reducer(1, { type: '/' })).to.equal(1);
  });

  it('rematch reducer immutable', () => {
    type State = Readonly<{ value: number }>;
    type Action = Readonly<{ type: string }>;

    const reducer = rematch<State, Action>({
      '+': (state) => ({ ...state, value: state.value + 1 }),
      '-': (state) => ({ ...state, value: state.value - 1 }),
      // 'x': (state) => (state.value *= 2, state), // @readonly keep immutable
    });

    expect(reducer({ value: 1 }, { type: '+' })).to.deep.equal({ value: 2 });
    expect(reducer({ value: 1 }, { type: '-' })).to.deep.equal({ value: 0 });
    expect(reducer({ value: 1 }, { type: 'x' })).to.deep.equal({ value: 1 });
    expect(reducer({ value: 1 }, { type: '/' })).to.deep.equal({ value: 1 });
  });

  it('rematch reducer with action.payload', () => {
    type State = Readonly<{ step: 'FIRST' | 'SECOND' | 'END' }>;
    type Action = Readonly<{ type: string, payload: 'FIRST' | 'SECOND' | 'END' }>;

    const reducer = rematch<State, Action>({
      'app/step': (state, { payload: step }) => ({ ...state, step  }),
    });

    expect(reducer({ step: 'FIRST' }, { type: 'app/step', payload: 'SECOND' })).to.deep.equal({ step: 'SECOND' });
    expect(reducer({ step: 'FIRST' }, { type: 'app/step', payload: 'END' })).to.deep.equal({ step: 'END' });
  });
});
