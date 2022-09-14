/**
 * @file 三角形
 * @date 2022-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2022-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends React.SVGAttributes<SVGSVGElement> {
    active?: boolean;

    placement: "top" | "bottom";
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ active = false, placement, ...props }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const borderColor = active ? "#E66326" : "#548C89";
    const fillColor = active ? "#EF823C" : "#A3BDBC";
    const line1Color = active ? "#B35622" : "#00716B";
    const line2Color = active ? "#E87D41" : "#89B5B3";

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <svg
            width="48"
            height="44"
            viewBox="0 0 48 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="23.8988"
                cy="21.8382"
                r="21.0041"
                stroke={borderColor}
                strokeWidth="0.976934"
            />
            <g filter="url(#filter0_i_6234_15756)">
                <circle cx="23.8977" cy="21.8371" r="18.5617" fill={fillColor} />
            </g>
            <path
                d="M13.4727 32.8903C13.4727 32.749 13.4992 32.6091 13.5507 32.4786C13.6022 32.3481 13.6777 32.2295 13.7729 32.1296C13.8681 32.0297 13.9811 31.9504 14.1055 31.8963C14.2299 31.8423 14.3632 31.8145 14.4978 31.8145C14.6324 31.8145 14.7657 31.8423 14.8901 31.8963C15.0144 31.9504 15.1275 32.0297 15.2226 32.1296C15.3178 32.2295 15.3933 32.3481 15.4449 32.4786C15.4964 32.6091 15.5229 32.749 15.5229 32.8903"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.1133 32.8886C13.1133 32.5032 13.2591 32.1336 13.5188 31.8611C13.7784 31.5886 14.1306 31.4355 14.4978 31.4355C14.865 31.4355 15.2172 31.5886 15.4768 31.8611C15.7365 32.1336 15.8824 32.5032 15.8824 32.8886"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.7031 32.889C12.7031 32.3896 12.8922 31.9106 13.2287 31.5574C13.5652 31.2043 14.0216 31.0059 14.4974 31.0059C14.9733 31.0059 15.4297 31.2043 15.7662 31.5574C16.1027 31.9106 16.2917 32.3896 16.2917 32.889"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.2734 32.8899C12.2734 32.2706 12.5079 31.6766 12.9251 31.2386C13.3424 30.8007 13.9084 30.5547 14.4985 30.5547C15.0886 30.5547 15.6546 30.8007 16.0718 31.2386C16.4891 31.6766 16.7235 32.2706 16.7235 32.8899"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.8125 32.8894C11.8125 32.1412 12.0957 31.4237 12.5998 30.8946C13.1039 30.3656 13.7876 30.0684 14.5005 30.0684C15.2134 30.0684 15.8971 30.3656 16.4011 30.8946C16.9052 31.4237 17.1884 32.1412 17.1884 32.8894"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.5664 30.1644C10.5664 29.9265 10.6564 29.6984 10.8167 29.5302C10.9769 29.3621 11.1943 29.2676 11.4209 29.2676C11.6475 29.2676 11.8649 29.3621 12.0251 29.5302C12.1854 29.6984 12.2754 29.9265 12.2754 30.1644"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.2656 30.166C10.2656 29.8448 10.3872 29.5368 10.6036 29.3097C10.8199 29.0827 11.1134 28.9551 11.4194 28.9551C11.7254 28.9551 12.0189 29.0827 12.2353 29.3097C12.4516 29.5368 12.5732 29.8448 12.5732 30.166"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.92578 30.1667C9.92578 29.7506 10.0833 29.3515 10.3637 29.0572C10.644 28.763 11.0243 28.5977 11.4208 28.5977C11.8173 28.5977 12.1976 28.763 12.4779 29.0572C12.7583 29.3515 12.9158 29.7506 12.9158 30.1667"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.57031 30.1655C9.57031 29.6497 9.76555 29.155 10.1131 28.7903C10.4606 28.4256 10.9319 28.2207 11.4234 28.2207C11.9148 28.2207 12.3861 28.4256 12.7337 28.7903C13.0812 29.155 13.2764 29.6497 13.2764 30.1655"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.18359 30.1648C9.18359 29.542 9.41934 28.9447 9.83898 28.5042C10.2586 28.0638 10.8278 27.8164 11.4212 27.8164C12.0147 27.8164 12.5839 28.0638 13.0035 28.5042C13.4231 28.9447 13.6589 29.542 13.6589 30.1648"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.70312 36.803C7.70313 36.5652 7.79315 36.3371 7.9534 36.1689C8.11365 36.0007 8.331 35.9062 8.55762 35.9062C8.78425 35.9062 9.0016 36.0007 9.16185 36.1689C9.3221 36.3371 9.41212 36.5652 9.41212 36.803"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.40234 36.8027C7.40234 36.4815 7.5239 36.1735 7.74028 35.9465C7.95666 35.7194 8.25013 35.5918 8.55613 35.5918C8.86213 35.5918 9.1556 35.7194 9.37198 35.9465C9.58835 36.1735 9.70991 36.4815 9.70991 36.8027"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.0625 36.8015C7.0625 36.3853 7.22001 35.9862 7.50038 35.692C7.78076 35.3977 8.16102 35.2324 8.55753 35.2324C8.95403 35.2324 9.33429 35.3977 9.61467 35.692C9.89504 35.9862 10.0526 36.3853 10.0526 36.8015"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.70312 36.8022C6.70313 36.2864 6.89835 35.7917 7.24586 35.427C7.59338 35.0623 8.06471 34.8574 8.55617 34.8574C9.04763 34.8574 9.51896 35.0623 9.86647 35.427C10.214 35.7917 10.4092 36.2864 10.4092 36.8022"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.31641 36.8015C6.31641 36.1787 6.55216 35.5814 6.97179 35.141C7.39143 34.7005 7.96059 34.4531 8.55405 34.4531C9.14751 34.4531 9.71666 34.7005 10.1363 35.141C10.5559 35.5814 10.7917 36.1787 10.7917 36.8015"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.29857 36.6814C4.3033 36.5452 4.35938 36.4164 4.45446 36.3233C4.54955 36.2302 4.67585 36.1805 4.8056 36.185C4.93534 36.1895 5.05788 36.2479 5.14628 36.3474C5.23467 36.4468 5.28168 36.5792 5.27695 36.7154"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.12783 36.6828C4.12697 36.5889 4.14426 36.4958 4.17865 36.4091C4.21304 36.3223 4.26381 36.2437 4.3279 36.178C4.39198 36.1123 4.46805 36.0609 4.55151 36.0269C4.63497 35.9928 4.72407 35.9769 4.81344 35.98C4.90282 35.9831 4.99061 36.0052 5.0715 36.0449C5.1524 36.0847 5.22471 36.1413 5.28409 36.2112C5.34346 36.2812 5.38865 36.3632 5.41694 36.4521C5.44522 36.541 5.456 36.6351 5.44864 36.7287"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.92975 36.6692C3.93802 36.4311 4.03608 36.2059 4.20234 36.0431C4.36861 35.8803 4.58946 35.7933 4.81632 35.8012C5.04318 35.8091 5.25747 35.9112 5.41203 36.0852C5.5666 36.2591 5.64878 36.4906 5.64051 36.7286"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.73014 36.6616C3.73016 36.5119 3.75893 36.3637 3.81474 36.2257C3.87054 36.0877 3.95222 35.9629 4.05492 35.8587C4.15762 35.7544 4.27921 35.6729 4.41244 35.6189C4.54568 35.565 4.68781 35.5397 4.83037 35.5447C4.97292 35.5496 5.11296 35.5847 5.24213 35.6477C5.3713 35.7108 5.48695 35.8006 5.58216 35.9117C5.67737 36.0228 5.7502 36.153 5.79629 36.2945C5.84238 36.436 5.86079 36.5859 5.85042 36.7353"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.50711 36.6552C3.50769 36.4747 3.54287 36.2961 3.61054 36.1299C3.67821 35.9637 3.77699 35.8135 3.901 35.688C4.02502 35.5625 4.17173 35.4644 4.33242 35.3995C4.49311 35.3346 4.66449 35.3042 4.83636 35.3102C5.00823 35.3161 5.17709 35.3583 5.33289 35.4342C5.48869 35.5101 5.62824 35.6182 5.74325 35.752C5.85825 35.8858 5.94636 36.0426 6.00233 36.213C6.0583 36.3835 6.081 36.5641 6.06906 36.7442"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38.9553 13.4599C38.9506 13.324 38.8946 13.1954 38.7996 13.1024C38.7047 13.0094 38.5786 12.9597 38.449 12.9642C38.3194 12.9687 38.1971 13.0271 38.1088 13.1264C38.0205 13.2257 37.9736 13.3579 37.9783 13.4939"
                stroke={line1Color}
                strokeWidth="0.0975552"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.126 13.4591C39.1269 13.3654 39.1096 13.2724 39.0753 13.1858C39.041 13.0991 38.9903 13.0206 38.9263 12.955C38.8623 12.8895 38.7863 12.8381 38.703 12.8041C38.6196 12.7701 38.5306 12.7542 38.4414 12.7573C38.3521 12.7604 38.2645 12.7825 38.1837 12.8222C38.1029 12.8619 38.0307 12.9183 37.9714 12.9882C37.9121 13.0581 37.867 13.1399 37.8388 13.2287C37.8105 13.3175 37.7997 13.4115 37.8071 13.5049"
                stroke={line1Color}
                strokeWidth="0.0975552"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.3241 13.4472C39.3159 13.2095 39.2179 12.9846 39.0519 12.822C38.8859 12.6595 38.6653 12.5726 38.4388 12.5805C38.2123 12.5883 37.9983 12.6903 37.8439 12.864C37.6896 13.0377 37.6075 13.2688 37.6158 13.5066"
                stroke={line1Color}
                strokeWidth="0.0975552"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.5276 13.4393C39.5276 13.2898 39.4989 13.1417 39.4431 13.004C39.3874 12.8662 39.3058 12.7416 39.2033 12.6375C39.1007 12.5333 38.9793 12.4519 38.8463 12.3981C38.7132 12.3442 38.5713 12.319 38.4289 12.3239C38.2866 12.3289 38.1468 12.3639 38.0178 12.4268C37.8888 12.4898 37.7733 12.5795 37.6782 12.6904C37.5831 12.8014 37.5104 12.9314 37.4644 13.0727C37.4184 13.214 37.4 13.3637 37.4103 13.5128"
                stroke={line1Color}
                strokeWidth="0.0975552"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.7467 13.4325C39.7461 13.2523 39.711 13.0739 39.6434 12.908C39.5759 12.7421 39.4772 12.592 39.3534 12.4667C39.2296 12.3414 39.0831 12.2434 38.9226 12.1786C38.7621 12.1138 38.591 12.0834 38.4194 12.0894C38.2477 12.0954 38.0791 12.1375 37.9235 12.2133C37.768 12.2891 37.6286 12.397 37.5138 12.5306C37.3989 12.6642 37.3109 12.8207 37.255 12.991C37.1991 13.1612 37.1765 13.3416 37.1884 13.5214"
                stroke={line1Color}
                strokeWidth="0.0975552"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.95703 32.8302C6.96846 32.4526 7.11942 32.0945 7.37795 31.8317C7.63649 31.5688 7.98232 31.4219 8.34227 31.4219C8.70222 31.4219 9.04805 31.5688 9.30659 31.8317C9.56512 32.0945 9.71608 32.4526 9.72751 32.8302"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.54688 32.8301C6.55992 32.3395 6.75476 31.8737 7.08996 31.5316C7.42517 31.1895 7.8743 30.998 8.34188 30.998C8.80945 30.998 9.25859 31.1895 9.5938 31.5316C9.92901 31.8737 10.1238 32.3395 10.1369 32.8301"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.11719 32.8308C6.13174 32.2215 6.37263 31.6422 6.78845 31.2166C7.20428 30.791 7.76211 30.5527 8.34294 30.5527C8.92377 30.5527 9.4816 30.791 9.89743 31.2166C10.3132 31.6422 10.5541 32.2215 10.5687 32.8308"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.66016 32.8304C5.67618 32.0932 5.96648 31.3918 6.46896 30.8763C6.97144 30.3609 7.64618 30.0723 8.34882 30.0723C9.05146 30.0723 9.72621 30.3609 10.2287 30.8763C10.7312 31.3918 11.0215 32.0932 11.0375 32.8304"
                stroke={line1Color}
                strokeWidth="0.0976934"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.4547 33.3152H2.91843C1.83877 33.2947 1.41641 33.6983 1.13531 34.416C1.01755 34.6855 0.975401 34.9847 1.01379 35.2784C1.05218 35.5721 1.16953 35.8483 1.35208 36.0746C1.50138 36.2746 1.69258 36.4359 1.91087 36.5459C2.12915 36.6558 2.36864 36.7115 2.61075 36.7086L11.9026 36.9772C12.6018 36.9978 13.4214 37.3324 13.7318 37.9929C13.9332 38.42 13.8633 39.0556 13.4703 39.5194C13.164 39.8805 12.6787 40.0008 12.2116 40.0008H7.3168"
                stroke={line1Color}
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <mask
                id="mask0_6234_15756"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="5"
                y="3"
                width="38"
                height="38"
            >
                <path
                    d="M42.4633 21.8371C42.4633 32.0885 34.1529 40.3989 23.9016 40.3989C13.6502 40.3989 5.33984 32.0885 5.33984 21.8371C5.33984 11.5858 13.6502 3.27539 23.9016 3.27539C34.1529 3.27539 42.4633 11.5858 42.4633 21.8371Z"
                    fill="#A3BDBC"
                />
            </mask>
            <g mask="url(#mask0_6234_15756)">
                <g opacity="0.6">
                    <path
                        d="M36.7074 42.9233C36.6783 42.5305 36.727 42.1356 36.8502 41.7635C36.9735 41.3913 37.1688 41.0499 37.4238 40.7607C37.6788 40.4715 37.988 40.2408 38.332 40.083C38.676 39.9252 39.0473 39.8438 39.4227 39.8438C39.7982 39.8438 40.1695 39.9252 40.5135 40.083C40.8575 40.2408 41.1667 40.4715 41.4217 40.7607C41.6767 41.0499 41.872 41.3913 41.9953 41.7635C42.1185 42.1356 42.1672 42.5305 42.1381 42.9233"
                        stroke={line2Color}
                        strokeWidth="0.58616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M35.7587 42.9251C35.7479 42.4125 35.8347 41.9029 36.014 41.426C36.1934 40.9491 36.4618 40.5146 36.8034 40.1481C37.1449 39.7816 37.5528 39.4903 38.0031 39.2915C38.4534 39.0927 38.937 38.9902 39.4255 38.9902C39.914 38.9902 40.3976 39.0927 40.8479 39.2915C41.2982 39.4903 41.7061 39.7816 42.0476 40.1481C42.3892 40.5146 42.6576 40.9491 42.837 41.426C43.0163 41.9029 43.1032 42.4125 43.0923 42.9251"
                        stroke={line2Color}
                        strokeWidth="0.58616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M34.6719 42.9245C34.6962 41.6185 35.2076 40.3746 36.0962 39.4601C36.9849 38.5455 38.1798 38.0332 39.4244 38.0332C40.6691 38.0332 41.864 38.5455 42.7527 39.4601C43.6413 40.3746 44.1527 41.6185 44.177 42.9245"
                        stroke={line2Color}
                        strokeWidth="0.58616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M33.5312 42.9258C33.5312 41.2858 34.152 39.713 35.257 38.5533C36.3619 37.3937 37.8605 36.7422 39.4232 36.7422C40.9858 36.7422 42.4844 37.3937 43.5894 38.5533C44.6943 39.713 45.3151 41.2858 45.3151 42.9258"
                        stroke={line2Color}
                        strokeWidth="0.58616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M32.3047 42.9247C32.3345 40.964 33.0976 39.0942 34.4293 37.7187C35.7611 36.3432 37.5546 35.5723 39.4231 35.5723C41.2916 35.5723 43.0851 36.3432 44.4169 37.7187C45.7486 39.0942 46.5117 40.964 46.5415 42.9247"
                        stroke={line2Color}
                        strokeWidth="0.58616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <path
                    d="M27.6836 40.4107C27.6953 39.9578 27.875 39.5276 28.1844 39.2116C28.4937 38.8956 28.9084 38.7188 29.3401 38.7188C29.7719 38.7188 30.1865 38.8956 30.4959 39.2116C30.8053 39.5276 30.985 39.9578 30.9967 40.4107"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M27.1016 40.4123C27.1016 39.1563 28.1029 38.1387 29.3376 38.1387C30.5722 38.1387 31.5748 39.1563 31.5748 40.4123"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M26.4453 40.4126C26.4453 38.7862 27.7434 37.4648 29.3432 37.4648C30.943 37.4648 32.2423 38.7837 32.2423 40.4126"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M25.75 40.4112C25.75 38.3939 27.3583 36.7598 29.3428 36.7598C31.3272 36.7598 32.9367 38.3939 32.9367 40.4112"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M25 40.4114C25 37.9763 26.9441 36 29.3413 36C31.7385 36 33.6827 37.975 33.6827 40.4114"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M36.7664 36.7477C36.2114 35.6883 36.639 34.3704 37.7218 33.8031C38.8046 33.2358 40.1315 33.6344 40.6865 34.6937"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M36.0796 37.1075C35.3304 35.6775 35.9125 33.8941 37.3696 33.1307C38.8267 32.3673 40.6243 32.9038 41.3735 34.3338"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M35.2937 37.5184C34.3199 35.6599 35.0712 33.3573 36.9653 32.3649C38.8593 31.3725 41.1824 32.0699 42.1539 33.9241"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M34.3555 37.639C33.1526 35.3432 34.1966 32.7905 36.545 31.5601C38.8934 30.3297 41.7721 31.1902 42.9784 33.4926"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M33.4824 38.0974C32.0275 35.3205 33.2525 32.1792 36.0898 30.6926C38.9272 29.206 42.4074 30.2515 43.8629 33.0295"
                    stroke={line2Color}
                    strokeWidth="0.394238"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.5632 8.48736C10.7153 8.7397 10.8162 9.01965 10.8596 9.30965C10.903 9.59964 10.888 9.89342 10.8155 10.1725C10.743 10.4516 10.6146 10.71 10.4383 10.9315C10.2621 11.153 10.0417 11.3328 9.7912 11.4596C9.54066 11.5864 9.26532 11.6574 8.98246 11.6683C8.6996 11.6792 8.41533 11.6296 8.1475 11.5227C7.87967 11.4159 7.63407 11.254 7.42611 11.0472C7.21815 10.8405 7.05232 10.5934 6.93905 10.3215"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.1994 8.16554C11.3797 8.50393 11.4939 8.87339 11.5353 9.25222C11.5766 9.63105 11.5442 10.0116 11.4401 10.3716C11.3359 10.7316 11.1621 11.0637 10.9287 11.3484C10.6954 11.6332 10.4072 11.8649 10.0812 12.0298C9.75522 12.1948 9.39791 12.2898 9.03026 12.3092C8.66262 12.3286 8.29204 12.272 7.9403 12.1427C7.58857 12.0135 7.26275 11.8141 6.98198 11.5565C6.70121 11.2988 6.47115 10.988 6.30529 10.6423"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.9214 7.79964C12.3462 8.67939 12.425 9.6822 12.1408 10.5927C11.8567 11.5031 11.2322 12.2486 10.4017 12.6689C9.57107 13.0892 8.60059 13.1509 7.69869 12.8407C6.79679 12.5305 6.03542 11.8731 5.57812 11.0098"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.6842 7.41483C13.2381 8.50927 13.355 9.76853 13.0093 10.9156C12.6635 12.0626 11.8834 13.0035 10.8406 13.5313C9.7978 14.059 8.57767 14.1304 7.44864 13.7297C6.31962 13.3289 5.37418 12.489 4.82031 11.3945"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13.5009 7.00045C14.1432 8.31901 14.2654 9.82454 13.8413 11.1922C13.4171 12.5599 12.4805 13.6801 11.2336 14.3112C9.98664 14.9422 8.52935 15.0334 7.17609 14.5653C5.82283 14.0971 4.68209 13.107 4 11.8086"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.7452 3C21.7529 3.33793 21.6961 3.67406 21.5781 3.98861C21.4602 4.30315 21.2835 4.58977 21.0584 4.83161C20.8334 5.07345 20.5646 5.26563 20.2677 5.39683C19.9709 5.52804 19.6521 5.59563 19.33 5.59563C19.0079 5.59563 18.6891 5.52804 18.3922 5.39683C18.0954 5.26563 17.8266 5.07345 17.6015 4.83161C17.3765 4.58977 17.1998 4.30315 17.0819 3.98861C16.9639 3.67406 16.9071 3.33793 16.9147 3"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22.5927 3C22.5927 3.9072 22.2494 4.77724 21.6381 5.41873C21.0269 6.06021 20.1979 6.4206 19.3335 6.4206C18.4691 6.4206 17.6401 6.06021 17.0288 5.41873C16.4176 4.77724 16.0742 3.9072 16.0742 3"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M23.5599 3C23.5699 3.58925 23.468 4.17469 23.2601 4.72215C23.0522 5.26962 22.7425 5.76813 22.349 6.18857C21.9555 6.60901 21.4861 6.94297 20.9683 7.17094C20.4505 7.39891 19.8946 7.51632 19.333 7.51632C18.7715 7.51632 18.2155 7.39891 17.6977 7.17094C17.1799 6.94297 16.7105 6.60901 16.317 6.18857C15.9235 5.76813 15.6138 5.26962 15.4059 4.72215C15.198 4.17469 15.0961 3.58925 15.1061 3"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M24.5711 3C24.5711 4.4587 24.019 5.85766 23.0362 6.88911C22.0533 7.92057 20.7204 8.50004 19.3305 8.50004C17.9406 8.50004 16.6076 7.92057 15.6248 6.88911C14.642 5.85766 14.0898 4.4587 14.0898 3"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M25.6622 3C25.6622 4.76223 24.9952 6.45229 23.8079 7.69838C22.6206 8.94447 21.0102 9.64451 19.3311 9.64451C17.652 9.64451 16.0417 8.94447 14.8543 7.69838C13.667 6.45229 13 4.76223 13 3"
                    stroke={line2Color}
                    strokeWidth="0.438412"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {placement === "bottom" ? (
                    <path
                        opacity={active ? "1" : "0.3"}
                        d="M24.4924 29.4221C23.8922 30.2141 22.7016 30.2142 22.1013 29.4221L15.0205 20.0778C14.2719 19.0899 14.9766 17.6719 16.2161 17.6719H30.3777C31.6172 17.6719 32.3218 19.0899 31.5732 20.0778L24.4924 29.4221Z"
                        fill={active ? "#FFEDE2" : "#E2FDFF"}
                        stroke={active ? "#CB490D" : "#548C89"}
                    />
                ) : (
                    <>
                        adfasdf
                        <path
                            opacity={active ? "1" : "0.3"}
                            d="M25.6955 14.7498C25.0953 13.9577 23.9047 13.9577 23.3045 14.7498L16.2237 24.0941C15.4751 25.082 16.1797 26.5 17.4192 26.5H31.5808C32.8203 26.5 33.5249 25.082 32.7763 24.0941L25.6955 14.7498Z"
                            fill={active ? "#FFEDE2" : "#E2FDFF"}
                            stroke={active ? "#CB490D" : "#548C89"}
                        />
                    </>
                )}
            </g>
            <path
                d="M41.5676 16.2189C41.5652 16.096 41.6095 15.9772 41.6906 15.8886C41.7718 15.8001 41.8832 15.7491 42.0003 15.7468C42.1175 15.7445 42.2308 15.7912 42.3153 15.8765C42.3998 15.9618 42.4486 16.0788 42.451 16.2018"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M41.4145 16.2213C41.4129 16.1391 41.4268 16.0574 41.4553 15.9808C41.4838 15.9043 41.5264 15.8344 41.5806 15.7752C41.6349 15.716 41.6998 15.6686 41.7715 15.6357C41.8433 15.6028 41.9206 15.5851 41.9989 15.5836C42.0773 15.5821 42.1552 15.5968 42.2282 15.6268C42.3011 15.6569 42.3678 15.7017 42.4243 15.7588C42.4809 15.8159 42.5261 15.884 42.5576 15.9594C42.5891 16.0348 42.6061 16.1159 42.6077 16.1981"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M41.2384 16.225C41.2342 16.0098 41.3117 15.8018 41.4537 15.6468C41.5958 15.4918 41.7907 15.4025 41.9958 15.3986C42.2008 15.3946 42.3992 15.4762 42.5471 15.6256C42.6951 15.7749 42.7805 15.9797 42.7847 16.1949"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M41.0508 16.2284C41.0456 15.9615 41.1417 15.7036 41.3178 15.5114C41.4939 15.3192 41.7357 15.2085 41.99 15.2035C42.2443 15.1986 42.4902 15.2999 42.6737 15.4851C42.8571 15.6703 42.9631 15.9243 42.9683 16.1911"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M40.8517 16.2326C40.8455 15.9102 40.9615 15.5987 41.1743 15.3665C41.387 15.1343 41.6792 15.0006 41.9863 14.9946C42.2935 14.9886 42.5906 15.111 42.8122 15.3347C43.0339 15.5584 43.1619 15.8652 43.1682 16.1876"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M40.2927 15.0695C40.2907 14.967 40.3276 14.868 40.3952 14.7942C40.4628 14.7204 40.5557 14.6778 40.6534 14.676C40.751 14.6741 40.8454 14.7129 40.9159 14.7841C40.9864 14.8552 41.0271 14.9527 41.029 15.0552"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M40.1625 15.0721C40.1598 14.9337 40.2096 14.7999 40.3009 14.7003C40.3923 14.6006 40.5176 14.5432 40.6495 14.5406C40.7813 14.5381 40.9089 14.5906 41.004 14.6866C41.0991 14.7827 41.1541 14.9144 41.1568 15.0527"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M40.017 15.076C40.0136 14.8967 40.0781 14.7234 40.1964 14.5943C40.3148 14.4651 40.4772 14.3907 40.6481 14.3874C40.8189 14.3841 40.9842 14.4521 41.1074 14.5766C41.2307 14.701 41.3019 14.8716 41.3054 15.0509"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.8639 15.0797C39.8596 14.8574 39.9396 14.6427 40.0863 14.4826C40.233 14.3225 40.4343 14.2303 40.6461 14.2262C40.8579 14.2221 41.0627 14.3064 41.2155 14.4607C41.3683 14.6149 41.4565 14.8264 41.4608 15.0486"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.6954 15.0817C39.6902 14.8133 39.7868 14.554 39.9639 14.3607C40.1411 14.1674 40.3842 14.0561 40.6399 14.0511C40.8957 14.0461 41.143 14.148 41.3275 14.3342C41.512 14.5205 41.6186 14.7759 41.6238 15.0443"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38.9149 16.2435C38.9168 16.1233 38.963 16.0087 39.0438 15.9237C39.1247 15.8387 39.2338 15.79 39.3483 15.7878C39.4627 15.7856 39.5737 15.83 39.6577 15.9118C39.7418 15.9936 39.7924 16.1063 39.799 16.2263"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38.7618 16.247C38.7636 16.0842 38.8256 15.9286 38.9348 15.8132C39.044 15.6978 39.1918 15.6316 39.3469 15.6285C39.502 15.6255 39.6522 15.686 39.7658 15.7971C39.8794 15.9081 39.9475 16.0612 39.9555 16.2238"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38.5817 16.2518C38.5833 16.0403 38.6633 15.838 38.8049 15.6877C38.9465 15.5375 39.1384 15.4513 39.3399 15.4474C39.5413 15.4435 39.7364 15.5222 39.8837 15.6668C40.031 15.8114 40.1189 16.0105 40.1286 16.2217"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38.398 16.2546C38.3991 15.9919 38.4981 15.7402 38.6737 15.5534C38.8493 15.3665 39.0877 15.2592 39.338 15.2543C39.5882 15.2495 39.8306 15.3474 40.0133 15.5273C40.1961 15.7072 40.3047 15.9548 40.3161 16.2173"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M38.1989 16.2583C38.1996 15.9405 38.3188 15.6358 38.531 15.4095C38.7432 15.1832 39.0315 15.0532 39.3343 15.0473C39.637 15.0414 39.9302 15.1601 40.151 15.378C40.3718 15.5959 40.5028 15.8957 40.5159 16.2132"
                stroke={line1Color}
                strokeWidth="0.0565466"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M47.5015 16.189H36.6783C35.8745 16.2032 35.56 15.9026 35.3507 15.3693C35.2631 15.1685 35.2317 14.9456 35.2603 14.7267C35.2889 14.5079 35.3762 14.3021 35.5121 14.1333C35.6233 13.9844 35.7656 13.8643 35.9281 13.7824C36.0907 13.7006 36.269 13.6591 36.4493 13.6612L43.3686 13.4569C43.8893 13.4427 44.4995 13.1924 44.7307 12.7017C44.8806 12.3826 44.8285 11.9094 44.5359 11.5641C44.3079 11.2952 43.9466 11.2056 43.604 11.2056H41.9532"
                stroke={line1Color}
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <filter
                    id="filter0_i_6234_15756"
                    x="5.33594"
                    y="3.27539"
                    width="37.125"
                    height="41.1235"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.484224 0 0 0 0 0.658605 0 0 0 0 0.651899 0 0 0 1 0"
                    />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_6234_15756" />
                </filter>
            </defs>
        </svg>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;