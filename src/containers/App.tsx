import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps (state: any, props: any) {

  return { };
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
