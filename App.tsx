import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native';
import Header from './components/header';
import NuevoPresupuesto from './components/NuevoPresupuesto';
import ControlPresupuesto from './components/ControlPresupuesto';
import FormularioGasto from './components/FormularioGasto';

function App(): JSX.Element {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)

  const handleNuevoPresupuesto = (presupuesto) =>
  {
    if(Number(presupuesto)>0)
    {
      setIsValidPresupuesto(true)
    } else
    {
      Alert.alert('Error', 'Presupuesto no valdio')
    }
  }
  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Header />
        {isValidPresupuesto ? (<ControlPresupuesto presupuesto ={presupuesto} gastos={gastos}/>) : (
          <NuevoPresupuesto 
          setPresupuesto={setPresupuesto}
          presupuesto ={presupuesto}
          handleNuevoPresupuesto ={handleNuevoPresupuesto}
          />
        )}
      </View>
      {modal &&
      (
        <Modal
          animationType='slide'
          visible={modal}
          onRequestClose={()=>{ setModal(!modal)}}
        >
          <FormularioGasto setModal={setModal} />
        </Modal>
      )}     
      {isValidPresupuesto && 
      (
        <Pressable onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen} 
            source={require('./img/nuevo-gasto.png')} 
          />
        </Pressable>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor:
  {
    backgroundColor: '#F5F5F5',
    flex: 1

  },
  header:
  {
      backgroundColor:'#3B82F6',
      
  },
  imagen:
  {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 10,
    right: 20
  }
});

export default App;
