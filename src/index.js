import React from 'react'

export default Wrapped =>
    class WithGesture extends React.Component {
        state = { x: 0, y: 0, down: false }

        componentDidMount() {
            window.addEventListener('touchmove', this.handleTouchMove)
            window.addEventListener('touchend', this.handleMouseUp)
            window.addEventListener('mousemove', this.handleMouseMove)
            window.addEventListener('mouseup', this.handleMouseUp)
        }

        componentWillUnmount() {
            window.removeEventListener('touchmove', this.handleTouchMove)
            window.removeEventListener('touchend', this.handleMouseUp)
            window.removeEventListener('mousemove', this.handleMouseMove)
            window.removeEventListener('mouseup', this.handleMouseUp)
        }

        handleTouchStart = e => this.handleMouseDown(e.touches[0])
        handleTouchMove = e => e.preventDefault() || this.handleMouseMove(e.touches[0])
        handleMouseUp = () => this.setState({ down: false })
        handleMouseDown = ({ pageX, pageY }) => this.setState({ x: 0, y: 0, initialX: pageX, initialY: pageY, down: true })
        handleMouseMove = ({ pageX, pageY }) =>
            this.state.down && this.setState({ x: pageX - this.state.initialX, y: pageY - this.state.initialY })

        render() {
            return (
                <div onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}>
                    <Wrapped {...this.props} x={this.state.x} y={this.state.y} down={this.state.down} />
                </div>
            )
        }
    }
