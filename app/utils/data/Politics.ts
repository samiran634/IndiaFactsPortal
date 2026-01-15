
import { news_data } from "./news";
import {data} from "./news"
export const Polity_data :data[]= news_data.filter((e)=>e.type==="Politics");