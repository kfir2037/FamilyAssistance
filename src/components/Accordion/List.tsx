import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { CheckBox } from 'react-native-elements'
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";

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
  }
});

export interface List {
  name: string;
  items: ListItem[];
  test:string;
}

interface ListProps {
  list: List;
}

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
          {/* <Text style={styles.title}>Total Points</Text> */}
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
