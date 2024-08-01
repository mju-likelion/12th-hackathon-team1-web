import { selector } from "recoil";
import { Axios } from "../api/Axios";

export const LikeAtom = selector({
  key: "LikeDataState",
  get: async () => {
    try {
      const response = await Axios.get("/auth/likes");
        return response.data.data.recipeList;
    } catch (error) {
      console.error("좋아요 레시피를 가져오는 데 실패했습니다.", error);
      return [];
    }
  },
});