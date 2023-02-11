import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const ListCard = () => {
  const [List, setList] = useState([]);
  const [input, setİnput] = useState('');

  const [count, setCount] = useState(0);

  const inputChange = newText => {
    setİnput(newText);
  };

  console.log(List);

  let todosInf = () => {
    if (input === '') {
      Alert.alert('lütfen todo giriniz.');
    } else {
      let date = new Date();
      let time = date.getTime();
      let todosInf = {id: time, Done: false, value: input};
      setList([...List, todosInf]);
      setİnput('');
      setCount(count + 1);
    }
  };

  let doneTodo = props => {
    const newList = List.map(item => {
      // üzerine bastığımız todo yu seçtik
      if (item.id === props.id) {
        // seçilen todo nun done durumunu değiştirdik
        item.Done = !item.Done;
      }
      return item;
    });
    // oluşturduğumuz yeni güncel listeyi setList'e atadık
    setList(newList);
  };

  return (
    <View>
      <View style={styles.head}>
        <Text>YAPILACAKLAR</Text>
        <Text>{count}</Text>
      </View>
      <View>
        <FlatList
          data={List}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.listcard,
                {backgroundColor: item.Done ? 'red' : 'blue'},
              ]}
              onPress={() => doneTodo(item)}>
              <Text>{item.value}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <TextInput value={input} onChangeText={inputChange} />

        <Button title="Kaydet" onPress={todosInf} />
      </View>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {},

  head: {
    height: 50,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerList: {},
  listcard: {
    height: 40,

    marginTop: 5,
    padding: 3,
  },
  inputstyle: {},

  doneList: {backgroundColor: 'green', marginTop: 5, padding: 3},
});
