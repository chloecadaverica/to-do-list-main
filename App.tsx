import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, ImageBackground } from 'react-native';
import _tarefa from './types/tarefa';
import Tarefa from './components/Tarefa';

export default function App() {
  const [novaTarefa, setNovaTarefa] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  function adicionarTarefa() {
    if (novaTarefa == '') {
      alert("Insira um texto");
      return;
    }
    let tarefa: _tarefa = {
      id: tarefas.length + 1,
      texto: novaTarefa,
    };
    setTarefas([...tarefas, tarefa]);
  }

  function mostrarTarefas() {
    let saida = tarefas.map((t) => <Tarefa key={t.id} dados={t} handleDeletePress={excluir} />);
    return saida;
  }

  function excluir(id: number) {
    let f = tarefas.filter((t) => t.id != id);
    setTarefas(f);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://pbs.twimg.com/profile_images/1286342788985094150/Au7JdsCH_400x400.jpg' }}
      style={styles.container}
      key="main"
    >
      <Text style={styles.title}>To-Do List</Text>
      <TextInput style={styles.input} value={novaTarefa} onChangeText={setNovaTarefa} />
      <Button color="black" title="Adicionar tarefa" onPress={adicionarTarefa} />
      <ScrollView style={styles.list}>{mostrarTarefas()}</ScrollView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 300,
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
});