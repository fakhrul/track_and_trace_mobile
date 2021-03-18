import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, size } from '../../utils'

const ActionButtonCustom = ({ title, ...rest }) => {
  return (
    <View style={{alignContent:"center", alignSelf:"center"}}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.dark,
          paddingVertical: 14,
          borderRadius: 10,
          width: size.button
        }}
        {...rest}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default ActionButtonCustom;