import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    Dimensions,
    StyleSheet
} from 'react-native';

// import styleContext from 'app/style';

const { width } = Dimensions.get('window');
const style = StyleSheet.create({
    swipeMessage: {
        position: 'absolute',
        top: 0,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },

    itemContainer: {
        width
    }
});

const WHITE = 0;
const GREEN = 1;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class SwipeListRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: new Animated.Value(WHITE)
        };
    }

    animateScroll = (e) => {
        const threshold = width / 5;
        let x = e.nativeEvent.contentOffset.x;
        let swiped = null;

        x = x * -1;

        if (x > -50 && this.swiped !== WHITE) {
            swiped = WHITE;
        } else if (x < -50 && x > -threshold && this.swiped !== GREEN) {
            swiped = GREEN;
        }

        if (swiped !== null) {
            this.swiped = swiped;

            Animated.timing(this.state.color, {
                toValue: swiped,
                duration: 200
            }).start();
        }
    }

    takeAction = () => {
        if (this.swiped) {
            Animated.timing(this.state.color, {
                toValue: WHITE,
                duration: 200
            }).start();

            this.props.onSwipe();
        }
    }

    render() {
        const { swipeEnabled, swipeMessage, children } = this.props;
        const bgColor = this.state.color.interpolate({
            inputRange: [
                WHITE,
                GREEN
            ],
            outputRange: [
                'rgb(255, 255, 255)',
                'rgb(123, 204, 40)'
            ]
        });

        return (
            <View>
                <AnimatedScrollView
                    horizontal
                    directionalLockEnabled
                    automaticallyAdjustContentInsets={false}
                    onScroll={this.animateScroll}
                    scrollEventThrottle={16}
                    scrollEnabled={swipeEnabled}
                    onMomentumScrollBegin={this.takeAction}
                    style={[{ flex: 1 }, { backgroundColor: bgColor }]}>
                    <View>
                        <View {...style('itemContainer')}>
                            {children}
                        </View>
                        <View
                            {...style(
                                'swipeMessage',
                                [{ width: width / 5, right: -width / 5 - 20 }]
                            )}>
                            <Text {...style('text.bold text.white')}>{swipeMessage}</Text>
                        </View>
                    </View>
                </AnimatedScrollView>
            </View>
        );
    }
}

// SwipeListRow.propTypes = {
//     children: React.PropTypes.node.isRequired,
//     onSwipe: React.PropTypes.func.isRequired,
//     swipeEnabled: React.PropTypes.bool.isRequired,
//     swipeMessage: React.PropTypes.string.isRequired
// };


export default SwipeListRow;