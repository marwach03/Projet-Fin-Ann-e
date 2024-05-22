import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import TodoModal from '../screens/todolist/TodoModal';

export default class List extends React.Component {

    state = {
        showListVisible: false
    }

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
    }

    render() {
        const list = this.props.list
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                    <TodoModal 
                        list={list} 
                        closeModal={() => this.toggleListModal()} 
                        updateList={this.props.updateList} 
                    />
                </Modal>
                <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.Color }]} onPress={() => this.toggleListModal()}>
                    <Text style={styles.listTitle} numberOfLines={1}> {list.name} </Text>

                    <View>
                        <View style={styles.cc}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>

                        <View style={styles.cc}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Completed</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical:32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:"center",
        width:200,
    },
    listTitle:{
        fontSize:24,
        fontWeight:"700",
        color:'white',
        marginBottom:18,
    },
    cc:{
        alignItems:"center",
    },
    count:{
        fontSize: 48,
        fontWeight:"200",
        color:'white',
    },
    subtitle:{
        fontSize:12,
        fontWeight:"700",
        color:'white',
    }
})
