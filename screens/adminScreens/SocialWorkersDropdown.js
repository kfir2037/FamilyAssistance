import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const SocialWorkersDropdown = (props) => {

    const pickerStyle = {
        inputIOS: {
            fontWeight:'bold',
            color: 'white',
            paddingTop: 13,
            paddingHorizontal: 10,
            paddingBottom: 12,
            borderWidth: 1,
            borderColor: 'black',
            alignItems:'flex-end'
        },
        inputAndroid: {
            color: 'white',
            fontWeight:'bold',
            fontsize: 20,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: 'black',
            alignItems:'flex-end'


        },
        
        underline: { borderTopWidth: 1 },
        icon: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 5,
            borderTopColor: '#00000099',
            borderRightWidth: 5,
            borderRightColor: 'transparent',
            borderLeftWidth: 5,
            borderLeftColor: 'transparent',
            width: 30,
            height: 0,
            top: 20,
            right: 15,
        },
        

    };
    return (
        <RNPickerSelect

            // onValueChange={(value) => console.log(value)}
            onValueChange={(value) => props.socialWorkerSelected(value)}
            items={props.families}
            // items={[
            //     { label: 'משפחת כהן', value: 'kfir' },
            //     { label: 'משפחת לוי', value: 'noa' },
            //     { label: 'משפחת אהרונוביץ', value: 'shimon' },
            // ]}

            InputAccessoryView={() => null}
            placeholder={{ label: 'בחר עו"ס... ', value: null, color: 'lightgray' }}
            placeholderTextColor='white'
            
            style={pickerStyle}
        // value={this.state.favSport2}
        />
    );
};

export default SocialWorkersDropdown;