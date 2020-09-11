import {useState} from 'react';
import '../styles/global.css'
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
export default function App({Component, pageProps}){
  const [appLang,setAppLang] = useState('eng');
  const languageHandler = (selectedLang) => {
    setAppLang(selectedLang)
  }
  return(
    <div className='app'>
    <Header languageHandler={languageHandler} />
    <Component language={appLang} {...pageProps} />
    <Footer language={appLang}/>
    </div>
  )
}
