/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import {SvgUri} from 'react-native-svg';

const App = () => {
  const [pokemon, setPokemon] = useState({
    count: 0,
    next: '',
    previous: '',
    results: [],
  });

  const [pokemonDetail, setPokemonDetail] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => setPokemon(response.data));
  }, []);

  useEffect(() => {
    pokemon.results.forEach((dato) => {
      axios.get(dato.url).then((response) => {
        let detail = pokemonDetail;
        
        detail.push(response.data);
        setPokemonDetail(detail);
      });
    });
  }, [pokemon]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TextInput></TextInput>
        <ScrollView style={{flexDirection: 'column'}}>
          {pokemonDetail.map((element) => (
            <View
              key={element.id}
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                backgroundColor: "gray",
                borderRadius: 10,
                // borderWidth: 5
              }}>
              <SvgUri
                key={element.order}
                uri={element.sprites.other.dream_world.front_default}
                width="200px"
                height="200px"
              />
              <Text key={element.order}>{element.name.toUpperCase()}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default App;
