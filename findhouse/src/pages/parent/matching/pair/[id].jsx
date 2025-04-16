import React, { useState } from "react";
import ServiceSchedule from "../../../../components/base/ServiceSchedule";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RatingComponent from "../../../../components/nanny/rating";
import "./profile.css";
import Loading from "../../../../components/base/Loading";
import useStore from "../../../../lib/store";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nannyInfo, setNannyInfo] = useState({});
  const [urls, setUrls] = useState([]);
  const [iconUrl, setIconUrl] = useState("/assets/images/resource/error.png");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const { orderId, setOrderId } = useStore();
  const [warningText, setWarningText] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const isPair = async () => {
    const response = await fetch(
      `/api/pair/isPair?nanny_id=${id}&&order_id=${orderId}`
    );
    const data = await response.json();
    if (
      data.orders[0].status == "signing" ||
      data.orders[0].status == "cancel"
    ) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  const handleSvgClick = async () => {
    try {
      if (isFavorite) {
        setIsFavorite(false);
        await fetch(`/api/favorite/deleteFavorite`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId: id, type: "parent" }),
        });
      } else {
        setIsFavorite(true);
        await fetch(`/api/favorite/createFavorite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId: id, type: "parent" }),
        });
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };
  // 處理點擊圓點來跳轉到對應圖片
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    isPair();
  }, [warningText]);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getIsFavorite = async () => {
    const response = await fetch(
      `/api/favorite/getIsFavorite?itemId=${id}&&type=${"parent"}`
    );
    const data = await response.json();
    console.log("data", data.favorite.length);
    if (data.favorite.length > 0) {
      setIsFavorite(true);
    }
  };

  const handlApproval = async () => {
    const response = await fetch(`/api/pair/update`, {
      method: "PATCH",
      body: JSON.stringify({
        id,
        orderId,
        status: "signing",
        preStatus: "matchByNanny",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setIsModalOpen(true);
    setWarningText("配對成功");
    setIsMatching(true);
  };

  const handlReject = async () => {
    const response = await fetch(`/api/pair/update`, {
      method: "PATCH",
      body: JSON.stringify({
        id,
        orderId,
        status: "cancel",
        preStatus: "matchByNanny",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setIsModalOpen(true);
    setWarningText("已拒絕配對");
    setIsMatching(true);
  };

  useEffect(() => {
    const fetchNannyInfo = async () => {
      setIsLoading(true);
      if (!router.isReady) return; // 等待路由準備就緒
      if (!id) return;

      try {
        const response = await fetch(`/api/nanny/getNannyInfo?id=${id}`);
        const data = await response.json();
        setNannyInfo(data.nannies[0]);

        // 如果有環境照片，則獲取每張照片的URL
        if (data.nannies[0].environmentpic?.length > 0) {
          for (const picId of data.nannies[0].environmentpic) {
            const response2 = await fetch(`/api/base/getImgUrl?id=${picId}`);
            const data2 = await response2.json();
            console.log("data2", data2.url);
            urls.push(data2.url);
          }
        }
        if (data.nannies[0].uploadid) {
          const response3 = await fetch(
            `/api/base/getImgUrl?id=${data.nannies[0].uploadid}`
          );
          const data3 = await response3.json();
          setIconUrl(data3.url);
        }
        getIsFavorite();
      } catch (error) {
        console.error("Failed to fetch nanny info:", error);
      }
      setIsLoading(false);
    };

    fetchNannyInfo();
  }, [id, router.isReady]);

  const serviceNames = {
    2: "可遠端查看育兒情形",
    3: "製作副食品",
    4: "可配合不使用3C育兒",
    5: "寶寶衣物清洗",
    6: "可配合家長外出",
  };

  const icons = {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      {isLoading && (
        <div
          style={{
            position: "fixed", // 確保 Loading 覆蓋整個畫面
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // 透明度
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // 確保 Loading 在最上層
          }}
        >
          <Loading />
        </div>
      )}
      <div className="nanny-header">
        <img
          src="/icon/arrowForward.svg"
          alt="back"
          onClick={() => router.back()}
        />
        <svg
          className={`svg-icon ${isFavorite ? "active" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          onClick={handleSvgClick}
          style={{ cursor: "pointer", fill: isFavorite ? "#E3838E" : "none" }}
        >
          <path
            d="M10 4.17381C8 -0.52063 1 -0.0206299 1 5.9794C1 11.9794 10 16.9796 10 16.9796C10 16.9796 19 11.9794 19 5.9794C19 -0.0206299 12 -0.52063 10 4.17381Z"
            stroke="#E3838E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="profileSection">
        <img className="profilePic" src={iconUrl} alt="Profile" />{" "}
        {/* 頭貼圓形 */}
        <h2 className="profileName">{nannyInfo.name?.[0]}保母</h2>
        <div className="rating">
          <RatingComponent score={nannyInfo?.score} />
        </div>
        <div className="profile-section">
          <div className="part">
            <span className="part-title">經驗</span>
            <span className="part-subTitle">{nannyInfo?.experienment}</span>
          </div>
          <div className="part">
            <span className="part-title">年紀</span>
            <span className="part-subTitle">{nannyInfo?.age}</span>
          </div>
          <div className="part">
            <span className="part-title">托育</span>
            <span className="part-subTitle">{nannyInfo?.kidcount}</span>
          </div>
        </div>
        {/* Tabs */}
        <div
          className={`${nannyInfo.care_type === "suddenly" ? "tabs-suddenly" : "tabs"}`}
        >
          <div className="tab-content">
            <span
              className={`${nannyInfo.care_type === "suddenly" ? "tab-tile-suddenly" : "tab-tile"}`}
            >
              托育方式
            </span>
            <span className="tab-subTitle">
              {nannyInfo.care_type === "suddenly"
                ? "臨時托育"
                : nannyInfo.care_time === "night"
                  ? "夜間托育"
                  : nannyInfo.care_time === "allDay"
                    ? "全天托育"
                    : nannyInfo.care_time === "morning"
                      ? "日間托育"
                      : "未填寫"}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="62"
            viewBox="0 0 2 62"
            fill="none"
          >
            <path
              d="M1 61L1 1"
              stroke="#FCF7F7"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <div className="tab-content">
            <span
              className={`${nannyInfo.care_type === "suddenly" ? "tab-tile-suddenly" : "tab-tile"}`}
            >
              托育情境
            </span>
            <span className="tab-subTitle">
              {nannyInfo.scenario === "home"
                ? "在宅托育"
                : nannyInfo.scenario === "infantCareCenter"
                  ? "定點托育"
                  : nannyInfo.scenario === "toHome"
                    ? "到宅托育"
                    : "未填寫"}
            </span>
          </div>
        </div>
        {/* 圖片輪播區域 */}
        <div className="imageSection">
          <span className="imgFont">托育環境</span>
          <div className="carousel">
            <img
              src={urls[currentImageIndex]}
              alt={`圖片 ${currentImageIndex + 1}`}
              className="carouselImage"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <div className="imageCounter">
                {nannyInfo?.environmentpic
                  ? `${currentImageIndex + 1}/${nannyInfo?.environmentpic.length}`
                  : "0/0"}
              </div>
            </div>
          </div>
          {/* 圓點指示器 */}
          {nannyInfo?.environmentpic &&
            nannyInfo?.environmentpic?.length > 0 && (
              <div className="dotsContainer">
                {nannyInfo?.environmentpic?.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImageIndex ? "active" : ""}`}
                    onClick={() => handleDotClick(index)}
                  ></span>
                ))}
              </div>
            )}
        </div>

        {/* Icon Navigation */}
        <div style={{ backgroundColor: "#fff", border: "none" }}>
          <div
            style={{
              backgroundColor: "#F3CCD4",
              borderRadius: "50px 0px 0px 0px",
            }}
          >
            <div className="iconNav">
              {["2", "3", "4", "5", "6"].map((number) => (
                <div
                  key={number}
                  style={{
                    display: "flex",
                    width: "48px",
                    height: "110px",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    className={`iconStyle ${nannyInfo?.service?.includes(number) ? "active" : "inactive"}`}
                  >
                    {nannyInfo?.service?.includes(number)
                      ? icons[number].active
                      : icons[number].default}
                  </div>
                  <span
                    className={`fontSpan ${nannyInfo?.service?.includes(number) ? "active" : "inactive"}`}
                  >
                    {serviceNames[number]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ backgroundColor: "#F8ECEC" }}>
              <div className="introSection">
                <div className="notesSection">
                  <span className="imgFont">保母自介</span>
                  {nannyInfo?.introduction}
                </div>
              </div>
            </div>
          </div>
          <div className="buttonLayout">
              <button className="appoveButton" onClick={handlApproval}>媒合</button>
              <button className="rejectButton" onClick={handlReject}>拒絕</button>
            </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_304_31413)">
                  <path
                    d="M14.7782 5.22943C14.4824 4.93364 14.0045 4.93364 13.7088 5.22943L10 8.9306L6.29124 5.22184C5.99545 4.92605 5.51763 4.92605 5.22184 5.22184C4.92605 5.51763 4.92605 5.99545 5.22184 6.29124L8.9306 10L5.22184 13.7088C4.92605 14.0045 4.92605 14.4824 5.22184 14.7782C5.51763 15.0739 5.99545 15.0739 6.29124 14.7782L10 11.0694L13.7088 14.7782C14.0045 15.0739 14.4824 15.0739 14.7782 14.7782C15.0739 14.4824 15.0739 14.0045 14.7782 13.7088L11.0694 10L14.7782 6.29124C15.0664 6.00303 15.0664 5.51763 14.7782 5.22943Z"
                    fill="#252525"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_304_31413">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <span className="modalTitle">配對成功</span>
          </div>
        </div>
      )}
    </div>
  );
}
