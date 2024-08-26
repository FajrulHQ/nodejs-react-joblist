import { create } from "zustand"
import { RecruitmentPositionType } from "./types/recruitment"

interface State {
  data: RecruitmentPositionType[]
  params: {
    page: number,
    description?: string
    location?: string
    full_time: boolean
  }
}


type ParamsKey = keyof State['params'];
type ParamsValue = State['params'][ParamsKey];

interface Action {
  setData: (value: State['data']) => void
  setParams: (key: ParamsKey, value: ParamsValue) => void
}

export const useGlobalStore = create<State & Action>(set => ({
  data: [],
  params: { page: 1, full_time: true },
  setData: (data) => set(() => ({ data })),
  setParams: (key, value) => set(({ params }) => ({ params: { ...params, [key]: value } })),
}))