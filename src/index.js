import React from 'react'

const withGesture = Wrapped =>
    class extends React.Component {
        state = { x: 0, y: 0, xDelta: 0, yDelta: 0, xInitial: 0, yInitial: 0, down: false }

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
        handleMouseDown = ({ pageX, pageY }) =>
            this.setState({ x: pageX, y: pageX, xDelta: 0, yDelta: 0, xInitial: pageX, yInitial: pageY, down: true })
        handleMouseMove = ({ pageX, pageY }) =>
            this.state.down &&
            this.setState({ x: pageX, y: pageX, xDelta: pageX - this.state.xInitial, yDelta: pageY - this.state.yInitial })

        render() {
            return (
                <div onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}>
                    <Wrapped {...this.props} {...this.state} />
                </div>
            )
        }
    }

const Gesture = withGesture(
    class extends React.PureComponent {
        render() {
            return this.props.children(this.props)
        }
    },
)

export { withGesture, Gesture }
