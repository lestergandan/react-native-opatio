import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../../common/colors';
import { images } from '../../../common/images';
import { p } from '../../../common/normalize';
import { Actions } from 'react-native-router-flux';
import Cstyles from '../../../common/c_style';
import styles from './styles'
import * as DROPDOWN from '../../../components/DropDown';
import UtilService from '../../../common/utils'

export default class Noteas extends React.Component {

    constructor() {
        super();
        this.state = {
            isWaiting: false,
            searchKey: '',
            date_from: '2019-01-01',
            date_to: '2019-12-31',
            sort_by: 'date_to'
        }
    }

    renderItem = ({ item, index }) => {

        return (
            <View key={index} style={{ paddingHorizontal: p(15), flexDirection: 'row', backgroundColor: colors.WHITE }}>

                <View style={{ flex: 1, width: p(270) }}>

                    <View style={{ flexDirection: 'row', marginRight: p(30), marginLeft: p(90), marginVertical: p(14) }}>
                        <View style={{ backgroundColor: colors.GREY5, height: 1.2, flex: 1, alignSelf: 'center' }} />
                        <Text style={{ alignSelf: 'center', paddingHorizontal: p(16), fontSize: p(12) }}>{"Semana " + item._id.week + " del " + item._id.year}</Text>
                        <View style={{ backgroundColor: colors.GREY5, height: 1.2, flex: 1, alignSelf: 'center' }} />
                    </View>

                    <FlatList
                        data={item.notes}
                        keyExtractor={(item, i) => String(i)}
                        renderItem={({ item: x }) =>
                            <View style={{ flexDirection: 'row', backgroundColor: colors.WHITE }}>

                                <View style={{ flexDirection: 'column'}}>
                                    <Text style={{ fontSize: p(10), fontWeight: '500', color: '#303030', marginTop: p(20) }}>
                                        {UtilService.getMonth(x.date)}
                                    </Text>
                                    <Text style={{ fontSize: p(9), color: '#404040', marginTop: p(2) }}>
                                        {UtilService.getDatebylongNumberWithDate(x.date)}
                                    </Text>
                                </View>

                                <View style={{ width: p(10) }}>
                                    <Text style={{ fontSize: 9 }}></Text>
                                    <Text style={{ fontSize: 9 }}></Text>
                                </View>
                                <View style={{ marginLeft: p(10) }}>
                                    <View style={styles.timeDot}></View>
                                    <View style={styles.dot}></View>
                                </View>

                                <TouchableOpacity
                                    style={[styles.timeView, { paddingRight: p(12), position: 'relative', width: p(270) }]}
                                    onPress={() => Actions.lotedetail({ note: x, note_id: x.note_id, week: item._id.week })}
                                >
                                    <Image source={images.msg} style={styles.img} />
                                    <Text style={{ color: '#fff', fontSize: p(16), marginRight: p(30) }}>{x.title}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />


                </View>

            </View>
        )
    }

    render() {

        return (
            <View style={Cstyles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: p(25) }}>

                    <DROPDOWN.XSmall onClick={() => this.props.startModal()} title={'Fecha: ' + this.props.startDate} />

                    <DROPDOWN.XSmall onClick={() => this.props.endModal()} title={'Fecha: ' + this.props.endDate} />

                </View>

                {
                    this.props.notes &&
                    <FlatList
                        data={this.props.notes}
                        renderItem={this.renderItem}
                        keyExtractor={(item, i) => String(i)}
                    />
                }

            </View>
        )
    }
}