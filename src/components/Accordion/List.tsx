import React, { useState } from "react";
import { StyleSheet, Text,Switch,Image, TouchableWithoutFeedback } from "react-native";
import { CheckBox } from 'react-native-elements'
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";
import {images} from '../ImagesClass'
const { not, interpolate } = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  items: {
    overflow: "hidden"
  },
  image:{
    width:50,
    height:50,
  }
});

export interface List {
  name: string;
  items: ListItem[];
  picture:string;
  test:string;
}

interface ListProps {
  list: List;
}

// const images = {
//   sun: {
//     imgName: 'sun', 
//     uri: "../icons/sun.jpg"
//   },
//   moon: {
//     imgName: 'moon', 
//     uri: '../icons/moon.png'
//   },
//   lunch: {
//     imgName: 'lunch', 
//     uri: '../icons/lunch.png'
//   },
//   games: {
//     imgName: 'games', 
//     uri: '../icons/games.jpg'
//   },

// }

export default ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease)
  );
  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * list.items.length
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });

  
  // if (list.picture==images.sun.imgName){
  //  pic = images.sun.uri
  // }
  // alert("list.picture: "+list.picture)
  // alert("pic: "+pic)
  // alert("images.sun.imgName: "+images.sun.imgName)
  
let pic =images.sun.uri;
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius
            }          
          ]}
        >          
        
          <Text style={styles.title}>{list.items[0]['points']}</Text>
          {/* <Image style={styles.image} source={require(pic)} /> */}
          
          <Image style={styles.image} source={require('../icons/sun.jpg')} />
          <Chevron {...{ transition }} />
          </Animated.View>
        
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item {...{ item, key }} isLast={key === list.items.length - 1} />
        ))}
      </Animated.View>

    </>
  );
};
