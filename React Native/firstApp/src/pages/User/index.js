import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import api from '../../services/api';
import { 
  Container,
  Header, 
  Avatar,
  Bio, 
  Name,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title, 
  Author,
 } from './styles';

export default class User extends Component {

    static navigationOptions = ({navigation}) => ({
      title: navigation.getParam('user').name,
    });

    static propTypes = {
      navigation: PropTypes.shape({
        getParam: PropTypes.func,
        navigate: PropTypes.func,
      }).isRequired,
    }

    state = {
      stars:[],
      loading:true,
      page:1,
      refreshing:false
    };

    async componentDidMount() {
      this.load();
    }

    load = async(page = 1) => {

      const { stars } = this.state;
      const { navigation } = this.props;
      const user =  navigation.getParam('user');

      const response = await api.get(`/users/${user.login}/starred`,{
        params: { page }
      });

      this.setState({
        stars:page >= 2 ? [...stars, ...response.data ]: response.data,
        loading:false,
        page,
        refreshing: false
      });

    };  
    
    loadMore = () => {
      const { page } = this.state;
      const nextPage =  page+1;

      this.load(nextPage);
    };
  
    refreshList = () => {
      this.setState({ refreshing: true, stars: [] }, this.load);
    };

    handleNavigate = repository => {
      const { navigation } = this.props;
  
      navigation.navigate('Repository', { repository });

    };

    render(){

      const { navigation } = this.props;
      const { stars, loading, refreshing } =  this.state;
      const user = navigation.getParam('user');

      return (

        <Container>

          <Header>
            <Avatar source={{ uri: user.avatar }}/>
              <Name>{user.name}</Name>
              <Bio>{user.bio}</Bio>
          </Header>

          <View>
            <Text>Favoritos</Text>
          </View>

          { loading ? ( 
              <Loading/> 
            ) : (
            
              <Stars 
                onRefresh={this.refreshList}
                onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
                onEndReached={this.loadMore}
                data={stars}
                refreshing={refreshing}
                keyExtractor={star => String(star.id)}
                renderItem={({ item }) => (
                <Starred onPress={() => this.handleNavigate(item)}>
                  <OwnerAvatar source={{uri: item.owner.avatar_url}}/>
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
            )}/>
          )}
        </Container>
      );
    }
};
