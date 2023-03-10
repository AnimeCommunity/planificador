import React from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import globalStyles from './styles'

const NuevoPresupuesto = ({handleNuevoPresupuesto, setPresupuesto, presupuesto}) => {
    
    

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>
                Definir presupuesto
            </Text>

            <TextInput
                keyboardType='numeric'
                placeholder='Agrega tu presupuesto:
                Ej: 300'
                style={styles.input}
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />

            <Pressable style={styles.boton} onPress={() => handleNuevoPresupuesto(presupuesto)} >
                <Text style={styles.btnTexto}>
                    Agregar presupuesto
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create
    ({
        contenedor:
        {
            ...globalStyles.contenedor

        },
        texto:
        {
            textAlign: 'center',
            fontSize: 30,
            color: '#FFF',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            paddingVertical: 20
        },
        label:
        {
            textAlign:'center',
            fontSize:24,
            color: '#3B82F6'
        },
        input:
        {
            backgroundColor: '#F5F5F5',
            padding:10,
            borderRadius:10,
            textAlign: 'center',
            marginTop: 30,
            borderColor: '#3B82F6',
            fontWeight: '800',
            borderWidth: 1
        },
        boton:
        {
            marginTop:30,
            backgroundColor: '#1048A4',
            padding:10,
            borderRadius: 10,
            
        },
        btnTexto:
        {
            color:'#FFF',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight:'bold'
        },
    })

export default NuevoPresupuesto