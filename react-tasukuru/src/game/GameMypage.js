import React from 'react';
import axios from "axios";
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

            select_id: 0,
            select_skin: "",

            key: 0,
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

    modSkin=(select_id, characterImage)=>{
        
            // fetch("/api/mypage/skin/mod")
            console.log(characterImage);
            this.setState({
                select_id: select_id,
                select_skin: characterImage
            });
        }
    
    changeSkin=()=>{
        const {select_id, key} = this.state;

        const data = {
            characterId: select_id
        };

        console.log(data);
        
        axios.post("/api/mypage/skin/mod",data)
        .then(json =>{
            console.log(json);
            // this.componentDidMount();

            this.setState({
                key: key + 1
            });
        });
        
    }

    render(){
        const{characters,index,select_skin}= this.state;
        return(
        <wrapper>
        <Header key={this.state.key} />
            
            <div className ="background_image_renga">
        
            
            <Tabs id ="GameMypageTab">
                <TabList id="GameMypageTabList">
                    <Tab>スキン</Tab>
                    <Tab>実績</Tab>
                </TabList>

                <TabPanel style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center' }}> 
                
                    {characters.map((character,index) =>(
                        <div id="characterskin">
                        <img src={character.characterImage} id="skin"onClick={() => this.modSkin(character.id, character.characterImage)} style={{height:'70px',margin:'10px'}}></img>
                        
                        
                        </div>
                    ))} 
                    <button  onClick={() =>this.changeSkin()} id="skinchange_button" style={{ gridColumn: 'span 2', alignSelf: 'center' }}>変更</button>
                </TabPanel>
           
            <TabPanel>
            <h2>80個タスク完了！</h2>
            <h2>60個タスク完了！</h2>
            <h2>40個タスク完了！</h2>
            <h2>20個タスク完了！</h2>
            </TabPanel>
            </Tabs>
             <img hidden src={select_skin} alt="アバター" class="changeskinphoto" style={{height:'70px',margin:'10px'}}></img>
            </div>
            
            
        <Footer />
        </wrapper>
        );
    }
}