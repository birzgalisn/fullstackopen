import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, { payload }) {
      return state.map((anecdote) =>
        anecdote.id !== payload.id ? anecdote : payload
      );
    },
    add(state, { payload }) {
      return [...state, payload];
    },
    set(state, { payload }) {
      return payload;
    },
  },
});

const { actions, reducer: anecdotesReducer } = anecdoteSlice;

const { vote, add, set } = actions;

export default anecdotesReducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(set(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.create(content);
    dispatch(add(anecdote));
  };
};

export const upvoteAnecdote = (anecdoteObject) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.upvote(anecdoteObject);
    dispatch(vote(anecdote));
  };
};
