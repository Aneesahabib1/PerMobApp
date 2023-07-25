import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Login  from '../screens/Login';
import Attendance from '../screens/Attendance';
import Task from '../screens/Task';
import PieChartComponent from '../screens/PieChartComponent';
import BarChartComponent from '../screens/BarChartComponent';
import Profile from '../screens/Profile';
import { Welcome } from '../screens';
import RequestedAttendance from '../screens/RequestedAttendance';
import Review from '../screens/Review';
import EmployeeMD from '../screens/EmployeeMD';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" options={{ headerShown: false }}  component={Welcome} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Home" options={{ headerShown: false }}  component={Home} />
        <Stack.Screen name="Signup"options={{ headerShown: false }}  component={Signup} />
        <Stack.Screen name="Attendance"  component={Attendance} />
        <Stack.Screen name="RequestAttendance"  component={RequestedAttendance} />
        <Stack.Screen name="Task" options={{ headerShown: false }} component={Task} />
        <Stack.Screen name="PieChartComponent" options={{ headerShown: false }}  component={PieChartComponent} />
        <Stack.Screen name="BarChartComponent"  options={{ headerShown: false }} component={BarChartComponent} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="EmployeeMD" options={{ headerShown: false }} component={EmployeeMD} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
