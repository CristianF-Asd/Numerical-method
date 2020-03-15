import React, { Component } from 'react'
import {Card, Input, Button} from 'antd';
import '../screen.scss';
import 'antd/dist/antd.css';

const InputStyle = {
    background: "#1890ff",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};


var A = [], B = [], matrixA = [], matrixB = [], output = []
class Jordan extends Component {
    
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm : true,
            showDimentionButton: true,
            showMatrixForm: false,
            showMatrixButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.jordan = this.jordan.bind(this);
    
    }

    jordan(n) {
        this.initMatrix();
        if (A[0][0] === 0) { //pivoting
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        //Forward eliminate
        for(var k=0 ; k<n ; k++) {
            for(var i=k+1 ; i<n ; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j=k ; j<n ; j++) {
                    A[i][j] = A[i][j] - factor*A[k][j];
                }
                B[i] = B[i] - factor*B[k];

            }
        }
        //Backward Substitution
        for (k=n-1 ; k>=0 ; k--) {
            for(i=k ; i>=0 ; i--) {
                
                if (i === k) {//Identity matrix
                    factor = 1 / A[i][k];
            
                    for (j=0 ; j<n ; j++) {
                        A[i][j] = A[i][j] * factor;
                    }
                    B[i] = B[i] * factor;
                
                
                }
                else {
                    factor = A[i][k] / A[k][k];
                    for (j=0 ; j<n ; j++) {
                        A[i][j] = A[i][j] - factor*A[k][j];
                    }
                    B[i] = B[i] - factor*B[k];
                }
            } 
        }
        for (i=0 ; i<n ; i++) {
            output.push(B[i]);
            output.push(<br/>)
        }
        this.setState({
            showOutputCard: true
        });

      
    }
    createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"#06d9a0", 
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
                
            
        }

        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,
            showMatrixButton: true
        })
        

    }
    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px" }}>
                
                <div>
                    <h2 style={{color: "black", fontWeight: "bold"}}>Gauss-Jordan Method</h2>
                    <Card
                    bordered={true}
                    style={{ width: 400, background: "#f44336", color: "#FFFFFFFF"}}
                    onChange={this.handleChange}
                    >
                        {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}</div>}
                        
                        {this.state.showDimentionForm && 
                            <div>
                                <h2>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                <h2>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                            </div> 
                        }
                        <br></br>
                        {this.state.showDimentionButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>this.createMatrix(this.state.row, this.state.column)
                                }  
                                style={{background: "#4caf50", color: "white", fontSize: "20px"}}>
                                Submit<br></br>
                                </Button>
                        }
                        {this.state.showMatrixButton && 
                            <Button 
                                id="matrix_button"  
                                style={{background: "blue", color: "white", fontSize: "20px"}}
                                onClick={()=>this.jordan(this.state.row)}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    
                    {this.state.showOutputCard &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: 400, background: "#3d683d", color: "#FFFFFFFF", float:"left"}}
                        onChange={this.handleChange}  id="answerCard">
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>{output}</p>
                        </Card>
                    }

                   
                </div>

                
            </div>
        );
    }
}
export default Jordan;



