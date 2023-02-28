import React from 'react'
import { Text, Pressable, View, StyleSheet } from 'react-native'
import globalStyles from './styles'
import { formatearValor } from './Helpers'
import { useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'


const ControlPresupuesto = ({presupuesto, gastos, resetearApp}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentakje] = useState(0)
    useEffect(() => 
    {
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total,0)
        const totalDisponible = presupuesto - totalGastado
        
        const nuevoPorcentaje = 
        (
            ((presupuesto - totalDisponible)/presupuesto) *100
        )
        setTimeout(() => {
            setPorcentakje(nuevoPorcentaje)
        }, 1500);
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])
    
  return (
    <View style={styles.contenedor}>
        <View style={styles.centrarGrafica}>
            <CircularProgress 
                value={porcentaje}
                duration={1000}
                radius={150}
                valueSuffix={'%'}
                inActiveStrokeColor={'#F5F5F5'}
                inActiveStrokeWidth= {20}
                activeStrokeColor={'#3B82F6'}
                activeStrokeWidth={20}
                titleStyle={{fontWeight:'bold', fontSize:20}}
                titleColor={'#64748b'}
               
            />
        </View>


        <View style={styles.contenedorTexto}>

            <Pressable style={styles.boton} onLongPress={resetearApp}>
                <Text style={styles.textoBoton}>
                    Reiniciar APP
                </Text>
            </Pressable>

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
    boton:
    {
        backgroundColor:'#DB2777',
        padding:10, 
        marginBottom: 40,
        borderRadius: 10
    },
    textoBoton:
    {
        textAlign:'center',
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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