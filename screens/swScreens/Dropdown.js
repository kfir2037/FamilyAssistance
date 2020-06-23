import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = (props) => {

    const pickerStyle = {
        inputIOS: {
            color: 'white',
            paddingTop: 13,
            paddingHorizontal: 10,
            paddingBottom: 12,
        },
        inputAndroid: {
            color: 'brown',
            fontsize: 20,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: 'purple',

        },
        placeholderColor: 'red',
        underline: { borderTopWidth: 0 },
        icon: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 5,
            borderTopColor: '#00000099',
            borderRightWidth: 5,
            borderRightColor: 'transparent',
            borderLeftWidth: 5,
            borderLeftColor: 'transparent',
            width: 0,
            height: 0,
            top: 20,
            right: 15,
        },
    };
    return (
        <RNPickerSelect

            // onValueChange={(value) => console.log(value)}
            onValueChange={(value) => props.familySelected(value)}
            items={props.families}
            // items={[
            //     { label: 'משפחת כהן', value: 'kfir' },
            //     { label: 'משפחת לוי', value: 'noa' },
            //     { label: 'משפחת אהרונוביץ', value: 'shimon' },
            // ]}
            InputAccessoryView={() => null}
            style={pickerStyle}
        // value={this.state.favSport2}
        />
    );
};

export default Dropdown;