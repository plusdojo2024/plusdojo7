import React from "react";
import Header from '../foundation/ParentHeader';
import Footer from '../foundation/Footer';
import './Approval.css';
import axios from "axios";

import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class ApprovalList extends React.Component{
    render(){
        return (
            <div>
            <Header />
            </div>
        );
    }
}