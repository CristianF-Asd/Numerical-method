import React, {Component} from 'react';
import {Card, Input, Button} from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';

const InputStyle = {
    background: "#1890ff",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var y, error, exact;
class Centralh2 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    centralh2(x, h, degree) {
        switch (degree) {
            case 1:
                y = (-this.func(x+(2*h)) + 8*this.func(x+(1*h)) - 8*this.func(x-(1*h)) + this.func(x-(2*h))) / (12*h)
                break;
            case 2:
                y = (-this.func(x+(2*h)) + 16*this.func(x+(1*h)) - 30*this.func(x) + 16*this.func(x-(1*h)) - this.func(x-(2*h))) / (12*Math.pow(h, 2))
                break;
            case 3:
                y = (-this.func(x+(3*h)) + 8*this.func(x+(2*h)) - 13*this.func(x+(1*h)) + 13*this.func(x-(1*h)) - 8*this.func(x-(2*h)) + this.func(x-(3*h))) / (8*Math.pow(h, 3))
                break;
            default:
                y = (-this.func(x+(3*h)) + 12*this.func(x+(2*h)) - 39*this.func(x+(1*h)) + 56*this.func(x) - 39*this.func(x-(1*h)) + 12*this.func(x-(2*h)) + this.func(x-(3*h))) / (6*Math.pow(h, 4))

        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((y - exact) / y)*100
        this.setState({
            showOutputCard: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.evaluate(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.evaluate(scope)
    }
    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Central Divided-Differences O(h<sup>4</sup>)</h2>
                <div style={{float:"left"}}>
                    <Card
                    bordered={true}
                    style={{ width: 300, background: "#f44336", color: "#FFFFFFFF", float:"left"}}
                    onChange={this.handleChange}
                    id="inputCard"
                    >
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>Order derivative</h2><Input size="large" name="degree" style={InputStyle}></Input>
                        <h2>X</h2><Input size="large" name="x" style={InputStyle}></Input>
                        <h2>H</h2><Input size="large" name="h" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.centralh2(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit</Button>
                        
                    </Card>     
                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "100%", background: "#2196f3", color: "#FFFFFFFF", float:"left"}}
                        id="outputCard"
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Approximate = {y}<br/>
                                Exact = {exact.toFixed(8)}<br/>
                                Error(ε) = {error.toFixed(4)}%<br/>
                            </p>
                        </Card>
                    }              
                </div>                
            </div>
        );
    }
}
export default Centralh2;