import React from "react";
import './Diaries.css';

export default class Diaries extends React.Component{
    
    render(){
        return(
            //日記リストの表示
            <div>
                <h1>日記</h1>
                <table>
                    <tr>
                        <th>ひづけ</th>
                        <th>たいとる</th>
                    </tr>
                </table>
            </div>
        );

    }
}