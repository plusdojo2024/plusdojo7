import React from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class Task extends React.Component{
    render(){
        
        return (<div>
        <Header />
        
        <Footer />
        </div>
       
        );
    };
}