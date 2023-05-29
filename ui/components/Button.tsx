/* eslint-disable react/require-default-props */
import { StyleSheet, View, Pressable, Text } from 'react-native';
import React from 'react';

interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  fontColor?: string;
  margin?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  fontSize?: number;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  horizontalPadding,
  margin,
  verticalPadding,
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  fontColor,
  fontSize,
  onPress,
}: ButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    button: {
      paddingHorizontal: horizontalPadding,
      margin,
      paddingVertical: verticalPadding,
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: fontColor ?? '#fff',
      fontSize: fontSize ?? 14,
      letterSpacing: 0.25,
      fontFamily: 'Menlo-Regular',
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgba(255,255,255,0.02)'
              : 'rgba(255,255,255,0.05)',
          },
          styles.button,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
