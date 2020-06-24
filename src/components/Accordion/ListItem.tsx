import React from "react";
import { StyleSheet, Text,Switch, View,Image } from "react-native";

export const LIST_ITEM_HEIGHT = 54;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
    height: LIST_ITEM_HEIGHT
  },
  name: {
    fontSize: 16,
    textAlign:'right',
    marginRight:10
    //alignSelf:'flex-end'
  },
  pointsContainer: {
    borderRadius: 20,
    backgroundColor: "#0ca5e5",
    padding: 8
  },
  points: {
    color: "white",
    fontWeight: "bold"
  }
});

export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
}

export default ({ item, isLast }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;

  return (
    
    <View>
      <View
        style={[
          styles.container,
          {
            borderBottomLeftRadius: bottomRadius,
            borderBottomRightRadius: bottomRadius
          }
        ]}
        
      >
        <Text style={styles.name}>{item}</Text>
        <View style={styles.pointsContainer}>
            <Text style={styles.points}>{item.points}</Text>
        </View>
        {/* <Switch/> */}
      </View>
      
    </View>

  );

};
