import {useState, useEffect} from 'react'
import {View, Text, FlatList, StyleSheet, TextInput, Pressable} from 'react-native'

export default function App() {
  const [feriados, setFeriados] = useState([])
    const [input, setInput] = useState("")
  const [country, setCountry] = useState("BR")

  async function buscarFeriados() {
    let config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    let url = "http://date.nager.at/api/v3/PublicHolidays/2024/"+country
    let result = await fetch(url, config)
    let resultJson = await result.json()
    setFeriados(resultJson)
  }

  useEffect(() => {
    void buscarFeriados()
  }, [country])

  return (
    <View style={styles.container}>
      <Text>Consumindo uma API</Text>
      <Text>Listando os Feriados</Text>
        <View>
            <TextInput
                style={styles.input}
                value={input}
                placeholder={"País (BR, GB, etc)"}
                onChangeText={setInput}
            />
            <Pressable style={styles.button} onPress={() => setCountry(input)}>
                <Text style={{textAlign: "center"}}>Enviar</Text>
            </Pressable>
        </View>
      <FlatList
        data={feriados}
        renderItem={({item}) => (
          <View style={styles.view}>
            <Text style={styles.text}>Nome: {item.localName}</Text>
            <Text style={styles.text}>Data: {item.date}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 25
    },

    view: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#00e1ff'
    },

    text: {
        color: 'white'
    },

    input: {
        margin: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },

    button: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#00e9ff'
    }
});
