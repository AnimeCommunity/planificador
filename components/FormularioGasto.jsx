import React from 'react'
import { Text, SafeAreaView, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from './styles'
const FormularioGasto = ({setModal}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
        <View>
            <Pressable style={styles.cerrarBtn} onPress={() => setModal(false)}>
                <Text style={styles.textoCerrar}>
                    Cancelar
                </Text>
            </Pressable>
        </View>

        <View style={styles.formulario}>
            <Text style={styles.titulo}>Nuevo gasto</Text>

            <View style={styles.campo}>
                <Text style={styles.label}>
                    Nombre gasto
                </Text >
                <TextInput
                    style={styles.input} 
                    placeholder='Nombre del gasto. Ej: Comida'
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>
                    Cantidad gasto
                </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Cantidad del gasto. Ej: 300'
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>
                    Cantegoria gasto
                </Text>
                <Picker>
                    <Picker.Item label='-- Seleccione --' value=''/>
                    <Picker.Item label='Ahorro' value='ahorro'/>
                    <Picker.Item label='Comida' value='comida'/>
                    <Picker.Item label='Casa' value='casa'/>
                    <Picker.Item label='Gastos varios' value='gastos'/>
                    <Picker.Item label='Ocio' value='ocio'/>
                    <Picker.Item label='Salud' value='salud'/>
                    <Picker.Item label='Suscripciones' value='suscripciones'/>
                </Picker>
            </View>

            <Pressable style={styles.submitBtn}>
                <Text style={styles.btnText}>
                    Agregar gasto
                </Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create
({
    contenedor:
    {
        backgroundColor: '#1E40AF',
        flex:1
    },
    formulario:
    {
        ...globalStyles.contenedor
    }, 
    titulo:
    {
        textAlign: 'center',
        fontSize: 28,
        marginBottom:30,
        color: '#64748B'
    }, 
    campo:
    {
        marginVertical:10
    }, 
    label:
    {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:
    {
        backgroundColor: '#F5F5F5',
        padding:10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtn:
    {
        backgroundColor: "#3B82F6",
        padding: 10,
        marginTop: 20,
    },
    btnText:
    {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    cerrarBtn:
    {
        backgroundColor: '#DB2777',
        padding:10,
        marginTop:30,
        marginHorizontal:10,
    },
    textoCerrar:
    {
        textTransform: 'uppercase',
        fontWeight:'bold',
        color:'#FFF',
        textAlign:'center'
    }
})

export default FormularioGasto