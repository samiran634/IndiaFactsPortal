
import { news_data } from "./news";
import {data} from "./news"
export const Economy_data :data[]= news_data.filter((e)=>e.type==="Economy");