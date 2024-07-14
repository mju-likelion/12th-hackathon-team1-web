import { css } from 'styled-components';
import './font.css';

export const Theme = {
    fonts: {
        default: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 400;
            font-size: 20px;
        `,
        bigText: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 500;
            font-size: 64px;
        `,
        bigButtonText: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 700;
            font-size: 48px;
        `,
        menuText: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 400;
            font-size: 18px;
        `,
        smallText200: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 400;
            font-size: 16px;
        `,
        smallText100: css`
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 400;
            font-size: 12px;
        `,
    },

    colors: {
        green: '#D7EFC8',
        green100: '#B7E899',
        green200: '#A3C087',
        green300: '#4FD80E',
        red: '#FF5858',
    },
};