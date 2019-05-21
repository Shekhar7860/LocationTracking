import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import Tts from 'react-native-tts';
const goToAbout = () => {
    Actions.about()
 }
 let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Home extends Component {

    constructor() {
        super();
        this.state = {
          region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        };
      }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
              console.log(position.coords.latitude,position.coords.longitude, 'lat, long' )
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          },
        (error) => console.log(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            this.getAddress(position.coords.latitude, position.coords.longitude)
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          }
        );

        
      }

      getAddress = (lat, long) => {
          var myApiKey = "AIzaSyCP59vRYdLXBvYaAuGD7dyhMFTKJrPC98U";
          console.log(lat, long, 'hdhdh', 'long')
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((results) => {
          console.log(results);
          console.log(results.results[0].formatted_address);
          Tts.speak(results.results[0].formatted_address);
}, error => {
    console.log('error', error)
})
      }


      componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
      }
    
  
    getData(){
      setTimeout(() => {
        console.log('Our data is fetched');
        this.setState({
          data: 'Hello WallStreet'
        })
      }, 1000)
    }
  
    
  
    render() {
        return (
            <MapView
            provider={ PROVIDER_GOOGLE }
            style={ styles.container }
            showsUserLocation={ true }
            region={ this.state.region }
            onRegionChange={ region => this.setState({region}) }
            onRegionChangeComplete={ region => this.setState({region}) }
          >
            <MapView.Marker
              coordinate={ this.state.region }
            />
          </MapView>
         )
    }
  }
  
  export default Home;

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    }
  });

