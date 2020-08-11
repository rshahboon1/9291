import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import { Text, Button } from 'native-base';
const toSite = (site) => {

    try {
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
export default function Site({ title, mylink, img, description }) {
    // toSite(mylink);
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
                onPress={() => toSite(mylink)}>

                <Text style={{ color: '#f1f1f1' }}>{title}</Text>
                <Text style={{ color: '#eee', fontSize: 12, textAlign: 'center' }}>{description}</Text>
            </Button>

        </ImageBackground>

    );
}

