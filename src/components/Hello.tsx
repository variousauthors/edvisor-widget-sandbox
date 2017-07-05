import * as React from 'react';
import '../../node_modules/graphiql/graphiql.css';

const GraphiQL = require('graphiql');
const fetch = require('isomorphic-fetch');

function graphQLFetcher(graphQLParams: Object) {
  return fetch("http://localhost:5000" + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then((response: any) => response.json());
}
export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
			<GraphiQL fetcher={graphQLFetcher} />
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
