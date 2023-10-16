import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import styles from "./style";

const Task = ({ item, number, onDeleteTask }) => {
  return (
    <TouchableOpacity onPress={onDeleteTask}>
      <View style={styles.item}>
        <View style={styles.quare}>
          <Text style={styles.number}>{number}</Text>
        </View>
        <Text style={styles.content}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Task;
