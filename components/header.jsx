import React from 'react'
import { Text, Vie, StyleSheet, View, SafeAreaView } from 'react-native'

const Header = () => {
  return (
    <SafeAreaView>
        <Text  style={styles.texto}>
            Planificador de gastos
        </Text>
        
    </SafeAreaView>
  )
}

const styles= StyleSheet.create
({

    texto:
    {
        textAlign: 'center',
        fontSize: 30,
        color:'#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 20,
        
    }
})

export default Header