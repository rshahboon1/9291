import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import { Text, Button } from 'native-base';
const toFacebook = (site, page, group) => {
    try {

        // const GOOGLE_PACKAGE_NAME = 'com.frawla.phonelookup';
        Linking.canOpenURL(`fb://`)
            .then(supported => {
                if (!supported) {
                    console.log('not supoorted');
                    Linking.openURL(site);

                } else {
                    if (page) {
                        console.log('thsi')
                        Linking.openURL('fb://page/' + page);
                    } else {
                        console.log('that', page, group)
                        Linking.openURL('fb://group/' + group);
                    }
                }
            })
            .catch(err => console.log(err));
    } catch (error) {

    }
}
export default function FacebookPageOrGroup({ title, mylink, img, description, page, group }) {
    // toFacebook(mylink);

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
                onPress={() => toFacebook(mylink, page, group)}>

                <Text style={{ color: '#f1f1f1' }}>{title}</Text>
                <Text style={{ color: '#eee', fontSize: 12, textAlign: 'center' }}>{description}</Text>
            </Button>

        </ImageBackground>

    );
}

