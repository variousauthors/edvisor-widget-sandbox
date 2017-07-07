import * as React from 'react';

export default function Wrapper (props) {

  let children = React.Children.map(props.children, (child) => {
    console.log(child);
    let bob = React.cloneElement(child as React.ReactElement<any>, {
      onSubmit: (a, b, c) => { console.log(a, b, c); console.log("mine"); }
    });

    return bob;

  });

  console.log(children);

  return (
    <div>{ children }</div>
  )
}
