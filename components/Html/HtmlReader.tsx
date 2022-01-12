import React, {useMemo} from 'react'
import HTML from 'react-native-render-html';

import { Linking, Dimensions, Text} from 'react-native'
// import iframe from '@native-html/iframe-plugin';
import Global from '../Global';
import WebView from 'react-native-webview';
const { width, height } = Dimensions.get('window');

  

interface Props {
    html: string;
    youtube: string;
}
    
// const tagsStyles = React.useMemo(
//     () => ({
//         p:{color:'black', textAlign:'justify', fontSize:20,},
//         a:{color: Global.COLOR.DARK, fontWeight:'bold', textAlign:'justify', fontSize:20},
//         span:{color: Global.COLOR.BLACK, fontWeight:'bold', textAlign:'justify', fontSize:30},
//         img:{ width: 50, height:200},
//     }),
    
//   );

const tagsStyles = {
    p:{color:'black', textAlign:'justify', fontSize:20,},
    a:{color: Global.COLOR.DARK, fontWeight:'bold', textAlign:'justify', fontSize:20},
    span:{color: Global.COLOR.BLACK, fontWeight:'bold', textAlign:'justify', fontSize:30},
    img:{ width: 50, height:200},
  };
  
const HtmlReader = (props: Props) =>{




      
    const youtubeIframe = `
    <p>
    <iframe width="560"
            height="315"
            src="https://www.youtube.com/embed/POK_Iw4m3fY"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
    </p>
    <p>This is a paragraph.</p>
    `;
    return(
        <>
        
      <HTML 
      source={{ html: props.html }}
        // html={props.html}
            onPress={(event, href) =>{
                Linking.openURL(href) 
            }}
            contentWidth={width} 
            
            // ignoredStyles={[ ...IGNORED_TAGS, 'span']}

            ignoredStyles={['padding', 'lineHeight', 'fontWeight']}
            
            tagsStyles={tagsStyles}
        />

        {
        props.youtube !== null?(
            
            <>
        <WebView
        source={{html: `<iframe width="95%" height="600" src="${props.youtube}" frameborder="2" 
        allow="autoplay;" allowfullscreen></iframe>`}}
        style={{marginTop: 20, height: 280, width:width, borderRadius:20, }}
     />
     </>
            ):null
        }

        </>

    )
}
export default HtmlReader;