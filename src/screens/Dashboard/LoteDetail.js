import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native'
import { images } from '../../common/images'
import { p } from '../../common/normalize'
import { colors } from '../../common/colors'
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Carousel from 'react-native-banner-carousel'
import text from '../../common/text'
import Cstyles from '../../common/c_style'
import * as ICON from '../../components/Icons'
import * as ATOM from '../../components/Atoms'
import * as HEADER from '../../components/Headers'
import * as actions from "../../store/lotes/actions"
import _ from 'underscore'

const width = Math.round(Dimensions.get('window').width);

class LoteDetail extends Component {

    constructor() {
        super();
        this.state = {
            video: false,
            myNote: null
        }
    }

    componentDidMount(){

        const note_index = _(this.props.testNotes).chain().pluck('_id').flatten().findIndex({ week: this.props.week }).value();
        const field_index = _.findIndex(this.props.testNotes[note_index].notes, { note_id: this.props.note_id });
        const note = this.props.testNotes[note_index].notes[field_index];
        this.setState({
            myNote: note
        })

        console.log( ' **************************', note)

    }

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: width, height: p(209) }} source={{ uri: image }} />
            </View>
        );
    }

    render() {

        const { video, myNote } = this.state;
        const data = this.props.navigation.state.params.data;
        // const note = this.props.note
        const testLote = this.props.testLote

        if(!myNote){
            return false
        }

        return (
            <View style={Cstyles.container}>
                <HEADER.Gradient 
                    color={colors.ORANGE} 
                    title={'EDITOR'} 
                    data={data} 
                    onClick={()=>Actions.lotesedit({ 
                        note_id: this.props.note_id, 
                        week: this.props.week,
                        update: (x)=>this.setState({ myNote: x })  
                    })}
                />
                <ScrollView>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        pageIndicatorStyle={{ backgroundColor: colors.WHITE }}
                        activePageIndicatorStyle={{ backgroundColor: colors.ORANGE }}
                        pageIndicatorContainerStyle={{ fontSize: 70 }}
                        index={0}
                        pageSize={width}
                    >
                        <Image style={{ width: width, height: p(209) }} source={{ uri: myNote.file_url }} />

                        {/* {CONFIG.carouselList.map((image, index) => this.renderPage(image, index))} */}
                    </Carousel>

                    <View style={styles.view}>
                        <Image source={images.msg} style={{ width: p(30), height: p(30) }} />
                        <Text style={text.t_32_700_ff_t8}>{myNote.title}</Text>
                        {/* <Text numberOfLines={4} style={text.t_15_600_ff}>{data.overview}</Text> */}
                    </View>

                    <Image source={{ uri: myNote.file_url }} style={styles.img} />

                    <ATOM.Atom1
                        icon={<ICON.IconMap />}
                        title={'Ubicación y coordenadas'}
                        note={myNote.geo_tag ? 'Comming soon' : 'NULL'}
                    />

                    <ATOM.Atom1
                        icon={<ICON.IconSquare />}
                        title={'En lote'}
                        note={`Lote ${testLote.name} - ${testLote.group}`}
                    />

                    <ATOM.Atom1
                        icon={<ICON.IconPin />}
                        title={'Archivos adjuntos'}
                        note={myNote.timeoffset + ' Archivo'}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.WHITE, paddingVertical: p(22) }}>
                        {/* <Image source={{ uri: myNote.file_url }} style={styles.video} /> */}
                        {
                            video ? <ICON.IconPause onClick={() => this.setState({ video: !video })} /> : <ICON.IconVideo onClick={() => this.setState({ video: !video })} />
                        }
                        <Text style={text.t_14_500_98}>{'Nota de voz 0:23 '}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state => ({
        testLote: state.lotes.testLote,
        testNotes: state.lotes.testNotes
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(LoteDetail);

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.ORANGE,
        elevation: 3,
        padding: p(30),
        paddingVertical: p(30)
    },
    video: {
        width: p(225),
        height: p(225),
        marginBottom: p(23),
        marginRight: p(3),
        borderRadius: p(5)
    }
});