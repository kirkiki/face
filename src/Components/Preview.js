import React, { Component } from 'react'
import './Preview.css'

class Preview extends Component {
    // props image data.
    // props facerect.


    createRect(ctx, left, top, width, height) {
        console.log("Create rect :", left, top, width, height)
        ctx.moveTo(left, top);
        ctx.lineTo(left + width, top);
        ctx.lineTo(left + width, top + height);
        ctx.lineTo(left, top + height);
        ctx.lineTo(left, top);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
    }

    createEye(ctx, eyeBottom, eyeInner, eyeOuter, eyeTop) {

    }

    createNose() {

    }

    createLip() {
        
    }

    createPoint(ctx, point) {
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI, true);
        ctx.stroke(); 
    }

    createLine(ctx, point1, point2) {
        console.log("Draw line ", point1, point2)
        ctx.beginPath();
        ctx.strokeStyle = "#00FF00";
        ctx.moveTo(point1.x, point1.y)
        ctx.lineTo(point2.x, point2.y)
        ctx.stroke();
    }

    updateCanvas() {
        console.log("Canvas update !")
        const ctx = this.refs.faceCanvas.getContext('2d');
        // clear canvas
        ctx.clearRect(0, 0, this.refs.faceCanvas.width, this.refs.faceCanvas.height);

        // clear path
        ctx.beginPath();

        console.log(this.props.faceRect)
        console.log(this.props.faceLandmarks)
        if (this.props.faceRect) {
            this.createRect(ctx, this.props.faceRect.left, this.props.faceRect.top, this.props.faceRect.width, this.props.faceRect.height)
        }
        //Eyes

        if(this.props.faceLandmarks && this.props.faceLandmarks.eyeLeftBottom) {
            this.createEye(ctx,
                this.props.faceLandmarks.eyeLeftBottom,
                this.props.faceLandmarks.eyeLeftInner,
                this.props.faceLandmarks.eyeLeftOuter,
                this.props.faceLandmarks.eyeLeftTop
            )
        }
        if(this.props.faceLandmarks && this.props.faceLandmarks.eyeRightBottom) {
            this.createEye(ctx,
                this.props.faceLandmarks.eyeRightBottom,
                this.props.faceLandmarks.eyeRightInner,
                this.props.faceLandmarks.eyeRightOuter,
                this.props.faceLandmarks.eyeRightTop
            )
        }
// Eye brows
        if(this.props.faceLandmarks && this.props.faceLandmarks.eyebrowLeftInner) {
            this.createLine(ctx,
                this.props.faceLandmarks.eyebrowLeftInner,
                this.props.faceLandmarks.eyebrowLeftOuter
            )
        }
        if(this.props.faceLandmarks && this.props.faceLandmarks.eyebrowRightInner) {
            this.createLine(ctx,
                this.props.faceLandmarks.eyebrowRightInner,
                this.props.faceLandmarks.eyebrowRightOuter
            )
        }
        // Mouth
        if(this.props.faceLandmarks && this.props.faceLandmarks.mouthLeft) {
            this.createLine(ctx,
                this.props.faceLandmarks.mouthLeft,
                this.props.faceLandmarks.mouthRight
            )
        }

        if(this.props.faceLandmarks && this.props.faceLandmarks.noseRootLeft) {
            this.createNose(
                this.props.faceLandmarks.noseRootLeft,
                this.props.faceLandmarks.noseRootRight,
                this.props.faceLandmarks.noseLeftAlarOutTip,
                this.props.faceLandmarks.noseLeftAlarTop,
                this.props.faceLandmarks.noseRightAlarOutTip,
                this.props.faceLandmarks.noseRightAlarTop,
                this.props.faceLandmarks.noseTip,                
            )
        }

        if(this.props.faceLandmarks && this.props.faceLandmarks.pupilLeft) {
            this.createPoint(ctx,
                this.props.faceLandmarks.pupilLeft
            )
        }

        if(this.props.faceLandmarks && this.props.faceLandmarks.pupilRight) {
            this.createPoint(ctx,
                this.props.faceLandmarks.pupilRight
            )
        }

        if(this.props.faceLandmarks && this.props.faceLandmarks.upperLipTop) {
            this.createLip(
                this.props.faceLandmarks.upperLipTop,
                this.props.faceLandmarks.upperLipBottom,
                this.props.faceLandmarks.underLipBottom,
                this.props.faceLandmarks.underLipBottom
            )
        }


    }

    componentWillUpdate() {
        console.log("Update !")
        this.updateCanvas()

    }

    componentWillReceiveProps(newProps) {
        this.props = newProps
        console.log("New Props ", newProps)
        this.forceUpdate()
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