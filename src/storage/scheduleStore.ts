import {create} from "zustand";

interface DataState {
    data : object;
    setData: (newData: object)=> void;
}

export const useScheduleStore = create<DataState>((set)=>({
        data: [],
        setData: (newData) => set({ data: newData}),
}));