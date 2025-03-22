import React, { useState, useEffect } from "react";
import "./matching.css";
import "./profile.css";
import Pagination from "../../../components/base/pagenation";
import SettingForNanny from "../../../components/base/SettingForNanny";
import SearchBarSortOnly from "../../../components/base/SearchBarSortOnly";
import { useRouter } from "next/router";
import Loading from "../../../components/base/Loading";
export default function HistoryPage() {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState("");
  const [selectedSort, setSelectedSort] = useState("time"); // 新增狀態以追蹤選擇的排序
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const itemsPerPage = 1; // 每頁顯示 1 筆
  // 計算目前頁面的資料
  const indexOfLastItem = orderCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Add this check for client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const icons = {
    1: {
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M23.861 8H13V0H15C15.083 0 22.746 0.0999999 23.861 8ZM5.5 10L4 8C3.53293 7.38045 2.92873 6.87747 2.23476 6.53049C1.54078 6.1835 0.775884 6.00193 0 6L0 8C0.46553 8.00116 0.924469 8.1101 1.34085 8.31829C1.75724 8.52648 2.11976 8.82827 2.4 9.2L4 11.333V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H11.865L9.257 19.129C7.935 18.511 5.837 20.046 6.004 21.64C6.02797 22.0042 6.13163 22.3586 6.30766 22.6783C6.48369 22.998 6.7278 23.2752 7.02272 23.4901C7.31764 23.7051 7.65618 23.8527 8.01442 23.9224C8.37265 23.9922 8.74183 23.9824 9.09586 23.8937C9.44989 23.8051 9.78013 23.6398 10.0632 23.4095C10.3463 23.1792 10.5754 22.8895 10.7342 22.5609C10.8931 22.2323 10.9778 21.8728 10.9824 21.5079C10.987 21.143 10.9115 20.7815 10.761 20.449L14 16.562L17.239 20.449C17.0904 20.7814 17.0164 21.1423 17.0223 21.5063C17.0282 21.8704 17.1138 22.2287 17.2731 22.5561C17.4323 22.8835 17.6614 23.1721 17.9442 23.4014C18.2269 23.6308 18.5565 23.7954 18.9097 23.8837C19.263 23.972 19.6312 23.9818 19.9887 23.9124C20.3461 23.8431 20.684 23.6963 20.9785 23.4823C21.2731 23.2683 21.5172 22.9924 21.6937 22.6739C21.8702 22.3555 21.9747 22.0022 22 21.639C22.167 20.047 20.069 18.51 18.747 19.129L16.135 16H21C21.7956 16 22.5587 15.6839 23.1213 15.1213C23.6839 14.5587 24 13.7956 24 13V10H5.5Z"
            fill="#E3838E"
          />
        </svg>
      ),
      default: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M23.861 8H13V0H15C15.083 0 22.746 0.0999999 23.861 8ZM5.5 10L4 8C3.53293 7.38045 2.92873 6.87747 2.23476 6.53049C1.54078 6.1835 0.775884 6.00193 0 6L0 8C0.46553 8.00116 0.924469 8.1101 1.34085 8.31829C1.75724 8.52648 2.11976 8.82827 2.4 9.2L4 11.333V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H11.865L9.257 19.129C7.935 18.511 5.837 20.046 6.004 21.64C6.02797 22.0042 6.13163 22.3586 6.30766 22.6783C6.48369 22.998 6.7278 23.2752 7.02272 23.4901C7.31764 23.7051 7.65618 23.8527 8.01442 23.9224C8.37265 23.9922 8.74183 23.9824 9.09586 23.8937C9.44989 23.8051 9.78013 23.6398 10.0632 23.4095C10.3463 23.1792 10.5754 22.8895 10.7342 22.5609C10.8931 22.2323 10.9778 21.8728 10.9824 21.5079C10.987 21.143 10.9115 20.7815 10.761 20.449L14 16.562L17.239 20.449C17.0904 20.7814 17.0164 21.1423 17.0223 21.5063C17.0282 21.8704 17.1138 22.2287 17.2731 22.5561C17.4323 22.8835 17.6614 23.1721 17.9442 23.4014C18.2269 23.6308 18.5565 23.7954 18.9097 23.8837C19.263 23.972 19.6312 23.9818 19.9887 23.9124C20.3461 23.8431 20.684 23.6963 20.9785 23.4823C21.2731 23.2683 21.5172 22.9924 21.6937 22.6739C21.8702 22.3555 21.9747 22.0022 22 21.639C22.167 20.047 20.069 18.51 18.747 19.129L16.135 16H21C21.7956 16 22.5587 15.6839 23.1213 15.1213C23.6839 14.5587 24 13.7956 24 13V10H5.5Z"
            fill="#F2F2F2"
          />
        </svg>
      ),
    },
    5: {
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17 0H7C4.243 0 2 2.243 2 5V19C2 21.757 4.243 24 7 24H17C19.757 24 22 21.757 22 19V5C22 2.243 19.757 0 17 0ZM20 19C20 20.654 18.654 22 17 22H7C5.346 22 4 20.654 4 19V5C4 3.346 5.346 2 7 2H17C18.654 2 20 3.346 20 5V19ZM6.5 6C5.672 6 5 5.328 5 4.5C5 3.672 5.672 3 6.5 3C7.328 3 8 3.672 8 4.5C8 5.328 7.328 6 6.5 6ZM9 4.5C9 3.672 9.672 3 10.5 3C11.328 3 12 3.672 12 4.5C12 5.328 11.328 6 10.5 6C9.672 6 9 5.328 9 4.5ZM12 8C8.691 8 6 10.691 6 14C6 17.309 8.691 20 12 20C15.309 20 18 17.309 18 14C18 10.691 15.309 8 12 8ZM12 10C14.06 10 15.741 11.571 15.957 13.574C15.683 13.767 15.249 14 14.728 14C13.889 14 12.9 13.417 12.592 13.193C12.425 13.071 10.917 12 9.273 12C9.002 12 8.751 12.035 8.511 12.084C9.192 10.849 10.492 10 12 10ZM12 18C9.94 18 8.259 16.429 8.043 14.426C8.317 14.233 8.751 14 9.272 14C10.111 14 11.1 14.583 11.408 14.807C11.575 14.929 13.083 16 14.727 16C14.998 16 15.249 15.965 15.489 15.916C14.808 17.151 13.508 18 12 18Z"
            fill="#E3838E"
          />
        </svg>
      ),
      default: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17 0H7C4.243 0 2 2.243 2 5V19C2 21.757 4.243 24 7 24H17C19.757 24 22 21.757 22 19V5C22 2.243 19.757 0 17 0ZM20 19C20 20.654 18.654 22 17 22H7C5.346 22 4 20.654 4 19V5C4 3.346 5.346 2 7 2H17C18.654 2 20 3.346 20 5V19ZM6.5 6C5.672 6 5 5.328 5 4.5C5 3.672 5.672 3 6.5 3C7.328 3 8 3.672 8 4.5C8 5.328 7.328 6 6.5 6ZM9 4.5C9 3.672 9.672 3 10.5 3C11.328 3 12 3.672 12 4.5C12 5.328 11.328 6 10.5 6C9.672 6 9 5.328 9 4.5ZM12 8C8.691 8 6 10.691 6 14C6 17.309 8.691 20 12 20C15.309 20 18 17.309 18 14C18 10.691 15.309 8 12 8ZM12 10C14.06 10 15.741 11.571 15.957 13.574C15.683 13.767 15.249 14 14.728 14C13.889 14 12.9 13.417 12.592 13.193C12.425 13.071 10.917 12 9.273 12C9.002 12 8.751 12.035 8.511 12.084C9.192 10.849 10.492 10 12 10ZM12 18C9.94 18 8.259 16.429 8.043 14.426C8.317 14.233 8.751 14 9.272 14C10.111 14 11.1 14.583 11.408 14.807C11.575 14.929 13.083 16 14.727 16C14.998 16 15.249 15.965 15.489 15.916C14.808 17.151 13.508 18 12 18Z"
            fill="#F2F2F2"
          />
        </svg>
      ),
    },
    2: {
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 10C15 11.654 13.654 13 12 13C10.346 13 9 11.654 9 10C9 8.346 10.346 7 12 7C13.654 7 15 8.346 15 10ZM22 10C22 15.514 17.514 20 12 20C6.486 20 2 15.514 2 10C2 4.486 6.486 0 12 0C17.514 0 22 4.486 22 10ZM17 10C17 7.243 14.757 5 12 5C9.243 5 7 7.243 7 10C7 12.757 9.243 15 12 15C14.757 15 17 12.757 17 10ZM18.429 20.128C16.569 21.313 14.363 22 12 22C9.637 22 7.429 21.312 5.569 20.127C5.474 20.27 5.384 20.415 5.299 20.565C4.892 21.285 4.898 22.143 5.316 22.858C5.733 23.573 6.475 24 7.302 24H16.696C17.522 24 18.265 23.573 18.684 22.858C19.1 22.147 19.108 21.295 18.705 20.58C18.618 20.426 18.526 20.274 18.429 20.128Z"
            fill="#E3838E"
          />
        </svg>
      ),
      default: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 10C15 11.654 13.654 13 12 13C10.346 13 9 11.654 9 10C9 8.346 10.346 7 12 7C13.654 7 15 8.346 15 10ZM22 10C22 15.514 17.514 20 12 20C6.486 20 2 15.514 2 10C2 4.486 6.486 0 12 0C17.514 0 22 4.486 22 10ZM17 10C17 7.243 14.757 5 12 5C9.243 5 7 7.243 7 10C7 12.757 9.243 15 12 15C14.757 15 17 12.757 17 10ZM18.429 20.128C16.569 21.313 14.363 22 12 22C9.637 22 7.429 21.312 5.569 20.127C5.474 20.27 5.384 20.415 5.299 20.565C4.892 21.285 4.898 22.143 5.316 22.858C5.733 23.573 6.475 24 7.302 24H16.696C17.522 24 18.265 23.573 18.684 22.858C19.1 22.147 19.108 21.295 18.705 20.58C18.618 20.426 18.526 20.274 18.429 20.128Z"
            fill="#F2F2F2"
          />
        </svg>
      ),
    },
    6: {
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5C13.381 5 14.5 6.119 14.5 7.5C14.5 8.881 13.381 10 12 10C10.619 10 9.49997 8.881 9.49997 7.5C9.49997 6.119 10.619 5 12 5ZM16 14V17C16 17.883 15.609 18.67 15 19.22V23C15 23.553 14.552 24 14 24C13.448 24 13 23.553 13 23V20H11V23C11 23.553 10.552 24 9.99997 24C9.44797 24 8.99997 23.553 8.99997 23V19.22C8.39097 18.671 7.99997 17.883 7.99997 17V14C7.99997 12.346 9.34597 11 11 11H13C14.654 11 16 12.346 16 14ZM19 5C20.381 5 21.5 3.881 21.5 2.5C21.5 1.119 20.381 0 19 0C17.619 0 16.5 1.119 16.5 2.5C16.5 3.881 17.619 5 19 5ZM23.977 16.628L23.101 9.621C22.844 7.557 21.081 6 19 6C18.036 6 17.149 6.344 16.44 6.908C16.466 7.104 16.5 7.297 16.5 7.5C16.5 8.371 16.24 9.179 15.81 9.868C17.13 10.769 18 12.284 18 14V17C18 18.077 17.643 19.123 17 19.981V20H20V23C20 23.552 20.447 24 21 24C21.553 24 22 23.552 22 23V19.812C22.474 19.643 22.909 19.371 23.249 18.986C23.818 18.341 24.083 17.481 23.977 16.628ZM7.49997 2.5C7.49997 1.119 6.37997 0 4.99997 0C3.61997 0 2.49997 1.119 2.49997 2.5C2.49997 3.881 3.61897 5 4.99997 5C6.38097 5 7.49997 3.881 7.49997 2.5ZM0.750967 18.985C1.09097 19.37 1.52597 19.643 1.99997 19.811V22.999C1.99997 23.551 2.44697 23.999 2.99997 23.999C3.55297 23.999 3.99997 23.551 3.99997 22.999V19.999H6.99997V19.98C6.35697 19.122 5.99997 18.076 5.99997 16.999V13.999C5.99997 12.283 6.86997 10.768 8.18997 9.867C7.75997 9.177 7.49997 8.37 7.49997 7.499C7.49997 7.296 7.53397 7.103 7.55997 6.907C6.85097 6.344 5.96397 5.999 4.99997 5.999C2.91897 5.999 1.15597 7.556 0.898967 9.62L0.0229674 16.628C-0.0830326 17.482 0.180967 18.34 0.750967 18.985Z"
            fill="#E3838E"
          />
        </svg>
      ),
      default: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5C13.381 5 14.5 6.119 14.5 7.5C14.5 8.881 13.381 10 12 10C10.619 10 9.49997 8.881 9.49997 7.5C9.49997 6.119 10.619 5 12 5ZM16 14V17C16 17.883 15.609 18.67 15 19.22V23C15 23.553 14.552 24 14 24C13.448 24 13 23.553 13 23V20H11V23C11 23.553 10.552 24 9.99997 24C9.44797 24 8.99997 23.553 8.99997 23V19.22C8.39097 18.671 7.99997 17.883 7.99997 17V14C7.99997 12.346 9.34597 11 11 11H13C14.654 11 16 12.346 16 14ZM19 5C20.381 5 21.5 3.881 21.5 2.5C21.5 1.119 20.381 0 19 0C17.619 0 16.5 1.119 16.5 2.5C16.5 3.881 17.619 5 19 5ZM23.977 16.628L23.101 9.621C22.844 7.557 21.081 6 19 6C18.036 6 17.149 6.344 16.44 6.908C16.466 7.104 16.5 7.297 16.5 7.5C16.5 8.371 16.24 9.179 15.81 9.868C17.13 10.769 18 12.284 18 14V17C18 18.077 17.643 19.123 17 19.981V20H20V23C20 23.552 20.447 24 21 24C21.553 24 22 23.552 22 23V19.812C22.474 19.643 22.909 19.371 23.249 18.986C23.818 18.341 24.083 17.481 23.977 16.628ZM7.49997 2.5C7.49997 1.119 6.37997 0 4.99997 0C3.61997 0 2.49997 1.119 2.49997 2.5C2.49997 3.881 3.61897 5 4.99997 5C6.38097 5 7.49997 3.881 7.49997 2.5ZM0.750967 18.985C1.09097 19.37 1.52597 19.643 1.99997 19.811V22.999C1.99997 23.551 2.44697 23.999 2.99997 23.999C3.55297 23.999 3.99997 23.551 3.99997 22.999V19.999H6.99997V19.98C6.35697 19.122 5.99997 18.076 5.99997 16.999V13.999C5.99997 12.283 6.86997 10.768 8.18997 9.867C7.75997 9.177 7.49997 8.37 7.49997 7.499C7.49997 7.296 7.53397 7.103 7.55997 6.907C6.85097 6.344 5.96397 5.999 4.99997 5.999C2.91897 5.999 1.15597 7.556 0.898967 9.62L0.0229674 16.628C-0.0830326 17.482 0.180967 18.34 0.750967 18.985Z"
            fill="#F2F2F2"
          />
        </svg>
      ),
    },
    4: {
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M14.5011 14.999C13.6721 14.999 13.0011 15.67 13.0011 16.499V17.999H3.00108V5.499C3.00108 4.121 4.12308 2.999 5.50108 2.999H10.5011C11.6431 2.999 12.6391 3.77 12.9221 4.873C13.1291 5.675 13.9471 6.161 14.7481 5.952C15.5511 5.745 16.0341 4.928 15.8271 4.126C15.2021 1.696 13.0121 3.03906e-07 10.5001 3.03906e-07H5.50008C2.46808 -0.000999696 0.00107639 2.466 0.00107639 5.499C0.00107639 5.499 -0.0189236 19.204 0.00107639 19.301C0.00107639 21.999 2.34308 23.999 5.00108 23.999H11.0011C13.3671 23.999 15.6641 22.22 16.0011 19.499V16.499C16.0011 15.67 15.3301 14.999 14.5011 14.999ZM9.00108 21.999H7.00108C6.44908 21.999 6.00108 21.551 6.00108 20.999C6.00108 20.447 6.44908 19.999 7.00108 19.999H9.00108C9.55308 19.999 10.0011 20.447 10.0011 20.999C10.0011 21.551 9.55308 21.999 9.00108 21.999Z"
            fill="#E3838E"
          />
          <path
            d="M24.1139 9.00042V8.67942C24.1139 8.23942 23.9689 7.81042 23.6999 7.46142L21.2229 4.23442C20.5009 3.36842 19.2149 3.25142 18.3489 3.97342C17.4829 4.69542 17.3659 5.98142 18.0879 6.84742L18.9229 7.99942L11.5349 7.98642C10.5769 7.98642 9.82995 8.86942 10.0859 9.87042C10.2609 10.5524 10.9249 10.9994 11.6289 10.9994H15.7979L17.3329 16.3734C17.9429 18.5084 19.9199 19.9994 22.1409 19.9994H22.5009C23.3299 19.9994 24.0009 19.3284 24.0009 18.4994C24.0009 17.6704 23.3299 16.9994 22.5009 16.9994H22.1409C21.2529 16.9994 20.4619 16.4024 20.2179 15.5484L18.9179 10.9994H22.1159C23.2209 10.9994 24.1159 10.1044 24.1159 8.99942L24.1139 9.00042Z"
            fill="#E3838E"
          />
        </svg>
      ),
      default: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M14.5011 14.999C13.6721 14.999 13.0011 15.67 13.0011 16.499V17.999H3.00108V5.499C3.00108 4.121 4.12308 2.999 5.50108 2.999H10.5011C11.6431 2.999 12.6391 3.77 12.9221 4.873C13.1291 5.675 13.9471 6.161 14.7481 5.952C15.5511 5.745 16.0341 4.928 15.8271 4.126C15.2021 1.696 13.0121 3.03906e-07 10.5001 3.03906e-07H5.50008C2.46808 -0.000999696 0.00107639 2.466 0.00107639 5.499C0.00107639 5.499 -0.0189236 19.204 0.00107639 19.301C0.00107639 21.999 2.34308 23.999 5.00108 23.999H11.0011C13.3671 23.999 15.6641 22.22 16.0011 19.499V16.499C16.0011 15.67 15.3301 14.999 14.5011 14.999ZM9.00108 21.999H7.00108C6.44908 21.999 6.00108 21.551 6.00108 20.999C6.00108 20.447 6.44908 19.999 7.00108 19.999H9.00108C9.55308 19.999 10.0011 20.447 10.0011 20.999C10.0011 21.551 9.55308 21.999 9.00108 21.999Z"
            fill="#F2F2F2"
          />
          <path
            d="M24.1139 9.00042V8.67942C24.1139 8.23942 23.9689 7.81042 23.6999 7.46142L21.2229 4.23442C20.5009 3.36842 19.2149 3.25142 18.3489 3.97342C17.4829 4.69542 17.3659 5.98142 18.0879 6.84742L18.9229 7.99942L11.5349 7.98642C10.5769 7.98642 9.82995 8.86942 10.0859 9.87042C10.2609 10.5524 10.9249 10.9994 11.6289 10.9994H15.7979L17.3329 16.3734C17.9429 18.5084 19.9199 19.9994 22.1409 19.9994H22.5009C23.3299 19.9994 24.0009 19.3284 24.0009 18.4994C24.0009 17.6704 23.3299 16.9994 22.5009 16.9994H22.1409C21.2529 16.9994 20.4619 16.4024 20.2179 15.5484L18.9179 10.9994H22.1159C23.2209 10.9994 24.1159 10.1044 24.1159 8.99942L24.1139 9.00042Z"
            fill="#F2F2F2"
          />
        </svg>
      ),
    },
    3: {
      active: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M24 8C24 5.625 22.029 0 18.922 0C15.86 0 14 5.557 14 8C14 10.414 15.721 12.434 18 12.899V24H20V12.899C22.279 12.434 24 10.415 24 8ZM16 14.323C13.609 13.183 12 10.738 12 8C12 6.717 12.423 4.562 13.327 2.579C12.285 2.211 11.168 2 10 2C4.477 2 0 6.477 0 12C0 17.523 4.477 22 10 22C12.254 22 14.327 21.245 16 19.986V14.323ZM11 12.414L7.707 15.707L6.293 14.293L9 11.586V7H11V12.414Z"
            fill="#E3838E"
          />
        </svg>
      ),
      default: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M24 8C24 5.625 22.029 0 18.922 0C15.86 0 14 5.557 14 8C14 10.414 15.721 12.434 18 12.899V24H20V12.899C22.279 12.434 24 10.415 24 8ZM16 14.323C13.609 13.183 12 10.738 12 8C12 6.717 12.423 4.562 13.327 2.579C12.285 2.211 11.168 2 10 2C4.477 2 0 6.477 0 12C0 17.523 4.477 22 10 22C12.254 22 14.327 21.245 16 19.986V14.323ZM11 12.414L7.707 15.707L6.293 14.293L9 11.586V7H11V12.414Z"
            fill="#F2F2F2"
          />
        </svg>
      ),
    },
  };

  const fetchFavoriteList = async (
    page,
    pageSize = 5,
    keywords,
    selectedSort
  ) => {
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(
        `/api/favorite/getFavoriteList?page=${page}&pageSize=${pageSize}&sort=${selectedSort}&keyword=${keywords}&type=nanny`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrderInfo(data.favorite);
      setTotalItem(data.favorite.length);
    } catch (error) {
      console.error("Error fetching nanny info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchFavoriteList(currentPage, pageSize, keywords);
  };

  useEffect(() => {
    if (!isMounted) return; // Only run on client-side

    let isCancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!isCancelled) {
          await fetchFavoriteList(currentPage, pageSize, keywords);
          setIsLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, keywords, isMounted]); // Add isMounted to dependencies

  const handlePageChange = (page) => {
    console.log("page:", page);
    setCurrentPage(page); // Update currentPage when a new page is selected
  };

  const handleFilterChange = (sorts) => {
    setSelectedSort(sorts);
    fetchFavoriteList(currentPage, pageSize, keywords, selectedSort); // Fetch nanny info with updated filters
  };

  return (
    <div className="matching-main">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="matching-body-header-background">
            <div style={styles.header}>
              <div style={styles.headerSetting}>
                <img
                  src="/icon/arrowForward.svg"
                  alt="back"
                  onClick={() => router.back()}
                />
                <SettingForNanny />
              </div>
              <div style={styles.header}>
                <div style={styles.headerTitleLayout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="25"
                    viewBox="0 0 26 25"
                    fill="none"
                  >
                    <path
                      d="M13 6.06508C10.3333 -0.194174 1 0.472493 1 8.47253C1 16.4726 13 23.1395 13 23.1395C13 23.1395 25 16.4726 25 8.47253C25 0.472493 15.6667 -0.194174 13 6.06508Z"
                      fill="#E3838E"
                      stroke="#E3838E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span style={styles.headerTitleFont}>收藏案件</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#F3CCD4",
              borderRadius: "40px 0 0px 0",
              width: "100%",
              border: "none",
            }}
          >
            <div className="matching-body-layoff">
              <div className="avatar-container">
                <div style={styles.contentLayout}>
                  <div style={styles.rollerLayout}>
                    <div style={styles.searchInput}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={() => handleFetchClick()}
                      >
                        <path
                          d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z"
                          fill="#999999"
                        />
                      </svg>
                      <input
                        style={{ border: "none" }}
                        placeholder="搜尋孩童暱稱"
                        value={keywords || ""}
                        onChange={(e) => setKeywords(e.target.value)}
                      ></input>
                    </div>
                    <SearchBarSortOnly
                      keyword={keywords} // 將關鍵字傳遞給子組件
                      setKeyword={setKeywords} // 傳遞更新函數
                      onChange={handleFilterChange} // 傳遞選擇變更的處理函數
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="matching-body-layoff-content-background">
              <div className="matching-body-layoff-content">
                {orderInfo.length === 0 ? (
                  <div className="space-layout">
                    <img
                      src="/icon/spaceIcon.png"
                      className="space-icon"
                      alt="space icon"
                    />
                    <span className="matching-body-layoff-content-title">
                      尚無資料
                      <br />
                      趕緊找到案件吧！
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                {orderInfo.map((order, index) => (
                  <div
                    key={index}
                    style={styles.nannyItem}
                    onClick={() => {
                      if (order.id) {
                        router.push(`/nanny/order/${order.id}`);
                      } else {
                        console.error("Order ID not found");
                      }
                    }}
                  >
                    <div style={styles.rightPart}>
                      <div>
                        <img
                          src={order.image || "/orderCreate.png"}
                          style={
                            order.gender === "female"
                              ? styles.orderIconFemale
                              : styles.orderIconMale
                          }
                          alt="Nanny Icon"
                        />
                      </div>
                      <div style={styles.nannyFontLayout}>
                        <div style={styles.nannyNameFont}>{order.nickname}</div>
                        <div style={styles.wayLayout}>
                          <div style={styles.wayStyle}>
                            {order.choosetype === "suddenly"
                              ? "臨時托育"
                              : order.choosetype === "longTern"
                                ? "長期托育"
                                : ""}
                          </div>
                          <div style={styles.scenarioStyle}>
                            {order.scenario === "home"
                              ? "在宅托育"
                              : order.scenario === "infantCareCenter"
                                ? "定點托育"
                                : order.scenario === "toHome"
                                  ? "到宅托育"
                                  : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={styles.scoreLayout}>
                      <div style={styles.iconLayout}>
                        {["1", "2"].map((num) => (
                          <div key={num} style={styles.iconLayout}>
                            {order.hope?.includes(num)
                              ? icons[num].active
                              : icons[num].default}
                          </div>
                        ))}
                      </div>

                      <div style={styles.iconLayout}>
                        {["3", "4"].map((num) => (
                          <div key={num} style={styles.iconLayout}>
                            {order.hope?.includes(num)
                              ? icons[num].active
                              : icons[num].default}
                          </div>
                        ))}
                      </div>

                      <div style={styles.iconLayout}>
                        {["5", "6"].map((num) => (
                          <div key={num} style={styles.iconLayout}>
                            {order.hope?.includes(num)
                              ? icons[num].active
                              : icons[num].default}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#F3CCD4",
                  width: "100%",
                }}
              >
                <Pagination
                  totalItems={totalItem}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  fetchNannyInfoList={fetchFavoriteList}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  headerTitleLayout: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleFont: {
    color: "var(---OutLine-OnSurfaceVariant, #504B49)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  headerSetting: {
    display: "flex",
    height: "50px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
  },
  scenarioStyle: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    border: "1px solid var(---Button-02, #FBC2EB)",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  wayStyle: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    background: "linear-gradient(81deg, #FBDBD6 10.58%, #D9DFF0 75.92%)",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  wayLayout: {
    display: "flex",
    alignItems: "flex-start",
    gap: "4px",
    alignSelf: "stretch",
  },
  scenarioStyle: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    border: "1px solid var(---Button-02, #FBC2EB)",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  headSubTitle: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  orderItem: {
    display: "flex",
  },
  searchFont: {
    color: "#000",
    /* Line/medium/11pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  searchTypeLayout: {
    display: "flex",
    padding: "0px 10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "30px",
    background: " var(---SurfaceContainer-Lowest, #FFF)",
  },
  searchLayout: {
    display: "flex",
    gap: "12px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    zIndex: "2",
  },
  timeFont: {
    color: "var(---Surface-Black-25, #252525)",
    /* Line/medium/8pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  screen: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    border: "1px solid var(---Button-02, #FBC2EB)",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  way: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    background:
      "var(---Button-02, linear-gradient(90deg, #FBC2EB 0%, #A6C1EE 100%))",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  nickname: {
    color: "#1E1E1E",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  orderInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  nannyInfoLayout: {
    display: "flex",
    width: "110px",
    height: "82px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
    flexShrink: "0",
  },
  headIcon: {
    width: "87.772px",
    height: "87.772px",
    flexShrink: "0",
    backgroundColor: "#E3838E",
    borderRadius: "50%",
    overflow: "hidden", // 添加這行來確保圖片不會溢出圓形區域
    display: "flex", // 添加這行來居中圖片
    justifyContent: "center", // 添加這行來居中圖片
    alignItems: "center", // 添加這行來居中圖片
  },
  headIconImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 確保圖片填充整個空間並保持比例
  },
  createInfoLayout: {
    display: "flex",
    width: "218px",
    alignItems: "center",
    gap: "15px",
    justifyContent: "center",
  },
  profilePic: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  nextBtn: {
    padding: "10px 20px",
    backgroundColor: "var(---Primary-Primary, #E3838E)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  componentLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid #f4f4f4",
  },
  hopeLayout: {
    width: "100%",
    display: "flex",
    padding: "5px 10px",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "8px",
    border: "1px solid var(---OutLine-OutLine, #78726D)",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
  },
  titleLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  smallTitle: {
    color: "var(---Primary-OnContainer, #6F2E2A)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "16px",
    fontWeight: "800",
    lineHeight: "normal",
    marginBottom: "15px",
  },
  typeFont: {
    color: "var(---SurfaceContainer-Lowest, #FFF)",
    /* Line/bold/24pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    linHeight: "normal",
  },
  nannySubInfo: {
    color: "var(---Outline-OnSurface, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  nannyNameFont: {
    color: "var(---Outline-OnSurface, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  nannyFontLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  orderIconFemale: {
    display: "flex",
    width: "60px",
    height: "60px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexShrink: "0",
    backgroundColor: "#F3CCD4",
    borderRadius: "50%",
  },
  orderIconMale: {
    display: "flex",
    width: "60px",
    height: "60px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexShrink: "0",
    backgroundColor: "#BCE8F7",
    borderRadius: "50%",
  },
  rightPart: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  nannyItem: {
    display: "flex",
    height: "70px",
    padding: "5px 9px 5px 9px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "8px",
    width: "100%",
    border: "2px solid var(---Button-01, #FBDBD6)",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
  },
  nannyItemLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    marginBottom: "28px",
    justifyContent: "space-between",
    backgroundColor: "#F3CCD4",
    paddingLeft: "35px",
    paddingRight: "35px",
    paddingTop: "20px",
    backgroundColor: "#F3CCD4",
    borderRadius: "40px 0px 0px 0px", // 左上、右上、右下、左下的圓角
  },
  buttonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    marginBottom: "28px",
    justifyContent: "space-between",
  },
  imgLayout: {
    height: "180px",
    alignSelf: "stretch",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFF",
  },
  inputField: {
    padding: "28px 14px",
    borderRadius: "8px",
    border: "1px solid #000",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    color: "gray",
    width: "100%",
    position: "relative",
    cursor: "pointer",
  },
  dateInput: {
    opacity: 1,
    cursor: "pointer",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    border: "none",
    zIndex: 999,
    outline: "none",
    background: "transparent",
    padding: "10px",
  },
  lastButton: {
    border: "none",
    backgroundColor: "#FFF",
  },
  subTitleLayout: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#FBDBD6",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f8ecec",
    minHeight: "100vh",
    width: "100%",
  },
  scoreLayout: {
    display: "flex",
    gap: "8px",
  },
  iconLayout: {
    alignSelf: "stretch",
    fill: "var(---SurfaceContainer-High, #F5E5E5)",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  createInfoLayout: {
    display: "flex",
    width: "218px",
    alignItems: "center",
    gap: "15px",
    justifyContent: "center",
  },
  createInfoLayoutHave: {
    width: "100%",
    display: "flex",
    height: "85px",
    alignItems: "center",
    borderRadius: "12px",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    gap: "8px",
    pointer: "cursor",
  },
  header: {
    display: "flex",
    height: "147px",
    padding: "15px 38px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "20px",
    alignSelf: "stretch",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "0px 0px 40px 0px", // 左上、右上、右下、左下的圓角
  },
  contentLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#f8ecec",
    gap: "10px",
    borderRadius: "40px 0px 40px 0px", // 左上、右上、右下、左下的圓角
  },
  searchInput: {
    display: "flex",
    padding: "8px 52px 8px 12px",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "100px",
    border: "1px solid #EBEBEB",
    background: "#FBFBFB",
  },
  rollerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginRight: "10px",
  },
  roller: {
    width: "42px",
    height: "6px",
    borderRadius: "2px",
    backgroundColor: "#FFF",
    margin: "0 5px",
  },
  rollerActive: {
    width: "42px",
    height: "6px",
    borderRadius: "2px",
    backgroundColor: "var(---Primary-Primary, #E3838E)",
    margin: "0 5px",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: "15px",
    color: "#E3838E",
  },
  suddenlyBtn: {
    display: "flex",
    width: "320px",
    height: "130px",
    padding: "16px 12px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    background: "var(---Primary-Primary, #E3838E)",
    border: "none",
    borderRadius: "12px",
  },
  longBtn: {
    display: "flex",
    width: "320px",
    height: "130px",
    padding: "16px 12px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    background: "var(---Primary-Primary, #F3CCD4)",
    border: "none",
    borderRadius: "12px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    opacity: 0.5,
    zIndex: 1,
  },
};
