import * as React from 'react';

function OfferingsSearchResult (props: any) {
  let offering = props.offering;
  let style = {
    container: {
      border: '1px solid blue'
    },
    listing: {
      margin: '10px'
    },
    flex: {
      display: 'flex'
    },
    photo: {
      width: '150px',
      height: '150px',
      border: '1px solid grey',
    },
    info: {
      textAlign: 'left',
      paddingLeft: '10px',
      generalInfo: { },
      detailedInfo: {
        prices: {}
      },
    }
  }

  return (
    <div style={ style.container }>
      <div style={ style.listing }>
        <div style={ style.flex }>
          <div style={ style.photo }></div>
          <div style={ style.info }>
            <div style={ style.info.generalInfo }>
              <div>{ props.offering.name }</div>
              <div>Somewhere...</div>
            </div>

            <div style={ style.info.detailedInfo }>
              <div>
                <div>Course Type: { offering.courseType }</div>
                <div>Intensity: ???</div>
                <div>Duration: { offering.durationType }</div>
                <div>Start Date: { offering.startDate }</div>
              </div>
              <div style={ style.info.detailedInfo.prices }></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OfferingsSearchResultList (props: any) {
  console.log("ResultList Render");

  if (props.isLoading) {
    return (<div>LOADING</div>);
  }

  if (props.error) {
    return (<div>Error: { props.error }</div>);
  }

  if (!props.results) {
    return (
      <div>NO RESULTS</div>
    )
  }

  let style = {
    list: {
      listStyleType: 'none',
    },
    listItem: {
      marginBottom: '5px'
    }
  }

  let results = props.results.map((searchResult: any, index: number) => {
    return (
      <li key={ index } style={ style.listItem }><OfferingsSearchResult offering={ searchResult }/></li>
    )
  });

  return (
    <div>
      <ul style= { style.list }>
        { results }
      </ul>
    </div>
  );
}
