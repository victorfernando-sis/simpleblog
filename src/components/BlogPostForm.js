import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValue }) => {
    const [title, setTitle] = useState(initialValue.title);
    const [content, setContent] = useState(initialValue.content);

    return (
        <View>
            <Text style={styles.label} >Enter Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={(newTitle) => { setTitle(newTitle) }} />
            <Text style={styles.label}>Enter Content</Text>
            <TextInput style={styles.input} value={content} onChangeText={(newContent) => { setContent(newContent) }} />
            <Button
                title="Save Blog Post"
                onPress={() => { onSubmit(title, content) }} />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValue:{
        title: '',
        content: ''
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    label: {
        fontSize: 18,
        margin: 5

    }
});

export default BlogPostForm;