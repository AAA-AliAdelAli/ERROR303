import { StyleSheet, Text, View, SafeAreaView,TextInput } from 'react-native'
import React, { useState , useEffect  } from 'react'
import COLORS from '../consts/Colors'
import { Feather } from "@expo/vector-icons";
import SearchResults from '../components/SearchResults';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [input , setInput]=useState("")
  const data = [
    {
      id: '1',
      name: 'Silver Hotel & SPA',
      location: 'Green street,Central district',
      price: 120,
      image: require('../assets/hotel1.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
    {
      id: '2',
      name: 'Bring Hotel',
      location: 'Yuki street',
      price: 70,
      image: require('../assets/hotel2.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
    {
      id: '3',
      name: 'Aluna Hotel',
      location: 'Almond street',
      price: 90,
      image: require('../assets/hotel3.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
    {
      id: '4',
      name: 'Green Hotel',
      location: 'Main street',
      price: 70,
      image: require('../assets/hotel4.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
    
    {
      id: '5',
      name: 'Sunny Days',
      location: 'Hurghada',
      price: 50,
      image: require('../assets/hotel5.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
    {
      id: '6',
      name: 'Blend Club ',
      location: 'Hurghada',
      price: 60,
      image: require('../assets/hotel6.jpg'),
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
    },
  
  
  ];
  const [items,setItems] = useState([]);
    
  useEffect(() => {
    if(items.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db,"places");

      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      })
    }

    fetchProducts();
  },[items]);
console.log(items);
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.iconSe}>
    <TextInput value={input} onChangeText={(text) =>setInput(text)} style={{color:"white"}} placeholder='enter what you need'    placeholderTextColor='gray'/>
    <Feather name="search" size={24} color="white" />

    </View>
    <SearchResults data= {data} input={input} setInput={setInput}/>
   </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    backgroundColor : COLORS.dark,
    flex:1
  },
  iconSe:{
    padding:10,
    margin:10,
    
    flexDirection:"row",
    alignItems:"center",
  justifyContent:"space-between",
  borderColor: COLORS.primary,
  borderWidth:4,
  marginTop:20,


  }
})