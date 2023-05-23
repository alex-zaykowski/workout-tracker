import {
  StyleSheet,
  View,
  Pressable,
  Text,
  GestureResponderEvent,
} from "react-native";


interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  fontColor?: string;
  backgroundColor?: string;
  margin?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  fontSize?: number;
  onPress: (event: GestureResponderEvent) => void;
}

const Button = (props: ButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
    },
    button: {
      paddingHorizontal: props.horizontalPadding,
      margin: props.margin,
      paddingVertical: props.verticalPadding,
      width: props.width,
      height: props.height,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: props.fontColor ?? "#fff",
      fontSize: props.fontSize ?? 14,
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
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.05)",
          },
          styles.button,
        ]}
        onPress={props.onPress}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
