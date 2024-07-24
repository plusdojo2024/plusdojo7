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

    componentDidMount(){
        fetch("/api/mypage/skin")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                characters:json
            })
        });
    }

    render(){
        const{characters}= this.state;
        return(
        <wrapper>
        <Header />
            
            <div className ="background_image_renga">
        
            
            <Tabs id ="GameMypageTab">
                <TabList id="GameMypageTabList">
                    <Tab>スキン</Tab>
                    <Tab>実績</Tab>
                </TabList>

                <TabPanel style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center' }}> 

                    {characters.map((character,index) =>(
                        <div id="characterskin">
                        <img src={character.character_image} style={{height:'70px',margin:'10px'}}></img>
                        <button  onClick={() =>{this.modCharacterSkin(index)}} id="skinchange_button" style={{ gridColumn: 'span 2', alignSelf: 'center' }}>変更</button>
                        </div>
                    ))}



                    {/* <button  id="skinchange_button" style={{ gridColumn: 'span 2', alignSelf: 'center' }}>変更</button> */}
                </TabPanel>
            
            <TabPanel>
            <h2>80個タスク完了！</h2>
            <h2>60個タスク完了！</h2>
            <h2>40個タスク完了！</h2>
            <h2>20個タスク完了！</h2>
            </TabPanel>
            </Tabs>
            <img src="../images/character_yusha_01_red.png" alt="アバター" style={{height:'70px',margin:'10px'}}></img>
            </div>
            
            
        <Footer />
        </wrapper>
        );
    }
}