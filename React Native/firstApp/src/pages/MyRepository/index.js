import React from 'react';
import PropTypes from 'prop-types';

import { Browser } from './styles';

export default function Repository({ navigation }) {

  const myrepository = navigation.getParam('myrepository');

  const url = `https://github.com/${myrepository.login}?tab=repositories`
  
  return <Browser source={{ uri: url }} />;
}

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('myrepository').name,
});