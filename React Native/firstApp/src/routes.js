import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
    createStackNavigator({
            Main,
            User
    },{
        headerLayoutPreset:'center',
        headerBackTitleVisible:false,
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:'#715ac1'
            },
            headerTintColor: '#fff'
        }
    }
    )
);

export default  Routes;