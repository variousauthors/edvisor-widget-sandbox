import * as React from 'react';

function OfferingsSearchResult (props: any) {
  let style = {
    border: '1px solid blue'
  }
  return (
    <div style={ style }>
      <div>Offering: { props.offering.offeringId }</div>
    </div>
  );
}

export default function OfferingsSearchResultList (props: any) {
  if (props.data.loading) {
    return (<div>LOADING</div>);
  }

  if (props.data.error) {
    return (<div>Error: { props.data.error }</div>);
  }

  if (!props.data.offeringSearch) {
    return (
      <div>NO RESULTS</div>
    )
  }

  let results = props.data.offeringSearch.map((offering: any, index: number) => {
    return (
      <li key={ index }><OfferingsSearchResult offering={ offering }/></li>
    )
  });

  return (
    <div>
      <ul>
        { results }
      </ul>
    </div>
  );
}
