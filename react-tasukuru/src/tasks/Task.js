import React from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import './Task.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class Task extends React.Component{
    render(){
        
        return (
        <wrapper>
        <Header />
            <main>
                <div className="background_image">
                    <div className="background">
                        トイレ掃除
                    </div>
                </div>
            </main>
        <Footer />
        </wrapper>
       
        );
    };
}