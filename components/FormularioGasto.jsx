import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from './styles'
const FormularioGasto = ({ setModal, handleGasto, setGasto, gasto, eliminarGasto }) => {

    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if (gasto?.nombre) {
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
            setFecha(gasto.fecha)

        }
    }, [gasto])

    return (
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.contenedorBtns}>
                <Pressable style={[styles.btn, styles.cerrarBtn]} onPress={() => {
                    setModal(false)
                    setGasto({})
                }}>
                    <Text style={styles.TextoBtn}>
                        Cancelar
                    </Text>
                </Pressable>


                {!!id && (

                    <Pressable style={[styles.btn, styles.eliminarBtn]} onLongPress={() => eliminarGasto(id)}>
                        <Text style={styles.TextoBtn}>
                            Eliminar
                        </Text>
                    </Pressable>

                )}



            </View>

            <View style={styles.formulario}>
                <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>
                        Nombre gasto
                    </Text >
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre del gasto. Ej: Comida'
                        value={nombre}
                        onChangeText={setNombre}
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
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>
                        Cantegoria gasto
                    </Text>
                    <Picker selectedValue={categoria} onValueChange={(value) => { setCategoria(value) }}>
                        <Picker.Item label='-- Seleccione --' value='' />
                        <Picker.Item label='Ahorro' value='ahorro' />
                        <Picker.Item label='Comida' value='comida' />
                        <Picker.Item label='Casa' value='casa' />
                        <Picker.Item label='Gastos varios' value='gastos' />
                        <Picker.Item label='Ocio' value='ocio' />
                        <Picker.Item label='Salud' value='salud' />
                        <Picker.Item label='Suscripciones' value='suscripciones' />
                    </Picker>
                </View>

                <Pressable style={styles.submitBtn} onPress={() => handleGasto({ nombre, cantidad, categoria, id, fecha })}>
                    <Text style={styles.btnText}>
                        {gasto?.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}
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
            flex: 1
        },
        formulario:
        {
            ...globalStyles.contenedor
        },
        titulo:
        {
            textAlign: 'center',
            fontSize: 28,
            marginBottom: 30,
            color: '#64748B'
        },
        campo:
        {
            marginVertical: 10
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
            padding: 10,
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
        contenedorBtns:
        {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        btn:
        {
            padding: 10,
            marginTop: 30,
            marginHorizontal: 10,
            width: '40%',
            flex: 1
        },
        eliminarBtn:
        {
            backgroundColor: 'red'
        },
        cerrarBtn:
        {
            backgroundColor: '#DB2777',

        },
        TextoBtn:
        {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#FFF',
            textAlign: 'center'
        },

    })

export default FormularioGasto