
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'


const goToAbout = () => {
    Actions.home()
 }
class About extends Component {

    constructor(props){
      super(props);
      this.state = {
        data: 'Jordan Belfort'
      }
    }
    componentWillMount(){
      console.log('First this called');
    }
    
  
    getData(){
      setTimeout(() => {
        console.log('Our data is fetched');
        this.setState({
          data: 'Hello WallStreet'
        })
      }, 1000)
    }
  
    

    componentWillReceiveProps () {
console.log("received props")
    }
  

       componentWillUnmount(){
        console.log("will mOUNT")
       }
  
    render() {
        return (
            <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
               <Text>This is About!</Text>
            </TouchableOpacity>
         )
    }
  }
  
  export default About;

