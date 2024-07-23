import React from 'react';
import './GameMypage.css';
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
export default class GameMypage extends React.Component{

    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            characters:[],
            id:"",
            character_image:"",
            effect_image:"",
            
        }

    }

    

    render(){
        return(
        <wrapper>
        <Header />
            
            <div className ="background_image_renga">
        
            
            <Tabs id ="GameMypageTab">
                <TabList id="GameMypageTabList">
                    <Tab>スキン</Tab>
                    <Tab>実績</Tab>
                </TabList>

            <TabPanel style={{display:'grid'} }>

            <img src="../images\character_yusha_01_red.png" alt="アバター"  style={{width:'100px'}}></img>
            <img src="../images\character_yusha_01_red.png" alt="アバター"  style={{width:'100px'}}></img>
            <img src="../images\character_yusha_01_red.png" alt="アバター"  style={{width:'100px'}}></img>
            <img src="../images\character_yusha_01_red.png" alt="アバター"  style={{width:'100px'}}></img>
            <button id ="skinchange_button" >変更</button>

            </TabPanel>
            
            <TabPanel>
            <h2>80個タスク完了！</h2>
            <h2>60個タスク完了！</h2>
            <h2>40個タスク完了！</h2>
            <h2>20個タスク完了！</h2>
            </TabPanel>
            </Tabs>
            
            </div>
            
        <Footer />
        </wrapper>
        );
    }
}