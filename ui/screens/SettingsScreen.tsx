import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';

const SettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    buttonContainer: {
      alignSelf: 'center',
      flexDirection: 'column',
    },
    button: {
      width: 200,
      height: 40,
      marginBottom: 20,
    }
  });

  return(
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button 
            title='Create'
            width={styles.button.width}
            height={styles.button.height}
            marginBottom={styles.button.marginBottom}
            onPress={() => navigation.navigate('create')}
          />
          <Button 
            title='Import'
            width={styles.button.width}
            height={styles.button.height}
            marginBottom={styles.button.marginBottom}
            onPress={() => console.log('pressed')}
          />
          <Button 
            title='Set Default Program'
            width={styles.button.width}
            height={styles.button.height}
            marginBottom={styles.button.marginBottom}
            onPress={() => console.log('pressed')}
          />
          <Button 
            title='Edit Program'
            width={styles.button.width}
            height={styles.button.height}
            marginBottom={styles.button.marginBottom}
            onPress={() => console.log('pressed')}
          />
        </View>
    </View>
  );
}

export default SettingsScreen;
