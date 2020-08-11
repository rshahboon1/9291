import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import { Text, Button } from 'native-base';
const toStore = (site) => {
    try {

        // const GOOGLE_PACKAGE_NAME = 'com.frawla.phonelookup';
        Linking.canOpenURL(`market://details?id=${site}`)
            .then(supported => {
                if (!supported) {
                    console.log('not supoorted');
                    Linking.openURL(`https://play.google.com/store/apps/details?id=${site}`);

                } else {
                    // console.log('its suported')
                    Linking.openURL(`market://details?id=${site}`);
                }
            })
            .catch(err => console.log(err));
    } catch (error) {

    }
}
export default function AppDownload({ title, mylink, img, description }) {
    // toStore(mylink);
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
                onPress={() => toStore(mylink)}>

                <Text style={{ color: '#f1f1f1' }}>{title}</Text>
                <Text style={{ color: '#eee', fontSize: 12, textAlign: 'center' }}>{description}</Text>
            </Button>

        </ImageBackground>

    );
}

