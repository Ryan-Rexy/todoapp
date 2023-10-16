import { ScrollView, Text, View, Alert } from "react-native";
import { useEffect, useState } from "react";

import { firebase } from "./firebaseConfig";
import Task from "./components/Task";
import styles from "./app.style";
import Form from "./components/InputForm";

export default function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("todos")
      .orderBy("createdAt", "desc")
      .onSnapshot({
        next: (snapshot) => {
          const newTodos = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
            };
          });
          console.log("todo", newTodos);
          setTaskList(newTodos);
        },
      });
    return () => unsubscribe();
  }, []);

  const handleDeleteTask = (id) => {
    Alert.alert("Thông báo!", "Bạn có chắc muốn xoá?", [
      {
        text: "OK",
        onPress: () => {
          firebase.firestore().collection("todos").doc(id).delete();
        },
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Todo List</Text>
        <ScrollView style={styles.items}>
          {taskList.map((item, index) => {
            return (
              <Task
                key={index}
                item={item}
                number={index + 1}
                onDeleteTask={() => handleDeleteTask(item.id)}
              />
            );
          })}
        </ScrollView>
      </View>
      <Form />
      {/* <View style={styles.input}></View> */}
    </View>
  );
}
