import React from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import './Task.css';



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Task extends React.Component{
    
    
    render(){
        
        return (
            
        <wrapper>
        <Header />
            <main>
                <div className="background_image_renga">
                    <div className="background">
                    <Tabs>
    <TabList className="TabList">
      <Tab>未たっせい</Tab>
      <Tab>かんりょう</Tab>
      <Tab>しっぱい</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 3</h2>
    </TabPanel>
  </Tabs>
                    </div>
                </div>
            </main>
        <Footer />
        </wrapper>
       
        );
    };
}