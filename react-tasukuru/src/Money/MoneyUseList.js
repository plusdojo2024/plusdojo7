import React from "react";

class MoneyUseList　extends React.Component {
    render() {
        const { usageHistory } = this.props;
        return (
            <div>
                <h2>使ったお金一覧</h2>
                {usageHistory.map((monthData, index) => (
                    <div key={index}>
                        <h3>{monthData.month}</h3>
                        <ul>
                            {monthData.items.map((item, idx) => (
                                <li key={idx}>
                                    使用金額: {item.amount} 円 - 用途: {item.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default MoneyUseList;