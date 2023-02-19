import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import globalStyles from './styles'
import { formatearValor } from './Helpers'
import { useState, useEffect } from 'react'
const ControlPresupuesto = ({presupuesto, gastos}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => 
    {
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total,0)
        const totalDisponible = presupuesto - totalGastado


        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [])
    
  return (
    <View style={styles.contenedor}>
        <View style={styles.centrarGrafica}>
            <Image source={require('../img/grafico.jpg')} style={styles.imagen} />
        </View>


        <View style={styles.contenedorTexto}>
            <Text style={styles.valor}>
                <Text style={styles.label}> Presupuesto: {''}</Text>
                {formatearValor(presupuesto)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}> Disponible: {''}</Text>
                {formatearValor(disponible)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}> Gastado: {''}</Text>
                {formatearValor(gastado)}
            </Text>
        </View>
    </View>
  )
}

const styles= StyleSheet.create
({
    contenedor:
    {
        ...globalStyles.contenedor
    },
    centrarGrafica:
    {
        alignItems: 'center'
    },
    imagen:
    {
        width:250,
        height:250
    },
    contenedorTexto:
    {
        marginTop:50
    },
    valor:
    {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label:
    {
        fontWeight: '700',
        color:'#3B82F6'
    }
})

export default ControlPresupuesto