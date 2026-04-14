// store/slices/logsSlice.ts
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

export type LogEntry = {
    id: number;
    message: string;
    type: 'error' | 'warning' | 'info';
    timestamp: number;
};

interface LogsState {
    entries: LogEntry[];
}

const initialState: LogsState = {
    entries: [],
};

const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        addLogEntry: (state, action: PayloadAction<LogEntry>) => {
            state.entries.unshift(action.payload);
        },
        clearLogs: (state) => {
            state.entries = [];
        },
        removeLogEntry: (state, action: PayloadAction<number>) => {
            state.entries = state.entries.filter(log => log.id !== action.payload);
        },
    },
});

export const { addLogEntry, clearLogs, removeLogEntry } = logsSlice.actions;
export default logsSlice.reducer;

export const createLog = (payload: Omit<LogEntry, 'id' | 'timestamp'>): LogEntry => ({
    ...payload,
    id: Date.now(),
    timestamp: Date.now(),
});