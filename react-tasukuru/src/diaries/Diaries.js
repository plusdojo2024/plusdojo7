import React from "react";
import './Diaries.css';
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";

export default class Diaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UnreadDiarieModal: false,
            LookedDiarieModal: false,
            GetDiceModal: false,
        };

        this.UnreadDiarie = this.UnreadDiarie.bind(this);
        this.LookedDiarie = this.LookedDiarie.bind(this);
        this.GetDice = this.GetDice.bind(this);
        this.toggleUnreadModal = this.toggleUnreadModal.bind(this);
        this.toggleLookedModal = this.toggleLookedModal.bind(this);
        this.toggleDiceModal = this.toggleDiceModal.bind(this);

    }

    UnreadDiarie(index) {
        this.toggleUnreadModal();
    }
    LookedDiarie(index) {
        this.toggleLookedModal();
    }
    GetDice(index) {
        this.toggleDiceModal();
    }

    toggleUnreadModal() {
        const { UnreadDiarieModal } = this.state;
        this.setState({
            UnreadDiarieModal: !UnreadDiarieModal,
        });
    }

    toggleLookedModal() {
        const { LookedDiarieModal } = this.state;
        this.setState({
            LookedDiarieModal: !LookedDiarieModal,
        });
    }

    toggleDiceModal() {
        const { GetDiceModal } = this.state;
        this.setState({
            GetDiceModal: !GetDiceModal,
        });
    }

    render() {
        const { UnreadDiarieModal, LookedDiarieModal, GetDiceModal } = this.state;
        return (
            <div >
                <Header />
                {/*日記リストの表示*/}
                <div id="Diaries_body">
                    
                    <h1>日記</h1>
                    {/* <table >
                        <thead>
                            <tr>
                                <th>ひづけ</th>
                                <th>たいとる</th>
                            </tr>
                        </thead>
                        
                    </table> */}
                    <button onClick={() => this.UnreadDiarie()}>未読日記です</button><br />
                    <button onClick={() => this.LookedDiarie()}>既読日記です</button><br />
                    <button onClick={() => this.LookedDiarie()}>既読日記です</button><br />
                </div>
                
                {/*未読日記*/}
                {UnreadDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleUnreadModal}>閉じる</button><br />
                            ここに日付<br />
                            title<br />
                            reply<br />
                            <button onClick={this.toggleDiceModal}>サイコロをもらう</button>
                        </div>
                        
                    </div>
                )}

                {/*すでに見た日記*/}
                {LookedDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleLookedModal}>閉じる</button><br />
                            ここに日付<br />
                            title<br />
                            reply<br />
                        </div>
                        
                    </div>
                )}

                {/*サイコロ入手*/}
                {GetDiceModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            サイコロを手にいれました！<br />
                            <button onClick={() => { this.toggleDiceModal(); }}>閉じる</button><br />
                        </div>
                    </div>
                )}
            <Footer />
            </div>
        );
    }
}