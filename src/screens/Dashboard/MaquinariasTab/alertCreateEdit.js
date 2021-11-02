import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { colors } from '../../../common/colors';
import { p } from '../../../common/normalize';
import * as ICON from '../../../components/Icons';
import * as HEADER from '../../../components/Headers';
import * as ATOM from '../../../components/Atoms';
import Cstyles from '../../../common/c_style';
import text from '../../../common/text';

export default class MachineryAlertsCreateEdit extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: props.navigation.state.params.title,
      speed: '7',
      speed2: 'Tres',
      time: '10'
    }
  }
  
  render() {

    const title = this.props.navigation.state.params.title;
    const icon = this.props.navigation.state.params.icon;

    console.log('**************************************', title)

    return (
      <View style={Cstyles.container}>

        <HEADER.GUARDAR back={colors.RED} />

        <ScrollView>

          <View style={styles.view}>
            <View style={{ marginHorizontal: p(65), justifyContent: 'center' }}>
              <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
              />
            </View>
          </View>

          <ATOM.Atom1
            icon={<ICON.IconTrackGrey />}
            title={'Maquinaria:'}
            note={'Tractor 150'}
          />

          <ATOM.Atom1
            icon={icon}
            title={'Tipo de Alerta:'}
            note={title}
          />

          <View style={[styles.itemView, { borderBottomWidth: 0 }]}>
            <ICON.IconGreenCheck right={p(20)} left={p(7)} />
            <Text style={text.t_10_500_8b}>{'Velocidad Máxima: '}</Text>
            <TextInput
              style={styles.textinput2}
              onChangeText={(speed) => this.setState({ speed })}
              value={this.state.speed}
            />
            <Text style={text.t_18_500_2b}>{'km/h'}</Text>
          </View>

          <View style={[styles.itemView, { borderBottomWidth: 0 }]}>
            <ICON.IconError right={p(22)} left={p(5)} />
            <Text style={text.t_10_500_8b}>{'Velocidad Mínima: '}</Text>
            <TextInput
              style={styles.textinput2}
              onChangeText={(speed2) => this.setState({ speed2 })}
              value={this.state.speed2}
            />
            <Text style={text.t_18_500_2b}>{'km/h'}</Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: p(-15) }}>
            <ICON.ImgMessageBar />
          </View>

          <View style={[styles.itemView, { borderBottomWidth: 0, marginLeft: p(46) }]}>
            <Text style={text.t_10_500_8b}>{'Margen de tiempo: '}</Text>
            <TextInput
              style={styles.textinput2}
              onChangeText={(time) => this.setState({ time })}
              value={this.state.time}
            />
            <Text style={text.t_18_500_2b}>{'min'}</Text>
          </View>

          <View style={styles.exclamation}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={text.t_16_500_98}>{'Alerta de ' + title }</Text>
              <ICON.IconCircleExc right={p(12)} />
            </View>
            <Text style={[text.t_12_400_98, { marginVertical: p(12) }]}>{'Ingresa umbrales de velocidad que coincidan con el óptimo para una determinada labor, cuando la velocidad de la maquinaria exceda el umbral, se disparará la alarma.'}</Text>
            <Text style={text.t_12_400_98}>{'Ejemplo: Si la velocidad máxima ingresada es 7 km/h y el márgen de tiemo ingresado es de 10 min, y la máquina va a 9 km/h durante 10 min, se disparará la alarma.'}</Text>
          </View>

        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    height: p(200),
    paddingHorizontal: p(14),
    paddingVertical: p(25),
    backgroundColor: colors.RED
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: p(23),
    backgroundColor: colors.WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    height: p(72),
    borderBottomColor: colors.GREY3,
    borderBottomWidth: 2
  },
  textinput: {
    height: p(52),
    marginTop: p(20),
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: p(37),
    fontWeight: '700',
    borderBottomColor: '#E39B9A',
    borderBottomWidth: 1
  },
  textinput2: {
    height: p(40),
    marginHorizontal: p(34),
    textAlign: 'center',
    color: '#2b2b2b',
    width: p(60),
    fontSize: p(18),
    fontWeight: '500',
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1
  },
  exclamation: {
    backgroundColor: colors.GREY3,
    paddingHorizontal: p(37),
    paddingVertical: p(21)
  }
})