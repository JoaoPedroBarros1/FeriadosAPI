import {useState, useEffect} from 'react'
import {View, Text, FlatList} from 'react-native'

export default function App() {
  const [feriados, setFeriados] = useState([])
  const [country, setCountry] = useState("BR")

  async function buscarFeriados() {
    let config = {
      methods: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }

    let url = "http://date.nager.at/api/v3/PublicHolidays/2024/"+country

    fetch(url, config)
        .then(function(dados) {
          return dados.json()
        })
        .then(function(dadosEmJson) {
          setFeriados(dadosEmJson)
        })
        .catch(function(erro) {
          alert(erro)
        })
  }

  useEffect(() => {
    void buscarFeriados()
  }, [country])

  return (
    <View>
      <Text>Consumindo uma API</Text>
      <Text>Listando os Feriados</Text>
      <FlatList
        data={feriados}
        renderItem={({item}) => (
          <View>
            <Text>Nome: {item.localName}</Text>
            <Text>Data: {item.date}</Text>
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
    justifyContent: 'center',
  },
});
