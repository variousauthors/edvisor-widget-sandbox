import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps (state: any) {
  return state;
}

function mapDispatchToProps (dispatch: any) {
  return { };
}

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
