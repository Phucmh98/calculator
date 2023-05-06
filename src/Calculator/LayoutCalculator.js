import React, { Component } from 'react'

import './LayoutCalculator.css'

export default class LayoutCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: "0",
            totalValue: '0',
            operator: '',
            backgroundImageUrl: 'url(img/background_cyberpunk.png)',
            backgroundLogoUrls: 'url(img/logo_cyberpunk.png)',
            backgroundBtnFunction:'linear-gradient(to right, rgb(255, 187, 0), yellow)',
            backgroundBtnshadow:'0px 3px 2px 0px rgba(232, 243, 109, 0.781)',
        };
    }
    

    backgroundImageUrls = [
        'url(img/background_cyberpunk.png)',
        'url(img/background_starcraft2.jpg)',
        'url(img/background_worldoftank.jpg)'
    ]
    backgroundLogoUrls = [

        'url(img/logo_cyberpunk.png)',
        'url(img/logo_starcraft2.png)',
        'url(img/logo_worldoftank.png)'
    ]
    backgroundBtnFunction=[
        'linear-gradient(to right, rgb(255, 187, 0), yellow)',
        'linear-gradient(90deg, rgba(8,119,208,1) 0%, rgba(0,255,244,1) 100%)',
        'linear-gradient(90deg, rgba(0,164,255,1) 0%, rgba(232,203,85,1) 75%, rgba(255,160,6,1) 100%)',
    ]
    backgroundBtnshadow=[
        '0px 3px 2px 0px rgba(232, 243, 109, 0.781)',
        '0px 3px 2px 0px rgba(48, 147, 228, 0.781)',
        '0px 3px 2px 0px rgba(255, 217, 0, 0.8)',
    ]
    handleClick = (index) => {
        const { backgroundImageUrls, backgroundLogoUrls,backgroundBtnFunction,backgroundBtnshadow } = this;

        this.setState({
            backgroundImageUrl: backgroundImageUrls[index],
            backgroundLogoUrls: backgroundLogoUrls[index],
            backgroundBtnFunction:backgroundBtnFunction[index],
            backgroundBtnshadow :backgroundBtnshadow[index]
        });
        
    };

    handleNumberClick = (event) => {
        const value = event.target.innerHTML;
        const { displayValue } = this.state;
        const newExpression = displayValue === "0" ? value : displayValue + value;
    
        if (newExpression.length > 21) {
            return;
        }
    
        const replacedValue = newExpression.replace(/÷/g, '/').replace(/×/g, '*');
        const result = eval(replacedValue);
    
        this.setState({
            displayValue: newExpression,
            totalValue: result,
        });
    }

    handleOperatorClick = (event) => {
        const operator = event.target.innerHTML;
        const { displayValue } = this.state;
        const lastChar = displayValue.slice(-1);

        const operators = /[-+×÷]/;
        if (!operators.test(lastChar)) {
            const replacedValue = displayValue.replace(/÷/g, '/').replace(/×/g, '*'); // chuyển đổi tất cả các ký tự '÷' thành '/'
            const result = eval(replacedValue); // tính toán kết quả
            this.setState({
                displayValue: displayValue + operator,
                totalValue: result // cập nhật kết quả tính toán lên totalValue
            });
        }
        if(displayValue.length >=21){
            this.setState({
                displayValue: displayValue
                
            });
        }
    }

    handleClearLastClick = () => {
        const { displayValue } = this.state;
        let newDisplayValue = displayValue.slice(0, -1);
        const replacedValue = newDisplayValue.replace(/÷/g, '/').replace(/×/g, '*');
        let totalDisplay = '';
        const lastChar = newDisplayValue.slice(-1);
        const operators = /[-+×÷]/;

        if (newDisplayValue === '') {
            totalDisplay = '0';
            newDisplayValue = '0';
        } else if (operators.test(lastChar)) {
            totalDisplay = eval(replacedValue.slice(0, -1));
        }
        else {
            totalDisplay = eval(replacedValue);
        }

        this.setState({
            displayValue: newDisplayValue,
            totalValue: totalDisplay,
        });

    }
    handleDecimal = () => {
        const { displayValue } = this.state;
        const lastNum = displayValue.split(/[+\-×÷]/).pop(); // Lấy ra số cuối cùng trong chuỗi tính toán
        if (!lastNum.includes('.')) { // Nếu số cuối cùng chưa có dấu chấm thập phân
            this.setState({
                displayValue: displayValue + '.',
            });
        }
    };


    handleClearClick = () => {
        this.setState({
            displayValue: "0",
            operator: '',
            totalValue: '0',
        });
    }

    handleEqualsClick = () => {
        const { displayValue, totalValue, operator } = this.state;
        let tempTotalValue = totalValue;
        if (operator) {
            const replacedValue = displayValue.replace(/÷/g, '/').replace(/×/g, '*').slice(0, -1); // Loại bỏ operator ở cuối cùng của biểu thức
            tempTotalValue = eval(replacedValue);
        }
        this.setState({
            displayValue: tempTotalValue.toString(),
            totalValue: '',
            operator: '',
        });
    }

    render() {
        const { displayValue, totalValue, backgroundImageUrl, backgroundLogoUrls,backgroundBtnFunction,backgroundBtnshadow } = this.state;

        return (

            <div className='full_layout' style={{ backgroundImage: backgroundImageUrl,transition:'all 0.3s ease-in-out' }}>
                <div className='layout_center'>
                    <div className='layout_cal'>
                        <div className='layout_cal_animate'>
                            <div className='layout_cal_theme'>
                                <div className='layout_img_logo'>
                                    <div className='img_logo' style={{ backgroundImage: backgroundLogoUrls,transition:'all 0.3s ease-in-out' }}>

                                    </div>
                                    <div className='theme_logo'>
                                        <span style={{ color: 'white', fontSize: '15px',marginLeft:'15px'}}>THEME</span>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }} className='theme_logo_button'>
                                            <div style={{ background: 'linear-gradient(to right, rgb(255, 187, 0), yellow)' }} className='btn_theme' onClick={() => this.handleClick(0)}>
                                                1
                                            </div>
                                            <div style={{ background: 'linear-gradient(90deg, rgba(8,119,208,1) 0%, rgba(0,255,244,1) 100%)' }} className='btn_theme' onClick={() => this.handleClick(1)}>
                                                2
                                            </div>
                                            <div style={{ background: 'linear-gradient(90deg, rgba(0,142,255,1) 0%, rgba(232,203,85,1) 59%, rgba(255,160,6,1) 100%)' }} className='btn_theme' onClick={() => this.handleClick(2)}>
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='layout_cal_out'>
                                <span >{displayValue}</span>
                                <br />
                                <span style={{ fontSize: '16px' }} className='lay_out_total'>{totalValue}</span>
                            </div>
                            <div className='layout_cal_in'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' onClick={this.handleClearClick} type="">CLEAR</button>
                                    </div>
                                    <div className='col-3'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' type="" onClick={this.handleClearLastClick}>&#8592;</button>
                                    </div>
                                    <div className='col-3'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' id='/' type="" onClick={this.handleOperatorClick}>÷</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' onClick={this.handleNumberClick} type="">7</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>8</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>9</button>
                                    </div>
                                    <div className='col-3'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' id='*' type="" onClick={this.handleOperatorClick}>×</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>4</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>5</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>6</button>
                                    </div>
                                    <div className='col-3'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' id='-' type="" onClick={this.handleOperatorClick}>-</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>1</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>2</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>3</button>
                                    </div>
                                    <div className='col-3'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' id='+' type="" onClick={this.handleOperatorClick}>+</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' type="" onClick={this.handleNumberClick}>0</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn_input' onClick={this.handleDecimal} type="">.</button>
                                    </div>
                                    <div className='col-6'>
                                        <button style={{background:backgroundBtnFunction,boxShadow:backgroundBtnshadow}} className='btn_function' type="" onClick={this.handleEqualsClick}>=</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
