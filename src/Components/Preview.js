import React, {Component} from 'react'
import './Preview.css'

class Preview extends Component { 
// props image data.
// props facerect.


    createRect(ctx, top, left, width, height) {
        ctx.moveTo(top, left);
        ctx.lineTo(top + width, left);
        ctx.lineTo(top + width, left + height);
        ctx.lineTo(top, left + height);
        ctx.lineTo(top, left);
        ctx.stroke();
    }

    updateCanvas() {
        const ctx = this.refs.faceCanvas.getContext('2d');
        this.createRect(ctx, 189, 210, 234, 234)
        this.createRect(ctx, this.props.faceRect.top, this.props.faceRect.left, this.props.faceRect.width, this.props.faceRect.height)
    }

    componentWillUpdate() {
        this.updateCanvas()
        console.log("TEST");   
    }

    render() { 
        return (
            <div id="container">
                <img id='preview_img' src={this.props.image.url} alt="preview" ></img>
                <canvas id="faceCanvas" ref="faceCanvas" width={this.props.image.width} height={this.props.image.height}>
                
                </canvas>
                
            </div>
        )
    }
}

export default Preview;