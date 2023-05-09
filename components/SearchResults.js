import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import hotels from '../consts/hotels';

import COLORS from '../consts/Colors'

const SearchResults = ({ data, input, setInput ,hotel ,index}) => {
    const navigation = useNavigation();
        
    return (
        <View style={{ padding: 10 , margin:10 }}>
            <FlatList data={hotels} renderItem={({ item }) => {
                if (item.name.toLowerCase().includes(input.toLowerCase())) {
                    if (input === "") {
                        return null;
                    }
                    return (
                        <Pressable onPress={() => navigation.navigate('Details', item)}

                        
                        style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                            <View>
                                <Image style={{ width: 70, height: 70 }} source={item.image } />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: "500" , color: COLORS.primary }}>{item.name}</Text>
                                <Text style={{ marginVertical: 4  ,  color: "white"}}>{item.details}</Text>
                                {/* <Text style={{ color: "white", fontSize: 15 }}>{item.details.length} Properties</Text> */}
                            </View>
                        </Pressable>
                    )
                }
            }} />
        </View>
    )
}

export default SearchResults

const styles = StyleSheet.create({})