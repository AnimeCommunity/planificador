import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setModal, setGasto, filtro, setGastosFiltrados}) => {

    

  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>
            Gastos
        </Text>


        {filtro ? setGastosFiltrados.map(gasto => 
        (
            <Gasto
                    key={gasto.id} 
                    gasto={gasto}
                    setModal={setModal}
                    setGasto={setGasto}
                />
        )) : gastos.map(gasto => 
        (
            <Gasto
                    key={gasto.id} 
                    gasto={gasto}
                    setModal={setModal}
                    setGasto={setGasto}
                />
        ))}

        {(gastos.length === 0 || (setGastosFiltrados.length === 0 && !!filtro)) &&
        (
            <Text style={styles.noGastos}>No hay gastos</Text>
        )}



    </View>
  )
}

const styles = StyleSheet.create
({
    contenedor:
    {
        marginTop: 30,
        marginBottom:100

    },
    titulo:
    {
        color:'#64748B',
        fontSize:30,
        textAlign: 'center',
        fontWeight:'800',
        marginTop:20
    },
    noGastos:
    {
        marginVertical:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'700'
    }
})

export default ListadoGastos
