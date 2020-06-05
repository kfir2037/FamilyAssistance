import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  Switch,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";
import { images } from "../ImagesClass";
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
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export interface List {
  name: string;
  items: ListItem[];
  picture: string;
  test: string;
  markMission: any;
  taskId: string;
  isDone: boolean;
}

interface ListProps {
  list: List;
}

const images2 = {
  sun: {
    imgName: "sun",
    uri: "../icons/sun.jpg",
  },
  moon: {
    imgName: "moon",
    uri: "../icons/moon.png",
  },
  lunch: {
    imgName: "lunch",
    uri: "../icons/lunch.png",
  },
  games: {
    imgName: "games",
    uri: "../icons/games.jpg",
  },
};


export default ({ list }: ListProps) => {
  const [isEnabled, setIsEnabled] = useState(list.isDone);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    console.log('list: ',list)
    list.markMission(list.taskId)
    //list.isDone = !x
  };
  const [open, setOpen] = useState(false);
  // console.log('list: ',list)
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
    outputRange: [8, 0],
  });


  const sunPic = "../icons/sun.png";
  const gamesPic = "../icons/games.png";
  const moonPic = "../icons/moon.png";
  const lunchPic = "../icons/lunch.png";
  const customPic = "../icons/custom.png";

  const returnSun = () => {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
          <Animated.View
            style={[
              styles.container,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
              },
            ]}
          >

            <Text style={styles.title}>{list.name}</Text>
            {/* <Image style={styles.image} source={require(pic)} /> */}
            <Image style={styles.image} source={require(sunPic)} />
            <Switch
              style={{ alignItems: "center" }}
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
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
  }
  const returnGames = () => {

    return (
      <>
        <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
          <Animated.View
            style={[
              styles.container,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
              },
            ]}
          >

            <Text style={styles.title}>{list.name}</Text>
            {/* <Image style={styles.image} source={require(pic)} /> */}
            <Image style={styles.image} source={require(gamesPic)} />
            <Switch
              style={{ alignItems: "center" }}
              value={isEnabled}
              // value={list.isDone}
              onValueChange={toggleSwitch}
            />
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
  }
  const returnLunch = () => {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
          <Animated.View
            style={[
              styles.container,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
              },
            ]}
          >

            <Text style={styles.title}>{list.name}</Text>
            {/* <Image style={styles.image} source={require(pic)} /> */}
            <Image style={styles.image} source={require(lunchPic)} />
            <Switch
              style={{ alignItems: "center" }}
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
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
  }
  const returnMoon = () => {  
    return (
      <>
        <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
          <Animated.View
            style={[
              styles.container,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
              },
            ]}
          >

            <Text style={styles.title}>{list.name}</Text>
            {/* <Image style={styles.image} source={require(pic)} /> */}
            <Image style={styles.image} source={require(moonPic)} />
            <Switch
              style={{ alignItems: "center" }}
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
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
  }
  const returnCustom = () => {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
          <Animated.View
            style={[
              styles.container,
              {
                borderBottomLeftRadius: bottomRadius,
                borderBottomRightRadius: bottomRadius,
              },
            ]}
          >

            <Text style={styles.title}>{list.name}</Text>
            {/* <Image style={styles.image} source={require(pic)} /> */}
            <Image style={styles.image} source={require(customPic)} />
            <Switch
              style={{ alignItems: "center" }}
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
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
  }
  if (list.picture == 'sun') {
    return returnSun()
  }
  else if (list.picture == 'moon') {
    return returnMoon()
  }
  else if (list.picture == 'games') {
    return returnGames()
  }
  else if (list.picture == 'lunch') {
    return returnLunch()
  }
  else if (list.picture == 'custom') {
    return returnCustom()
  }
  else {
    console.log('null null null: ', list.picture)
  }
  return null
};
