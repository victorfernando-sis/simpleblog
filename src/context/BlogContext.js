
import createDataContext from './createDataContext';
import jsonServer from "../api/jsonServer";
import axios from "axios";


const blogReducer = (state, action) => {

    switch (action.type) {
        case "get_blogpost":
            return action.payload;

        case 'add_blogpost':
            return [...state,
            {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }];
        case 'delete_blogPost':
            return state.filter(blogPosts => blogPosts.id != action.payload);

        case 'edit_blogPost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            });

        default:
            return state;
    }
};

const getBlogPost = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: "get_blogpost", payload: response.data });
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post("/blogposts", {title, content});
        //dispatch({ type: 'add_blogpost', payload: { title, content } });
        if (callback) { callback(); }
    };
};

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogPost', payload: id });
    };
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`,{title,content})
        dispatch({ type: 'edit_blogPost', payload: { id, title, content } });
        if (callback) { callback(); }
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
    []
);