import React from 'react';
import { Text, ListView, StyleSheet } from 'react-native';
// import styleContext from 'app/style';

const style = StyleSheet.create({
    listViewSection: {
        paddingVertical: 10,
        paddingLeft: 15,
        backgroundColor: 'pink'
    },

    'text.listViewSection': {
        color: 'purple',
        fontSize: 16,
        marginLeft: 5
    }
});

function SwipeList({ dataSource, renderRow }) {
    function renderSectionHeader(sectionData, sectionId) {
        return (
            <View {...style('listViewSection')}>
                <Text {...style('text.listViewSection')}>{sectionId.toUpperCase()}</Text>
            </View>
        );
    }

    if (!dataSource.rowIdentities.length) {
        return (
            <Text>No items found.</Text>
        );
    }

    return (
        <ListView
            dataSource={dataSource}
            automaticallyAdjustContentInsets={false}
            directionalLockEnabled
            keyboardShouldPersistTaps={false}
            keyboardDismissMode={'on-drag'}
            renderSectionHeader={renderSectionHeader}
            renderRow={renderRow} />
    );
}

SwipeList.propTypes = {
    dataSource: React.PropTypes.shape({
        rowIdentities: React.PropTypes.array.isRequired
    }).isRequired,
    renderRow: React.PropTypes.func.isRequired
};

export default SwipeList;