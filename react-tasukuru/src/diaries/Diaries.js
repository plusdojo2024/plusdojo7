import React from "react";
import './Diaries.css';

export default class Diaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LookDiarieModal: false,
            LookedDiarieModal: false,
            getDiceModal: false,
            diceToggleModal: false
        };

        this.LookDiarie = this.LookDiarie.bind(this);
        this.LookedDiarie = this.LookedDiarie.bind(this);
        this.GetDice = this.GetDice.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.diceToggleModal = this.diceToggleModal.bind(this);

    }

    LookDiarie(index) {
        this.toggleModal();
    }
    LookedDiarie(index) {
        this.toggleModal();
    }
    GetDice(index) {
        this.diceToggleModal();
    }

    toggleModal() {
        const { LookDiarieModal, LookedDiarieModal, } = this.state;
        this.setState({
            LookDiarieModal: !LookDiarieModal,
            LookedDiarieModal: !LookedDiarieModal,

        });
    }

    diceToggleModal() {
        const { getDiceModal } = this.state;
        this.setState({
            GetDiceModal: !getDiceModal
        });
    }

    render() {
        const { LookDiarieModal, LookedDiarieModal, GetDiceModal } = this.state;
        return (
            <div >
                {/*日記リストの表示*/}
                <div className="header">
                    <script src="../foundation/Header.js"></script>
                </div>
                <div id="Diaries_body">
                    
                    <h1>日記</h1>
                    <table className="Diaries_text">
                        <thead>
                            <tr>
                                <th>ひづけ</th>
                                <th>たいとる</th>
                            </tr>
                        </thead>
                        
                    </table>
                    <button onClick={() => this.LookDiarie()}>日記を見る</button>
                    <button onClick={() => this.LookedDiarie()}>すでに見た日記を見る</button>
                </div>
                
                {/*サイコロをもらう日記*/}
                {LookDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleModal}>閉じる</button><br />
                            ここに日付<br />
                            title<br />
                            reply<br />
                            <button onClick={this.getDiceModal}>サイコロをもらう</button>
                        </div>
                        
                    </div>
                )}

                {/*すでに見た日記*/}
                {LookedDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleModal}>閉じる</button><br />
                            ここに日付<br />
                            title<br />
                            reply<br />
                            <button onClick={this.toggleModal}>サイコロをもらう</button>
                        </div>
                        
                    </div>
                )}
                {/*サイコロ入手*/}
                {GetDiceModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            サイコロを手にいれました！<br />
                            <button onClick={this.diceToggleModal}>閉じる</button><br />
                        </div>
                    </div>
                )}
            <div className="footer"></div>
            </div>
        );
    }
}
