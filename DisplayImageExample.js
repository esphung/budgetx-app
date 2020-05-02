
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const test = 'https://reactnative.dev/img/tiny_logo.png';

// const uri = 'https://profilepicturesbucketbudgetxbudgetxenv-budgetxenv.s3.amazonaws.com/public/%407aa3ee40-31e8-4676-bc6e-6a0b5b48b671/B6CC489E-7A58-4098-A68A-FBEFEE7B22EC.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAYP3FJDYZS53IN3IL%2F20200501%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200501T232402Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLWVhc3QtMSJHMEUCIQCuFALRDvfuG3QYr87ZvVB6wyEolWVFYtxHIi3ytkPzTAIgAviTXzJqNUdQh3KXyj1KeGvYN553x4n%2BuM0gEMfSfXQq%2FgMIORABGgw1ODM3OTEwOTEyNTEiDA7xZtVhSDlyum1qoirbAzAh8gu5%2B2qDFvteDWIBVt%2FlphwkEGn2hEVDUs12z6PaPFcK4qUXPSdb1t2n1B0%2F%2FmXZD%2BTfw%2BLY6WxftY6GMLVa3qoVMgkX985UUulGNtNE8KQr%2FYQ99dC7%2B61XBoj3qHAKQDrjaeIFy9vVfZhcIbsP9R36zGSawINEYBiokSafuD66r5FTRHg2IRVEXctYlQm3TuhfH8Wq%2FcwNaZkQiPWCNc9MH%2Bds%2BvHsthpgrRLOGpED9PfOA1YKvg6Ds1Id11bfGkAYstpw4Hp%2FkjeMUEeKX3FrcsRKVWoASPpBYPJ%2FyJVMZsv35k8qZ3vH76lWbEMR8i%2F%2BDCtR7KzHTl0pCJQIFQr0LyCiHd4xAf2%2BxsAgz7eVlsw1f36Y3A%2BwTiDU7arEkIKhyRAZ3hiL0oe0y39ocHfcUrC%2FKGdHpobgNsTZRm%2F7v6qjsvNHYkhUnzdUntj9z%2BQwd98xSiZ20K089ZLZsGgazrRzsNlNPO2nZpisSxoYdaPuGbbMVuUAkW9AnF1nBze76FqGLlOK6HXawTL9fW%2F%2FfPNPbBMG4aIqolW2ekSoK1O7%2FzDfSYWgqsYaqBRHF80eHNfWJNk4rWkep4Czwm6rkJoIJRIsv6Zkt10AqkPb0bSwIkyKXjwwkN%2By9QU6ywInqo8ue5uvWwDCZJy2blHs7wjXVQpKtQtuzdvceeBUb%2B3VUKlGVaplxGQzzR2Yln6rl6iOv3ZBMymPcVamY80GiZSBiLvy2aAzckIY2Lqaz4RMAEpHzzyb3sfHQ99cgDHPOSjFWmhKLIHeds4dLEm0CiceB0h5fFyPL0UqvZkxBLIZk0o1qCbXSBenrDgf0NSMD4oHOVeSB4dsLmn7FPqwc1qy1HSHgs29txZaHJhe9pMJH68rxmdblMKiEWqp5l4CWT1gHqNl8XTIEIkKMzPzm36GK4r%2BvP6mSJtmMzMNe6%2FUgKuyle25wCCiZdMbBkuaVilXm3bv0Ux0GPsJteyAKsnD5KQLblBjobgB%2F7qihEN%2Fmr4hW3pu3XtloCUHqdXmoJphvjVlp9RAQkgrHY7Zi2oCnJNVum%2BXk5myRki11BQ%2BUXx6UDJikfHX&X-Amz-Signature=dace7c39a30e0e284a60d995e5d67e285c042e9bbcba42ee611b7349616befdb&X-Amz-SignedHeaders=host'

function DisplayAnImage(props) {
  const { uri } = props;
  const storedImage = <Image
        style={styles.tinyLogo}
        source={global.defaultAvatar}
      />;
  const webUrl = <Image
        style={styles.tinyLogo}
        source={{
          uri: (uri) ? uri : test
        }}
      />;
  // const uriImage = <Image
  //       style={styles.logo}
  //       source={{
  //         uri:
  //           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
  //       }}
  //     />

  return (
    <View style={styles.container}>

    { !uri && storedImage || webUrl }

   

    {
      // uriImage
    }


      
            
    </View>
  );
}

export default DisplayAnImage;
