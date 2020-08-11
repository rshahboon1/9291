import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import { Text, Button } from 'native-base';
const toYoutube = (site) => {
    try {

        // const GOOGLE_PACKAGE_NAME = 'com.frawla.phonelookup';
        Linking.canOpenURL(site).then(supported => {
            if (supported) {
                Linking.openURL(site);
            } else {
                console.log("Don't know how to open URI: " + site);
            }
        });
    } catch (error) {

    }
}
export default function YoutubeWatch({ title, mylink, img, description }) {
    // toYoutube(mylink);
    console.log(img, 'the image');
    return (


        <ImageBackground
            source={{ uri: img }}
            style={{
                marginBottom: 8,
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center",
                maxHeight: 70
            }}
        >
            <Button
                transparent
                style={{ height: '100%', flexDirection: 'column' }}
                onPress={() => toYoutube(mylink)}>

                <Text style={{ color: '#f1f1f1' }}>{title}</Text>
                <Text style={{ color: '#eee', fontSize: 12, textAlign: 'center' }}>{description}</Text>
            </Button>

        </ImageBackground>

    );
}

