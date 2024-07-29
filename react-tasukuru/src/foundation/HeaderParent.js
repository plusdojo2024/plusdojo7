import React from 'react';
import NavigationButton from '../tasks/NavigationButton';
import './HeaderParent.css';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name :"",
            showModal: false
        }
    }

    componentDidMount() {
            
        //子供の名前を取得
        fetch("/api/familymypage/")
        .then(res => res.json())
        .then(json => {
            console.log(json); 
            this.setState({
                name : json
            })
        })
        .catch(error => console.error("エラー", error));
        
    }

    toggleModal = () => {
        const{showModal} = this.state;
        this.setState({
            showModal: !showModal
        });
    }

    
        
    render(){
        const {name, showModal}=this.state;
        return(

           <div className="header">
                {/* ログアウトボタン */}
                <button className="header_logout" onClick={this.toggleModal} >ログアウト</button>
                {/* 個人名 */}
                <div className="header_name">{name.name}</div>
                {/* アイコン */}
                <div className="headerParent_icon">
                    <NavigationButton path="/familymypage" label={<img src="../images/ic013.png" alt="マイページ" />} />
                </div>
                <hr></hr>

                <div>
                 {/* モーダルウィンドウ */}
                 {showModal &&
                    <div id="Header_overlay">
                        <div id="Header_content">
                    
                        <p>ログアウトしますか？</p>
                        <br></br>
                        <NavigationButton path="/login" label="はい" />&nbsp;<button onClick={this.toggleModal}> いいえ</button>
                        </div>
                    </div>
                }
                </div>
            </div> 
                
                
        );
    }
}
