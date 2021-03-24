import {createSwitchNavigator} from 'react-navigation-stack'
import AddClasses from '../Screens/AddClasses'
import ClassDetails from '../Screens/ClassDetails'
import ScheduledClasses from '../Screens/ScheduledClasses'

export const SwitchNavigator=createSwitchNavigator({
    AddClasses:{
        screen:AddClasses
    },
    ScheduledClasses:{
        screen:ScheduledClasses
    },
    ClassDetails:{
        screen:ClassDetails
    }
    
}, {initialRouteName:'ScheduledClasses'} );