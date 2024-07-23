import { atom } from 'recoil';

export const dataAtom = atom({
  key: 'foodDataState',
  default: [
    { key: 1, title: "사과",expiredDate: '2024-07-20', quantity: '1', storage: '냉장', memo: '가'},
    { key: 2, title: "자두", expiredDate: '2024-07-21', quantity: '2', storage: '냉동', memo: '나'},
    { key: 3, title: "양파", expiredDate: '2024-07-23', quantity: '3', storage: '상온', memo: '다'},
    { key: 4, title: "대파", expiredDate: '2024-07-23', quantity: '4', storage: '냉동', memo: '라'},
    { key: 5, title: "고기", expiredDate: '2024-07-24', quantity: '5', storage: '냉장', memo: '마'},
    { key: 6, title: "바나나", expiredDate: '2024-07-19', quantity: '6', storage: '상온', memo: '바'},
    { key: 7, title: "간장", expiredDate: '2024-07-22', quantity: '7', storage: '냉동', memo: '사'},
    { key: 8, title: "계란", expiredDate: '2024-07-10', quantity: '8', storage: '냉동', memo: '아'},
    { key: 9, title: "마요네즈", expiredDate: '2024-07-12', quantity: '9', storage: '냉동', memo: '자'},
  ],
});