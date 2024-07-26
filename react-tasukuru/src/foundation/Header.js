import React from 'react';
import './Header.css';
export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CharacterSkin :"",
        }
    }

    componentDidMount() {
            
        // 子供ユーザーデータを取得
        fetch("/api/mypage/")
        .then(res => res.json())
        .then(CharacterSkin => {
            console.log(CharacterSkin); // 子供ユーザーデータをコンソールに出力（確認用）
            this.setState({ CharacterSkin });
        })
        .catch(error => console.error("エラー", error));
        
    }
        
    render(){
        const {CharacterSkin}=this.state;
        return(

           <div className="header">
                {/* ログアウトボタン */}
                <button className="header_logout" onClick={this.logout} >ログアウト</button>
                {/* 個人名 */}
                <div className="header_name">ひろし</div>
                {/* アイコン */}
                <div className="header_icon">
                    {CharacterSkin&&(
                    <img src={CharacterSkin.characterImage} alt="アバター"></img>
                    )}
                </div>
                <hr></hr>
            </div> 
                
                
        );
    }
}
