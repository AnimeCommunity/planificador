import React, { useState, useEffect } from 'react';
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
import { generarId } from './components/Helpers';
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Gasto from './components/Gasto';


function App(): JSX.Element {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true)
    } else {
      Alert.alert('Error', 'Presupuesto no valdio')
    }
  }

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.cantidad, gasto.categoria].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'OK' }])
      return
    }

    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }
    else
    {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
      
    }

    setModal(!modal)

  }

  const eliminarGasto = id  =>
  {
    Alert.alert('¿Deseas eliminar este gasto?', 'Un gasto eliminado no se puede recuperar', [{text:'No', style:'cancel'}, {text:'Si, eliminar', onPress: () => 
    {
      const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id )
      setGastos(gastosActualizados)
      setModal(!modal)
      setGasto({}) 
    }}])
  }


  useEffect(() => 
  {
    const obtenerPresupuesto =async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0



        if(presupuestoStorage > 0)
        {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true )
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuesto()
  }, [])
  useEffect(() => {
    if(isValidPresupuesto)
    {
      const guardarPresupuesto = async ()=>
      {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)

          
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuesto()
    }
  }, [isValidPresupuesto])
  
  useEffect(()=>
  {
    const cargarGastos = async ()=>
      {
        try {
          const gastosStorage = await AsyncStorage.getItem('planificador_gastos') ??[]

          setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])

          
        } catch (error) {
          console.log(error)
        }
      }
      cargarGastos()
  },[])

  useEffect(()=>
  {
    const guardarGastos = async ()=>
      {
        try {
          await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))

          
        } catch (error) {
          console.log(error)
        }
      }
      guardarGastos()
  },[gastos])






  const resetearApp = ()=> 
  {
    Alert.alert('Deseas resetear la app?', 'Esto eliminara el presupuesto y gastos', 
    [{text:'No', style:'cancel'}, {text:'Si, quiero reiniciar la app', onPress: async () => 
    {
      try {
        await AsyncStorage.clear()


        setIsValidPresupuesto(false)
        setPresupuesto(0)
        setGastos([])
      } catch (error) {
        console.log(error)
      }
    }}])
  }

  

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (<ControlPresupuesto presupuesto={presupuesto} gastos={gastos} resetearApp={resetearApp} />) : (
            <NuevoPresupuesto
              setPresupuesto={setPresupuesto}
              presupuesto={presupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto &&
          (
            <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              setGastosFiltrados={setGastosFiltrados}
            />

            </>
          )}
      </ScrollView>


      {modal &&
        (
          <Modal
            animationType='slide'
            visible={modal}
            onRequestClose={() => { setModal(!modal) }}
          >
            <FormularioGasto 
              setModal={setModal} 
              handleGasto={handleGasto} 
              gasto={gasto} 
              setGasto={setGasto} 
              eliminarGasto={eliminarGasto}
              />
          </Modal>
        )}
      {isValidPresupuesto &&
        (
          <Pressable 
            style={styles.pressable}
            onPress={() => setModal(!modal)}>
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
    backgroundColor: '#3B82F6',
    minHeight: 400

  },
  imagen:
  {
    width: 60,
    height: 60,
   
  },
  pressable:
  {
    width: 60,
    height: 60,
    position: 'absolute', 
    bottom: 40,
    right: 30
  }
});

export default App;
